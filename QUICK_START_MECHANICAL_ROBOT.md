# Quick Start: Mechanical Robot

## ⚡ 30-Second Setup

Want to see the new mechanical robot? Just add one prop:

```tsx
<RoboCanvas
  currentSection={currentSection}
  sectionProgress={sectionProgress}
  cursorPosition={cursorPosition}
  robotType="mechanical" // 👈 ADD THIS LINE
/>
```

That's it! 🎉

## 🎯 Where to Add It

Find where you use `<RoboCanvas>` in your app (probably in `app/page.tsx` or similar), and add `robotType="mechanical"` to the props.

### Before

```tsx
<RoboCanvas
  currentSection={currentSection}
  sectionProgress={sectionProgress}
  cursorPosition={cursorPosition}
/>
```

### After

```tsx
<RoboCanvas
  currentSection={currentSection}
  sectionProgress={sectionProgress}
  cursorPosition={cursorPosition}
  robotType="mechanical"
/>
```

## 🎨 Visual Differences

| Feature | Cute Robot          | Mechanical Robot        |
| ------- | ------------------- | ----------------------- |
| Style   | 🔵 Rounded & Smooth | ⬛ Angular & Industrial |
| Colors  | 💠 Cyan + Magenta   | 🟠 Gunmetal + Amber     |
| Vibe    | 😊 Friendly         | 🤖 Professional         |
| Joints  | 8                   | 20+                     |
| Fingers | No                  | Yes (4 per hand)        |
| Elbows  | No                  | Yes                     |

## 🔄 Want to Switch Between Them?

### Option 1: Different Robot Per Section

```tsx
<RoboCanvas
  robotType={currentSection === "projects" ? "mechanical" : "cute"}
  {/* other props */}
/>
```

### Option 2: User Toggle

```tsx
const [robotType, setRobotType] = useState<"cute" | "mechanical">("cute");

<button onClick={() => setRobotType(robotType === "cute" ? "mechanical" : "cute")}>
  Switch Robot
</button>

<RoboCanvas robotType={robotType} {/* other props */} />
```

## 📚 Need More Info?

- **Full Guide**: See `MECHANICAL_ROBOT_GUIDE.md`
- **Examples**: See `MECHANICAL_ROBOT_DEMO.tsx`
- **Summary**: See `MECHANICAL_ROBOT_SUMMARY.md`

## 🎬 Animations Included

The mechanical robot automatically works with all existing animations:

✅ Walk cycle with elbow bends  
✅ Run cycle with arm pumping  
✅ Wave gesture with fingers  
✅ Thumbs up with hand articulation  
✅ Breathing animation with torso movement  
✅ Transformation effects with rotation

No extra setup needed - they all just work! 🚀

## 🎨 Want to Customize?

### Change Colors

Edit `components/Robo/MechanicalRobot.tsx`:

```tsx
const bodyMaterial = (
  <meshStandardMaterial
    color="#3a3a3a" // 👈 Change this
    // ...
  />
);
```

### Adjust Animations

Edit `components/Robo/RoboModel.tsx` animation functions to change movement intensity.

## 💡 Pro Tips

1. **Use Cute for Mobile**: The cute robot has fewer parts, better for mobile devices
2. **Use Mechanical for Desktop**: Full detail and articulation shines on desktop
3. **Match Your Theme**: Choose the robot that fits your portfolio's aesthetic
4. **Mix and Match**: Use different robots for different sections

## 🆘 Troubleshooting

**Robot not appearing?**

- Make sure you saved the file
- Check browser console for errors
- Verify you're using `robotType="mechanical"` (all lowercase)

**Want to go back to cute robot?**

- Remove the `robotType` prop, or
- Set `robotType="cute"`

## 🎉 That's It!

You now have access to both robots. Use whichever fits your portfolio best, or switch between them for variety!

---

**Quick Command**: Search your codebase for `<RoboCanvas` and add `robotType="mechanical"` to see the new robot immediately.
