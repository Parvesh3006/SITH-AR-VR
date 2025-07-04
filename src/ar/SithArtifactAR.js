import React from 'react'

const SithArtifactAR = () => (
  <div style={{ width: '100%', height: '80vh', border: 'none' }}>
    <iframe
      src='/ar.html'
      title='Sith AR'
      style={{ width: '100%', height: '100%', border: 'none' }}
      allow='camera *; fullscreen *'
    />
  </div>
)

export default SithArtifactAR
