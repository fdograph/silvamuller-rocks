import React, { Fragment } from 'react';
import { GlobalStyle } from './globalStyles';
import { useThemes } from '../context/ThemeContext';
import styled from 'styled-components';
import { Content } from '../common/components/Content';
import Background from '../common/components/Background';

const MainWrapper = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--primary-color);
  color: var(--secondary-color);
  padding: 4vw 6vw;
`;

const ActionsWrapper = styled.div`
  flex: 0;
  position: relative;
  z-index: 10;
`;

const Button = styled.button`
  display: block;
  cursor: pointer;
  -webkit-appearance: none;
  appearance: none;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  border: none;
  padding: 0.5em 0.75em;
  margin: 0;
  border-radius: 1em;
  line-height: 1;
  font-size: 1.2em;
  font-weight: 600;
  box-shadow: none;
  transform: scale(1);
  transition: all 150ms ease;

  &:hover,
  &:active {
    transform: scale(1.2);
    background-color: var(--primary-color);
    color: var(--secondary-color);
    box-shadow: 0 0 1em rgba(0, 0, 0, 0.3);
  }
`;

const App: React.FC = () => {
  const { theme, next } = useThemes();

  return (
    <Fragment>
      <GlobalStyle {...theme.config} />
      <MainWrapper>
        <Background theme={theme.name} />
        <Content />
        <ActionsWrapper>
          <Button onClick={() => next()} title="Click me to change the theme">
            Click me :)
          </Button>
        </ActionsWrapper>
      </MainWrapper>
    </Fragment>
  );
};

export default App;
