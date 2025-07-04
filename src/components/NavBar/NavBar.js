import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Nav = styled.nav`
  background: #18181b;
  border-bottom: 2px solid #d90429;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.h1`
  color: #d90429;
  font-family: 'Orbitron', sans-serif;
  text-shadow: 0 0 10px #d90429;
  margin: 0;
`

const NavLinks = styled.div`
  a {
    color: #f8fafc;
    margin-left: 2rem;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      color: #d90429;
      text-shadow: 0 0 10px #d90429;
    }
  }
`

const NavBar = () => (
  <Nav>
    <Logo>SITH AR/VR</Logo>
    <NavLinks>
      <Link to='/'>Temple</Link>
      <Link to='/hangar'>Hangar</Link>
      <Link to='/gallery'>Gallery</Link>
      <Link to='/academy'>Academy</Link>
      <Link to='/ar'>AR</Link>
    </NavLinks>
  </Nav>
)

export default NavBar
