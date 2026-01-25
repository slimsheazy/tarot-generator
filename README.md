# Tarot Spread Generator
A minimalist, high‑contrast tarot spread generator built with a Sibylhaus‑inspired aesthetic. This tool generates spread positions only — no card pulling, no interpretations, no filler — using a structured Gemini prompt inside Google AI Studio.

## ✨ Features
### Spread‑Only Output
- Generates tarot positions, not cards
- No mystical filler or vague language
- Clean, structured, repeatable phrasing

### Sibylhaus Aesthetic
- Pure black background
- White text
- Oswald typography
- Architectural spacing
- Zero rounded corners

### Embed Mode
Append ?embed=true to remove:
- Header
- Footer
- Outer padding

Perfect for embedding inside other sites.

**Example:**

```html
<iframe 
  src="https://your-app-url.com/?embed=true"
  style="width: 100%; height: 850px; border: none; background: transparent;"
  title="Tarot Spread Generator"
  loading="lazy"
  allow="clipboard-write">
</iframe>
```

**Gemini‑Powered**
- Uses a custom system prompt
- Ensures structured, non-generic spread generation
- API key stored securely when deployed

## 🗂 Project Structure

```/
├── index.html
├── App.tsx
├── types.ts
├── services/
│   └── geminiService.ts
├── components/
│   ├── Header.tsx
│   ├── SpreadGeneratorForm.tsx
│   ├── SpreadDisplay.tsx
│   ├── CardPlaceholder.tsx
│   └── Loader.tsx
└── metadata.json
```

**Component Overview**
- **SpreadGeneratorForm** – Handles user input and Gemini requests
- **SpreadDisplay** – Renders spread positions in a clean grid
- **CardPlaceholder** – Displays position titles/descriptions
- **Loader** – Minimalist loading animation
- **geminiService** – Wraps Gemini API calls and enforces system prompt

## 🚀 Deployment
1. **Push to GitHub**
Upload the project to a repository.
2. **Deploy with Vercel**
- Import the repo
- Add environment variable:
   - API_KEY = your Gemini API key
- Deploy

## 🔧 System Prompt Summary
The system prompt enforces:
- Spread‑only generation
- No card pulling
- No mystical filler
- Structured JSON output
- Clean, regular language
= Consistent tone and formatting [^1]

[^1]: ### 📄 License
This project is owned by Shea / Sibylhaus.
All rights reserved unless you choose to open‑source it.
