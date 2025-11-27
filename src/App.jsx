// Main app component - contains the entire 3D experience
import { Canvas } from '@react-three/fiber'
import { ScrollControls, useScroll, Sky, PerspectiveCamera } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

// This component handles the camera movement based on scroll
function CameraRig() {
  const scroll = useScroll() // Gets scroll position (0 to 1)
  const cameraRef = useRef()

  useFrame(() => {
    // Update camera position every frame based on scroll
    const scrollProgress = scroll.offset // 0 = top, 1 = bottom
    
    if (cameraRef.current) {
      // Animate camera from far away to close up as user scrolls
      // Phase 1 (0-0.3): High above steppe
      // Phase 2 (0.3-0.7): Approaching yurt
      // Phase 3 (0.7-1.0): Entering yurt
      
      if (scrollProgress < 0.3) {
        // Start position - high and far
        const t = scrollProgress / 0.3
        cameraRef.current.position.z = 100 - (70 * t) // Move from z=100 to z=30
        cameraRef.current.position.y = 50 - (45 * t)  // Move from y=50 to y=5
      } else if (scrollProgress < 0.7) {
        // Approach yurt
        const t = (scrollProgress - 0.3) / 0.4
        cameraRef.current.position.z = 30 - (25 * t) // Move from z=30 to z=5
        cameraRef.current.position.y = 5 - (3 * t)   // Move from y=5 to y=2
      } else {
        // Enter yurt
        const t = (scrollProgress - 0.7) / 0.3
        cameraRef.current.position.z = 5 - (5 * t)   // Move from z=5 to z=0
        cameraRef.current.position.y = 2 - (0.5 * t) // Move from y=2 to y=1.5
      }
      
      // Always look at the yurt (positioned at origin)
      cameraRef.current.lookAt(0, 0, 0)
    }
  })

  return <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 50, 100]} />
}

// Simple steppe ground plane
function Steppe() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      {/* Large flat plane for the ground */}
      <planeGeometry args={[200, 200]} />
      {/* Green-brown color for steppe grass */}
      <meshStandardMaterial color="#8B7355" />
    </mesh>
  )
}

// Simple yurt placeholder (cylinder + cone roof)
function Yurt() {
  return (
    <group position={[0, 0, 0]}>
      {/* Cylindrical walls */}
      <mesh position={[0, 1.5, 0]}>
        <cylinderGeometry args={[3, 3, 3, 32]} />
        <meshStandardMaterial color="#E8DCC4" />
      </mesh>
      
      {/* Conical roof */}
      <mesh position={[0, 4, 0]}>
        <coneGeometry args={[3.5, 2, 32]} />
        <meshStandardMaterial color="#D4B896" />
      </mesh>
      
      {/* Door (simple rectangle) */}
      <mesh position={[0, 1.5, 3]}>
        <boxGeometry args={[1, 2, 0.1]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </group>
  )
}

// Main scene component
function Scene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* Sky with blue-to-horizon gradient */}
      <Sky sunPosition={[100, 20, 100]} />
      
      {/* Camera controller */}
      <CameraRig />
      
      {/* 3D objects */}
      <Steppe />
      <Yurt />
    </>
  )
}

// Main App component
export default function App() {
  return (
    <div className="scroll-container">
      {/* Canvas creates the WebGL context for Three.js */}
      <Canvas style={{ position: 'fixed', top: 0, left: 0 }}>
        {/* ScrollControls makes scroll data available to child components */}
        <ScrollControls pages={5} damping={0.1}>
          <Scene />
        </ScrollControls>
      </Canvas>
      
      {/* Scroll indicator text */}
      <div style={{
        position: 'fixed',
        bottom: '50px',
        left: '50%',
        transform: 'translateX(-50%)',
        color: 'white',
        fontSize: '18px',
        fontFamily: 'Arial',
        zIndex: 10
      }}>
        Scroll to explore ↓
      </div>
    </div>
  )
}