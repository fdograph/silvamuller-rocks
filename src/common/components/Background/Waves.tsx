import React, { useMemo } from 'react';
import { useWindowSize } from '../../../hooks';
import { addUnit, gridIteration } from '../../logic/geometry';
import styled, { keyframes } from 'styled-components';

const shake = keyframes`
  0% {
    transform: translateZ(0) translateY(0) translateX(0);
  }
  100% {
    transform: translateZ(0) translateY(-2%) translateX(2%);
  }
`;

const Svg = styled.svg`
  circle {
    fill: var(--primary-color);
    stroke-width: 1px;
    stroke: var(--secondary-color);
    transform: translateZ(0) translateY(0) translateX(0);
    animation-name: ${shake};
    animation-duration: 4000ms;
    animation-timing-function: cubic-bezier(0.74, -2.1, 0.12, 2.82);
    animation-direction: alternate;
    animation-fill-mode: both;
    animation-iteration-count: infinite;
  }
`;

const renderContent = (width: number, height: number) => {
  const base = width > height ? width : height;
  const outerRadius = 50 * (width / base);
  const gap = outerRadius / 3;
  const innerWidth = width;
  const innerHeight = height;
  const innerRadius = outerRadius + gap * 2;
  const blockWidth = outerRadius * 2 - gap / 2;
  const xCount = Math.floor(innerWidth / blockWidth);
  const yCount = Math.floor(innerHeight / blockWidth);

  const restX = innerWidth - xCount * blockWidth + gap;
  const restY = innerHeight - yCount * blockWidth + gap;

  const grid: JSX.Element[] = [];

  gridIteration(yCount, xCount, (col, row) => {
    const cx = blockWidth * col + restX / 2;
    const cy = blockWidth * row + restY / 2;
    const radius = innerRadius;
    const delay = 60 * (grid.length / 2) * -1;

    grid.push(
      <circle
        key={`${cx}:${cy}`}
        cx={cx}
        cy={cy}
        r={radius}
        style={{
          transformOrigin: `${addUnit(cx, 'px')} ${addUnit(cy, 'px')}`,
          animationDelay: addUnit(delay, 'ms'),
        }}
      />
    );
  });

  return grid;
};

const Waves: React.FC = () => {
  const { width, height } = useWindowSize();
  const content = useMemo(() => renderContent(width, height), [height, width]);

  return <Svg>{content}</Svg>;
};

export default Waves;
