import React, { useMemo, useState } from 'react';
import { useWindowSize } from '../../../hooks';
import { addUnit } from '../../logic/geometry';
import styled, { keyframes } from 'styled-components';

const toHsl = (h: number) => `hsl(${h}, 100%, 50%)`;

const turnBy = (h: number, count: number, place: number) => {
  const step = 360 / count;
  return h + (step * place + step);
};

const generateHueKeyframes = (startHue: number) => {
  return keyframes`
  0% {
    stroke: ${toHsl(turnBy(startHue, 5, 0))}
  }
  10% {
    stroke: ${toHsl(turnBy(startHue, 5, 1))}
  }
  20% {
    stroke: ${toHsl(turnBy(startHue, 5, 2))}
  }
  30% {
    stroke: ${toHsl(turnBy(startHue, 5, 3))}
  }
  40% {
    stroke: ${toHsl(turnBy(startHue, 5, 4))}
  }
  50% {
    stroke: ${toHsl(turnBy(startHue, 5, 0))}
  }
  60% {
    stroke: ${toHsl(turnBy(startHue, 5, 1))}
  }
  70% {
    stroke: ${toHsl(turnBy(startHue, 5, 2))}
  }
  80% {
    stroke: ${toHsl(turnBy(startHue, 5, 3))}
  }
  90% {
    stroke: ${toHsl(turnBy(startHue, 5, 4))}
  }
  100% {
    stroke: ${toHsl(turnBy(startHue, 5, 5))}
  }
`;
};

const Svg = styled.svg``;

const appear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(100px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Line = styled.line<{ vars: { startHue: number } }>`
  stroke-width: 1px;
  animation-name: ${appear},
    ${(props) => generateHueKeyframes(props.vars.startHue)};
  animation-duration: 500ms, 8000ms;
  animation-timing-function: ease, linear;
  animation-direction: normal, normal;
  animation-fill-mode: both;
  animation-iteration-count: 1, infinite;
  opacity: 0;
  transform: translateY(80px);
`;

const renderLines = (width: number, height: number, startHue: number) => {
  const hueRange = 100;
  const count = Math.round(height * 0.05);
  const hueStep = hueRange / count;

  return [...new Array(count)].map((v, i) => {
    const y = (100 / count) * i;
    const hue = startHue + hueStep * i;
    const delay = addUnit((100 / count) * i * i, 'ms');

    return (
      <Line
        key={`${y}:${i}`}
        x1="0"
        y1={addUnit(y, '%')}
        x2="100%"
        y2={addUnit(y, '%')}
        style={{ animationDelay: `${delay}, 0ms` }}
        vars={{ startHue: hue }}
      />
    );
  });
};

const DarkLines: React.FC = () => {
  const { width, height } = useWindowSize();
  const lines = useMemo(() => renderLines(width, height, 70), [height, width]);

  return <Svg>{lines}</Svg>;
};

export default DarkLines;
