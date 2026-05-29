const fs = require('fs');
const path = require('path');

const baseDir = 'c:\\Users\\navne\\OneDrive\\Desktop\\InterviewPrep';
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

console.log('Creating directory structure...\n');

dirs.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  try {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`Created: ${fullPath}`);
  } catch (err) {
    console.log(`Already exists or error: ${fullPath}`);
  }
});

// Verify
console.log('\nVerifying structure:');
dirs.forEach(dir => {
  const fullPath = path.join(baseDir, dir);
  if (fs.existsSync(fullPath)) {
    console.log(`✓ ${dir}`);
  } else {
    console.log(`✗ ${dir} - FAILED`);
  }
});

console.log('\n✓ Directory setup complete!');
