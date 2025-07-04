import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { darkTheme } from './styles/theme'
import { GlobalStyles } from './styles/globalStyles'
import NavBar from './components/NavBar/NavBar'
import Temple from './pages/Temple/Temple'
import Hangar from './pages/Hangar/Hangar'
import Gallery from './pages/Gallery/Gallery'
import Academy from './pages/Academy/Academy'
import HiroARPasskey from './ar/HiroARPasskey'
import { Container } from './components/Container'
import SplashScreen from './components/SplashScreen'
import EasterEggFlow from './components/EasterEggFlow'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  // When splash ends, show the Easter Egg flow
  const handleSplashEnter = () => {
    setShowSplash(false)
    setShowEasterEgg(true)
  }

  // When Easter Egg flow ends, show the main app
  const handleEasterEggFinish = () => {
    setShowEasterEgg(false)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <Router>
        {showSplash ? (
          <SplashScreen onEnter={handleSplashEnter} />
        ) : showEasterEgg ? (
          <EasterEggFlow onFinish={handleEasterEggFinish} />
        ) : (
          <>
            <NavBar />
            <Container>
              <Routes>
                <Route path='/' element={<Temple />} />
                <Route path='/hangar' element={<Hangar />} />
                <Route path='/gallery' element={<Gallery />} />
                <Route path='/academy' element={<Academy />} />
                <Route path='/ar' element={<HiroARPasskey />} />
              </Routes>
            </Container>
          </>
        )}
      </Router>
    </ThemeProvider>
  )
}

export default App
