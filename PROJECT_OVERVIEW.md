# Project Overview: React Three Fiber + Next.js Boilerplate

## Project Summary

This is a **Next.js 14 boilerplate** that seamlessly integrates **React Three Fiber (R3F)** for 3D graphics. The key innovation is that it allows 3D components to be used anywhere in the DOM without creating a new canvas on every page navigation. The canvas persists across route changes, and multiple viewports can exist on a single page using viewport segmentation.

## Core Architecture

### The Tunnel-Rat Portal System

The project uses `tunnel-rat` to create a portal system that allows 3D components to be rendered in a single persistent canvas, even when they're declared in different parts of the DOM tree.

**Key Files:**
- `src/helpers/global.js` - Creates the tunnel-rat instance (`r3f`)
- `src/helpers/components/Three.jsx` - Portal component that wraps 3D content (`<r3f.In>`)
- `src/components/canvas/Scene.jsx` - Main canvas that renders portaled content (`<r3f.Out>`)

### How It Works

1. **Single Persistent Canvas**: `Scene.jsx` creates one WebGL canvas that persists across all route changes
2. **Viewport Segmentation**: `View.jsx` components create scissored viewport segments tied to DOM elements
3. **Portaling**: Components inside `<View>` are portaled via `tunnel-rat` to the main canvas
4. **Synchronization**: DOM and 3D viewports are synchronized - they scroll, resize, and interact together

## Project Structure

```
├── app/                          # Next.js App Router (pages)
│   ├── page.jsx                  # Home page with demo examples
│   ├── blob/page.jsx             # Example blob page
│   ├── layout.jsx                # Root layout with metadata
│   ├── head.jsx                  # Head component
│   └── global.css                # Global styles
│
├── src/
│   ├── components/
│   │   ├── canvas/               # 3D/WebGL components
│   │   │   ├── View.jsx          # Viewport wrapper (creates scissored segments)
│   │   │   ├── Scene.jsx         # Persistent R3F Canvas
│   │   │   └── Examples.jsx      # Demo 3D components (Logo, Dog, Duck, Blob)
│   │   └── dom/                  # DOM components
│   │       └── Layout.jsx        # Main layout wrapper with fixed canvas
│   │
│   ├── helpers/
│   │   ├── global.js             # tunnel-rat instance export
│   │   └── components/
│   │       └── Three.jsx         # Portal component (<r3f.In>)
│   │
│   └── templates/                # Reusable templates/hooks
│       ├── hooks/
│       │   └── usePostprocess.jsx # Post-processing shader hook
│       ├── Scroll.jsx            # Smooth scroll with Lenis
│       └── Shader/               # Custom shader material
│           ├── Shader.jsx        # Shader component
│           └── glsl/
│               ├── shader.vert   # Vertex shader
│               └── shader.frag   # Fragment shader
│
├── public/                       # Static assets (3D models, etc.)
├── package.json                  # Dependencies and scripts
├── next.config.js                # Next.js config with GLSL/webpack setup
└── tailwind.config.js            # Tailwind CSS config
```

## Key Components Explained

### 1. Layout.jsx (`src/components/dom/Layout.jsx`)
- Wraps all pages
- Creates a scrollable container (`ref`)
- Renders a fixed fullscreen `<Scene>` canvas
- Canvas has `pointerEvents: 'none'` but receives events from the scrollable container

### 2. Scene.jsx (`src/components/canvas/Scene.jsx`)
- The persistent R3F Canvas that never unmounts
- Uses `THREE.AgXToneMapping` for better color rendering
- Contains `<r3f.Out>` which renders all portaled content
- Preloads all assets

### 3. View.jsx (`src/components/canvas/View.jsx`)
- Wrapper component that creates viewport segments
- Uses `@react-three/drei`'s `View` component internally
- Tracks a DOM element and creates a scissored viewport
- Optional `orbit` prop enables OrbitControls
- Includes `Common` component for default lights/camera

### 4. Three.jsx (`src/helpers/components/Three.jsx`)
- Portal component that wraps 3D content
- Uses `<r3f.In>` to portal children to the main canvas
- Must wrap any 3D components that go inside `<View>`

### 5. Examples.jsx (`src/components/canvas/Examples.jsx`)
- Demo 3D components:
  - `Logo` - Animated logo with lines and sphere
  - `Dog` - GLTF model (static)
  - `Duck` - GLTF model (rotating)
  - `Blob` - Distorted sphere with click navigation

## Key Features

### 1. GLSL Shader Support
- Webpack configured to handle `.glsl`, `.vert`, `.frag` files
- Uses `raw-loader` and `glslify-loader`
- Supports `glslify` syntax (e.g., `#pragma glslify: random = require(glsl-random)`)
- Shaders can be imported directly: `import vertex from './glsl/shader.vert'`

### 2. Post-Processing Hook (`usePostprocess.jsx`)
- Creates a fullscreen triangle for post-processing
- Uses render targets to apply shader effects
- Implements radial distortion effect based on time
- Can be called in any R3F component to apply post-processing

### 3. Smooth Scrolling (`Scroll.jsx`)
- Integrates Lenis for smooth scrolling
- `ScrollTicker` component syncs camera position with scroll progress
- Uses `damp` function for smooth camera animation

### 4. PWA Support
- Configured with `@ducanh2912/next-pwa`
- Service worker generated in `public/` directory
- Disabled in development mode

### 5. Performance Optimizations
- First load JS ~79kb
- TTL ~100ms
- Lighthouse score of 100
- Uses dynamic imports for 3D components (SSR disabled)
- Single canvas with viewport segmentation (more efficient than multiple canvases)

## Technology Stack

### Core Dependencies
- **Next.js** (^14.0.4) - React framework with App Router
- **React** (^18.2.0) - UI library
- **@react-three/fiber** (^8.15.12) - React renderer for Three.js
- **@react-three/drei** (^9.92.7) - Useful helpers for R3F
- **three** (^0.160.0) - 3D graphics library
- **tunnel-rat** (^0.1.2) - Portal system for R3F

### Dev Dependencies
- **glslify** & **glslify-loader** - GLSL module system
- **raw-loader** - Load GLSL files as strings
- **tailwindcss** - Utility-first CSS framework
- **@ducanh2912/next-pwa** - PWA support for Next.js

## Usage Patterns

### Basic 3D View
```jsx
import { View } from '@/components/canvas/View'
import { Common } from '@/components/canvas/View'

<View orbit className="h-96 w-full">
  <Suspense fallback={null}>
    <Your3DComponent />
    <Common /> {/* Lights and camera */}
  </Suspense>
</View>
```

### Multiple Views on One Page
```jsx
<div>
  <View className="h-48 w-1/2">
    <Component1 />
    <Common />
  </View>
  <View className="h-48 w-1/2">
    <Component2 />
    <Common />
  </View>
</div>
```

### Using Post-Processing
```jsx
import usePostProcess from '@/templates/hooks/usePostprocess'

function MyScene() {
  usePostProcess() // Applies post-processing effect
  return <mesh>...</mesh>
}
```

### Custom Shader Material
```jsx
import Shader from '@/templates/Shader/Shader'

<mesh>
  <boxGeometry />
  <Shader time={time} color={color} />
</mesh>
```

## Important Configuration

### next.config.js
- GLSL file support via webpack loaders
- Audio file support
- PWA configuration
- Bundle analyzer support

### Key Webpack Rules
1. **GLSL files**: `.glsl`, `.vs`, `.fs`, `.vert`, `.frag` → processed by raw-loader and glslify-loader
2. **Audio files**: `.ogg`, `.mp3`, `.wav`, `.mpeg` → handled by url-loader/file-loader

## Event Handling

- Canvas has `pointerEvents: 'none'` but receives events from `eventSource` (the scrollable container)
- Events are propagated correctly to 3D components
- Multiple views can handle events independently using viewport scissoring

## Navigation & Routing

- Uses Next.js App Router
- Canvas persists across route changes (no remounting)
- 3D components can use `useRouter()` from `next/navigation` for navigation
- Example: `Blob` component navigates on click

## Performance Characteristics

- **Single Canvas**: More efficient than multiple canvases
- **Viewport Scissoring**: Uses `gl.scissor` to render only visible portions
- **Dynamic Imports**: 3D components loaded client-side only
- **Asset Preloading**: `<Preload all />` in Scene preloads all assets
- **Optimized Bundle**: Tree-shaking and code splitting

## Development Workflow

### Available Scripts
- `yarn dev` - Start development server
- `yarn build` - Production build
- `yarn analyze` - Bundle size analysis
- `yarn lint` - Lint code
- `yarn start` - Start production server

### Adding New 3D Components
1. Create component in `src/components/canvas/`
2. Use R3F hooks (`useFrame`, `useThree`, etc.)
3. Import GLTF models with `useGLTF` from drei
4. Wrap in `<View>` component when using in pages
5. Use dynamic imports to disable SSR

### Adding New Pages
1. Create page in `app/` directory
2. Use `'use client'` directive for interactive components
3. Import 3D components with dynamic imports (SSR disabled)
4. Wrap 3D content in `<View>` component

## Common Patterns

### Animation Loop
```jsx
useFrame((state, delta) => {
  mesh.current.rotation.y += delta
})
```

### Hover States
```jsx
const [hovered, hover] = useState(false)
useCursor(hovered) // Changes cursor on hover
<mesh onPointerOver={() => hover(true)} onPointerOut={() => hover(false)}>
```

### Loading 3D Models
```jsx
const { scene } = useGLTF('/model.glb')
return <primitive object={scene} />
```

## Notes for Future Development

1. **Canvas Persistence**: The canvas in `Scene.jsx` never unmounts - this is intentional for performance
2. **Viewport Tracking**: `View` components track DOM elements and create viewports automatically
3. **Event Source**: Canvas events come from the scrollable container, not the canvas itself
4. **SSR**: All 3D components should be dynamically imported with `ssr: false`
5. **Tunnel-Rat**: The portal system is essential - don't remove it without understanding the architecture

## Troubleshooting

- **3D components not rendering**: Make sure they're wrapped in `<View>` and `<Three>` (or use `r3f.In`)
- **Events not working**: Check that `eventSource` is set correctly in `Scene`
- **Shaders not loading**: Verify webpack config includes GLSL loaders
- **Performance issues**: Check if multiple canvases are being created (should only be one)

