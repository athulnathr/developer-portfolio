# Testing the Human Animation System

## Quick Start

1. Run `npm run dev`
2. Open browser to `http://localhost:3000`
3. Wait for the human model to load and stand up
4. Scroll down to the About section

## What to Look For

### Initial State (Hero Section)

- ✅ Human should be standing in the center
- ✅ Camera should be at base position (0, 2, 8)
- ✅ Human should be idle/stationary

### Start of About Section (Scroll Progress: 0-20%)

- ✅ Camera should start moving to side view
- ✅ Human should start lifting head/neck upward
- ✅ Head should tilt ~17 degrees
- ✅ Movement should be smooth and follow scroll speed

### Wave Animation (Scroll Progress: 20-40%)

- ✅ Human should raise right arm
- ✅ Forearm should wave side-to-side
- ✅ Wave should be 2-3 cycles
- ✅ If you stop scrolling, wave should pause

### Walking Animation (Scroll Progress: 40-100%)

- ✅ Human should start walking toward right side
- ✅ Legs should alternate in walking cycle
- ✅ Arms should swing opposite to legs
- ✅ Hips should have subtle sway
- ✅ Human should rotate to face walking direction
- ✅ Position should move smoothly to wall
- ✅ If you stop scrolling, walk should pause

### About Content Display (Scroll Progress: 70%+)

- ✅ "About Me" content should appear on left side
- ✅ Content should fade in with slide animation
- ✅ Background should have gradient and blur
- ✅ Timeline should be visible below paragraphs

### Camera Behavior

- ✅ Camera should follow human as they walk
- ✅ Camera should frame both human (right) and content (left)
- ✅ Camera movement should be smooth

## Responsive Testing

### Desktop (> 1024px)

- Human target position: x=3.5, z=-1 (far right)
- Camera position: x=-2, y=2, z=5
- About content: 40vw width on left

### Tablet (768px - 1024px)

- Human target position: x=2.8, z=-0.7 (medium right)
- Camera adjusts accordingly
- About content: 45vw width

### Mobile (< 768px)

- Human target position: x=2, z=-0.5 (closer)
- Camera position: x=-1.5, y=2, z=6 (closer)
- About content: full width

## Console Debugging

Open browser console (F12) and look for:

```
Extracted bones: { head: Object, neck: Object, ... }
```

This confirms bones were successfully extracted from the skeleton.

## Common Issues & Solutions

### Human doesn't move

- Check browser console for errors
- Verify scroll progress is updating (log `sectionProgress.about`)
- Ensure human model loaded correctly

### Animations are jerky

- Check if scroll events are firing too frequently
- Verify lerp is being used for smooth transitions
- Check delta time in useFrame

### Bones not found

- Check console for "Extracted bones" log
- Some bones might be null if model structure is different
- Verify GLTF model has the expected skeleton structure

### Camera doesn't follow

- Verify currentSection is 'about'
- Check sectionProgress values
- Ensure camera props are being passed correctly

### About content doesn't appear

- Check scroll progress > 0.7
- Verify isVisible prop is true
- Check z-index and positioning

## Performance Testing

Monitor in browser DevTools:

- FPS should stay at 60fps during animations
- Memory usage should be stable
- CPU usage should be reasonable

## Test Sequence

1. **Load Page**: Verify human stands up
2. **Scroll Slowly**: Watch each animation stage
3. **Scroll Fast**: Verify animations skip appropriately
4. **Scroll Back Up**: Verify animations reverse
5. **Stop Mid-Scroll**: Verify animation pauses
6. **Resize Window**: Verify responsive positions update
7. **Mobile View**: Test on actual device or DevTools mobile emulation

## Expected Behavior Summary

| Scroll Progress | Human Action   | Camera        | Content |
| --------------- | -------------- | ------------- | ------- |
| 0-20%           | Lifts head     | Moves to side | Hidden  |
| 20-40%          | Waves          | Focusing      | Hidden  |
| 40-70%          | Walking        | Following     | Hidden  |
| 70-100%         | At wall (idle) | Framing       | Visible |

## Success Criteria

All animations should be:

- ✅ Smooth and natural
- ✅ Responsive to scroll speed
- ✅ Pauseable (stop scrolling = pause animation)
- ✅ Reversible (scroll up = reverse animation)
- ✅ Responsive on all screen sizes
- ✅ Performant (60fps)

Happy Testing! 🎉
