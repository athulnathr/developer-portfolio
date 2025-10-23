# athulnath.dev — Interactive Portfolio

> Lead UI Engineer & Senior Frontend Developer

An immersive, interactive portfolio showcasing UI engineering mastery with light-reactive identity, 3D interactions, and smooth scroll animations.

## 🚀 Features

- **Interactive 3D Hero**: WebGL-powered 'I' logo with cursor-reactive lighting (React Three Fiber)
- **Smooth Scroll**: Lenis-powered inertia scrolling with GSAP ScrollTrigger integration
- **Pinned Narratives**: Scroll-based story sequences with fade transitions
- **Light Pointer**: Cursor-following spotlight effect across the entire experience
- **Tech Stack Grid**: Filterable technology showcase with category chips
- **Case Studies**: Project cards with detailed challenge-approach-outcome pages
- **Accessibility First**: Reduced motion toggle, keyboard navigation, WCAG AA compliance
- **Performance Optimized**: <2.5s LCP, 45+ FPS, progressive enhancement

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: React Three Fiber, Three.js
- **Animation**: Framer Motion, GSAP ScrollTrigger
- **Smooth Scroll**: Lenis
- **Deployment**: Vercel

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 🎨 Project Structure

```
src/
├── app/
│   ├── (components)/          # Reusable UI components
│   │   ├── HeroCanvas.tsx     # 3D 'I' with lighting
│   │   ├── LightPointer.tsx   # Cursor spotlight
│   │   ├── PinnedScroller.tsx # Scroll-pinned narrative
│   │   ├── TechGrid.tsx       # Technology stack
│   │   ├── CaseCard.tsx       # Project cards
│   │   ├── ContactStrip.tsx   # Contact form
│   │   └── ...
│   ├── works/[slug]/          # Dynamic work pages
│   ├── layout.tsx
│   ├── page.tsx               # Main portfolio page
│   └── globals.css
├── data/
│   └── projects.ts            # Portfolio projects data
├── hooks/
│   ├── useLightPointer.ts     # Cursor tracking hook
│   └── useMotionSettings.ts   # Accessibility preferences
├── lib/
│   ├── gsap.ts                # GSAP utilities
│   └── utils.ts               # Helper functions
└── types/
    └── global.d.ts            # TypeScript definitions
```

## 🎯 Key Components

### HeroCanvas
- WebGL 3D 'I' logo with cursor-reactive point light
- Hover glow effects with emissive materials
- Automatic fallback to CSS-based version for low-performance devices

### PinnedScroller
- GSAP ScrollTrigger pinning for narrative sequences
- Smooth fade transitions between text lines
- Respects reduced motion preferences

### LightPointer
- Smooth cursor-following spotlight using RAF and lerp
- Disabled automatically when reduced motion is enabled

### TechGrid
- Category filtering (Frontend, 3D, Streaming, Tooling)
- Hover effects with light-reactive cards
- Animated layout transitions with Framer Motion

## ♿ Accessibility

- **Reduced Motion Toggle**: Disable heavy animations
- **Keyboard Navigation**: Full keyboard support for all interactions
- **WCAG AA Compliance**: Color contrast and semantic HTML
- **Screen Reader Friendly**: Proper ARIA labels and semantic structure
- **Focus Indicators**: Clear focus states for all interactive elements

## 🎨 Customization

### Update Projects

Edit `src/data/projects.ts` to add your own projects:

```typescript
{
  id: '1',
  slug: 'your-project-slug',
  title: 'Your Project Title',
  subtitle: 'Brief description',
  category: 'Project Category',
  year: '2024',
  tags: ['React', 'TypeScript'],
  challenge: 'The problem...',
  approach: 'The solution...',
  outcome: 'The results...',
}
```

### Update Technologies

Modify the `technologies` array in `src/app/(components)/TechGrid.tsx`.

### Change Theme Colors

Edit `tailwind.config.ts` to customize the color palette:

```typescript
colors: {
  primary: { /* your colors */ },
  accent: { /* your colors */ },
}
```

## 📝 Environment Setup

### Required Files

1. **3D Font File**: Place `inter_bold.json` in `/public/fonts/` for Text3D component
   - Generate using [facetype.js](https://gero3.github.io/facetype.js/)
   
2. **Resume PDF**: Place your resume at `/public/resume-athul-nath.pdf`

3. **Project Images**: Add project thumbnails to `/public/projects/`

### Optional: Contact Form Integration

Replace the mock form submission in `ContactStrip.tsx` with your API endpoint:

```typescript
const response = await fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData),
})
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repository to Vercel for automatic deployments.

### Environment Variables

No environment variables required for basic deployment. Add your own as needed for:
- Contact form API
- Analytics
- CMS integration

## 📊 Performance Targets

- **LCP**: < 2.5s
- **FPS**: ≥ 45fps during scroll
- **First Load JS**: < 200KB
- **Lighthouse Score**: 90+

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🙏 Credits

Built with ❤️ using:
- [Next.js](https://nextjs.org)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [GSAP](https://greensock.com/gsap)
- [Framer Motion](https://www.framer.com/motion)
- [Lenis](https://github.com/studio-freight/lenis)

---

**Athul Nath** — Lead UI Engineer & Senior Frontend Developer

