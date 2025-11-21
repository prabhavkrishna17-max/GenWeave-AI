// Quick script to verify backend URL configuration
// Run with: node check-backend.js

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const defaultUrl = 'http://localhost:4000';

console.log('🔍 Checking backend configuration...\n');

// Check if .env.local exists
if (fs.existsSync(envPath)) {
  const content = fs.readFileSync(envPath, 'utf8');
  const match = content.match(/VITE_BACKEND_BASE_URL=(.+)/);
  
  if (match) {
    const url = match[1].trim();
    console.log('✅ Found .env.local');
    console.log(`   Backend URL: ${url}`);
    
    // Extract port
    const portMatch = url.match(/:(\d+)/);
    if (portMatch) {
      const port = portMatch[1];
      console.log(`   Port: ${port}`);
      console.log(`\n📝 To verify: Open http://localhost:${port}/health in your browser`);
      console.log(`   Should return: {"status":"ok"}\n`);
    }
  } else {
    console.log('⚠️  .env.local exists but VITE_BACKEND_BASE_URL not found');
    console.log(`   Using default: ${defaultUrl}\n`);
  }
} else {
  console.log('ℹ️  .env.local not found');
  console.log(`   Using default: ${defaultUrl}`);
  console.log(`\n💡 Create .env.local with:`);
  console.log(`   VITE_BACKEND_BASE_URL=http://localhost:4000\n`);
}

console.log('📋 Next steps:');
console.log('   1. Check your backend terminal for the port number');
console.log('   2. Make sure .env.local port matches backend port');
console.log('   3. Restart frontend dev server after changes');


