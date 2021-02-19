import React, { useMemo } from 'react';
import { useWindowSize } from '../../../hooks';
import {
  calculateX,
  calculateY,
  degree2radian,
  randomBetween,
} from '../../logic/geometry';
import styled from 'styled-components';

const Svg = styled.svg`
  line {
    stroke-width: 1px;
    stroke: var(--secondary-color);
  }
`;

const renderLines = (width: number, height: number) => {
  const count = Math.round(height * 0.3);
  const distance = width * 3;
  const x1 = (width / 2) * -1;
  const angle = -30;
  const ra = degree2radian(angle);

  return [...new Array(count)].map((v, i) => {
    const l = randomBetween(20, 400);
    const y1 = Math.floor(Math.random() * height * 5);

    const x2 = calculateX(x1, l, ra);
    const y2 = calculateY(y1, l, ra);

    const x3 = calculateX(x2, distance, ra);
    const y3 = calculateY(y2, distance, ra);

    const x4 = calculateX(x3, l, ra);
    const y4 = calculateY(y3, l, ra);

    const speed = Math.floor(Math.random() * distance * 10) + distance;

    return (
      <line key={`${x1}:${x2}:${y1}:${y2}`} x1={x1} y1={y1} x2={x2} y2={y2}>
        <animate
          repeatCount="indefinite"
          attributeName="x1"
          from={x1}
          to={x3}
          begin="0"
          dur={`${speed}ms`}
        />
        <animate
          repeatCount="indefinite"
          attributeName="y1"
          from={y1}
          to={y3}
          begin="0"
          dur={`${speed}ms`}
        />
        <animate
          repeatCount="indefinite"
          attributeName="x2"
          from={x2}
          to={x4}
          begin="0"
          dur={`${speed}ms`}
        />
        <animate
          repeatCount="indefinite"
          attributeName="y2"
          from={y2}
          to={y4}
          begin="0"
          dur={`${speed}ms`}
        />
      </line>
    );
  });
};

const Yellow: React.FC = () => {
  const { width, height } = useWindowSize();
  const lines = useMemo(() => renderLines(width, height), [height, width]);

  return <Svg>{lines}</Svg>;
};

export default Yellow;
