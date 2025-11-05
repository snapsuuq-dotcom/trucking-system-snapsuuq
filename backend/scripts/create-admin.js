const mongoose = require('mongoose');
const readline = require('readline');
const Admin = require('../models/Admin');
require('dotenv').config();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function createAdmin() {
  try {
    console.log('\n🔐 Snapsuuq Cargo - Admin Account Creation\n');
    
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Get admin details
    const email = await question('Enter admin email: ');
    const password = await question('Enter admin password: ');
    const confirmPassword = await question('Confirm password: ');

    // Validate inputs
    if (!email || !password) {
      console.error('❌ Email and password are required!');
      process.exit(1);
    }

    if (password !== confirmPassword) {
      console.error('❌ Passwords do not match!');
      process.exit(1);
    }

    if (password.length < 6) {
      console.error('❌ Password must be at least 6 characters long!');
      process.exit(1);
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.error(`❌ Admin with email "${email}" already exists!`);
      process.exit(1);
    }

    // Create admin
    const admin = new Admin({
      email,
      password
    });
    await admin.save();

    console.log('\n✅ Admin account created successfully!');
    console.log(`📧 Email: ${email}`);
    console.log('\n⚠️  IMPORTANT: Keep these credentials safe and secure!');
    console.log('⚠️  This script should be deleted after use for security.\n');

  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message);
    process.exit(1);
  } finally {
    rl.close();
    await mongoose.connection.close();
    process.exit(0);
  }
}

// Run the script
createAdmin();

