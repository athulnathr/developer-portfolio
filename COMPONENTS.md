# Component Documentation

Detailed documentation for all custom components in the portfolio.

---

## Core Interactive Components

### HeroCanvas (Unified Hero Section)

**Path**: `src/app/(components)/HeroCanvas.tsx`

**Purpose**: Unified hero section combining 3D 'I' logo with narrative text sequences in a pinned scroll experience.

**Props**:

- `lines: string[]` - Array of narrative text lines to animate

**Features**:

- **Pinned Scroll**: Entire section stays fixed while content animates
- **Isolated Experience**: Other page sections hidden during hero animation
- **3D 'I' Logo**: WebGL-based with cursor-reactive point light
- **Two-Phase Choreography**:
  - **Early Movement (0-10%)**: 'I' moves from center to 25% left, then locks
  - **Static Position (10-100%)**: 'I' stays at 25% left while texts animate
- **Progressive Text Reveal**: Sequential fade in/out of narrative lines (starts at 15%)
- **Smart Content Reveal**: Portfolio sections fade in during final 10% of animation
- **48FPS Optimized**: GSAP ScrollTrigger with optimized scrub values and transitions
- **Split Layout**: 'I' on left half, texts on right half
- **Seamless Transition**: Unpins after final text to allow normal scroll
- **Accessibility**: Fallback to static layout with reduced motion

**Dependencies**:

- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Helper components (Text3D, Center, Environment)
- `three` - 3D library
- `gsap` - Animation library with ScrollTrigger

**Implementation**:

```typescript
<HeroCanvas lines={['Create experiences', 'Tell stories', "I'm Athul Nath"]} />
```

**Animation Timeline**:

1. **0% Scroll**: Hero section pins, other sections hidden and below viewport, 'I' centered
2. **0-10% Scroll**: 'I' moves smoothly from center to 25% left position
3. **10% Scroll**: 'I' locks at 25% left (stays there for remainder)
4. **15% Scroll**: First text "Create experiences" fades in
5. **15-40% Scroll**: First text holds, then fades out
6. **40-65% Scroll**: Second text "Tell stories" fades in, holds, fades out
7. **65-100% Scroll**: Final text "I'm Athul Nath" fades in and stays visible
8. **100% Scroll**: Hero unpins, sections instantly become visible and enter viewport
9. **Post-100%**: Normal scrolling through portfolio sections

**Performance**:

- Uses ScrollTrigger `onUpdate` callback for 'I' position and section visibility
- 'I' position calculated as: `Math.min(progress / 0.1, 1) * -2.5` (moves only in first 10%)
- RAF-based smooth interpolation in Three.js for locked position stability
- Optimized scrub value (0.5) for responsive feel
- Opacity transitions with `pointer-events` management for sections
- Dynamic text timing: evenly distributed across 85% of timeline (15% to 100%)
- Total duration: `lines.length × 100%` scroll distance

**Section Visibility Control**:

The component controls the visibility of `#content-sections` element:

- `progress < 1.0`: Sections completely hidden and pushed down
  - `opacity: 0` - Invisible
  - `visibility: hidden` - Not rendered
  - `pointer-events: none` - No interaction
  - `transform: translateY(100vh)` - Pushed one viewport below
- `progress = 1.0`: Sections instantly revealed and positioned normally
  - `transform: translateY(0)` - Slides into place
- **Physical Positioning**: Transform keeps sections physically below viewport during hero
- **No Premature Scrolling**: Sections cannot scroll into view during hero animation
- On scroll back: Sections hide and push down again when entering hero zone

---

### LightPointer

**Path**: `src/app/(components)/LightPointer.tsx`

**Purpose**: Creates a cursor-following spotlight effect across the page.

**Features**:

- Smooth cursor tracking using lerp interpolation
- Fixed position overlay (z-index: 50)
- Mix-blend-mode for lighting effect
- Auto-disabled with reduced motion

**Props**: None

**Customization**:

```typescript
// Adjust smoothing factor in useLightPointer hook
const position = useLightPointer(0.12) // Lower = slower, smoother
```

**Performance**:

- Uses `requestAnimationFrame` for 60fps updates
- Cleanup on unmount prevents memory leaks

---

### CopyBeats

**Path**: `src/app/(components)/CopyBeats.tsx`

**Purpose**: Animates text with word-by-word stagger effect.

**Props**:

- `text: string` - Text to animate
- `delay?: number` - Delay before animation starts (default: 0)

**Features**:

- Splits text into words
- Framer Motion stagger animation
- Respects reduced motion (instant display)

**Usage**:

```tsx
<CopyBeats text="Your animated text here" delay={0.5} />
```

---

## Content Section Components

### TechGrid

**Path**: `src/app/(components)/TechGrid.tsx`

**Purpose**: Displays filterable technology stack.

**Features**:

- Category filtering (All, Frontend, 3D, Streaming, Tooling)
- Animated layout transitions
- Hover effects with gradient overlay
- Card shine effect on hover

**Data Structure**:

```typescript
const technologies: TechItem[] = [
  { name: 'React', category: 'frontend' },
  // ...
]
```

**Customization**:

1. Add/remove technologies in the `technologies` array
2. Add new categories in the `categories` array
3. Adjust grid columns in className: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4`

---

### CaseCard

**Path**: `src/app/(components)/CaseCard.tsx`

**Purpose**: Project card with hover animations.

**Props**:

- `project: WorkProject` - Project data
- `index: number` - Card index for stagger animation

**Features**:

- Scroll-triggered reveal animation
- Hover state with border color change
- Light sheen effect on hover
- Responsive design (stacks on mobile)

**Linked Page**: Routes to `/works/[slug]`

---

### ContactStrip

**Path**: `src/app/(components)/ContactStrip.tsx`

**Purpose**: Contact form with animated inputs.

**Features**:

- Form validation (HTML5 required fields)
- Loading states
- Success/error feedback
- Social links (Email, LinkedIn, GitHub)

**Integration**:
Replace mock submission with real API:

```typescript
const handleSubmit = async (e: FormEvent) => {
  e.preventDefault()
  const response = await fetch('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData),
  })
}
```

---

### ResumeCTA

**Path**: `src/app/(components)/ResumeCTA.tsx`

**Purpose**: Floating resume download button.

**Features**:

- Fixed position (bottom-right)
- Hover scale animation
- Download icon with bounce effect
- Responsive text (hides on mobile)

**Configuration**:
Update download path in `src/lib/utils.ts`:

```typescript
export function downloadResume() {
  const resumeUrl = '/resume-athul-nath.pdf'
  // ...
}
```

---

## Navigation & Accessibility

### Navigation

**Path**: `src/app/(components)/Navigation.tsx`

**Purpose**: Sticky navigation with auto-hide on scroll down.

**Features**:

- Glass morphism background
- Scroll direction detection
- Smooth show/hide animation
- Hash link navigation

**Behavior**:

- Always visible at top (scrollY < 100px)
- Hides when scrolling down
- Shows when scrolling up

---

### MotionToggle

**Path**: `src/app/(components)/MotionToggle.tsx`

**Purpose**: Accessibility control for animations.

**Features**:

- Toggles reduced motion state
- Updates HTML class for CSS targeting
- Visual feedback with icon change
- Persists across page navigation

**Implementation**:

```typescript
// Components check this hook
const { reduceMotion } = useMotionSettings()

if (reduceMotion) {
  // Skip heavy animations
}
```

---

## Custom Hooks

### useLightPointer

**Path**: `src/hooks/useLightPointer.ts`

**Purpose**: Smooth cursor position tracking.

**Returns**: `{ x: number, y: number }`

**Parameters**:

- `smoothFactor?: number` - Lerp interpolation factor (default: 0.15)

**Usage**:

```typescript
const position = useLightPointer(0.12)
// position.x, position.y update 60fps
```

---

### useMotionSettings

**Path**: `src/hooks/useMotionSettings.ts`

**Purpose**: Manages motion preferences.

**Returns**:

```typescript
{
  reduceMotion: boolean
  toggleReduceMotion: () => void
}
```

**Features**:

- Reads system `prefers-reduced-motion`
- Allows manual override
- Applies `.reduce-motion` class to `<html>`

---

## Utility Functions

### GSAP Utilities

**Path**: `src/lib/gsap.ts`

**Functions**:

#### `initSmoothScroll(lenisInstance)`

Syncs Lenis with GSAP ScrollTrigger.

#### `createPinnedSequence(container, lines, reduceMotion)`

Creates scroll-pinned timeline for narrative lines.

#### `parallaxElement(element, speed, start, end)`

Applies parallax effect to element.

#### `fadeInOnScroll(elements, stagger)`

Fade-in animation on scroll into view.

---

### General Utilities

**Path**: `src/lib/utils.ts`

**Functions**:

#### `cn(...inputs)`

Merge Tailwind classes with clsx.

#### `prefersReducedMotion()`

Check system motion preference.

#### `lerp(start, end, factor)`

Linear interpolation for smooth animations.

#### `mapRange(value, inMin, inMax, outMin, outMax)`

Map value from one range to another.

#### `clamp(value, min, max)`

Constrain value between min and max.

#### `downloadResume()`

Trigger resume download.

---

## Data Models

### WorkProject

**Path**: `src/types/global.d.ts`

```typescript
interface WorkProject {
  id: string
  slug: string // URL slug
  title: string // Project name
  subtitle: string // Short description
  category: string // Project type
  thumbnail: string // Image path
  year: string // Year completed
  tags: string[] // Technologies used
  challenge: string // Problem statement
  approach: string // Solution approach
  outcome: string // Results achieved
  link?: string // Live project URL (optional)
}
```

---

## Styling System

### Tailwind Custom Classes

**Path**: `src/app/globals.css`

#### `.glow-text`

Text shadow glow effect.

#### `.glow-box`

Box shadow glow effect.

#### `.spotlight`

Cursor-following light overlay.

#### `.card-shine`

Hover sheen animation.

#### `.skeleton`

Loading placeholder animation.

### CSS Variables

```css
--bg-primary: #0a0a0f --bg-secondary: #121218 --text-primary: #ffffff --text-secondary: #a1a1aa
  --accent-primary: #0ea5e9 --accent-glow: rgba(14, 165, 233, 0.4);
```

---

## Performance Notes

### Code Splitting

- `HeroCanvas` is dynamically imported to avoid SSR issues
- Three.js only loads when needed

### Animation Performance

- All animations use `transform` and `opacity` (GPU-accelerated)
- ScrollTrigger uses `will-change` automatically
- RAF loops cleaned up on unmount

### Image Optimization

Use Next.js Image component:

```tsx
import Image from 'next/image'
;<Image src="/path/to/image.jpg" alt="Description" width={800} height={600} priority={aboveFold} />
```

---

## Troubleshooting

### "Cannot find module '@/...'"

Ensure paths are configured in `tsconfig.json`:

```json
"paths": {
  "@/*": ["./src/*"]
}
```

### GSAP/Lenis Not Working

Check initialization in main `page.tsx`:

```typescript
useEffect(() => {
  const lenis = new Lenis({
    /* config */
  })
  initSmoothScroll(lenis)
  return () => lenis.destroy()
}, [])
```

### WebGL Not Loading

1. Check `/public/fonts/inter_bold.json` exists
2. Check browser console for errors
3. Test fallback by enabling reduced motion

---

## Contributing

When adding new components:

1. Add TypeScript types to `src/types/global.d.ts`
2. Include accessibility features (keyboard, screen reader)
3. Respect `reduceMotion` from `useMotionSettings`
4. Add comprehensive comments
5. Update this documentation

---

For more help, see README.md and SETUP.md.
