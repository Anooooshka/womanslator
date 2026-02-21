# Womanslator Environment Variables

This app requires the following environment variable to run:

## Required

**GROQ_API_KEY** - Your Groq API key for LLM functionality
- Get one at: https://console.groq.com/keys
- Example: `gsk_xxxxxxxxxxxxxxxxxxxxxxxxx`

## Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your actual Groq API key to `.env`:
   ```
   GROQ_API_KEY=your_actual_key_here
   ```

3. For local development:
   ```bash
   python app.py
   ```

4. For Vercel deployment:
   - Go to your Vercel project settings
   - Add environment variable: `GROQ_API_KEY` with your actual key

**Note:** Never commit `.env` file - it's in `.gitignore`
