# Development Guide

## Project Architecture

### Directory Structure

```
v3-portfolio/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with metadata
│   ├── page.tsx                 # Main page component
│   └── globals.css              # Global styles and Tailwind
│
├── components/
│   ├── Robo/                    # 3D Robot components
│   │   ├── RoboModel.tsx        # Main robot 3D model with animations
│   │   ├── RoboCanvas.tsx       # Three.js canvas wrapper
│   │   ├── ParticleSystem.tsx   # Particle effects
│   │   └── RoboFaceReveal.tsx   # Face reveal animation
│   │
│   ├── sections/                # Page sections
│   │   ├── Hero.tsx            # Landing section
│   │   ├── About.tsx           # About section
│   │   ├── Skills.tsx          # Skills showcase
│   │   ├── Projects.tsx        # Projects grid
│   │   ├── Contact.tsx         # Contact form
│   │   └── Footer.tsx          # Footer section
│   │
│   └── ui/                      # Reusable UI components
│       ├── Button.tsx          # Animated button
│       ├── SpeechBubble.tsx    # Robot speech bubble
│       └── ScrollIndicator.tsx # Scroll down indicator
│
├── hooks/                       # Custom React hooks
│   ├── useScrollProgress.ts    # Track scroll position per section
│   ├── useCursorTracking.ts    # Track mouse position
│   └── useReducedMotion.ts     # Detect motion preference
│
├── lib/                         # Utility libraries
│   ├── utils.ts                # Helper functions
│   └── gsap.ts                 # GSAP animation helpers
│
├── constants/                   # Configuration
│   ├── content.ts              # All text content
│   └── animations.ts           # Animation configurations
│
└── public/
    ├── models/
    │   └── robot.glb           # 3D robot model
    └── images/                 # Project images and assets
```

## Key Technologies

### Next.js 15

- App Router for file-based routing
- Server and Client Components
- Automatic code splitting
- Image optimization

### React Three Fiber

- React renderer for Three.js
- Declarative 3D scene composition
- Automatic memory management
- React hooks for Three.js

### GSAP

- High-performance animations
- ScrollTrigger for scroll-based animations
- Timeline sequencing
- Cross-browser compatibility

### Framer Motion

- React animation library
- Simple declarative syntax
- Layout animations
- Gesture support

### Tailwind CSS

- Utility-first CSS framework
- Custom color scheme
- Responsive design utilities
- Dark theme support

## Component Details

### RoboModel Component

**Purpose**: Manages the 3D robot model and its animations

**Key Features**:

- Loads GLB model from `/public/models/robot.glb`
- Smooth position transitions between sections
- Cursor tracking for head movement
- Section-specific animations
- Breathing idle animation

**Props**:

```typescript
interface RoboModelProps {
  currentSection: SectionName;
  sectionProgress: number;
  cursorPosition: { normalizedX: number; normalizedY: number };
  scale?: number;
}
```

**Animation System**:

- Uses `useFrame` for per-frame updates
- Lerp for smooth interpolation
- Section-based animation states
- Dynamic material properties

### Section Components

Each section follows a similar pattern:

1. **Layout**: Semantic HTML structure
2. **Animations**: Framer Motion for entrance animations
3. **Robo Space**: Reserved area for robot positioning
4. **Content**: Section-specific content
5. **Interactions**: Hover states and click handlers

**Common Pattern**:

```typescript
export const SectionName: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="section-name" ref={ref}>
      {/* Content with animations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
      >
        {/* ... */}
      </motion.div>
    </section>
  );
};
```

### Custom Hooks

#### useScrollProgress

Tracks scroll position and calculates progress for each section.

**Returns**:

```typescript
{
  currentSection: SectionName;
  progress: number; // 0-1 overall progress
  scrollY: number;
  sectionProgress: Record<SectionName, number>; // 0-1 per section
}
```

#### useCursorTracking

Tracks mouse position with normalized coordinates.

**Returns**:

```typescript
{
  x: number; // Pixel position
  y: number;
  normalizedX: number; // -1 to 1
  normalizedY: number; // -1 to 1
}
```

## Animation System

### Robot Position System

Defined in `/constants/animations.ts`:

```typescript
export const roboPositions = {
  hero: { x: 0, y: 0, z: 0, scale: 1 },
  about: { x: -3, y: 0, z: 0, scale: 1 },
  skills: { x: 0, y: 0, z: 1, scale: 1 },
  projects: { x: 2, y: 0.5, z: 0, scale: 1.3 },
  contact: { x: -2, y: 0, z: 0, scale: 1 },
  footer: { x: 0, y: -1, z: 0, scale: 0.8 },
};
```

### Animation Timing

- **Robot transitions**: 2s with easeInOut
- **Section reveals**: 0.8s with easeOut
- **UI animations**: 0.6s with easeOut
- **Particle effects**: 1-2s lifetime

## Performance Optimization

### Three.js Optimizations

1. **Dynamic Import**: Avoid SSR issues

```typescript
const RoboCanvas = dynamic(() => import("@/components/Robo/RoboCanvas"), {
  ssr: false,
});
```

2. **Renderer Settings**:

```typescript
<Canvas
  shadows={false}
  dpr={[1, 2]}
  gl={{
    antialias: true,
    powerPreference: "high-performance",
  }}
/>
```

3. **Conditional Rendering**: Only render when needed
4. **Model Optimization**: Keep polygons low, use compressed textures

### React Optimizations

1. **Code Splitting**: Automatic with Next.js
2. **Lazy Loading**: Use Suspense for heavy components
3. **Memoization**: Use React.memo for expensive components
4. **Image Optimization**: Use Next.js Image component

### Animation Optimizations

1. **Reduced Motion**: Detect and respect user preference
2. **Conditional Animations**: Disable on mobile if needed
3. **GPU Acceleration**: Use transform and opacity
4. **RequestAnimationFrame**: For smooth 60fps animations

## Accessibility

### Keyboard Navigation

- Tab through interactive elements
- Enter/Space for buttons
- Escape to close modals

### Screen Readers

- Semantic HTML structure
- ARIA labels on sections
- Alt text for images
- Skip to content link

### Reduced Motion

- Detect `prefers-reduced-motion`
- Disable Three.js animations
- Simplify UI animations
- Provide static alternative

### Color Contrast

- WCAG AA compliance
- High contrast text
- Focus indicators
- Sufficient color differences

## Testing

### Development Testing

```bash
# Run dev server
npm run dev

# Build and test production
npm run build
npm start
```

### Browser Testing

- Chrome DevTools for debugging
- Firefox Developer Tools
- Safari Web Inspector
- Test on real devices

### Performance Testing

- Lighthouse for performance score
- Chrome DevTools Performance tab
- React DevTools Profiler
- Bundle analyzer for size

## Common Issues

### Three.js Not Rendering

- Check WebGL support
- Verify model path is correct
- Check browser console for errors
- Ensure dynamic import is used

### Performance Issues

- Reduce particle count
- Lower model polygon count
- Disable shadows
- Use lower texture resolution

### Build Errors

- Clear `.next` folder
- Delete `node_modules` and reinstall
- Check Node.js version (18+)
- Verify all dependencies installed

## Best Practices

### Code Organization

- One component per file
- Colocate related files
- Use TypeScript for type safety
- Keep components small and focused

### State Management

- Use local state when possible
- Context for global state
- Avoid prop drilling
- Keep state close to usage

### Styling

- Use Tailwind utility classes
- Extract common patterns to components
- Maintain consistent spacing
- Follow mobile-first approach

### Git Workflow

- Commit often
- Write meaningful commit messages
- Use feature branches
- Review before merge

## Deployment Checklist

- [ ] Update all personal information in `constants/content.ts`
- [ ] Replace robot model if needed
- [ ] Add project images
- [ ] Configure EmailJS for contact form
- [ ] Update social media links
- [ ] Test on multiple browsers
- [ ] Run Lighthouse audit
- [ ] Check mobile responsiveness
- [ ] Verify accessibility
- [ ] Test all animations
- [ ] Add environment variables to hosting platform
- [ ] Set up custom domain (optional)
- [ ] Configure analytics (optional)

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [GSAP Documentation](https://greensock.com/docs/)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Three.js](https://threejs.org/docs/)





