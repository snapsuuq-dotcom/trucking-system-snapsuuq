const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

async function createAdmin() {
  try {
    console.log('\n🔐 Snapsuuq Cargo - Admin Account Creation\n');
    
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB\n');

    // Default admin credentials (you can change these)
    const email = process.argv[2] || 'admin@snapsuuq.com';
    const password = process.argv[3] || 'admin123';

    // Validate inputs
    if (!email || !password) {
      console.error('❌ Email and password are required!');
      process.exit(1);
    }

    if (password.length < 6) {
      console.error('❌ Password must be at least 6 characters long!');
      process.exit(1);
    }

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log(`⚠️  Admin with email "${email}" already exists!`);
      console.log('✅ Using existing admin account.');
      await mongoose.connection.close();
      process.exit(0);
    }

    // Create admin
    const admin = new Admin({
      email,
      password
    });
    await admin.save();

    console.log('\n✅ Admin account created successfully!');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log('\n⚠️  IMPORTANT: Keep these credentials safe and secure!\n');

  } catch (error) {
    console.error('\n❌ Error creating admin:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

// Run the script
createAdmin();

