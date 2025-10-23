import { MetadataRoute } from 'next'
import { getAllProjects } from '@/data/projects'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://athulnath.dev'
    const projects = getAllProjects()

    const projectUrls = projects.map((project) => ({
        url: `${baseUrl}/works/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...projectUrls,
    ]
}

