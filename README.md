# Senior Frontend Engineer Portfolio

A stunning, performant, and responsive portfolio website built with Next.js 16, featuring two unique hero sections with interactive 3D elements and smooth animations.

## 🎯 Features

### Two Unique Hero Sections

1. **Immersive Canvas Hero** - WebGL/Three.js powered 3D experience with:
   - Interactive 3D sphere that responds to mouse movement
   - Drag-to-rotate capability with OrbitControls
   - Floating particles animation
   - Dynamic lighting effects
2. **Minimalist Bold Hero** - Performance-focused design with:
   - Ultra-large typography with magnetic letter effects
   - Spotlight cursor that reveals hidden details
   - Typewriter animation for subtitle
   - Magnetic CTA buttons with liquid hover effects

### Interactive Sections

- **About** - 3D tilt card effect with parallax floating elements
- **Skills** - Category filters with stagger animations and progress bars
- **Experience** - Animated timeline with expandable cards
- **Projects** - Featured project cards with spotlight hover effects
- **Contact** - Animated form with copy-to-clipboard functionality

### Performance Optimizations

- ✅ Dynamic imports for heavy components (WebGL hero)
- ✅ Smooth scroll with Lenis (60fps)
- ✅ Custom cursor with throttled mouse tracking
- ✅ GPU-accelerated animations using transform/opacity
- ✅ Debounced scroll and mouse events
- ✅ Reduced motion support for accessibility
- ✅ Image optimization with Next.js Image component
- ✅ Code splitting and lazy loading

## 🚀 Tech Stack

### Core

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS 4** - Utility-first styling

### Animation & 3D

- **Framer Motion** (12.x) - Declarative animations and gestures
- **GSAP** (3.x) - Complex timeline animations
- **Three.js** (0.180.x) - WebGL 3D graphics
- **@react-three/fiber** (9.x) - React renderer for Three.js
- **@react-three/drei** (10.x) - Useful helpers for R3F
- **Lenis** (1.x) - Smooth scroll library

### Utilities

- **react-intersection-observer** - Viewport detection for scroll animations

## 📦 Installation

### Prerequisites

- Node.js 18.17 or higher
- npm, yarn, or pnpm

### Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd new-portfolio
```

2. **Install dependencies**

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run the development server**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
/app
  /components
    /sections
      HeroImmersive.tsx    # WebGL/Three.js hero
      HeroMinimalist.tsx   # Minimalist hero with magnetic effects
      About.tsx            # About section with 3D tilt card
      Skills.tsx           # Skills grid with filters
      Experience.tsx       # Timeline with animations
      Projects.tsx         # Project cards with hover effects
      Contact.tsx          # Contact form and social links
    /ui
      SmoothScroll.tsx     # Lenis smooth scroll provider
      CustomCursor.tsx     # Custom cursor component
  /lib
    animations.ts          # Reusable Framer Motion variants
    utils.ts              # Utility functions (debounce, throttle, etc.)
  layout.tsx              # Root layout with providers
  page.tsx                # Main page composition
  globals.css             # Global styles and animations
/public
  /images                 # Optimized images
next.config.ts            # Next.js configuration
tailwind.config.ts        # Tailwind CSS configuration
```

## 🎨 Customization

### Update Personal Information

1. **In `app/components/sections/HeroMinimalist.tsx`**

   - Change `name` variable (line 30)
   - Update `title` and `subtitle` variables

2. **In `app/components/sections/About.tsx`**

   - Update bio text and stats

3. **In `app/components/sections/Skills.tsx`**

   - Modify `skillCategories` array with your skills

4. **In `app/components/sections/Experience.tsx`**

   - Update `experiences` array with your work history

5. **In `app/components/sections/Projects.tsx`**

   - Replace `projects` array with your projects
   - Add project images to `/public/images/`

6. **In `app/components/sections/Contact.tsx`**
   - Update email address
   - Modify social links in `socialLinks` array

### Update Colors & Theme

Edit `/app/globals.css`:

```css
:root {
  --background: #000000;
  --foreground: #ffffff;
  --accent: #6366f1; /* Primary accent color */
  --accent-light: #818cf8; /* Light accent color */
  --muted: #71717a; /* Muted text color */
}
```

## ⚡ Performance Budget

### Targets

- **Initial Load**: < 4 seconds (Target: 2-3s)
- **Animation FPS**: 48-60 FPS
- **Lighthouse Score**: > 90 Performance
- **Bundle Size**: < 300KB initial JS

### Performance Notes

#### ⚠️ Heavy Components

- **Three.js Bundle**: ~100KB - Only loaded dynamically for immersive hero
- **GSAP**: ~50KB - Use sparingly for complex animations only
- **Custom Cursor**: Monitor on lower-end devices, disabled on mobile

#### ✅ Optimizations

- **Lenis Smooth Scroll**: Only ~3KB with significant UX improvement
- **Framer Motion**: Lightweight, tree-shakeable, ideal for most animations
- **Dynamic Imports**: WebGL hero loads separately to reduce initial bundle
- **Image Optimization**: Automatic WebP/AVIF conversion via Next.js

### Testing Performance

```bash
# Build for production
npm run build

# Start production server
npm start

# Run Lighthouse audit in Chrome DevTools
# Target metrics:
# - Performance: > 90
# - Accessibility: > 95
# - Best Practices: > 90
# - SEO: > 90
```

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**

```bash
git add .
git commit -m "Initial portfolio setup"
git push origin main
```

2. **Deploy to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your repository
   - Configure project settings (auto-detected)
   - Deploy!

### Other Platforms

The portfolio can be deployed to any platform that supports Next.js:

- **Netlify**: Use `netlify.toml` configuration
- **AWS Amplify**: Configure build settings
- **Docker**: Use provided Dockerfile (if created)

## 🔧 Development Workflow

### Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

### Adding New Sections

1. Create new component in `/app/components/sections/`
2. Import and add to `/app/page.tsx`
3. Add scroll animations using Framer Motion
4. Test performance impact

### Performance Monitoring

Monitor these metrics during development:

- **Network tab**: Check bundle sizes
- **Performance tab**: Profile animations and interactions
- **Lighthouse**: Run audits regularly
- **React DevTools Profiler**: Identify render bottlenecks

## 🎭 Animation Performance Tips

### Do's ✅

- Use `transform` and `opacity` only (GPU-accelerated)
- Implement `will-change` sparingly
- Debounce/throttle scroll and mouse events
- Use `requestAnimationFrame` for custom animations
- Lazy load heavy components
- Implement viewport-based animation triggers

### Don'ts ❌

- Avoid animating `width`, `height`, `top`, `left`
- Don't use complex box-shadows in animations
- Avoid too many simultaneous animations
- Don't forget `prefers-reduced-motion` support
- Don't load all animations on mobile

## 🐛 Troubleshooting

### Common Issues

**Issue**: Custom cursor not working

- **Solution**: Check if device has pointer support (disabled on touch devices)

**Issue**: Three.js scene not rendering

- **Solution**: Ensure WebGL is supported in browser, check console for errors

**Issue**: Animations stuttering

- **Solution**: Reduce number of animated elements, check FPS in DevTools

**Issue**: Slow initial load

- **Solution**: Verify dynamic imports are working, check bundle size

## 📝 Content Update Guide

### Quick Updates (No Code Required)

To update content without touching code:

1. Edit JSON data files (if implemented)
2. Update images in `/public/images/`
3. Modify text in component files

### Adding Blog Posts (Future)

Consider integrating:

- MDX for markdown content
- Contentful/Sanity for headless CMS
- Static generation with `generateStaticParams`

## 🤝 Contributing

This is a personal portfolio project, but suggestions are welcome!

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by [react.email](https://react.email/) and [tajmirul.site](https://www.tajmirul.site/)
- Built with amazing open-source tools
- Animation techniques from the creative coding community

## 📮 Contact

- **Email**: hello@example.com
- **GitHub**: @yourusername
- **LinkedIn**: linkedin.com/in/yourprofile
- **Twitter**: @yourhandle

---

**Built with ❤️ using Next.js, Tailwind CSS, and Three.js**

**Last Updated**: October 2025
