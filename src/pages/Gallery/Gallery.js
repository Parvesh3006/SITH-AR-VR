import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center } from '@react-three/drei'

// List of Sith relics to display in the gallery
const relics = [
  {
    name: 'Sith Lightsaber',
    model: '/assets/sith-lightsaber/scene.gltf',
    description: 'A crimson-bladed saber, symbol of Sith power and legacy.',
  },
  {
    name: 'Sith Amulet',
    model: '/assets/sith-amulet/scene.gltf',
    description: 'An ancient amulet imbued with dark side energies.',
  },
  {
    name: 'Sith Statue',
    model: '/assets/sith-statue/scene.gltf',
    description: 'A statue honoring a forgotten Sith Lord.',
  },
]

// 3D model loader for each relic, always centered and scaled
function RelicModel({ model, scale = 1 }) {
  const gltf = useGLTF(model)
  return (
    <Center>
      <primitive object={gltf.scene} scale={scale} />
    </Center>
  )
}

// Popup modal for fullscreen 3D view, always centered and fit
function RelicModal({ open, onClose, name, model }) {
  if (!open) return null
  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 2000,
        left: 0,
        top: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(24,24,27,0.98)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background 0.3s',
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: 32,
          right: 32,
          background: '#d90429',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 44,
          height: 44,
          fontSize: '2rem',
          cursor: 'pointer',
          zIndex: 2001,
          boxShadow: '0 0 12px #d90429',
        }}
        title='Close'
      >
        ×
      </button>
      <div
        style={{
          width: '90vw',
          maxWidth: 600,
          height: '70vh',
          background: '#18181b',
          borderRadius: 20,
          boxShadow: '0 0 32px #d90429',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Canvas
          camera={{ position: [0, 0, 3.5], fov: 45 }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 20,
            background: '#18181b',
            display: 'block',
          }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 10, 7]} intensity={1.3} />
          <Center>
            <RelicModel model={model} scale={1} />
          </Center>
          <OrbitControls enablePan={false} />
        </Canvas>
      </div>
      <div
        style={{
          color: '#fff',
          fontFamily: 'Orbitron, sans-serif',
          fontWeight: 700,
          fontSize: '1.4rem',
          marginTop: 24,
          textShadow: '0 0 8px #d90429',
          letterSpacing: 1,
        }}
      >
        {name}
      </div>
    </div>
  )
}

// 3D model card for each relic
function RelicCard({ name, model, description, onOpen }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      style={{
        width: 260,
        height: 340,
        background: hovered
          ? 'linear-gradient(135deg, #2d0b13 70%, #18181b 100%)'
          : 'linear-gradient(135deg, #18181b 70%, #2d0b13 100%)',
        borderRadius: 18,
        margin: 18,
        boxShadow: hovered
          ? '0 0 32px #ff1744, 0 8px 32px #000a'
          : '0 0 18px #d90429',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transition: 'transform 0.2s, box-shadow 0.2s, background 0.2s',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hovered ? 'scale(1.04) translateY(-6px)' : 'none',
      }}
      className='relic-card'
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onOpen}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onOpen()
      }}
      role='button'
      aria-label={`View ${name} in fullscreen`}
    >
      <div
        style={{
          width: '100%',
          height: 180,
          background: '#222',
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 3.2] }}
          style={{ height: 180, borderRadius: 18 }}
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 10, 7]} intensity={1.2} />
          <Center>
            <RelicModel model={model} />
          </Center>
          <OrbitControls enablePan={false} enableZoom={false} />
        </Canvas>
      </div>
      <div
        style={{
          color: '#d90429',
          fontWeight: 'bold',
          fontSize: '1.13em',
          marginTop: 14,
          fontFamily: 'Orbitron, sans-serif',
          letterSpacing: 1,
          textShadow: '0 0 8px #d90429',
        }}
      >
        {name}
      </div>
      <div
        style={{
          color: '#fff',
          opacity: 0.8,
          fontSize: '1em',
          margin: '10px 16px 0 16px',
          textAlign: 'center',
          fontFamily: 'Roboto, sans-serif',
        }}
      >
        {description}
      </div>
    </div>
  )
}

const Gallery = () => {
  const [modal, setModal] = useState({ open: false, name: '', model: '' })

  return (
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
        Sith Relics & Collectibles Gallery
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
        Explore legendary Sith artifacts, each rendered in interactive 3D.
        {/* <br />
        Hover and click to view each relic in fullscreen, perfectly centered and aligned. */}
      </p>
      <div
        style={{
          width: '100%',
          maxWidth: 1200,
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
          gap: 24,
        }}
      >
        {relics.map((relic) => (
          <RelicCard
            key={relic.name}
            {...relic}
            onOpen={() =>
              setModal({ open: true, name: relic.name, model: relic.model })
            }
          />
        ))}
      </div>
      <RelicModal
        open={modal.open}
        onClose={() => setModal({ open: false, name: '', model: '' })}
        name={modal.name}
        model={modal.model}
      />
    </div>
  )
}

export default Gallery
