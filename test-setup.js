// Test script to verify Wine Cabinet App setup
const fs = require('fs');
const path = require('path');

console.log('🍷 Wine Cabinet App - Setup Verification\n');

// Check if all required files exist
const requiredFiles = [
  'app/index.tsx',
  'app/login.tsx',
  'app/signup.tsx',
  'app/_layout.tsx',
  'app/cabinet/[id].tsx',
  'app/bottle/add.tsx',
  'app/advisor.tsx',
  'app/settings.tsx',
  'app/analytics.tsx',
  'app/history.tsx',
  'app/scan.tsx',
  'app/subscription.tsx',
  'services/mockFirebaseService.ts'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    console.log(`✅ ${file}`);
  } else {
    console.log(`❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

console.log('\n📊 Summary:');
if (allFilesExist) {
  console.log('✅ All required files are present!');
  console.log('\n🚀 To run the app:');
  console.log('   cd WineCabinetApp');
  console.log('   npm start');
  console.log('   Press "w" to open in browser');
  console.log('\n📝 Demo Credentials:');
  console.log('   Email: demo@wineapp.com');
  console.log('   Password: 123456');
} else {
  console.log('❌ Some files are missing. Please check the errors above.');
}
