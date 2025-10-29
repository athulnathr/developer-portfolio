# Quick Start Guide - Interactive Robot Portfolio

## 🚀 Getting Started

Your interactive robot portfolio has been implemented! Here's how to get it running.

### 1. Install Dependencies (if not already done)

```bash
npm install
```

### 2. Add Robot 3D Model (Optional)

Place your robot GLB model at:

```
/public/models/robot.glb
```

**Don't have a model?** No problem! The portfolio includes a beautiful geometric fallback robot made of primitives that will render automatically.

**Model Requirements** (if using custom GLB):

- Format: GLB/GLTF
- Recommended naming for bones/parts:
  - `head` - for head tracking
  - `leftarm` or `arm_l` - for left arm animations
  - `rightarm` or `arm_r` - for right arm animations
  - `body` or `torso` - for body animations
- Materials should support emissive properties for glow effects

### 3. Add Avatar Image (Optional)

For the face reveal effect in the Contact section, add your photo:

```
/public/images/avatar.jpg
```

**Without an image?** A gradient placeholder will generate automatically.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎮 What to Expect

### Hero Section

- Robot sits initially
- Stands up after 0.5s
- Walks in with arm swings (2-4s)
- Waves hello at you (4-5.5s)
- Settles into breathing idle animation
- Parallax background layers
- Animated tech grid in 3D
  -Eyes follow your cursor

### About Section

- Robot scurries to the left side
- Displays holographic "About Me" sign
- Gentle bouncing animation
- Head follows cursor movements

### Skills Section

- Robot transforms through 4 stages as you scroll
- Tech badges orbit the robot
- Glow intensity increases
- Emissive colors change per stage
- Excited bouncing during "skill absorption"
- Particles burst around robot

### Projects Section

- Robot appears larger and more confident
- Gives thumbs up when you hover over projects
- Proud rotation animation

### Contact Section

- **Interactive Face Reveal**: Move your cursor over the robot's face
- A shader-based effect reveals your human face underneath
- Trail effect follows your cursor
- Auto-resets after 2 seconds
- Welcoming idle animations

### Footer Section

- Robot powers down gently
- Dimming lights
- Lowered farewell pose

## 🎨 Customization

### Change Animation Timings

Edit `/constants/robotAnimations.ts`:

```typescript
export const ANIMATION_TIMINGS = {
  STAND_UP_DURATION: 2, // Time for robot to stand
  WAVE_DURATION: 1.5, // Length of wave gesture
  // ... etc
};
```

### Adjust Robot Positions Per Section

Edit `/constants/animations.ts`:

```typescript
export const roboPositions = {
  hero: { x: 0, y: 0, z: 0, scale: 1 },
  about: { x: -3, y: 0, z: 0, scale: 1 }, // Move left/right/forward
  skills: { x: 0, y: 0, z: 1, scale: 1 },
  // ... etc
};
```

### Change Tech Badge Colors

Edit `/constants/robotAnimations.ts`:

```typescript
export const TECH_COLORS: Record<string, string> = {
  React: "#61dafb", // Change to your preference
  "Next.js": "#000000",
  TypeScript: "#3178c6",
  // ...
};
```

### Modify Transformation Stages

Edit `/constants/robotAnimations.ts`:

```typescript
export const TRANSFORMATION_STAGES = {
  base: { scale: 1, emissiveIntensity: 0, badges: 0 },
  learning: {
    scale: 1.1, // Adjust size growth
    emissiveIntensity: 0.3, // Adjust glow
    badges: 4, // Number of tech badges
    glowColor: new THREE.Color(0x00d9ff), // Change color
  },
  // ... etc
};
```

## 🔧 Troubleshooting

### Robot Doesn't Appear

1. Check browser console for errors
2. Verify WebGL is supported (check chrome://gpu)
3. Try disabling browser extensions
4. The geometric fallback should render if model fails

### Performance Issues

1. The app auto-detects device capability
2. Particles reduce on mobile automatically
3. To force lower quality, check `/hooks/usePerformanceMode.ts`

### Face Reveal Not Working

1. Works best on desktop with mouse
2. Requires cursor to move over robot's face area in Contact section
3. Touch events not yet implemented (mobile limitation)

### Build Errors

```bash
# Clear cache and rebuild
rm -rf .next
npm run build
```

## 📱 Mobile Support

- All animations work on mobile
- Performance mode automatically reduces effects
- Face reveal requires mouse (touch support could be added)
- Simplified particle counts
- Responsive layouts maintained

## 🎯 Performance Tips

- The robot model should be < 1MB for best performance
- Use Draco compression for GLB files
- Images should be optimized (WebP recommended)
- Test on actual mobile devices, not just DevTools

## 🌐 Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- Mobile browsers: ✅ Supported (with reduced effects)

## 🛠️ Tech Stack Used

- **Next.js 15** - Framework
- **React 19** - UI library
- **Three.js** - 3D rendering
- **React Three Fiber** - React renderer for Three.js
- **Framer Motion** - 2D animations
- **GSAP** - Advanced animations
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety

## 📚 Learn More

- See `IMPLEMENTATION_SUMMARY.md` for full feature list
- Check `DEVELOPMENT.md` for architecture details
- View inline comments in code for specific implementations

## 🎉 You're Ready!

Your interactive robot portfolio is now live! The robot will guide users through your story with delightful animations and interactions.

Enjoy showcasing your work in this unique, memorable way! 🤖✨
