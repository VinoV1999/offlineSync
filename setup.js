const { execSync } = require('child_process');

console.log('Installing dependencies...');
execSync('cd frontend && npm install', { stdio: 'inherit' });
execSync('cd backend && npm install', { stdio: 'inherit' });