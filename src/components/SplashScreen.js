import React, { useState, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'

function CharacterIntro({ onZoomInEnd }) {
  const group = useRef()
  const [zoom, setZoom] = useState(0)
  const start = useRef(null)

  useFrame((state) => {
    if (zoom < 1) {
      if (!start.current) start.current = state.clock.getElapsedTime()
      const elapsed = state.clock.getElapsedTime() - start.current
      const t = Math.min(elapsed / 4, 1)
      setZoom(t)
      if (t === 1 && onZoomInEnd) onZoomInEnd()
    }
    // Camera starts far and zooms in for a cinematic effect
    const cam = state.camera
    cam.position.lerp({ x: 0, y: 0, z: 32 - 8 * zoom }, 0.15)
    cam.lookAt(0, 0, 0)
  })

  const gltf = useGLTF('/assets/darth-vader/scene.gltf')
  return (
    <Center>
      <group ref={group}>
        <primitive object={gltf.scene} scale={0.25} />
      </group>
    </Center>
  )
}

export default function SplashScreen({ onEnter }) {
  const [showMessage, setShowMessage] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const messageTimeout = useRef()
  const buttonTimeout = useRef()

  const handleZoomInEnd = () => {
    if (!showMessage) {
      messageTimeout.current = setTimeout(() => setShowMessage(true), 0)
      buttonTimeout.current = setTimeout(() => setShowButton(true), 1500)
    }
  }

  React.useEffect(() => {
    return () => {
      clearTimeout(messageTimeout.current)
      clearTimeout(buttonTimeout.current)
    }
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 9999,
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        background: '#0a0a0a',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        transition: 'opacity 0.7s',
        overflow: 'hidden',
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 32], fov: 40 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'transparent',
          zIndex: 1,
        }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 10, 7]} intensity={1.3} />
        <CharacterIntro onZoomInEnd={handleZoomInEnd} />
      </Canvas>
      {/* Absolutely positioned text box on the right */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          right: '12%',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          pointerEvents: 'none',
        }}
      >
        {showMessage && (
          <div
            style={{
              color: '#fff',
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
              fontSize: '1.5rem',
              letterSpacing: 2,
              textAlign: 'center',
              textShadow: '0 0 16px #d90429',
              background: 'rgba(10,10,10,0.55)',
              borderRadius: 18,
              padding: '1.2em 2em',
              boxShadow: '0 0 32px #d90429',
              marginBottom: '2.5rem',
              animation: 'fadeIn 1s',
              minWidth: 340,
              maxWidth: 420,
              pointerEvents: 'auto',
              marginTop: 200,
              marginRight: -100,
            }}
          >
            WELCOME TO THE WORLD OF SITH AR/VR
            <br />
            <span style={{ color: '#d90429', fontSize: '1.2em' }}>
              THE DARK SIDE OF THE FORCE
            </span>
          </div>
        )}
        {showButton && (
          <button
            onClick={onEnter}
            style={{
              background: '#d90429',
              color: '#fff',
              border: 'none',
              borderRadius: 12,
              padding: '1em 2.5em',
              fontWeight: 'bold',
              fontSize: '1.2em',
              cursor: 'pointer',
              boxShadow: '0 0 18px #d90429',
              letterSpacing: 1,
              transition: 'background 0.2s, transform 0.2s',
              animation: 'fadeIn 1s',
              marginRight: 0,
              pointerEvents: 'auto',
            }}
          >
            ENTER
          </button>
        )}
      </div>
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.25);}
            to { opacity: 1; transform: scale(1);}
          }
        `}
      </style>
    </div>
  )
}
