'use client'

import dynamic from 'next/dynamic'
import { Suspense, useEffect, useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const FullRoom = dynamic(() => import('@/components/canvas/Examples').then((mod) => mod.FullRoom), { ssr: false })
const View = dynamic(() => import('@/components/canvas/View').then((mod) => mod.View), {
  ssr: false,
  loading: () => (
    <div className='flex h-screen w-full flex-col items-center justify-center'>
      <svg className='-ml-1 mr-3 h-5 w-5 animate-spin text-black' fill='none' viewBox='0 0 24 24'>
        <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
        <path
          className='opacity-75'
          fill='currentColor'
          d='M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
        />
      </svg>
    </div>
  ),
})
const Common = dynamic(() => import('@/components/canvas/View').then((mod) => mod.Common), { ssr: false })

function ScrollZoom() {
  const { camera } = useThree()
  const targetZ = useRef(camera.position.z)
  const { damp } = THREE.MathUtils

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault()
      const delta = e.deltaY * 0.01
      targetZ.current = Math.max(1, Math.min(20, targetZ.current + delta))
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  useFrame((_, delta) => {
    camera.position.z = damp(camera.position.z, targetZ.current, 6, delta)
  })

  return null
}

export default function Page() {
  return (
    <View 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw', 
        height: '100vh',
        margin: 0,
        padding: 0,
        zIndex: 0,
      }}
    >
      <Suspense fallback={null}>
        <FullRoom />
        <Common />
        <ScrollZoom />
      </Suspense>
    </View>
  )
}
