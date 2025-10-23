# Setup Guide — athulnath.dev Portfolio

Complete setup instructions to get your portfolio running locally and deployed.

## Prerequisites

- Node.js 18.17+ installed
- npm, yarn, or pnpm package manager
- Git (for version control)

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages including:

- Next.js 15
- React 18
- TypeScript
- Tailwind CSS
- GSAP
- Framer Motion
- React Three Fiber

### 2. Set Up Required Files

#### A. 3D Font File (Optional but Recommended)

The 3D 'I' logo requires a font file:

1. Visit [facetype.js](https://gero3.github.io/facetype.js/)
2. Upload Inter Bold font (or download from Google Fonts)
3. Generate and download the JSON file
4. Save as `/public/fonts/inter_bold.json`

**Note**: If you skip this, the component will use a CSS fallback.

#### B. Resume PDF

Replace the placeholder with your actual resume:

```bash
# Add your resume
cp /path/to/your/resume.pdf public/resume-athul-nath.pdf
```

#### C. Project Images (Optional)

Add project thumbnails:

```bash
mkdir -p public/projects
# Copy your project images to public/projects/
```

### 3. Customize Content

#### Update Personal Information

**File**: `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: 'Your Name — Your Title',
  description: 'Your description',
  // ... update other fields
}
```

**File**: `src/app/(components)/ContactStrip.tsx`

```typescript
// Update email, LinkedIn, GitHub links
```

#### Add Your Projects

**File**: `src/data/projects.ts`

Replace the example projects with your own:

```typescript
export const projects: WorkProject[] = [
  {
    id: '1',
    slug: 'your-project-slug',
    title: 'Your Project Title',
    subtitle: 'Brief description',
    category: 'Category',
    thumbnail: '/projects/your-image.jpg',
    year: '2024',
    tags: ['React', 'TypeScript'],
    challenge: 'The problem you solved...',
    approach: 'How you solved it...',
    outcome: 'The results achieved...',
    link: 'https://your-project.com', // optional
  },
  // ... more projects
]
```

#### Update Technologies

**File**: `src/app/(components)/TechGrid.tsx`

Modify the `technologies` array with your tech stack.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Customization

### Theme Colors

**File**: `tailwind.config.ts`

```typescript
colors: {
  primary: {
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    // ...
  },
  accent: {
    400: '#c084fc',
    500: '#a855f7',
    // ...
  }
}
```

### Animation Settings

**File**: `src/lib/gsap.ts`

Adjust scroll trigger settings, animation durations, etc.

**File**: `src/hooks/useLightPointer.ts`

Change `smoothFactor` for cursor follow speed (default: 0.15)

### Reduce Motion Default

To make reduced motion the default:

**File**: `src/hooks/useMotionSettings.ts`

```typescript
const [reduceMotion, setReduceMotion] = useState(true) // Change to true
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Deploy (zero configuration needed)

### Manual Deployment

```bash
npm run build
```

Upload the `.next` folder and `public` directory to your hosting provider.

## Environment Variables

Create `.env.local` for optional features:

```bash
# Contact form API (optional)
NEXT_PUBLIC_CONTACT_API_ENDPOINT=https://your-api.com/contact

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Performance Optimization

### Image Optimization

Use Next.js Image component for all images:

```typescript
import Image from 'next/image'

<Image
  src="/projects/thumbnail.jpg"
  alt="Project name"
  width={800}
  height={600}
  priority // for above-fold images
/>
```

### Font Optimization

Fonts are already optimized via `next/font/google`.

### Bundle Analysis

```bash
npm install -g @next/bundle-analyzer
ANALYZE=true npm run build
```

## Troubleshooting

### WebGL Not Working

The HeroCanvas component automatically falls back to CSS. If you want to debug:

1. Check browser console for errors
2. Ensure `/public/fonts/inter_bold.json` exists
3. Try disabling browser extensions
4. Use Chrome/Firefox DevTools → Performance tab

### GSAP ScrollTrigger Issues

If scroll animations aren't working:

1. Verify GSAP and ScrollTrigger versions match
2. Clear `.next` folder and rebuild
3. Check browser console for errors

### Slow Performance

1. Enable reduced motion toggle
2. Check Network tab for large assets
3. Run Lighthouse audit
4. Consider removing WebGL on mobile

## Browser Support

- Chrome 90+ ✅
- Firefox 88+ ✅
- Safari 14+ ✅
- Edge 90+ ✅

Mobile browsers fully supported with touch-optimized interactions.

## Next Steps

1. ✅ Install dependencies
2. ✅ Add resume and fonts
3. ✅ Update personal info
4. ✅ Add your projects
5. ✅ Customize theme
6. ✅ Test locally
7. ✅ Deploy to Vercel

## Support

For issues or questions:

- Check [Next.js Docs](https://nextjs.org/docs)
- Review component comments in code
- Test with reduced motion enabled

---

Happy building! 🚀
