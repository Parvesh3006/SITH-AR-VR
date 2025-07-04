import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

function SithStarfighter() {
  const group = useRef()
  const gltf = useGLTF('/assets/tie-fighter/scene.gltf')
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.2
  })
  return (
    <group ref={group}>
      <primitive object={gltf.scene} scale={0.012} />
    </group>
  )
}

function CockpitVR() {
  const gltf = useGLTF('/assets/tie-cockpit/scene.gltf')
  const group = useRef()
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.1
  })
  return (
    <group ref={group}>
      <primitive object={gltf.scene} scale={0.018} />
    </group>
  )
}

const Hangar = () => {
  const [vrMode, setVrMode] = useState(false)
  const controlsRef = useRef()

  // Handler to toggle VR mode and reset camera
  const handleEnterCockpit = () => {
    setVrMode(true)
    setTimeout(() => {
      controlsRef.current?.reset()
    }, 0)
  }

  const handleExitCockpit = () => {
    setVrMode(false)
    setTimeout(() => {
      controlsRef.current?.reset()
    }, 0)
  }

  return (
    <div
      style={{
        minHeight: '80vh',
        width: '100%',
        background: 'linear-gradient(135deg, #18181b 60%, #2d0b13 100%)',
        borderRadius: 24,
        boxShadow: '0 0 32px #d90429',
        padding: '2.5rem 0 1.5rem 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <h2
        style={{
          color: '#d90429',
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 700,
          fontSize: '2.2rem',
          letterSpacing: 2,
          marginBottom: '1.2rem',
          textShadow: '0 0 12px #d90429',
        }}
      >
        Sith Starfighter Hangar
      </h2>
      <div
        style={{
          width: '100%',
          maxWidth: 900,
          height: '60vh',
          minHeight: 350,
          background: 'rgba(24,24,27,0.95)',
          borderRadius: 18,
          boxShadow: '0 0 24px #d90429',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 24,
          position: 'relative',
        }}
      >
        <Canvas
          camera={{ position: [0, 4, 16], fov: 50 }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 18,
            background: '#18181b',
          }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 10, 7]} intensity={1.2} />
          {!vrMode ? <SithStarfighter /> : <CockpitVR />}
          <OrbitControls ref={controlsRef} enablePan={false} />
        </Canvas>
        {!vrMode ? (
          <button
            style={{
              position: 'absolute',
              right: 32,
              top: 32,
              background: '#d90429',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.7em 1.5em',
              fontWeight: 'bold',
              fontSize: '1.1em',
              cursor: 'pointer',
              boxShadow: '0 0 10px #d90429',
              transition: 'background 0.2s, transform 0.2s',
              zIndex: 10,
            }}
            onClick={handleEnterCockpit}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#b0021a'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#d90429'
            }}
          >
            Enter VR Cockpit
          </button>
        ) : (
          <button
            style={{
              position: 'absolute',
              right: 32,
              top: 32,
              background: '#222',
              color: '#fff',
              border: 'none',
              borderRadius: 8,
              padding: '0.6em 1.2em',
              fontWeight: 'bold',
              fontSize: '1em',
              cursor: 'pointer',
              boxShadow: '0 0 8px #d90429',
              marginTop: 12,
              transition: 'background 0.2s, transform 0.2s',
              zIndex: 10,
            }}
            onClick={handleExitCockpit}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#d90429'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#222'
            }}
          >
            Exit Cockpit
          </button>
        )}
      </div>
      <div
        style={{
          textAlign: 'center',
          color: '#fff',
          fontSize: '1.15rem',
          fontFamily: 'Orbitron, sans-serif',
          letterSpacing: 1,
          marginBottom: 12,
          opacity: 0.85,
        }}
      >
        {vrMode
          ? 'You are now in the VR cockpit. Look around and imagine piloting a Sith starfighter!'
          : 'Explore the 3D Sith starfighter. Click "Enter VR Cockpit" for an immersive view.'}
      </div>
      <div
        style={{
          marginTop: 18,
          color: '#888',
          fontSize: '1.05rem',
          fontStyle: 'italic',
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#d90429', fontWeight: 600 }}>Tip:</span>
        Use your mouse or touch to rotate the view.
        {vrMode
          ? 'Click "Exit Cockpit" to return to the hangar.'
          : 'Click the red button to enter the cockpit.'}
      </div>
    </div>
  )
}

export default Hangar
