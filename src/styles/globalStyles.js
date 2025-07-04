import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Orbitron', sans-serif;
    transition: background 0.3s, color 0.3s;
    min-height: 100vh;
    margin: 0;
  }
`
