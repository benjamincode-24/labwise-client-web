# GitHub Deployment Guide

## Step 1: Replace Contact Information

### Option A: Using PowerShell Script (Recommended)
1. Open PowerShell in the project directory
2. Run: `.\replace-contacts.ps1`
3. Review the changes

### Option B: Manual Replacement
Use your text editor's find and replace feature with the values from `REPLACEMENT_GUIDE.md`

## Step 2: Initialize Git Repository

```bash
# Navigate to project directory
cd labwise_v1.2

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Labwise Medical Centre website with demo data"
```

## Step 3: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the "+" icon → "New repository"
3. Repository name: `labwise-medical-centre` (or your preferred name)
4. Description: "Modern healthcare website with admin CMS"
5. Choose "Public"
6. **DO NOT** initialize with README (we already have one)
7. Click "Create repository"

## Step 4: Push to GitHub

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/labwise-medical-centre.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 5: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "main" branch
5. Click "Save"
6. Wait 1-2 minutes for deployment
7. Your site will be live at: `https://YOUR_USERNAME.github.io/labwise-medical-centre/`

## Step 6: Update README with Live URL

1. Edit `README.md`
2. Replace `[View Live Demo](https://yourusername.github.io/labwise-medical-centre)` with your actual URL
3. Commit and push:

```bash
git add README.md
git commit -m "Update live demo URL"
git push
```

## Step 7: Share with Client

Send your client the following:

**Live Website:**
`https://YOUR_USERNAME.github.io/labwise-medical-centre/`

**Admin Access:**
- URL: `https://YOUR_USERNAME.github.io/labwise-medical-centre/login.html`
- Username: `admin`
- Password: `admin123`

**GitHub Repository:**
`https://github.com/YOUR_USERNAME/labwise-medical-centre`

## Important Notes

✅ **All contact information has been replaced with demo data**
✅ **No real client information is exposed**
✅ **Admin credentials are demo credentials only**
✅ **All data is stored in browser LocalStorage (client-side only)**

## Troubleshooting

### Issue: Pages not loading correctly
- **Solution:** Make sure all file paths use forward slashes `/` not backslashes `\`
- Check browser console for errors

### Issue: Images not showing
- **Solution:** Verify image paths in the `resources/` folder
- Make sure images are committed to the repository

### Issue: Admin login not working
- **Solution:** Clear browser cache and LocalStorage
- Try in incognito/private browsing mode

## Optional: Custom Domain

If you want to use a custom domain:

1. Buy a domain from a registrar (Namecheap, GoDaddy, etc.)
2. In your GitHub repo, go to Settings → Pages
3. Add your custom domain
4. Update DNS records at your registrar:
   - Add CNAME record pointing to `YOUR_USERNAME.github.io`
5. Wait for DNS propagation (up to 24 hours)

## Security Reminder

🔒 **For Production Use:**
- Change admin credentials
- Implement proper backend authentication
- Use HTTPS (GitHub Pages provides this automatically)
- Add proper form validation
- Implement rate limiting for forms
- Consider using a real database instead of LocalStorage

---

**Need Help?** Check the [GitHub Pages Documentation](https://docs.github.com/en/pages)
