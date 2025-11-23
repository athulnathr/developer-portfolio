# Debugging Guide

This project includes several debugging tools to help you develop and debug your Three.js/React Three Fiber application.

## VS Code Debugging

### Setup
The project includes a `.vscode/launch.json` configuration with multiple debugging options:

1. **Next.js: debug server-side** - Debug the Next.js server
2. **Next.js: debug client-side** - Debug the client-side React code in Chrome
3. **Next.js: debug full stack** - Debug both server and client simultaneously
4. **Attach to Chrome** - Attach to an already running Chrome instance

### Usage
1. Press `F5` or go to Run and Debug in VS Code
2. Select the configuration you want to use
3. Set breakpoints in your code
4. The debugger will pause at breakpoints

### Tips
- Use `console.log()` for quick debugging
- Set breakpoints in React components and Three.js code
- Use the Chrome DevTools for inspecting the DOM and network requests

## Three.js Debug Component

The `Debug` component provides visual debugging tools for your Three.js scene.

### Features
- **FPS Stats** - Real-time frame rate monitoring
- **OrbitControls** - Mouse/touch controls to orbit around the scene
- **Grid Helper** - Visual grid to understand scene scale
- **Axes Helper** - Red (X), Green (Y), Blue (Z) axes for orientation
- **Console Logging** - Automatically logs scene, camera, and renderer info

### Usage

```jsx
import { Debug } from '@/components/canvas/Debug'

export default function Page() {
  return (
    <View>
      <Your3DComponent />
      <Debug /> {/* Add this to enable debugging */}
    </View>
  )
}
```

### Toggle Debug Mode
Press the **'d'** key to toggle debug mode on/off.

### Customization

```jsx
<Debug 
  enabled={true}        // Enable/disable debug mode
  showStats={true}      // Show FPS stats
  showControls={true}   // Show orbit controls
  showGrid={true}       // Show grid helper
  showAxes={true}       // Show axes helper
/>
```

## Performance Monitor

Monitor performance metrics in the console:

```jsx
import { PerformanceMonitor } from '@/components/canvas/Debug'

<PerformanceMonitor interval={5000} /> // Logs every 5 seconds
```

This will log:
- Memory usage (geometries, textures)
- Render calls
- Triangle/point/line counts
- Shader programs

## Scene Inspector

Click on objects in the scene to inspect them:

```jsx
import { SceneInspector } from '@/components/canvas/Debug'

<SceneInspector />
```

Click any object in the scene to see its properties in the console:
- Type, name, position, rotation, scale
- Material and geometry info
- Parent and children

## Browser DevTools

### React DevTools
Install the [React Developer Tools](https://react.dev/learn/react-developer-tools) browser extension to:
- Inspect React component tree
- View component props and state
- Profile component performance

### Three.js Inspector
You can also use the browser console to access Three.js objects:

```javascript
// In browser console
window.__THREE__ // Access Three.js global (if available)
```

## Common Debugging Scenarios

### Debug Camera Position
```jsx
import { useThree } from '@react-three/fiber'

function MyComponent() {
  const { camera } = useThree()
  console.log('Camera position:', camera.position)
  // ...
}
```

### Debug Object Transformations
```jsx
useFrame(() => {
  console.log('Object position:', meshRef.current.position)
  console.log('Object rotation:', meshRef.current.rotation)
})
```

### Debug Performance Issues
1. Enable the `PerformanceMonitor` component
2. Check the console for high triangle counts or render calls
3. Use React DevTools Profiler to identify re-renders
4. Check browser Performance tab for frame drops

### Debug Shader Issues
- Check browser console for WebGL errors
- Use `gl.getError()` in your shader code
- Validate shader compilation with `gl.getShaderInfoLog()`

## Tips

1. **Start with Debug component** - It provides the most visual feedback
2. **Use console.log strategically** - Don't log in `useFrame` without throttling
3. **Check React DevTools** - Many issues are React-related, not Three.js
4. **Monitor FPS** - Keep an eye on the Stats component
5. **Use Scene Inspector** - Great for understanding object hierarchy

## Troubleshooting

### Debug component not showing
- Make sure it's inside a `<View>` component
- Check that `enabled` prop is `true`
- Press 'd' key to toggle

### Breakpoints not working
- Make sure source maps are enabled in `next.config.js`
- Check that you're using the correct debug configuration
- Try restarting the debugger

### Performance issues
- Disable debug components in production
- Use `Suspense` for lazy loading
- Optimize geometry and texture sizes

