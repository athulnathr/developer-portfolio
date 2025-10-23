import type { WorkProject } from '@/types/global'

/**
 * Portfolio projects data
 * Replace with your actual projects
 */
export const projects: WorkProject[] = [
    {
        id: '1',
        slug: 'immersive-3d-product-showcase',
        title: 'Immersive 3D Product Showcase',
        subtitle: 'Interactive WebGL experience for luxury e-commerce brand',
        category: '3D Web Experience',
        thumbnail: '/projects/showcase.jpg',
        year: '2024',
        tags: ['React Three Fiber', 'GSAP', 'Next.js', 'WebGL', 'E-commerce'],
        challenge:
            'A luxury watch brand needed an immersive online experience to showcase their premium products with the same level of detail and engagement as an in-store experience.',
        approach:
            'Built a fully interactive 3D product viewer using React Three Fiber with realistic materials, dynamic lighting, and gesture controls. Implemented custom shaders for watch face reflections and integrated GSAP for smooth camera transitions between product views.',
        outcome:
            '300% increase in average session duration, 85% reduction in product return rates, and featured in Awwwards. The experience successfully translated the luxury in-store feeling to the web.',
        link: 'https://example.com/project',
    },
    {
        id: '2',
        slug: 'real-time-collaboration-platform',
        title: 'Real-time Collaboration Platform',
        subtitle: 'Enterprise-grade streaming and co-editing workspace',
        category: 'Real-time Application',
        thumbnail: '/projects/collab.jpg',
        year: '2024',
        tags: ['WebRTC', 'Socket.io', 'React', 'Node.js', 'WebSockets'],
        challenge:
            'Enterprise teams needed a reliable platform for real-time document collaboration with video conferencing, with performance maintained even with 50+ concurrent users.',
        approach:
            'Architected a WebRTC-based streaming solution with operational transformation for conflict resolution. Implemented adaptive bitrate streaming and canvas-based rendering for smooth 60fps interactions across varying network conditions.',
        outcome:
            'Platform now serves 100K+ daily active users across Fortune 500 companies. Achieved 99.9% uptime and sub-100ms latency for document synchronization. Reduced server costs by 40% through optimized peer-to-peer architecture.',
        link: 'https://example.com/project',
    },
    {
        id: '3',
        slug: 'design-system-framework',
        title: 'Design System Framework',
        subtitle: 'Scalable component library for multi-brand products',
        category: 'UI Engineering',
        thumbnail: '/projects/design-system.jpg',
        year: '2023',
        tags: ['React', 'TypeScript', 'Storybook', 'Figma', 'CSS-in-JS'],
        challenge:
            'Organization managing 15+ products needed a unified design system that could scale across different brands while maintaining consistency and developer velocity.',
        approach:
            'Built a themeable component library with TypeScript, automated accessibility testing, and Figma integration. Created custom CLI tools for component scaffolding and implemented visual regression testing with Chromatic.',
        outcome:
            'Development time reduced by 60%, design-to-code handoff improved from 2 weeks to 2 days. Adopted by 200+ engineers across organization. AAA accessibility compliance achieved across all components.',
        link: 'https://example.com/project',
    },
    {
        id: '4',
        slug: 'interactive-data-visualization',
        title: 'Interactive Data Visualization',
        subtitle: 'Real-time analytics dashboard for financial services',
        category: 'Data Visualization',
        thumbnail: '/projects/dataviz.jpg',
        year: '2023',
        tags: ['D3.js', 'React', 'WebGL', 'Three.js', 'Real-time'],
        challenge:
            'Financial analysts needed to process and visualize millions of data points in real-time with interactive filtering and drill-down capabilities.',
        approach:
            'Developed a hybrid rendering solution using Canvas API for 2D charts and WebGL for 3D network graphs. Implemented data streaming with WebSockets and virtual scrolling for handling large datasets. Used Web Workers for heavy computations.',
        outcome:
            'Platform handles 5M+ data points with smooth 60fps interactions. Analysts report 75% faster insight discovery. Solution now serves as internal standard for all data visualization projects.',
        link: 'https://example.com/project',
    },
]

export function getProjectBySlug(slug: string): WorkProject | undefined {
    return projects.find((project) => project.slug === slug)
}

export function getAllProjects(): WorkProject[] {
    return projects
}

