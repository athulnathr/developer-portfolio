/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three', 'gsap', '@react-three/fiber', '@react-three/drei'],
  // Acknowledge we're aware of the webpack config in a Turbopack environment
  turbopack: {},
  webpack: (config, { isServer }) => {
    // Prevent duplicate React instances only for @react-three packages
    if (!isServer) {
      config.resolve.dedupe = ['react', 'react-dom', 'three']
    }

    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    })

    return config
  },
}

export default nextConfig
