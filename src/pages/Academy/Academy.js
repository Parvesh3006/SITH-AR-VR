import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center } from '@react-three/drei'

function SithLordModel() {
  const group = useRef()
  const gltf = useGLTF('/assets/sith-lord/scene.gltf')
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.2
    }
  })
  return (
    <Center>
      <group ref={group}>
        <primitive object={gltf.scene} scale={1.2} />
      </group>
    </Center>
  )
}

const Academy = () => (
  <div
    style={{
      minHeight: '80vh',
      background: 'linear-gradient(135deg, #18181b 60%, #2d0b13 100%)',
      borderRadius: 24,
      padding: '2.5rem 1rem 2.5rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxShadow: '0 0 32px #d90429',
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
      Sith Academy: Lord Training Arena
    </h2>
    <p
      style={{
        color: '#fff',
        opacity: 0.8,
        fontSize: '1.18rem',
        marginBottom: 32,
        textAlign: 'center',
        maxWidth: 700,
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      Enter the Sith Academy and face the legendary Sith Lord in interactive 3D.
      <br />
      {/* Rotate and inspect the model to study every detail of your dark side mentor. */}
    </p>
    <div
      style={{
        width: '100%',
        maxWidth: 700,
        height: '60vh',
        minHeight: 350,
        background: 'rgba(24,24,27,0.95)',
        borderRadius: 18,
        boxShadow: '0 0 24px #d90429',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
      }}
    >
      <Canvas
        camera={{ position: [0, 1.2, 55], fov: 45 }} // <-- z value increased from 5 to 8
        style={{
          width: '100%',
          height: '100%',
          borderRadius: 18,
          background: '#18181b',
        }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} />
        <SithLordModel />
        <OrbitControls enablePan={false} />
      </Canvas>
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
      {/* Use your mouse or touch to rotate the Sith Lord. Study the details and prepare for your next lesson in the dark side. */}
    </div>
  </div>
)

export default Academy
