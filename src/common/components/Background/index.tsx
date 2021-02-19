import React from 'react';
import { ThemeName } from '../../logic/theme';
import styled from 'styled-components';
import Yellow from './Yellow';
import Circles from './Circles';
import DarkLines from './DarkLines';
import Waves from './Waves';
import Bullets from './Bullets';
import Solar from './Solar';
import Cubes from './Cubes';

const BgWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const SvgWrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;

  svg {
    display: block;
    flex: 1;
  }
`;

const renderAnimation = (theme: ThemeName) => {
  switch (theme) {
    case 'darkLines':
      return <DarkLines />;
    case 'circles':
      return <Circles />;
    case 'yellow':
      return <Yellow />;
    case 'waves':
      return <Waves />;
    case 'bullets':
      return <Bullets />;
    case 'solar':
      return <Solar />;
    case 'cubes':
      return <Cubes />;
    default:
      return <DarkLines />;
  }
};

export interface BackgroundProps {
  theme: ThemeName;
}

const Background: React.FC<BackgroundProps> = ({ theme }) => {
  return (
    <BgWrapper>
      <SvgWrapper>{renderAnimation(theme)}</SvgWrapper>
    </BgWrapper>
  );
};

export default Background;
