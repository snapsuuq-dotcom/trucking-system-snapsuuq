# Admin Account Creation Script

## 🔐 Create Your First Admin Account

Since we removed default credentials for security, use this script to create your admin account.

### Usage

1. **Make sure your `.env` file is configured** with your MongoDB connection:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

2. **Run the script**:
   ```bash
   node scripts/create-admin.js
   ```

3. **Follow the prompts**:
   - Enter your admin email
   - Enter a secure password (minimum 6 characters)
   - Confirm the password

4. **Done!** You can now login to the admin panel with these credentials.

### Security Notes

- ⚠️ **Delete this script after creating your admin account** for maximum security
- ⚠️ Use a strong, unique password
- ⚠️ Never share your admin credentials
- ⚠️ Never commit credentials to version control

### Example

```bash
$ node scripts/create-admin.js

🔐 Snapsuuq Cargo - Admin Account Creation

Connecting to MongoDB...
✅ Connected to MongoDB

Enter admin email: admin@yourcompany.com
Enter admin password: ********
Confirm password: ********

✅ Admin account created successfully!
📧 Email: admin@yourcompany.com

⚠️  IMPORTANT: Keep these credentials safe and secure!
⚠️  This script should be deleted after use for security.
```

### Troubleshooting

**Error: Cannot connect to MongoDB**
- Check your `MONGODB_URI` in `.env` file
- Make sure MongoDB is running (if using local)
- Check your internet connection (if using MongoDB Atlas)

**Error: Admin already exists**
- An admin with this email is already registered
- Use a different email or login with existing credentials
- If you forgot password, manually update it in the database

**Error: Password too short**
- Use a password with at least 6 characters
- Recommended: Use 12+ characters with mixed case, numbers, and symbols

