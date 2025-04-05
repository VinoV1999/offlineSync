const { execSync } = require('child_process');

console.log('Installing dependencies...');
execSync('npm install', { stdio: 'inherit' });
console.log('Installing Frontend dependencies...');
execSync('cd frontend && npm install', { stdio: 'inherit' });
console.log('Installing Backend dependencies...');
execSync('cd backend && npm install', { stdio: 'inherit' });