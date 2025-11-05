# How to Push Folders to GitHub

## Prerequisites

1. **Git installed** (check with: `git --version`)
2. **GitHub account** (sign up at https://github.com)
3. **GitHub CLI or web browser** (to create repositories)

---

## Option 1: Push Backend Folder to GitHub

### Step 1: Create GitHub Repository

**Using GitHub Website:**
1. Go to https://github.com/new
2. Repository name: `cargo-backend` (or any name you prefer)
3. Choose **Public** or **Private**
4. **DO NOT** initialize with README, .gitignore, or license (we already have files)
5. Click "Create repository"

**Using GitHub CLI (if installed):**
```bash
gh repo create cargo-backend --public
```

### Step 2: Push Backend Code

```bash
# Navigate to backend folder
cd /Users/radio/Downloads/trucking/trucking-web-main/backend

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Backend for cargo tracking system"

# Add your GitHub repository as remote
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/cargo-backend.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**If you get authentication error:**
- Use GitHub Personal Access Token instead of password
- Or use SSH: `git remote add origin git@github.com:YOUR_USERNAME/cargo-backend.git`

---

## Option 2: Push Frontend Folder to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `cargo-frontend`
3. Choose **Public** or **Private**
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

### Step 2: Push Frontend Code

```bash
# Navigate to frontend folder
cd /Users/radio/Downloads/trucking/trucking-web-main/frontend

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Frontend for cargo tracking system"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/cargo-frontend.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Option 3: Push Entire Project (Monorepo)

If you want both frontend and backend in one repository:

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `cargo-tracking` (or any name)
3. Choose **Public** or **Private**
4. **DO NOT** initialize with README, .gitignore, or license
5. Click "Create repository"

### Step 2: Push Entire Project

```bash
# Navigate to project root
cd /Users/radio/Downloads/trucking/trucking-web-main

# Initialize git
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit: Full-stack cargo tracking system"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/cargo-tracking.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Setting Up GitHub Authentication

### Method 1: Personal Access Token (Recommended)

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name: "Cargo Project"
4. Select scopes: **repo** (full control of private repositories)
5. Click "Generate token"
6. **Copy the token immediately** (you won't see it again!)
7. When pushing, use the token as password:
   ```bash
   Username: your_github_username
   Password: your_personal_access_token
   ```

### Method 2: SSH Keys (More Secure)

1. **Generate SSH key:**
   ```bash
   ssh-keygen -t ed25519 -C "your_email@example.com"
   # Press Enter to accept default location
   # Enter a passphrase (optional but recommended)
   ```

2. **Add SSH key to GitHub:**
   ```bash
   # Copy your public key
   cat ~/.ssh/id_ed25519.pub
   # Copy the entire output
   ```
   - Go to GitHub → Settings → SSH and GPG keys
   - Click "New SSH key"
   - Paste your key and save

3. **Use SSH URL instead:**
   ```bash
   git remote add origin git@github.com:YOUR_USERNAME/repo-name.git
   ```

---

## Quick Commands Reference

### First Time Setup:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/repo-name.git
git branch -M main
git push -u origin main
```

### Subsequent Updates:
```bash
git add .
git commit -m "Description of changes"
git push
```

### Check Status:
```bash
git status
```

### View Remote:
```bash
git remote -v
```

---

## Troubleshooting

### "Repository not found" error:
- Check repository name is correct
- Make sure repository exists on GitHub
- Verify you have access to the repository

### "Authentication failed" error:
- Use Personal Access Token instead of password
- Or set up SSH keys
- Check your GitHub username is correct

### "Everything up-to-date" but files not showing:
- Make sure you did `git add .` before commit
- Check you're in the right directory
- Verify files aren't in `.gitignore`

### "Branch 'main' set up to track 'origin/main'":
- This is normal! It means your local branch is now linked to GitHub

---

## Example: Complete Workflow for Backend

```bash
# 1. Navigate to backend
cd /Users/radio/Downloads/trucking/trucking-web-main/backend

# 2. Initialize git
git init

# 3. Add all files
git add .

# 4. Commit
git commit -m "Initial commit: Backend API"

# 5. Add remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/cargo-backend.git

# 6. Rename branch to main
git branch -M main

# 7. Push to GitHub
git push -u origin main
```

After step 7, you'll be prompted for:
- **Username:** Your GitHub username
- **Password:** Your Personal Access Token (not your GitHub password!)

---

## Need Help?

- GitHub Docs: https://docs.github.com
- Git Basics: https://git-scm.com/book

