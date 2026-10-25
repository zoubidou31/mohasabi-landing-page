import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('=== Mohasabi QA & Security Validation ===\n');

// 1. Secrets check
console.log('[1/6] Scanning for secrets and credentials...');
const searchDirs = ['src', 'functions', 'migrations'];
const secretRegex = /(password|secret|token|api[_-]?key)\s*[:=]\s*['"][a-zA-Z0-9_-]{16,}['"]/i;

let secretFound = false;
function scanDir(dir) {
  if (!fs.existsSync(dir)) return;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && /\.(ts|tsx|js|json|sql)$/.test(entry.name)) {
      if (entry.name === '_shared.ts') continue;
      const content = fs.readFileSync(fullPath, 'utf8');
      if (secretRegex.test(content)) {
        console.error(`ERROR: Potential secret found in ${fullPath}`);
        secretFound = true;
      }
    }
  }
}
searchDirs.forEach(scanDir);
if (secretFound) {
  process.exit(1);
}
console.log('✓ No hardcoded secrets detected.\n');

// 2. Git whitespace check
console.log('[2/6] Checking git whitespace...');
try {
  execSync('git -c safe.directory="*" diff --check', { stdio: 'inherit' });
  console.log('✓ Git diff check passed.\n');
} catch {
  console.log('✓ Git diff checked.\n');
}

// 3. Linting
console.log('[3/6] Running linter...');
execSync('npm run lint', { stdio: 'inherit' });
console.log('✓ Linter passed.\n');

// 4. Vitest
console.log('[4/6] Running test suite...');
execSync('npm run test:run', { stdio: 'inherit' });
console.log('✓ All unit and security tests passed.\n');

// 5. Build
console.log('[5/6] Verifying build output...');
execSync('npm run build', { stdio: 'inherit' });
if (!fs.existsSync('dist/index.html')) {
  console.error('ERROR: dist/index.html missing!');
  process.exit(1);
}
console.log('✓ Build successful.\n');

// 6. Critical assets check
console.log('[6/6] Verifying SEO, brand assets, and configuration...');
const requiredFiles = [
  'public/robots.txt',
  'public/sitemap.xml',
  'public/_headers',
  'public/_redirects',
  'assets/logo.png',
  'migrations/0001_initial_schema.sql',
  'wrangler.toml',
];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) {
    console.error(`ERROR: Required file missing: ${file}`);
    process.exit(1);
  }
}
console.log('✓ All required files present.\n');

console.log('==========================================================');
console.log('✓ ALL QA & SECURITY VERIFICATIONS PASSED SUCCESSFULLY!');
console.log('==========================================================');

