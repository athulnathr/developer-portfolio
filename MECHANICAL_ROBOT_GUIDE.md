# Mechanical Robot Implementation Guide

## Overview

A fully functional industrial/mechanical robot has been created as an alternative to the existing `CuteRobot`. The new `MechanicalRobot` features enhanced articulation including elbows, torso rotation, waist pivot, and articulated fingers.

## Features

### Visual Design

- **Industrial Aesthetic**: Dark gunmetal grey (#3a3a3a) and dark steel (#1a1a1a) materials
- **Mechanical Details**:
  - Exposed pistons at joints
  - Rivets and bolts on panels
  - Panel separation lines
  - Industrial warning stripes on limbs
  - Amber/orange warning lights (#ff6600)
  - Vent grilles on torso

### Enhanced Articulation

The mechanical robot includes more articulation points than the cute robot:

1. **Head**: Full rotation and tilt with antenna array
2. **Torso**: Separate group that can rotate independently
3. **Waist**: Pivot point between pelvis and torso
4. **Arms**:
   - Shoulder joints
   - **Elbow joints** (new!)
   - Forearms
5. **Hands**:
   - **4 articulated fingers per hand** (new!)
   - Each finger has 2 segments
   - Includes thumb, index, middle, and ring fingers
6. **Legs**:
   - Hip joints
   - Thighs with armor plating
   - Knee joints
   - Shins with guards
   - Heavy industrial feet

### Animation Support

All existing animations have been enhanced to support the new articulation:

#### Walk Cycle

- Arms swing with natural elbow bend
- Fingers curl slightly during movement
- Torso counter-rotates for natural gait

#### Run Cycle

- More pronounced elbow bending
- Tighter finger curls (fist formation)
- Increased torso twist
- Forward waist lean

#### Wave Gesture

- Realistic elbow bend during wave
- Fingers open and close dynamically

#### Thumbs Up

- Proper elbow angle for gesture
- Thumb extended, other fingers curled
- Natural hand rotation

#### Breathing Animation

- Torso expansion and contraction
- Subtle waist rotation
- Synchronized with body movement

#### Transformation Effects

- Torso spins during power-up
- Waist rotation pulses
- Hand flexing to show energy absorption

## Usage

### Basic Usage

To switch from the cute robot to the mechanical robot, simply pass the `robotType` prop:

```tsx
<RoboModel
  currentSection={currentSection}
  sectionProgress={sectionProgress}
  cursorPosition={cursorPosition}
  transformationLevel={transformationLevel}
  onProjectHover={onProjectHover}
  robotType="mechanical" // Add this line
/>
```

### In RoboCanvas Component

Update `/components/Robo/RoboCanvas.tsx`:

```tsx
export const RoboCanvas: React.FC<RoboCanvasProps> = ({
  currentSection,
  sectionProgress,
  cursorPosition,
  showParticles = false,
  transformationLevel = 0,
  onProjectHover = null,
}) => {
  // ... existing code ...

  return (
    <div className="fixed inset-0 pointer-events-none z-40">
      <Canvas /* ... canvas props ... */>
        <Suspense fallback={null}>
          {/* ... lighting and camera ... */}

          {/* Robot with mechanical type */}
          <RoboModel
            currentSection={currentSection}
            sectionProgress={sectionProgress}
            cursorPosition={cursorPosition}
            transformationLevel={transformationLevel}
            onProjectHover={onProjectHover}
            robotType="mechanical" // Use mechanical robot
          />

          {/* ... particle effects ... */}
        </Suspense>
      </Canvas>
    </div>
  );
};
```

### Dynamic Switching

You can dynamically switch between robots based on sections or user preference:

```tsx
// Switch robot based on section
<RoboModel
  currentSection={currentSection}
  sectionProgress={sectionProgress}
  cursorPosition={cursorPosition}
  robotType={currentSection === "projects" ? "mechanical" : "cute"}
/>;

// Or use state for user selection
const [robotType, setRobotType] = useState<"cute" | "mechanical">("cute");

<RoboModel
  currentSection={currentSection}
  sectionProgress={sectionProgress}
  cursorPosition={cursorPosition}
  robotType={robotType}
/>;
```

## Technical Details

### New Refs Added to RoboModel

The following refs have been added to support the mechanical robot's enhanced articulation:

- `torsoRef`: Controls torso rotation and scaling
- `waistRef`: Controls waist pivot and rotation
- `leftElbowRef`: Left arm elbow joint
- `rightElbowRef`: Right arm elbow joint
- `leftHandRef`: Left hand and finger animation
- `rightHandRef`: Right hand and finger animation

### Material Properties

The mechanical robot uses these material configurations:

```typescript
// Body Material
{
  color: "#3a3a3a",        // Gunmetal grey
  emissive: "#1a1a1a",
  emissiveIntensity: 0.1,
  metalness: 0.95,
  roughness: 0.5
}

// Panel Material
{
  color: "#4a4a4a",        // Lighter panels
  metalness: 0.85,
  roughness: 0.4
}

// Joint Material
{
  color: "#1a1a1a",        // Dark exposed metal
  metalness: 0.95,
  roughness: 0.7
}

// Warning Glow
{
  color: "#ff6600",        // Industrial amber
  transparent: true,
  opacity: 0.8
}
```

### Lighting Adjustment

The robot automatically adjusts its accent lighting based on type:

- **Mechanical**: Amber/orange industrial lighting (#ff6600, #ff8800)
- **Cute**: Cyan/magenta futuristic lighting (#00d9ff, #ff00ff)

## File Structure

```
components/Robo/
├── MechanicalRobot.tsx     # NEW: Industrial robot component
├── RoboModel.tsx            # UPDATED: Added mechanical robot support
├── CuteRobot.tsx           # Existing cute robot
├── RoboCanvas.tsx          # Where you'll add robotType prop
└── GeometricRobot.tsx      # Fallback robot
```

## Customization

### Changing Colors

Edit `/components/Robo/MechanicalRobot.tsx` and modify the material definitions:

```tsx
const bodyMaterial = (
  <meshStandardMaterial
    color="#3a3a3a" // Change primary color here
    emissive="#1a1a1a" // Change glow color here
    emissiveIntensity={0.1}
    metalness={0.95}
    roughness={0.5}
  />
);
```

### Adjusting Animation Intensity

In `/components/Robo/RoboModel.tsx`, you can adjust animation parameters:

```tsx
// Example: Make elbow bends more/less pronounced
if (leftElbowRef.current && rightElbowRef.current) {
  const leftElbowBend = Math.max(0, Math.sin(cycle * Math.PI * 2)) * 0.2; // Change 0.2 to adjust
  // ...
}
```

### Adding New Animations

To add custom animations for specific mechanical parts:

```tsx
function applyCustomMechanicalAnimation(time: number) {
  // Animate torso
  if (torsoRef.current) {
    torsoRef.current.rotation.y = Math.sin(time) * 0.5;
  }

  // Animate waist
  if (waistRef.current) {
    waistRef.current.rotation.x = Math.cos(time * 2) * 0.2;
  }

  // Animate hands
  if (leftHandRef.current && rightHandRef.current) {
    const fingerAnimation = Math.sin(time * 3) * 0.3;
    leftHandRef.current.rotation.x = fingerAnimation;
    rightHandRef.current.rotation.x = fingerAnimation;
  }
}
```

## Performance Considerations

The mechanical robot has more geometry than the cute robot due to:

- Individual finger segments (8 fingers × 2 segments = 16 additional parts)
- More detailed panel work
- Additional joint spheres

For lower-end devices, you may want to stick with the cute robot or implement LOD (Level of Detail) switching.

## Comparison: Cute vs Mechanical

| Feature        | Cute Robot                      | Mechanical Robot                           |
| -------------- | ------------------------------- | ------------------------------------------ |
| Visual Style   | Rounded, smooth                 | Angular, industrial                        |
| Color Palette  | Cyan/Magenta                    | Gunmetal/Amber                             |
| Articulation   | Basic (head, arms, legs, knees) | Enhanced (+ torso, waist, elbows, fingers) |
| Geometry Count | ~50 meshes                      | ~80 meshes                                 |
| Material Type  | Smooth metals                   | Rough industrial metals                    |
| Lighting       | Bright neon                     | Dim warning lights                         |
| Best For       | Friendly, modern aesthetic      | Professional, mechanical theme             |

## Examples

### Example 1: Different Robot Per Section

```tsx
const getRobotType = (section: SectionName): "cute" | "mechanical" => {
  switch (section) {
    case "hero":
    case "about":
      return "cute";
    case "skills":
    case "projects":
      return "mechanical";
    default:
      return "cute";
  }
};

<RoboModel
  currentSection={currentSection}
  sectionProgress={sectionProgress}
  cursorPosition={cursorPosition}
  robotType={getRobotType(currentSection)}
/>;
```

### Example 2: User Toggle

```tsx
const [robotType, setRobotType] = useState<"cute" | "mechanical">("cute");

// In your UI
<button onClick={() => setRobotType(robotType === "cute" ? "mechanical" : "cute")}>
  Switch Robot: {robotType === "cute" ? "Cute" : "Mechanical"}
</button>

<RoboModel
  currentSection={currentSection}
  sectionProgress={sectionProgress}
  cursorPosition={cursorPosition}
  robotType={robotType}
/>
```

## Troubleshooting

### Robot Not Appearing

- Check that `robotType="mechanical"` is passed to RoboModel
- Verify no TypeScript errors in the console

### Animations Not Working

- Ensure all refs are being passed to MechanicalRobot component
- Check that animation functions are being called in useFrame

### Performance Issues

- Reduce particle count if using ParticleSystem
- Consider disabling shadows: `shadows={false}` in Canvas
- Switch back to cute robot for lower-end devices

## Credits

This mechanical robot was created by analyzing the three.js FBX loader example and implementing a fully articulated geometric robot with industrial aesthetic, built entirely from Three.js primitives (boxes, cylinders, spheres).

The robot supports all existing animation patterns while adding enhanced articulation through additional joint controls.
