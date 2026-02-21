# Womanslator Environment Variables

This app requires the following environment variable to run:

## Required

**GROQ_API_KEY** - Your Groq API key for LLM functionality
- Get one at: https://console.groq.com/keys
- Example: `gsk_xxxxxxxxxxxxxxxxxxxxxxxxx`

## Setup

### Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your actual Groq API key to `.env`:
   ```
   GROQ_API_KEY=your_actual_key_here
   ```

3. Run the app:
   ```bash
   python app.py
   ```

### Vercel Deployment

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Click **Add New**
4. Set:
   - **Name**: `GROQ_API_KEY`
   - **Value**: Your actual Groq API key
   - **Environment**: Production (or all as needed)
5. Click **Save** and redeploy

**Note:** Never commit `.env` file - it's in `.gitignore`
