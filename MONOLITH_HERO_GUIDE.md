# Interactive Monolith Hero Section - User Guide

## Overview

The Interactive Monolith Hero is an advanced WebGL-powered section featuring a mysterious monolithic "I" structure with multi-stage interaction, dynamic lighting, physics-based fragmentation, and narrative text animations.

## Features

### 1. Loading Animation

- Branded loading screen with animated progress bar
- Tech-inspired grid animation
- Smooth transition to main scene

### 2. Interactive Monolith

- Abstract "I" structure with tech aesthetic
- Click-based cracking system (3 stages)
- Real-time shadow mapping
- Custom shader materials with glowing fracture lines

### 3. Mouse-Driven Lighting

- Point light follows cursor position
- Dynamic shadows react to light movement
- Chromatic lighting effects
- Mobile: Gyroscope-based lighting (if available)

### 4. Tech Floor

- Procedural shader-based surface
- Animated grid and circuit patterns
- Mouse ripple effects
- Reactive to shadows

### 5. Fragmentation System

- Physics-based fragment motion
- Realistic explosion effects
- Interactive fragments (clickable)
- Gravity and collision simulation

### 6. Scroll-Triggered Reassembly

- Scroll detection initiates reassembly
- Smooth fragment reformation
- Camera transition
- Monolith shifts to left

### 7. Narrative Text Sequence

- "Create experiences." (letter-by-letter)
- "Do storytell." (fade + slide)
- "I am Athul Nath." (dramatic reveal)
- Customizable via TextSequence component

### 8. Enhanced Cursor

- Custom cursor with glow effect
- Crosshair on hover
- Visual feedback for crack stages
- Automatically disabled on touch devices

### 9. Particle System

- Floating ambient particles
- Optimized count for device performance
- Additive blending for glow effect

### 10. Mobile Optimization

- Touch gesture support
- Gyroscope integration (iOS 13+ requires permission)
- Reduced particle count
- Simplified shadows
- Lower pixel ratio for performance

### 11. Accessibility

- Keyboard navigation (Enter/Space to interact, Arrow keys for light)
- Screen reader announcements
- Progress indicators
- Skip interaction option (future)

## User Interaction Flow

1. **Loading** → Page loads with branded animation (2 seconds)
2. **Interactive** → User clicks monolith 3 times to crack it progressively
3. **Shattered** → Monolith breaks into physics-based fragments
4. **Scroll Trigger** → User scrolls to initiate reassembly
5. **Reassembling** → Fragments fly back together
6. **Text Sequence** → Narrative text animates in
7. **Complete** → Scroll unlocked, user can continue to portfolio

## Keyboard Controls

- **Enter / Space**: Progress crack stage or shatter
- **Arrow Keys**: Move light position (future enhancement)
- **Scroll**: Trigger reassembly when in shattered state

## Mobile Interactions

- **Tap**: Progress crack stage or shatter
- **Swipe**: Trigger reassembly
- **Device Tilt**: Control lighting (if gyroscope available)
- **Touch Move**: Move light position

## Customization

### Change Monolith Position

Edit `HeroMonolith.tsx`:

```typescript
const [monolithPosition, setMonolithPosition] = useState<
  [number, number, number]
>([
  0,
  0,
  0, // [x, y, z]
]);
```

### Update Text Sequence

Edit `TextSequence.tsx`:

```typescript
const texts = [
  { text: "Your first line.", delay: 0 },
  { text: "Your second line.", delay: 1.5 },
  { text: "Your main line.", delay: 3, isMain: true },
];
```

### Adjust Crack Stages

Edit `Monolith.tsx` to increase crack stages:

```typescript
if (crackStage < 3) {
  // Change to 4 or more
  // More clicks required
}
```

### Modify Colors

Edit shader files:

- `techFloorShader.ts`: Floor colors and patterns
- `monolithMaterial.ts`: Monolith base color and glow

Or update in components:

```typescript
uBaseColor: { value: new THREE.Color(0x2a2a3e) },
uGlowColor: { value: new THREE.Color(0x6366f1) },
```

### Performance Tuning

Edit `deviceDetection.ts`:

```typescript
export function getOptimalParticleCount(): number {
  if (isMobileDevice()) return 30; // Reduce for mobile
  if (isLowPowerDevice()) return 50;
  return 100; // Desktop
}
```

## File Structure

```
app/
├── components/
│   ├── sections/
│   │   └── HeroMonolith.tsx           # Main orchestrator
│   └── hero-monolith/
│       ├── LoadingAnimation.tsx       # Loading screen
│       ├── MonolithScene.tsx          # Three.js canvas
│       ├── Monolith.tsx               # Core structure
│       ├── MonolithFragments.tsx      # Fragment system
│       ├── TechFloor.tsx              # Shader floor
│       ├── MouseLight.tsx             # Dynamic lighting
│       ├── ParticleSystem.tsx         # Ambient particles
│       ├── TextSequence.tsx           # Text animations
│       ├── InteractionHint.tsx        # UI hints
│       └── MonolithCursor.tsx         # Custom cursor
└── lib/
    ├── shaders/
    │   ├── techFloorShader.ts         # Floor shader
    │   └── monolithMaterial.ts        # Monolith shader
    ├── monolith/
    │   ├── geometry.ts                # Geometry builder
    │   ├── fracture.ts                # Fracture algorithm
    │   └── physics.ts                 # Physics simulation
    ├── hooks/
    │   └── useScreenShake.ts          # Screen shake effect
    └── utils/
        └── deviceDetection.ts         # Performance detection
```

## Performance

### Desktop (High-End)

- Full shadows and antialiasing
- 100 particles
- High pixel ratio (2x)
- 60 FPS target

### Desktop (Low-End)

- Medium shadows
- 50 particles
- Standard pixel ratio
- 48 FPS target

### Mobile

- No shadows
- 30 particles
- 1-1.5x pixel ratio
- 30 FPS target

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Features by Browser

| Feature       | Chrome | Firefox | Safari                         | Edge |
| ------------- | ------ | ------- | ------------------------------ | ---- |
| WebGL 2.0     | ✅     | ✅      | ✅                             | ✅   |
| Shadow Maps   | ✅     | ✅      | ✅                             | ✅   |
| Gyroscope     | ✅     | ✅      | ⚠️ iOS 13+ requires permission | ✅   |
| Custom Cursor | ✅     | ✅      | ✅                             | ✅   |

## Troubleshooting

### Performance Issues

1. **Reduce particle count**: Edit `deviceDetection.ts`
2. **Disable shadows**: Set `shadows={false}` in `MonolithScene.tsx`
3. **Lower pixel ratio**: Set `dpr={[1, 1]}` in Canvas
4. **Simplify shaders**: Reduce loop iterations in shader code

### Gyroscope Not Working on iOS

iOS 13+ requires explicit permission:

```typescript
if (typeof DeviceOrientationEvent.requestPermission === "function") {
  DeviceOrientationEvent.requestPermission().then((response) => {
    if (response === "granted") {
      // Enable gyroscope
    }
  });
}
```

Add a button to request permission from user gesture.

### Scroll Not Unlocking

Check `HeroMonolith.tsx`:

```typescript
// Ensure this runs when text complete
const handleTextComplete = useCallback(() => {
  setPhase("complete");
  setScrollLocked(false); // This must be called
}, []);
```

### Fragments Not Reassembling

Check console for errors in `MonolithFragments.tsx`. Ensure:

- `reassembling` prop is true
- `targetPosition` is set correctly
- `onReassemble` callback is provided

## Future Enhancements

- [ ] Sound effects (crack, shatter, reassemble)
- [ ] Post-processing (bloom, depth of field)
- [ ] Multiple monolith variants
- [ ] Skip interaction button
- [ ] Save interaction progress
- [ ] Analytics integration
- [ ] A/B testing different sequences

## Credits

Built with:

- **Three.js** - 3D rendering
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - UI animations
- **Next.js** - Framework
- **TypeScript** - Type safety

## License

Part of the portfolio project. Customize freely for your needs.

---

**Need help?** Check the component comments or console logs for debugging information.
