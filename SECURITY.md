# 🔐 Security Guide - API Key Management

This guide explains how to securely manage API keys for KahaniKraftTales across different deployment platforms.

## 🚨 Security Principles

### ❌ NEVER DO THIS:
- **Don't commit API keys to Git** - They will be visible in your repository history
- **Don't put API keys in source code** - Anyone can see them
- **Don't share API keys in plain text** - Use secure methods only

### ✅ ALWAYS DO THIS:
- **Use environment variables** - Keep keys separate from code
- **Use platform-specific secret management** - Each platform has secure storage
- **Rotate keys regularly** - Change them periodically for security
- **Use least privilege** - Only grant necessary permissions

## 🔑 API Key Setup by Platform

### 🐙 GitHub Pages (Recommended)

**Step 1: Get your API keys**
- **OpenAI**: https://platform.openai.com/api-keys
- **Google Gemini**: https://makersuite.google.com/app/apikey
- **Anthropic Claude**: https://console.anthropic.com/

**Step 2: Add to GitHub Secrets**
1. Go to your repository → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add these secrets:
   ```
   OPENAI_API_KEY=your_openai_key_here
   GEMINI_API_KEY=your_gemini_key_here
   ANTHROPIC_API_KEY=your_anthropic_key_here
   ```

**Step 3: Deploy**
- Push to main branch
- GitHub Actions will automatically inject the keys securely
- Keys are never exposed in logs or code

### 🌐 Netlify

**Step 1: Deploy your site**
```bash
npm run build:netlify
# Upload the dist/ folder to Netlify
```

**Step 2: Add environment variables**
1. Go to Netlify Dashboard → Site settings → Environment variables
2. Add these variables:
   ```
   OPENAI_API_KEY=your_openai_key_here
   GEMINI_API_KEY=your_gemini_key_here
   ANTHROPIC_API_KEY=your_anthropic_key_here
   ```

**Step 3: Redeploy**
- Trigger a new deployment to apply the environment variables

### ⚡ Vercel

**Step 1: Deploy your site**
```bash
npm run build:vercel
npx vercel --prod
```

**Step 2: Add environment variables**
1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add these variables:
   ```
   OPENAI_API_KEY=your_openai_key_here
   GEMINI_API_KEY=your_gemini_key_here
   ANTHROPIC_API_KEY=your_anthropic_key_here
   ```

**Step 3: Redeploy**
- Redeploy to apply the environment variables

### 🖥️ Local Development

**Step 1: Create .env file**
```bash
cp env.example .env
```

**Step 2: Add your API keys**
```env
# .env file (never commit this!)
OPENAI_API_KEY=your_openai_key_here
GEMINI_API_KEY=your_gemini_key_here
ANTHROPIC_API_KEY=your_anthropic_key_here
PORT=3000
```

**Step 3: Run locally**
```bash
npm run dev
```

## 🛡️ Security Features

### Client-Side Security
- **API keys are injected at build time** - Not stored in client code
- **Graceful degradation** - App works without keys (demo mode)
- **Model availability detection** - Disables unavailable models
- **Error handling** - Secure error messages without exposing keys

### Build-Time Injection
```javascript
// Keys are injected during build process
const apiKeys = {
    openai: process.env.OPENAI_API_KEY || '',
    gemini: process.env.GEMINI_API_KEY || '',
    anthropic: process.env.ANTHROPIC_API_KEY || ''
};
```

### Runtime Validation
```javascript
// Models are disabled if keys are not available
if (!this.apiKeys.openai) {
    option.disabled = true;
    option.textContent += ' (API Key Required)';
}
```

## 🔍 Security Verification

### Check GitHub Secrets
```bash
# In GitHub Actions logs, you'll see:
🔐 API Keys: OpenAI ✅ Gemini ✅ Anthropic ❌
```

### Check Local Setup
```bash
# Visit http://localhost:3000/api/health
{
  "models": {
    "openai-chatgpt": "configured",
    "google-gemini": "configured", 
    "anthropic-claude": "not configured"
  }
}
```

### Check Deployed Site
- Open browser developer tools → Console
- Look for model availability messages
- Disabled models will show "(API Key Required)"

## 🚨 Security Incidents

### If API Key is Compromised
1. **Immediately revoke the key** in the provider's dashboard
2. **Generate a new key** 
3. **Update the secret** in your deployment platform
4. **Redeploy** your application
5. **Monitor usage** for any unauthorized activity

### If Key is Accidentally Committed
1. **Remove the key** from the code immediately
2. **Revoke the compromised key**
3. **Generate a new key**
4. **Use git filter-branch** to remove from history (if needed)
5. **Force push** the cleaned repository

## 📋 Security Checklist

- [ ] API keys stored in platform secrets (not in code)
- [ ] `.env` file added to `.gitignore`
- [ ] Keys have appropriate permissions/scopes
- [ ] Regular key rotation schedule established
- [ ] Monitoring set up for unusual API usage
- [ ] Team members trained on security practices

## 🔗 Additional Resources

- [GitHub Secrets Documentation](https://docs.github.com/en/actions/security-guides/encrypted-secrets)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables)
- [OpenAI API Security](https://platform.openai.com/docs/guides/safety-best-practices)
- [Google AI Security](https://ai.google.dev/docs/safety_setting_gemini)

---

💡 **Remember**: The application works perfectly in demo mode without any API keys. Only add keys if you want to use real AI models for story generation. 