# Interactive Robo Portfolio

A visually immersive, narrative-driven personal portfolio featuring an interactive 3D robot character that guides users through each section with dynamic animations and reactions.

## Features

- 🤖 **Interactive 3D Robot Character**: Robo follows users through sections with context-aware animations
- 🎨 **Modern Design**: Dark theme with gradient accents and smooth animations
- ⚡ **High Performance**: Optimized Three.js rendering and code splitting
- 📱 **Fully Responsive**: Adapts seamlessly from mobile to desktop
- ♿ **Accessible**: WCAG compliant with keyboard navigation and reduced motion support
- 🎭 **Smooth Animations**: GSAP and Framer Motion for fluid transitions
- 📧 **Contact Form**: Integrated email functionality (EmailJS ready)

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js with React Three Fiber
- **Animations**: GSAP, Framer Motion
- **3D Model**: GLB format (placed in `/public/models/robot.glb`)

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd v3-portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables (optional for contact form):
   Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
v3-portfolio/
├── app/                      # Next.js app router
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/
│   ├── Robo/                # 3D Robot components
│   │   ├── RoboModel.tsx
│   │   ├── RoboCanvas.tsx
│   │   └── ParticleSystem.tsx
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   └── ui/                  # Reusable UI components
│       ├── Button.tsx
│       ├── SpeechBubble.tsx
│       └── ScrollIndicator.tsx
├── hooks/                   # Custom React hooks
│   ├── useScrollProgress.ts
│   ├── useCursorTracking.ts
│   └── useReducedMotion.ts
├── constants/               # Configuration and content
│   ├── content.ts
│   └── animations.ts
├── public/
│   └── models/
│       └── robot.glb        # 3D robot model
└── package.json
```

## Customization

### Content

Edit `/constants/content.ts` to customize:

- Hero section text
- About me paragraphs and timeline
- Skills and technologies
- Project details
- Contact information
- Footer links

### Styling

Edit `/tailwind.config.ts` to customize:

- Color scheme
- Animations
- Breakpoints

### Robot Model

Replace `/public/models/robot.glb` with your own 3D model. Ensure it's optimized for web:

- Keep polygon count reasonable (<50k triangles)
- Use compressed textures
- Consider Draco compression

### Animations

Edit `/constants/animations.ts` to customize:

- Animation durations
- Easing functions
- Particle effects
- Robot positions per section

## Building for Production

```bash
npm run build
npm start
```

## Performance Optimization

- Three.js renderer uses adaptive pixel ratio
- Lazy loading for sections outside viewport
- Code splitting per route
- Optimized images with Next.js Image component
- Reduced motion support for accessibility

## Accessibility Features

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus indicators
- Skip to content link
- Reduced motion preference detection

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this template for your own portfolio!

## Credits

- 3D Robot Model: [Your source or "Custom"]
- Fonts: Inter (Google Fonts)
- Icons: [Your icon source]

## Contact

For questions or collaboration, reach out through the contact form on the portfolio or via:

- GitHub: [Your GitHub]
- LinkedIn: [Your LinkedIn]
- Email: [Your Email]



