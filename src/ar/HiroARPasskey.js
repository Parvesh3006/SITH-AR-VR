import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Center, OrbitControls, useGLTF } from '@react-three/drei'

// Animated holocron model: rotates smoothly
function HolocronModel() {
  const group = useRef()
  const gltf = useGLTF('/assets/scene.gltf')

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.5
    }
  })

  return (
    <group ref={group}>
      <primitive object={gltf.scene} scale={0.1} />
    </group>
  )
}

// Simple rotating loader
function Loader() {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background: '#18181b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 2000,
      }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          border: '8px solid #333',
          borderTop: '8px solid #d90429',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }}
      />
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}
      </style>
    </div>
  )
}

const HiroARPasskey = () => {
  const [step, setStep] = useState('start') // start, loading, verify, ar

  // When "To view the AR..." is pressed, show loader for 2s, then show verify
  const handleStart = () => {
    setStep('loading')
    setTimeout(() => setStep('verify'), 2000)
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      {step === 'start' && (
        <>
          <h2>Sith AR Experience</h2>
          <button
            style={{
              fontSize: '1.5rem',
              background: '#d90429',
              color: '#fff',
              padding: '2rem 3rem',
              border: 'none',
              borderRadius: '1rem',
              boxShadow: '0 0 30px #d90429',
              cursor: 'pointer',
              fontWeight: 'bold',
              marginTop: '3rem',
              transition: 'transform 0.2s',
            }}
            onClick={handleStart}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            To view the AR, download the passkey Hiro marker
          </button>
        </>
      )}

      {step === 'loading' && <Loader />}

      {step === 'verify' && (
        <div
          style={{
            position: 'fixed',
            zIndex: 1000,
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            background: '#18181b',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'rgba(24,24,27,0.98)',
              borderRadius: 20,
              boxShadow: '0 0 32px #d90429',
              padding: '2.5em 3em',
              color: '#fff',
              fontFamily: 'Orbitron, sans-serif',
              fontWeight: 700,
              fontSize: '1.5rem',
              letterSpacing: 1,
              textAlign: 'center',
              marginBottom: '2.5rem',
            }}
          >
            Hiro Marker access key verified
            <br />
            <span style={{ color: '#d90429', fontSize: '1.1em' }}>
              Now you can view the AR
            </span>
          </div>
          <button
            onClick={() => setStep('ar')}
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
            }}
          >
            View
          </button>
        </div>
      )}

      {step === 'ar' && (
        <div
          style={{
            position: 'fixed',
            zIndex: 1000,
            left: 0,
            top: 0,
            width: '100vw',
            height: '100vh',
            background: '#18181b',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <button
            onClick={() => setStep('start')}
            style={{
              position: 'absolute',
              top: 30,
              right: 30,
              background: '#d90429',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 48,
              height: 48,
              fontSize: '2rem',
              cursor: 'pointer',
              zIndex: 1001,
            }}
            title='Close AR'
          >
            ×
          </button>
          <div
            style={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Canvas
              camera={{ position: [0, 0, 6], fov: 45 }}
              style={{ width: '100vw', height: '100vh', background: '#18181b' }}
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 10, 7]} intensity={1.2} />
              <Center>
                <HolocronModel />
              </Center>
              <OrbitControls enablePan={false} />
            </Canvas>
          </div>
          <div
            style={{
              marginTop: '1.5rem',
              color: '#fff',
              fontSize: '1.2rem',
              textAlign: 'center',
              opacity: 0.7,
            }}
          >
            Sith Holocron AR Model
          </div>
        </div>
      )}
    </div>
  )
}

export default HiroARPasskey
