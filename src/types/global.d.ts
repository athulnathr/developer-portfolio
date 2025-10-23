// Global type definitions

export interface LightPosition {
    x: number;
    y: number;
}

export interface WorkProject {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    category: string;
    thumbnail: string;
    year: string;
    tags: string[];
    challenge: string;
    approach: string;
    outcome: string;
    link?: string;
}

export interface TechItem {
    name: string;
    category: 'frontend' | '3d' | 'streaming' | 'tooling';
    icon?: string;
}

export interface MotionSettings {
    reduceMotion: boolean;
}

export interface ContactFormData {
    name: string;
    email: string;
    message: string;
    projectType?: string;
}

declare global {
    interface Window {
        lenis?: any;
    }

    namespace JSX {
        interface IntrinsicElements {
            pointLight: any;
            ambientLight: any;
            hemisphereLight: any;
            meshStandardMaterial: any;
        }
    }
}

