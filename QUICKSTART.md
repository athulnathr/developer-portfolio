# 🚀 Quick Start Guide

Your interactive Robo Portfolio is ready! Follow these steps to make it yours.

## ✅ Current Status

- ✅ **Development server running** at http://localhost:3000
- ✅ **All features implemented** and working
- ✅ **Robot model loaded** from `/public/models/robot.glb`
- ✅ **Build tested** and passing
- ✅ **Ready for customization**

## 📝 First Steps (5 minutes)

### 1. Update Your Information

Open `constants/content.ts` and replace placeholder content:

```typescript
export const content = {
  hero: {
    title: "Your Name Here", // ← Change this
    subtitle: "Your tagline", // ← And this
    // ...
  },
  about: {
    paragraphs: [
      "Write about yourself...", // ← Your story
    ],
    // ...
  },
  // ... update other sections
};
```

### 2. Add Your Projects

In the same file, update the projects array:

```typescript
projects: [
  {
    id: 1,
    title: "Your Project Name", // ← Your project
    description: "What it does...", // ← Description
    image: "/images/project1.jpg", // ← Add image
    tags: ["React", "Next.js"], // ← Tech stack
    link: "https://...", // ← Live link
    github: "https://github.com/...", // ← Repo link
  },
  // Add 5-6 projects
];
```

### 3. Add Project Images

Place your project images in `/public/images/`:

```bash
# From your terminal:
cp your-project-image.jpg public/images/project1.jpg
cp another-image.jpg public/images/project2.jpg
# ... etc
```

### 4. Update Social Links

In `constants/content.ts`, update footer social links:

```typescript
footer: {
  social: [
    {
      name: "GitHub",
      url: "https://github.com/YOURUSERNAME",  // ← Your GitHub
      icon: "github"
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/YOURNAME", // ← Your LinkedIn
      icon: "linkedin"
    },
    // Add more...
  ],
}
```

### 5. Test Your Changes

The dev server auto-reloads! Just save files and refresh your browser at http://localhost:3000

## 🎨 Visual Customization (10 minutes)

### Change Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    DEFAULT: "#YOUR_COLOR",  // Main theme color
    // ...
  },
}
```

### Adjust Robot Positions

Edit `constants/animations.ts`:

```typescript
export const roboPositions = {
  hero: { x: 0, y: 0, z: 0, scale: 1 },
  about: { x: -3, y: 0, z: 0, scale: 1 }, // Adjust x, y, z
  // ... tweak positions
};
```

### Replace Robot Model (Optional)

If you have your own robot GLB file:

```bash
# Backup original
mv public/models/robot.glb public/models/robot-original.glb

# Add yours
cp your-robot.glb public/models/robot.glb
```

## 📧 Enable Contact Form (5 minutes)

### Setup EmailJS

1. Go to [emailjs.com](https://www.emailjs.com/)
2. Create a free account
3. Add an email service (Gmail, etc.)
4. Create an email template
5. Get your keys

### Add Keys

Create `.env.local` (already exists, just update):

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

### Update Contact Component

In `components/sections/Contact.tsx`, uncomment EmailJS code:

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
    setFormData({ name: "", email: "", message: "" });
  } catch (error) {
    setStatus("error");
  }
};
```

## 🚀 Deploy (10 minutes)

### Option 1: Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables
5. Deploy! 🎉

### Option 2: Netlify

1. Build the project: `npm run build`
2. Drag `.next` folder to Netlify
3. Configure as Next.js site
4. Add environment variables
5. Deploy! 🎉

## 📱 Test Checklist

Before deploying, verify:

- [ ] All text is updated with your info
- [ ] Projects have real content
- [ ] Images are added and loading
- [ ] Social links work
- [ ] Contact form sends emails
- [ ] Site looks good on mobile
- [ ] Animations work smoothly
- [ ] No console errors

## 🎯 Next Level (Optional)

### Add Your Face Photo

For the face reveal feature in Contact section:

1. Add your photo to `/public/images/avatar.jpg`
2. Update `RoboFaceReveal.tsx`:

```typescript
{
  /* Replace emoji with your image */
}
<img
  src="/images/avatar.jpg"
  alt="Your Name"
  className="w-full h-full object-cover"
/>;
```

### Custom Animations

Edit `components/Robo/RoboModel.tsx` to add custom robot behaviors for each section.

### Add Tech Icons

Replace the letter circles in Skills section with actual tech logos from:

- [React Icons](https://react-icons.github.io/react-icons/)
- [Simple Icons](https://simpleicons.org/)

## 📚 Documentation

- `README.md` - Project overview
- `USAGE.md` - Detailed customization guide
- `DEVELOPMENT.md` - Development guidelines
- `PROJECT_OVERVIEW.md` - Complete feature list

## 🐛 Troubleshooting

### Robot not appearing?

- Check browser console for errors
- Verify `/public/models/robot.glb` exists
- Check WebGL is supported (type `chrome://gpu` in Chrome)

### Build errors?

```bash
# Clean and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### Performance issues?

- Reduce particle count in `constants/animations.ts`
- Lower model polygon count
- Test on actual devices, not just devtools

## 💡 Tips

1. **Save often** - Hot reload works great
2. **Mobile first** - Test responsive early
3. **Lighthouse** - Run audits before deploying
4. **Git commits** - Commit after each major change
5. **Backup** - Keep original robot.glb

## 🎉 You're Ready!

Your portfolio is set up and ready to impress. Make it yours and deploy with confidence!

---

**Need help?** Check the detailed docs or the comments in the code.

**Happy coding!** 🚀





