const fs = require('fs');
const { execSync } = require('child_process');

// Delete the .next directory
try {
  if (fs.existsSync('./.next')) {
    console.log('Removing .next directory...');
    fs.rmSync('./.next', { recursive: true, force: true });
  }
} catch (err) {
  console.error('Error removing .next directory:', err);
}

// Run npm install to ensure all dependencies are installed
try {
  console.log('Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
} catch (err) {
  console.error('Error installing dependencies:', err);
  process.exit(1);
}

// Start the development server
try {
  console.log('Starting development server...');
  execSync('npm run dev', { stdio: 'inherit' });
} catch (err) {
  console.error('Error starting development server:', err);
  process.exit(1);
} 