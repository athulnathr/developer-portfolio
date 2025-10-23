import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export const metadata: Metadata = {
  title: 'Athul Nath — Lead UI Engineer & Senior Frontend Developer',
  description:
    'Interactive portfolio showcasing UI engineering mastery, 3D web experiences, and frontend development expertise by Athul Nath.',
  keywords: [
    'UI Engineer',
    'Frontend Developer',
    'React',
    'Next.js',
    'TypeScript',
    '3D Web',
    'WebGL',
    'GSAP',
  ],
  authors: [{ name: 'Athul Nath' }],
  openGraph: {
    title: 'Athul Nath — Lead UI Engineer',
    description:
      'Interactive portfolio showcasing UI engineering mastery and frontend development expertise.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Athul Nath — Lead UI Engineer',
    description: 'Interactive portfolio showcasing UI engineering mastery.',
  },
  robots: 'index, follow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="grain-overlay">{children}</body>
    </html>
  )
}
