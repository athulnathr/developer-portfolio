# Robo Portfolio - Usage Guide

## Quick Start

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

Visit `http://localhost:3000` to see your portfolio.

## Customization Guide

### 1. Personal Information

Edit `/constants/content.ts` to update all your personal information:

```typescript
export const content = {
  hero: {
    greeting: "Hi!",
    title: "Your Title Here",
    subtitle: "Your Subtitle",
    // ...
  },
  // ... other sections
};
```

### 2. Robot Model

The robot model is located at `/public/models/robot.glb`. To replace it:

1. Export your 3D model as GLB format from Blender, Spline, or other 3D software
2. Optimize the model:
   - Keep polygons under 50k triangles
   - Use compressed textures (1024x1024 or smaller)
   - Consider using Draco compression
3. Replace `/public/models/robot.glb` with your model
4. If your model has different bone/object names, update `RoboModel.tsx`:

```typescript
// In RoboModel.tsx, find this section:
clonedScene.traverse((child) => {
  if (child.name.toLowerCase().includes("head")) {
    headRef.current = child;
  }
});
```

### 3. Project Images

Add your project images to `/public/images/`:

- `project1.jpg`
- `project2.jpg`
- `project3.jpg`
- etc.

Then update the image paths in `/constants/content.ts`:

```typescript
projects: [
  {
    id: 1,
    image: "/images/your-project-image.jpg",
    // ...
  },
];
```

### 4. Color Scheme

Edit `/tailwind.config.ts` to customize colors:

```typescript
colors: {
  primary: {
    DEFAULT: "#00d9ff",  // Your primary color
    dark: "#0099cc",
    light: "#66e7ff",
  },
  // ...
}
```

### 5. Animations

Edit `/constants/animations.ts` to customize:

- Animation durations
- Easing functions
- Particle counts
- Robot positions per section

```typescript
export const roboPositions = {
  hero: { x: 0, y: 0, z: 0, scale: 1 },
  about: { x: -3, y: 0, z: 0, scale: 1 },
  // Adjust positions as needed
};
```

### 6. Contact Form

To enable the contact form with EmailJS:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create a service and template
3. Add credentials to `.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Update `/components/sections/Contact.tsx` to use EmailJS:

```typescript
import emailjs from "@emailjs/browser";

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setStatus("sending");

  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      formData,
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );
    setStatus("success");
  } catch (error) {
    setStatus("error");
  }
};
```

### 7. Social Links

Update `/constants/content.ts` footer section:

```typescript
footer: {
  social: [
    { name: "GitHub", url: "https://github.com/yourusername", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com/in/yourusername", icon: "linkedin" },
    // Add more social links
  ],
}
```

## Advanced Customization

### Adding New Sections

1. Create a new component in `/components/sections/`
2. Add the section to `/app/page.tsx`
3. Update `/hooks/useScrollProgress.ts` to include the new section:

```typescript
export type SectionName =
  | "hero"
  | "about"
  | "skills"
  | "projects"
  | "contact"
  | "footer"
  | "newsection";
```

4. Add robot position for the new section in `/constants/animations.ts`

### Customizing Robot Behavior

Edit `/components/Robo/RoboModel.tsx` to add custom animations:

```typescript
switch (currentSection) {
  case "your-section":
    // Add custom robot animation
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.5;
    break;
}
```

### Adding Smooth Scrolling

The project includes Lenis for smooth scrolling. To enable it:

1. Create `/lib/lenis.ts`:

```typescript
import Lenis from "@studio-freight/lenis";

export const initSmoothScrolling = () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  return lenis;
};
```

2. Use it in `/app/page.tsx`:

```typescript
useEffect(() => {
  const lenis = initSmoothScrolling();
  return () => lenis.destroy();
}, []);
```

### Performance Optimization Tips

1. **Optimize 3D Model**:

   - Use Draco compression
   - Reduce texture sizes
   - Lower polygon count

2. **Image Optimization**:

   - Use WebP format
   - Compress images
   - Use Next.js Image component

3. **Code Splitting**:

   - Already implemented for Three.js
   - Add for other heavy libraries if needed

4. **Reduce Motion**:
   - Already handled with `prefers-reduced-motion`
   - Test with system settings

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Add environment variables
4. Deploy

### Self-Hosted

```bash
npm run build
npm start
```

Use PM2 or similar for process management.

## Troubleshooting

### Robot Not Appearing

- Check browser console for errors
- Ensure `/public/models/robot.glb` exists
- Check WebGL support in browser

### Build Errors

- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder: `rm -rf .next`
- Check Node.js version (18+ required)

### Performance Issues

- Reduce particle count in animations
- Lower robot model polygon count
- Disable shadows in Three.js
- Test on target devices

### TypeScript Errors

- Run `npm run build` to see all errors
- Update types: `npm install --save-dev @types/node @types/react @types/three`

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

WebGL 2.0 required for Three.js features.

## Need Help?

- Check the main README.md
- Review component comments
- Open an issue on GitHub
- Review Next.js, Three.js, and Framer Motion documentation





