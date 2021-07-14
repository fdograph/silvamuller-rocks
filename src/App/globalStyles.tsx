import { createGlobalStyle } from 'styled-components';
import { ThemeColors } from '../common/logic/theme';

export const GlobalStyle = createGlobalStyle<Partial<ThemeColors>>`
  :root {
    --primary-color: ${(props) => props.primary};
    --secondary-color: ${(props) => props.secondary}
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  html, body {
    height: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    background: var(--primary-color);
    color: var(--secondary-color);
    overflow: hidden;
    
    display: flex;
    flex-direction: column;
    
    #root {
      flex: 1;
    }
  }
`;
