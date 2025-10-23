# Quick Start Guide

Get your portfolio running in 5 minutes.

## 1. Install Dependencies

```bash
npm install
```

## 2. Start Development Server

```bash
npm run dev
```

Visit **http://localhost:3000**

## 3. Customize (Required)

### A. Update Personal Info

**File**: `src/app/layout.tsx`
```typescript
// Line 15-17
title: 'Your Name — Your Title',
description: 'Your description',
```

### B. Add Your Projects

**File**: `src/data/projects.ts`
```typescript
// Replace example projects with yours
{
  slug: 'your-project',
  title: 'Your Project',
  // ... fill in details
}
```

### C. Update Contact Info

**File**: `src/app/(components)/ContactStrip.tsx`
```typescript
// Line 118-140
// Update email, LinkedIn, GitHub URLs
```

### D. Add Resume

```bash
# Replace placeholder file
cp /path/to/your/resume.pdf public/resume-athul-nath.pdf
```

## 4. Optional Setup

### 3D Font (For WebGL 'I' Logo)

1. Visit https://gero3.github.io/facetype.js/
2. Upload Inter Bold font
3. Save JSON to `public/fonts/inter_bold.json`

**Note**: CSS fallback works without this file.

### Project Images

```bash
# Add thumbnails
mkdir -p public/projects
# Copy your images to public/projects/
```

## 5. Test & Deploy

### Test Locally

```bash
npm run build
npm start
```

### Deploy to Vercel

1. Push to GitHub
2. Import to Vercel
3. Deploy (automatic)

**That's it!** 🎉

---

## Common Tasks

### Update Technologies

**File**: `src/app/(components)/TechGrid.tsx`
```typescript
const technologies: TechItem[] = [
  { name: 'React', category: 'frontend' },
  // Add your tech stack
]
```

### Change Theme Colors

**File**: `tailwind.config.ts`
```typescript
primary: {
  500: '#0ea5e9', // Your brand color
}
```

### Disable Heavy Animations

Set reduced motion as default:

**File**: `src/hooks/useMotionSettings.ts`
```typescript
// Line 11
const [reduceMotion, setReduceMotion] = useState(true)
```

### Remove WebGL 3D Logo

**File**: `src/app/page.tsx`
```typescript
// Comment out HeroCanvas, use simple text:
<div className="text-9xl font-bold text-white">I</div>
```

---

## Need Help?

- **Setup Details**: See `SETUP.md`
- **Component Docs**: See `COMPONENTS.md`
- **Deployment**: See `DEPLOYMENT_CHECKLIST.md`
- **Full Docs**: See `README.md`

---

## Project Structure Overview

```
src/
├── app/
│   ├── (components)/      # All UI components
│   ├── works/[slug]/      # Project detail pages
│   ├── page.tsx           # Main page ⭐
│   └── layout.tsx         # Metadata
├── data/
│   └── projects.ts        # Your projects ⭐
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities
└── types/                 # TypeScript types
```

Files marked with ⭐ are the most commonly edited.

---

**Ready to build!** 🚀

For detailed instructions, see the comprehensive `README.md`.

