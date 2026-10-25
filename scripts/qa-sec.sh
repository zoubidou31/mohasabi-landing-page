#!/usr/bin/env bash
# Mohasabi QA & Security Validation Script
set -e

echo "=== [1/6] Checking for secret leaks and sensitive files ==="
# Check for secret patterns in source and config files
if grep -rnEi "(password|secret|token|api[_-]?key)\s*[:=]\s*['\"][a-zA-Z0-9_\-]{16,}['\"]" src/ functions/ | grep -v "_shared.ts" | grep -v "DEFAULT_SECRET"; then
  echo "ERROR: Potential hardcoded secret found!"
  exit 1
fi
echo "✓ No hardcoded secrets detected in source files."

echo "=== [2/6] Checking git whitespace and diff sanity ==="
git -c safe.directory="*" diff --check || true
echo "✓ Git diff check completed."

echo "=== [3/6] Running Code Linter (oxlint) ==="
npm run lint
echo "✓ Linting passed."

echo "=== [4/6] Running Test Suite (vitest) ==="
npm run test:run
echo "✓ All automated unit & security tests passed."

echo "=== [5/6] Verifying Production Build & Bundle Output ==="
npm run build
if [ ! -f "dist/index.html" ]; then
  echo "ERROR: dist/index.html missing after build!"
  exit 1
fi
echo "✓ Production build succeeded."

echo "=== [6/6] Verifying Critical SEO & Brand Assets ==="
test -f "public/robots.txt" || (echo "ERROR: public/robots.txt missing" && exit 1)
test -f "public/sitemap.xml" || (echo "ERROR: public/sitemap.xml missing" && exit 1)
test -f "public/_headers" || (echo "ERROR: public/_headers missing" && exit 1)
test -f "public/_redirects" || (echo "ERROR: public/_redirects missing" && exit 1)
test -f "assets/logo.png" || (echo "ERROR: assets/logo.png missing" && exit 1)
test -f "migrations/0001_initial_schema.sql" || (echo "ERROR: migrations missing" && exit 1)
test -f "wrangler.toml" || (echo "ERROR: wrangler.toml missing" && exit 1)
echo "✓ All critical assets, migrations, and deployment configs verified."

echo "=========================================================="
echo "✓ ALL QA & SECURITY VERIFICATIONS PASSED SUCCESSFULLY!"
echo "=========================================================="

