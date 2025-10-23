# athulnath.dev — Interactive Portfolio

> Lead UI Engineer & Senior Frontend Developer

An immersive, interactive portfolio showcasing UI engineering mastery with light-reactive identity, 3D interactions, and smooth scroll animations.

## 🚀 Features

- **Unified Pinned Hero**: Integrated 3D 'I' logo with narrative text sequence in a single pinned scroll experience
- **Isolated Hero Animations**: Other sections remain completely hidden and below viewport during hero, preventing premature scrolling
- **Smart Animation Choreography**: 'I' moves to 25% left in first moments, then locks while narrative texts cycle through
- **Controlled Content Reveal**: Portfolio sections only enter viewport after hero completes, ensuring smooth transition
- **WebGL 3D Graphics**: Cursor-reactive lighting on 3D 'I' logo (React Three Fiber)
- **Smooth Scroll**: Native smooth scrolling with GSAP ScrollTrigger integration
- **Progressive Content Reveal**: Story sequences complete before revealing portfolio sections
- **Light Pointer**: Cursor-following spotlight effect across the entire experience
- **Tech Stack Grid**: Filterable technology showcase with category chips
- **Case Studies**: Project cards with detailed challenge-approach-outcome pages
- **Accessibility First**: Reduced motion toggle, keyboard navigation, WCAG AA compliance
- **Performance Optimized**: <2.5s LCP, 48+ FPS, progressive enhancement

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: React Three Fiber, Three.js
- **Animation**: Framer Motion, GSAP ScrollTrigger
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
│   │   ├── HeroCanvas.tsx     # Unified hero: 3D 'I' + narrative texts
│   │   ├── LightPointer.tsx   # Cursor spotlight
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

### HeroCanvas (Unified Hero Section)

- **Pinned Scroll Experience**: Entire hero section stays fixed while content animates
- **Isolated Storytelling**: Other page sections hidden during hero animation for focused experience
- **3D 'I' Logo**: WebGL-powered with cursor-reactive point light and hover glow effects
- **Two-Phase Animation**:
  - **Phase 1 (0-10% scroll)**: 'I' moves from center to 25% left position
  - **Phase 2 (10-100% scroll)**: 'I' locked in place, narrative texts cycle through
- **Progressive Text Reveal**: Each text fades in while the previous one fades out (starts at 15% scroll)
- **Protected Scroll Flow**: Sections physically pushed below viewport (`translateY(100vh)`) during hero
- **Instant Section Reveal**: Sections slide into normal position at 100% hero progress
- **48FPS Optimized**: GSAP ScrollTrigger with optimized scrub values and opacity transitions
- **Seamless Transition**: Unpins after final text ("I'm Athul Nath") to reveal full portfolio
- **Accessibility**: Automatic fallback to CSS version for reduced motion preferences
- **Responsive Layout**: Split-screen design with 'I' on left, texts on right

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
- **FPS**: ≥ 48fps during scroll and animations
- **Scroll Performance**: RequestAnimationFrame optimization for smooth 48FPS
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

---

**Athul Nath** — Lead UI Engineer & Senior Frontend Developer
