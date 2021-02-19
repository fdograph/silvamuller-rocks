import React, { useMemo } from 'react';
import { useWindowSize } from '../../../hooks';
import { addUnit, concentricCubes, createPoint } from '../../logic/geometry';
import styled, { keyframes } from 'styled-components';

const cubeSpin = keyframes`
  0% {
    transform: rotateX(0deg) rotateY(0) rotateZ(0) translateZ(0);
  }
  100% {
    transform: rotateX(360deg) rotateY(360deg) rotateZ(0) translateZ(0);
  }
`;

interface CssVars {
  x: string;
  y: string;
  speed: string;
  size: string;
}

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  position: relative;
  perspective: 800px;
  overflow: hidden;
`;

const Cube = styled.div<{ vars: CssVars }>`
  --cx: ${(props) => props.vars.x};
  --cy: ${(props) => props.vars.y};
  --cube-size: ${(props) => props.vars.size};
  --delay: 15ms;
  --speed: ${(props) => props.vars.speed};
  position: absolute;
  top: calc(var(--cy) - (var(--cube-size) / 2));
  left: calc(var(--cx) - (var(--cube-size) / 2));
  display: flex;
  width: var(--cube-size);
  height: var(--cube-size);
  transform-style: preserve-3d;
  backface-visibility: visible;
  transform: rotateX(0) rotateY(0) rotateZ(0) translateZ(0);
  animation-name: ${cubeSpin};
  animation-duration: var(--speed);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-delay: var(--delay);

  .side {
    display: flex;
    align-content: stretch;
    justify-content: stretch;
    position: absolute;
    width: var(--cube-size);
    height: var(--cube-size);
    backface-visibility: visible;
    border: 1px solid var(--secondary-color);
    border-radius: 100%;
  }

  .side.front {
    transform: rotateY(0deg) translateZ(calc(var(--cube-size) / 2));
  }
  .side.back {
    transform: rotateY(180deg) translateZ(calc(var(--cube-size) / 2));
  }
  .side.right {
    transform: rotateY(90deg) translateZ(calc(var(--cube-size) / 2));
  }
  .side.left {
    transform: rotateY(-90deg) translateZ(calc(var(--cube-size) / 2));
  }
  .side.top {
    transform: rotateX(90deg) translateZ(calc(var(--cube-size) / 2));
  }
  .side.bottom {
    transform: rotateX(-90deg) translateZ(calc(var(--cube-size) / 2));
  }
`;

const renderContent = (width: number, height: number) => {
  const center = createPoint((width / 3) * 2, (height / 3) * 2);
  const minSize = width * 0.035;
  const maxSize = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  const cubes = concentricCubes(center, minSize, maxSize, 8);
  return cubes.map((cube, i) => (
    <Cube
      className="cube"
      vars={{
        x: addUnit(cube.center.x, 'px'),
        y: addUnit(cube.center.y, 'px'),
        size: addUnit(cube.size, 'px'),
        speed: addUnit((i + 1) * 5000, 'ms'),
      }}
    >
      <div className="side front" />
      <div className="side back" />
      <div className="side left" />
      <div className="side right" />
      <div className="side top" />
      <div className="side bottom" />
    </Cube>
  ));
};

const Waves: React.FC = () => {
  const { width, height } = useWindowSize();
  const content = useMemo(() => renderContent(width, height), [height, width]);

  return <Wrapper>{content}</Wrapper>;
};

export default Waves;
