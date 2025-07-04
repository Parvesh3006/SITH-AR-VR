import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center } from '@react-three/drei'

function SithTempleModel() {
  const group = useRef()
  const gltf = useGLTF('/assets/sith-temple/scene.gltf')
  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.05
    }
  })
  return (
    <Center>
      <group ref={group}>
        <primitive object={gltf.scene} scale={5.2} />
      </group>
    </Center>
  )
}

const Temple = () => (
  <div
    style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #18181b 60%, #2d0b13 100%)',
      borderRadius: 24,
      padding: 0,
      margin: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 0 32px #d90429',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div
      style={{
        width: 700,
        height: 500,
        maxWidth: '95vw',
        maxHeight: '80vh',
        margin: 'auto',
        position: 'relative',
        zIndex: 1,
        borderRadius: 24,
        boxShadow: '0 0 32px #d90429',
        background: 'rgba(24,24,27,0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 200,
      }}
    >
      <Canvas
        camera={{ position: [0, 6, 18], fov: 40 }}
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          borderRadius: 24,
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 20, 10]} intensity={1.2} />
        <pointLight position={[0, 10, 0]} intensity={0.7} color='#d90429' />
        <SithTempleModel />
        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2.1}
          minDistance={8}
          maxDistance={22}
        />
      </Canvas>
    </div>
    <div
      style={{
        position: 'absolute',
        top: '7%',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        color: '#fff',
        fontFamily: 'Orbitron, sans-serif',
        fontWeight: 700,
        fontSize: '2rem',
        letterSpacing: 2,
        textAlign: 'center',
        textShadow: '0 0 16px #d90429',
        background: 'rgba(24,24,27,0.7)',
        borderRadius: 18,
        padding: '0.7em 2em',
        boxShadow: '0 0 24px #d90429',
        maxWidth: 500,
        marginTop: -25,
      }}
    >
      SITH TEMPLE
      <div
        style={{
          fontSize: '1.1rem',
          fontWeight: 400,
          marginTop: 8,
          color: '#fff',
          opacity: 0.85,
        }}
      >
        {/* Enter the ancient stronghold of the Sith. Explore the mysteries and power of the dark side. */}
      </div>
    </div>
  </div>
)

export default Temple
