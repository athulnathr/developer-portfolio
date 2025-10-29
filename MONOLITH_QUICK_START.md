# Interactive Monolith Hero - Quick Start

## 🚀 Getting Started

The Interactive Monolith Hero is now added to your portfolio as a third hero option. It appears after HeroImmersive and HeroMinimalist on your homepage.

## ✨ What You Get

- **Loading Screen**: Branded 2-second loading animation
- **Interactive Monolith**: Click 3 times to crack and shatter
- **Dynamic Lighting**: Mouse-controlled lighting with real-time shadows
- **Physics**: Fragments fall and bounce realistically
- **Scroll Trigger**: Scroll to reassemble the monolith
- **Text Reveal**: Narrative text animations
- **Full Accessibility**: Keyboard, touch, and screen reader support

## 🎮 User Experience Flow

1. **Load** → Beautiful loading animation (2s)
2. **Click 3x** → Crack the monolith progressively
3. **Shatter** → Physics-based fragmentation
4. **Scroll** → Trigger reassembly animation
5. **Text** → "Create experiences. Do storytell. I am Athul Nath."
6. **Unlock** → Scroll enabled, continue to portfolio

## 🎨 Quick Customizations

### Change Your Name and Texts

Edit `/app/components/hero-monolith/TextSequence.tsx`:

```typescript
const texts = [
  { text: "Create experiences.", delay: 0 },
  { text: "Do storytell.", delay: 1.5 },
  { text: "I am Athul Nath.", delay: 3, isMain: true }, // ← Change this
];
```

### Adjust Colors

**Monolith Color:**
`/app/lib/shaders/monolithMaterial.ts`

```typescript
uBaseColor: { value: new THREE.Color(0x2a2a3e) }, // Dark blue-gray
uGlowColor: { value: new THREE.Color(0x6366f1) }, // Indigo glow
```

**Floor Color:**
`/app/lib/shaders/techFloorShader.ts`

```typescript
uColor1: { value: new THREE.Color(0x1a1a2e) }, // Dark
uColor2: { value: new THREE.Color(0x6366f1) }, // Indigo lines
```

### Make It Easier/Harder

**Fewer Cracks:**
`/app/components/sections/HeroMonolith.tsx`

```typescript
const handleCrackProgression = useCallback(() => {
  setCrackStage((prev) => {
    const newStage = Math.min(prev + 1, 1); // ← Change to 1 for 2 total clicks
    shake({ intensity: 5 + newStage * 3, duration: 300 });
    return newStage;
  });
}, [shake]);
```

**Skip Loading Screen:**
`/app/components/sections/HeroMonolith.tsx`

```typescript
const [phase, setPhase] = useState<Phase>("interactive"); // ← Start at interactive
```

### Disable on Mobile

If you want to show a simpler version on mobile:

`/app/components/sections/HeroMonolith.tsx`

```typescript
import { isMobileDevice } from "@/app/lib/utils/deviceDetection";

export default function HeroMonolith() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  if (isMobile) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <h1 className="text-6xl font-bold">I am Athul Nath</h1>
      </div>
    );
  }

  // ... rest of component
}
```

## 📱 Controls

### Desktop

- **Mouse**: Move for lighting
- **Click**: Progress crack stages
- **Scroll**: Trigger reassembly
- **Enter/Space**: Progress crack stages (keyboard)

### Mobile

- **Touch Move**: Control lighting
- **Tap**: Progress crack stages
- **Swipe**: Trigger reassembly
- **Gyroscope**: Auto-lighting (if enabled)

## 🔧 Performance Tuning

### If Running Slow

1. **Reduce Particles:**
   `/app/lib/utils/deviceDetection.ts`

   ```typescript
   export function getOptimalParticleCount(): number {
     return 30; // ← Lower number
   }
   ```

2. **Disable Shadows:**
   `/app/components/hero-monolith/MonolithScene.tsx`

   ```typescript
   <Canvas shadows={false}> // ← Set to false
   ```

3. **Lower Resolution:**
   `/app/components/hero-monolith/MonolithScene.tsx`
   ```typescript
   dpr={[1, 1]} // ← Lower DPR
   ```

## 🎭 Hide/Show Other Heroes

If you want to use ONLY the Monolith hero:

`/app/page.tsx`

```typescript
export default function Home() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* Comment out other heroes */}
      {/* <HeroImmersive /> */}
      {/* <HeroMinimalist /> */}

      {/* Only Monolith */}
      <HeroMonolith />

      <About />
      <Skills />
      {/* ... rest */}
    </main>
  );
}
```

## 🐛 Troubleshooting

### Black Screen

- Check browser console for errors
- Ensure WebGL is supported: Visit `https://get.webgl.org/`
- Try disabling browser extensions

### Performance Issues

- Reduce particle count (see Performance Tuning above)
- Close other tabs/applications
- Update graphics drivers

### Scroll Not Unlocking

- Check console for errors
- Ensure all text animations complete
- Try clicking anywhere after final text appears

### Gyroscope Not Working (iOS)

- iOS 13+ requires permission
- Add a button to request permission:
  ```typescript
  DeviceOrientationEvent.requestPermission();
  ```

## 📊 What's Included

### Files Created (24 new files):

**Components (10 files):**

- HeroMonolith.tsx (Main orchestrator)
- LoadingAnimation.tsx
- MonolithScene.tsx
- Monolith.tsx
- MonolithFragments.tsx
- TechFloor.tsx
- MouseLight.tsx
- ParticleSystem.tsx
- TextSequence.tsx
- InteractionHint.tsx
- MonolithCursor.tsx

**Shaders (2 files):**

- techFloorShader.ts
- monolithMaterial.ts

**Logic (3 files):**

- geometry.ts
- fracture.ts
- physics.ts

**Utilities (2 files):**

- useScreenShake.ts
- deviceDetection.ts

**Docs (2 files):**

- MONOLITH_HERO_GUIDE.md (Full documentation)
- MONOLITH_QUICK_START.md (This file)

## 🎨 Design Philosophy

The monolith represents **"I"** (Identity):

- **Abstract initially**: Mysterious, intriguing
- **Interactive**: User shapes the experience
- **Fragile**: Can be broken, but reforms
- **Resilient**: Reassembles, stronger
- **Personal**: Resolves to reveal identity

## 📈 Next Steps

1. **Test on your device**: `npm run dev` → `localhost:3000`
2. **Customize texts**: Add your name and taglines
3. **Adjust colors**: Match your brand
4. **Test on mobile**: Check touch and gyroscope
5. **Deploy**: Vercel, Netlify, or your host

## 💡 Pro Tips

- **Screen shake adds impact**: Don't disable it unless needed
- **Loading screen sets tone**: Keep it short (2s)
- **Text timing matters**: Adjust delays for dramatic effect
- **Particle count**: 50-100 is sweet spot
- **Cursor enhancement**: Works best on desktop
- **Mobile gyroscope**: Cool but optional (needs permission)

## 🆘 Need More Help?

- **Full docs**: `MONOLITH_HERO_GUIDE.md`
- **Code comments**: Check component files
- **Console logs**: Enable for debugging
- **Browser DevTools**: Inspect Three.js scene

---

**Ready to create something amazing!** 🚀

Start with: `npm run dev`
