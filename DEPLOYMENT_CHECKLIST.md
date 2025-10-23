# Deployment Checklist

Complete this checklist before deploying your portfolio to production.

## Pre-Deployment

### Content Updates

- [ ] Update personal information in `src/app/layout.tsx` (name, title, description)
- [ ] Add your projects to `src/data/projects.ts`
- [ ] Update technology stack in `src/app/(components)/TechGrid.tsx`
- [ ] Replace placeholder resume at `public/resume-athul-nath.pdf`
- [ ] Update contact links (email, LinkedIn, GitHub) in:
  - [ ] `src/app/(components)/ContactStrip.tsx`
  - [ ] `src/app/page.tsx` (footer)
  - [ ] `src/lib/utils.ts` (downloadResume function)

### Assets

- [ ] Add 3D font file to `public/fonts/inter_bold.json` (or use CSS fallback)
- [ ] Add project thumbnail images to `public/projects/`
- [ ] Optimize all images (use WebP format for better performance)
- [ ] Add favicon.ico to `public/`
- [ ] Add OpenGraph image to `public/og-image.png`

### Performance

- [ ] Run `npm run build` locally without errors
- [ ] Test all pages for broken links
- [ ] Verify LCP < 2.5s (use Lighthouse)
- [ ] Check FPS during scroll (should be 45+)
- [ ] Test on mobile devices
- [ ] Verify reduced motion toggle works
- [ ] Test with browser DevTools → Performance tab

### Accessibility

- [ ] Test keyboard navigation (Tab through all interactive elements)
- [ ] Verify focus indicators are visible
- [ ] Check color contrast (WCAG AA compliance)
- [ ] Test with screen reader (VoiceOver, NVDA, or JAWS)
- [ ] Ensure all images have alt text
- [ ] Verify reduced motion preferences are respected

### Browser Testing

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### SEO

- [ ] Update metadata in `src/app/layout.tsx`
- [ ] Add metadata to work pages (`src/app/works/[slug]/page.tsx`)
- [ ] Verify robots.txt allows indexing
- [ ] Add sitemap.xml (optional but recommended)
- [ ] Test OpenGraph tags with [OpenGraph Debugger](https://www.opengraph.xyz/)

## Deployment Steps

### Vercel Deployment

1. [ ] Push code to GitHub repository
2. [ ] Connect repository to Vercel
3. [ ] Configure build settings (should auto-detect Next.js)
4. [ ] Add environment variables (if any)
5. [ ] Deploy and verify

### Custom Domain (Optional)

- [ ] Purchase domain
- [ ] Add domain in Vercel dashboard
- [ ] Update DNS records
- [ ] Enable SSL (automatic with Vercel)
- [ ] Test domain resolution

### Post-Deployment

- [ ] Verify all pages load correctly on production URL
- [ ] Test contact form submission (if implemented)
- [ ] Check resume download functionality
- [ ] Verify all external links work
- [ ] Test navigation between pages
- [ ] Run Lighthouse audit on production site
- [ ] Submit sitemap to Google Search Console

## Analytics (Optional)

- [ ] Set up Google Analytics
- [ ] Add tracking code to `src/app/layout.tsx`
- [ ] Set up conversion goals
- [ ] Test analytics tracking

## Monitoring (Optional)

- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Configure performance monitoring
- [ ] Set up uptime monitoring

## Marketing

- [ ] Share on LinkedIn
- [ ] Share on Twitter/X
- [ ] Add to portfolio aggregator sites (Behance, Dribbble)
- [ ] Submit to design showcases (Awwwards, CSS Design Awards)
- [ ] Update resume with portfolio URL
- [ ] Add portfolio link to GitHub profile

## Maintenance

### Regular Updates

- [ ] Update projects quarterly
- [ ] Keep dependencies updated (`npm update`)
- [ ] Monitor Core Web Vitals
- [ ] Review and respond to contact form submissions
- [ ] Refresh resume regularly

### Security

- [ ] Keep Next.js and dependencies updated
- [ ] Monitor Vercel security alerts
- [ ] Review access logs periodically

## Performance Benchmarks

Target metrics for production:

| Metric | Target | Current |
|--------|--------|---------|
| LCP    | < 2.5s | _____ |
| FID    | < 100ms | _____ |
| CLS    | < 0.1  | _____ |
| FPS    | ≥ 45   | _____ |
| Lighthouse Score | ≥ 90 | _____ |

## Support Checklist

- [ ] README.md is complete and accurate
- [ ] SETUP.md has clear instructions
- [ ] Code comments explain complex logic
- [ ] TypeScript types are properly defined

---

## Ready to Deploy? ✅

Once all items are checked, you're ready to deploy!

```bash
# Final pre-deployment commands
npm run type-check
npm run build
npm run start # Test production build locally

# Then deploy to Vercel
vercel --prod
```

Good luck! 🚀

