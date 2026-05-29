const fs = require('fs');
const path = require('path');

const dirs = [
  'src',
  'src/types',
  'src/store',
  'src/lib',
  'src/hooks',
  'src/components',
  'src/components/ui',
  'src/components/resume',
  'src/components/interview',
  'src/components/jobmatch',
  'src/pages'
];

const basePath = '.';

console.log('Creating directory structure...\n');

dirs.forEach(dir => {
  const fullPath = path.join(basePath, dir);
  fs.mkdirSync(fullPath, { recursive: true });
  console.log('✓ Created: ' + dir);
});

console.log('\n✅ All directories created successfully!');
