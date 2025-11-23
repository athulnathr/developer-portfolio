'use client'

import { useThree } from '@react-three/fiber'
import { OrbitControls, Stats, Grid } from '@react-three/drei'
import { useEffect, useState } from 'react'
import * as THREE from 'three'

/**
 * Debug component for Three.js scene
 * 
 * Features:
 * - FPS Stats overlay
 * - OrbitControls for camera manipulation
 * - Grid helper
 * - Axes helper
 * - Console logging of scene info
 * 
 * Usage:
 * Add <Debug /> to your scene. Toggle with 'd' key or set enabled prop.
 */
export function Debug({ enabled = true, showStats = true, showControls = true, showGrid = true, showAxes = true }) {
  const { scene, camera, gl } = useThree()
  const [isEnabled, setIsEnabled] = useState(enabled)

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'd' || e.key === 'D') {
        setIsEnabled(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  useEffect(() => {
    if (isEnabled) {
      console.log('=== Three.js Scene Debug Info ===')
      console.log('Camera:', {
        position: camera.position,
        rotation: camera.rotation,
        fov: camera.fov,
        near: camera.near,
        far: camera.far,
      })
      console.log('Scene:', {
        children: scene.children.length,
        objects: scene.children.map(child => child.type),
      })
      console.log('Renderer:', {
        size: { width: gl.domElement.width, height: gl.domElement.height },
        pixelRatio: gl.getPixelRatio(),
        antialias: gl.antialias,
      })
      console.log('===============================')
    }
  }, [isEnabled, scene, camera, gl])

  if (!isEnabled) return null

  return (
    <>
      {showStats && <Stats />}
      {showControls && <OrbitControls enableDamping dampingFactor={0.05} />}
      {showGrid && <Grid args={[10, 10]} cellColor="#6f6f6f" sectionColor="#9d4b4b" fadeDistance={25} fadeStrength={1} />}
      {showAxes && <axesHelper args={[5]} />}
    </>
  )
}

/**
 * Performance monitor component
 * Logs performance metrics to console
 */
export function PerformanceMonitor({ interval = 5000 }) {
  const { gl } = useThree()

  useEffect(() => {
    const intervalId = setInterval(() => {
      const info = gl.info
      console.log('=== Performance Metrics ===')
      console.log('Geometries:', info.memory.geometries)
      console.log('Textures:', info.memory.textures)
      console.log('Programs:', info.programs?.length || 0)
      console.log('Calls:', info.render.calls)
      console.log('Triangles:', info.render.triangles)
      console.log('Points:', info.render.points)
      console.log('Lines:', info.render.lines)
      console.log('========================')
    }, interval)

    return () => clearInterval(intervalId)
  }, [gl, interval])

  return null
}

/**
 * Scene inspector - click objects to log their info
 */
export function SceneInspector() {
  const { scene, camera, raycaster, gl } = useThree()
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const handleClick = (event) => {
      const mouse = new THREE.Vector2()
      mouse.x = (event.clientX / gl.domElement.clientWidth) * 2 - 1
      mouse.y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(scene.children, true)

      if (intersects.length > 0) {
        const object = intersects[0].object
        setSelected(object)
        console.log('=== Selected Object ===')
        console.log('Type:', object.type)
        console.log('Name:', object.name)
        console.log('Position:', object.position)
        console.log('Rotation:', object.rotation)
        console.log('Scale:', object.scale)
        console.log('Material:', object.material)
        console.log('Geometry:', object.geometry)
        console.log('Parent:', object.parent?.type)
        console.log('Children:', object.children.length)
        console.log('======================')
      }
    }

    gl.domElement.addEventListener('click', handleClick)
    return () => gl.domElement.removeEventListener('click', handleClick)
  }, [scene, camera, raycaster, gl])

  return null
}

