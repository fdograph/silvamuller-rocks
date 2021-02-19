import React, { useMemo } from 'react';
import { useWindowSize } from '../../../hooks';
import {
  addUnit,
  describeArc,
  lowerBounds,
  randomBetween,
  upperBounds,
} from '../../logic/geometry';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: translateZ(0) rotateZ(0deg);
  }
  100% {
    transform: translateZ(0) rotateZ(360deg);
  }
`;

interface ArcCssVars {
  x: string;
  y: string;
  radius: string;
  speed: string;
  delay: string;
  path: string;
}

const Arc = styled.path<{ vars: ArcCssVars }>`
  --cx: ${({ vars }) => vars.x};
  --cy: ${({ vars }) => vars.y};
  --speed: ${({ vars }) => vars.speed};
  --delay: ${({ vars }) => vars.delay};
  fill: none;
  stroke-width: 1px;
  stroke: var(--secondary-color);
  backface-visibility: visible;
  transform: translateZ(0) rotateZ(0deg);
  transform-origin: var(--cx) var(--cy);
  animation-name: ${rotate};
  animation-duration: var(--speed);
  animation-delay: var(--delay);
  animation-timing-function: linear;
  animation-iteration-count: infinite;
`;

const renderArcs = (width: number, height: number) => {
  const base = width > height ? width : height;
  const count = Math.round(base * 0.03);

  return [...new Array(count)].map((n, i) => {
    const x = randomBetween(lowerBounds(width, 0.25), upperBounds(width, 1.25));
    const y = randomBetween(
      lowerBounds(height, 0.25),
      upperBounds(height, 1.25)
    );
    const radius = randomBetween(base / 3, base * 1.5);
    const angleLength = randomBetween(45, 100);

    const speed = randomBetween(4000, 20000);
    const delay = randomBetween(0, 500);
    const path = describeArc(x, y, radius, angleLength * -1, angleLength);

    const cssVars = {
      x: addUnit(x, 'px'),
      y: addUnit(y, 'px'),
      radius: addUnit(radius, 'px'),
      speed: addUnit(speed, 'ms'),
      delay: addUnit(delay, 'ms'),
      path,
    };

    return <Arc key={`${x}:${y}`} d={path} vars={cssVars} />;
  });
};

const Circles: React.FC = () => {
  const { width, height } = useWindowSize();
  const arcs = useMemo(() => renderArcs(width, height), [height, width]);
  return <svg>{arcs}</svg>;
};

export default Circles;
