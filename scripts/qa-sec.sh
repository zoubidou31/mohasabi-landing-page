#!/usr/bin/env bash
# Security integration checks against a Pages Functions emulator.
# Writes test rows and temporarily changes prices, so it only runs against a
# local emulator unless QA_ALLOW_REMOTE=1 is set explicitly.
#
#   npm run build && npm run db:local
#   npm run dev:api
#   QA_ADMIN_PASSWORD='<value from .dev.vars>' bash scripts/qa-sec.sh
#
# Re-running within 15 minutes hits the login rate limit, and the QA rows stay
# in the local database. Reset with:
#   npx wrangler d1 execute mohasabi-cms --local \
#     --command="DELETE FROM rate_limits"
set -u
B=${QA_BASE_URL:-http://127.0.0.1:8788}
O="Origin: $B"
J="Content-Type: application/json"
PW=${QA_ADMIN_PASSWORD:-}

case "$B" in
  http://127.0.0.1:*|http://localhost:*) ;;
  *)
    if [ "${QA_ALLOW_REMOTE:-}" != "1" ]; then
      echo "Refusing to run against $B: it writes test data." >&2
      echo "Set QA_ALLOW_REMOTE=1 only for a throwaway preview database." >&2
      exit 2
    fi
    ;;
esac
if [ -z "$PW" ]; then
  echo "Set QA_ADMIN_PASSWORD to the emulator admin password." >&2
  exit 2
fi

STAMP=$(date +%s)
EMAIL="qa-$STAMP@example.com"
NAME="QA Visitor $STAMP"
SUP_EMAIL="qa-support-$STAMP@example.com"
pass=0; fail=0

check() { # name expected actual
  if [ "$2" = "$3" ]; then echo "PASS  $1  ($3)"; pass=$((pass+1));
  else echo "FAIL  $1  expected=$2 actual=$3"; fail=$((fail+1)); fi
}

code() { curl -s --max-time 15 -o /dev/null -w "%{http_code}" "$@"; }
yesno() { sed 's/1/yes/;s/0/no/'; } # counts 0/1 -> no/yes

echo "--- A. unauthenticated admin access ---"
check "session anonymous body" '{"admin":false,"user":null}' "$(curl -s --max-time 15 $B/api/session)"
check "GET  /api/admin/stats" 401 "$(code $B/api/admin/stats)"
check "GET  /api/admin/reviews" 401 "$(code "$B/api/admin/reviews?status=pending")"
check "GET  /api/admin/pricing" 401 "$(code $B/api/admin/pricing)"
check "GET  /api/admin/messages" 401 "$(code $B/api/admin/messages)"
check "GET  /api/admin/activity" 401 "$(code $B/api/admin/activity)"
check "PATCH /api/admin/reviews/x" 401 "$(code -X PATCH -H "$O" -H "$J" -d '{"action":"approve"}' $B/api/admin/reviews/x)"
check "PUT  /api/admin/pricing" 401 "$(code -X PUT -H "$O" -H "$J" -d '{}' $B/api/admin/pricing)"
check "forged cookie" 401 "$(code -H 'Cookie: mohasabi_admin=eyJzdWIiOiJhZG1pbiIsImV4cCI6NDA3MDkwODgwMH0.ZmFrZQ' $B/api/admin/stats)"
check "empty cookie" 401 "$(code -H 'Cookie: mohasabi_admin=' $B/api/admin/stats)"

echo "--- B. login ---"
check "login without Origin" 403 "$(code -X POST -H "$J" -d "{\"password\":\"$PW\"}" $B/api/login)"
check "login wrong content type" 415 "$(code -X POST -H "$O" -H 'Content-Type: text/plain' -d 'x' $B/api/login)"
check "login wrong password" 401 "$(code -X POST -H "$O" -H "$J" -d '{"password":"nope-nope"}' $B/api/login)"

RESP=$(curl -s --max-time 15 -D - -X POST -H "$O" -H "$J" -d "{\"password\":\"$PW\"}" $B/api/login)
check "login correct status" 200 "$(printf '%s' "$RESP" | head -1 | awk '{print $2}')"
check "cookie HttpOnly" yes "$(printf '%s' "$RESP" | grep -ci 'set-cookie:.*HttpOnly' | yesno)"
check "cookie Secure" yes "$(printf '%s' "$RESP" | grep -ci 'set-cookie:.*Secure' | yesno)"
check "cookie SameSite=Strict" yes "$(printf '%s' "$RESP" | grep -ci 'set-cookie:.*SameSite=Strict' | yesno)"
COOKIE=$(printf '%s' "$RESP" | grep -i '^set-cookie:' | sed -E 's/^[Ss]et-[Cc]ookie: *([^;]+).*/\1/' | tr -d '\r')

check "session with cookie" '{"admin":true,"user":"admin"}' "$(curl -s --max-time 15 -H "Cookie: $COOKIE" $B/api/session)"
check "admin stats with cookie" 200 "$(code -H "Cookie: $COOKIE" $B/api/admin/stats)"
check "admin stats with cookie, wrong Origin" 403 "$(code -X PUT -H 'Origin: https://evil.example' -H "$J" -H "Cookie: $COOKIE" -d '{}' $B/api/admin/pricing)"

echo "--- C. review moderation flow ---"
REV="{\"email\":\"$EMAIL\",\"displayName\":\"$NAME\",\"rating\":5,\"title\":\"تجربة اختبار\",\"body\":\"هذا نص اختبار حقيقي بطول كافٍ للتحقق من المسار.\",\"consent\":true,\"website\":\"\"}"
check "submit review" '{"status":"pending"}' "$(curl -s --max-time 15 -X POST -H "$O" -H "$J" -d "$REV" $B/api/reviews)"
check "public list hides pending" no "$(curl -s --max-time 15 $B/api/reviews | grep -c "$EMAIL" | yesno)"
ADMINLIST=$(curl -s --max-time 15 -H "Cookie: $COOKIE" "$B/api/admin/reviews?status=pending")
check "admin list has email" yes "$(printf '%s' "$ADMINLIST" | grep -c "$EMAIL" | yesno)"
RID=$(printf '%s' "$ADMINLIST" | QA_EMAIL="$EMAIL" node -e '
let s = "";
process.stdin.on("data", (d) => (s += d)).on("end", () => {
  const row = JSON.parse(s).reviews.find((r) => r.email === process.env.QA_EMAIL);
  console.log(row ? row.id : "");
});')
check "approve review" '{"ok":true}' "$(curl -s --max-time 15 -X PATCH -H "$O" -H "$J" -H "Cookie: $COOKIE" -d '{"action":"approve"}' "$B/api/admin/reviews/$RID")"
PUB=$(curl -s --max-time 15 $B/api/reviews)
check "approved review public" yes "$(printf '%s' "$PUB" | grep -c "$NAME" | yesno)"
check "public review hides email" no "$(printf '%s' "$PUB" | grep -c "$EMAIL" | yesno)"
check "duplicate review rejected" 409 "$(code -X POST -H "$O" -H "$J" -d "$REV" $B/api/reviews)"

echo "--- D. support flow ---"
BEFORE=$(curl -s --max-time 15 -H "Cookie: $COOKIE" $B/api/admin/messages | grep -o '"id"' | wc -l | tr -d ' ')
SUP="{\"name\":\"QA Tester\",\"email\":\"$SUP_EMAIL\",\"topic\":\"install\",\"version\":\"1.0.3\",\"message\":\"رسالة اختبار حقيقية بطول كافٍ للتحقق من مسار الدعم.\",\"website\":\"\"}"
check "submit support" '{"status":"queued"}' "$(curl -s --max-time 15 -X POST -H "$O" -H "$J" -d "$SUP" $B/api/support)"
AFTER=$(curl -s --max-time 15 -H "Cookie: $COOKIE" $B/api/admin/messages | grep -o '"id"' | wc -l | tr -d ' ')
check "support stored" "$((BEFORE+1))" "$AFTER"
HONEY='{"name":"Bot","email":"bot@example.com","topic":"other","version":"","message":"honeypot attempt message long enough","website":"http://spam"}'
check "honeypot answer" '{"status":"queued"}' "$(curl -s --max-time 15 -X POST -H "$O" -H "$J" -d "$HONEY" $B/api/support)"
AFTER2=$(curl -s --max-time 15 -H "Cookie: $COOKIE" $B/api/admin/messages | grep -o '"id"' | wc -l | tr -d ' ')
check "honeypot not stored" "$AFTER" "$AFTER2"

echo "--- E. pricing write + audit ---"
PLANS='{"plans":[{"id":"standard","name":"Standard","month":1600,"quarter":3600,"halfYear":6600,"year":12100},{"id":"pro","name":"Pro","month":3000,"quarter":7500,"halfYear":13500,"year":25000},{"id":"enterprise","name":"Enterprise","month":5500,"quarter":13000,"halfYear":24000,"year":45000}],"note":"qa price check"}'
check "save pricing" 200 "$(code -X PUT -H "$O" -H "$J" -H "Cookie: $COOKIE" -d "$PLANS" $B/api/admin/pricing)"
check "pricing saved publicly" 1600 "$(curl -s --max-time 15 $B/api/pricing | tr '}' '\n' | grep '"id":"standard"' | sed -n 's/.*"month":\([0-9]*\).*/\1/p')"
check "invalid pricing rejected" 400 "$(code -X PUT -H "$O" -H "$J" -H "Cookie: $COOKIE" -d '{"plans":[{"id":"standard","name":"Standard","month":-5,"quarter":1,"halfYear":1,"year":1}]}' $B/api/admin/pricing)"
ACT=$(curl -s --max-time 15 -H "Cookie: $COOKIE" $B/api/admin/activity)
check "activity logged pricing" yes "$(printf '%s' "$ACT" | grep -c 'pricing.updated' | yesno)"
check "activity logged approve" yes "$(printf '%s' "$ACT" | grep -c 'review.approved' | yesno)"

echo "--- F. login rate limit ---"
LAST=0
for _ in 1 2 3 4 5 6; do LAST=$(code -X POST -H "$O" -H "$J" -d '{"password":"still-wrong"}' $B/api/login); done
check "login rate limited by 6th attempt" 429 "$LAST"

echo "--- G. restore approved prices + logout ---"
APPROVED='{"plans":[{"id":"standard","name":"Standard","month":1500,"quarter":3500,"halfYear":6500,"year":12000},{"id":"pro","name":"Pro","month":3000,"quarter":7500,"halfYear":13500,"year":25000},{"id":"enterprise","name":"Enterprise","month":5500,"quarter":13000,"halfYear":24000,"year":45000}],"note":"qa restore approved prices"}'
check "restore approved prices" 200 "$(code -X PUT -H "$O" -H "$J" -H "Cookie: $COOKIE" -d "$APPROVED" $B/api/admin/pricing)"
check "public pricing restored" 1500 "$(curl -s --max-time 15 $B/api/pricing | tr '}' '\n' | grep '"id":"standard"' | sed -n 's/.*"month":\([0-9]*\).*/\1/p')"
check "logout" '{"ok":true}' "$(curl -s --max-time 15 -X POST -H "$O" -H "$J" -H "Cookie: $COOKIE" -d '{}' $B/api/logout)"

echo
echo "RESULT pass=$pass fail=$fail"
echo "QA rows remain in the target database ($EMAIL, $SUP_EMAIL) and rate_limits holds the login attempts."
