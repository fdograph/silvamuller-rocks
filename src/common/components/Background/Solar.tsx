import React, { useMemo } from 'react';
import { useWindowSize } from '../../../hooks';
import {
  addUnit,
  randomBetween,
  randomPoint,
  sunRays,
} from '../../logic/geometry';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: translateZ(0) rotateZ(0);
  }
  100% {
    transform: translateZ(0) rotateZ(-360deg);
  }
`;

const Svg = styled.svg`
  .sun {
    --cx: 0;
    --cy: 0;
    --speed: 0;
    --delay: 0;
    transform: translateZ(0) rotateZ(0);
    animation-name: ${spin};
    animation-duration: 70000ms;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  line {
    stroke-width: 1px;
    stroke: var(--secondary-color);
  }
`;

const renderContent = (width: number, height: number) => {
  const base = width > height ? width : height;
  const rayLength = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  const count = Math.round(base * 0.007);

  return [...new Array(count)].map((v, i) => {
    const target = randomPoint(width, height);
    const speed = randomBetween(5000, 15000);
    const delay = randomBetween(0, 1000);
    const rays = sunRays(target, rayLength, 50);

    return (
      <g
        key={`${target.x}:${target.y}`}
        className="sun"
        style={{
          transformOrigin: `${addUnit(target.x, 'px')} ${addUnit(
            target.y,
            'px'
          )}`,
          animationDelay: addUnit(delay, 'ms'),
        }}
      >
        {rays.map((ray) => (
          <line
            key={`${target.x}:${target.y}:${ray.a.x}:${ray.b.y}`}
            x1={target.x}
            y1={target.y}
            x2={target.x}
            y2={target.y}
          >
            <animate
              repeatCount="indefinite"
              attributeName="x1"
              from={target.x}
              to={ray.b.x}
              begin={addUnit(delay, 'ms')}
              dur={addUnit(speed, 'ms')}
              calcMode="spline"
              keyTimes="0;1"
              keySplines="1 0 1 1"
            />
            <animate
              repeatCount="indefinite"
              attributeName="y1"
              from={target.y}
              to={ray.b.y}
              begin={addUnit(delay, 'ms')}
              dur={addUnit(speed, 'ms')}
              calcMode="spline"
              keyTimes="0;1"
              keySplines="1 0 1 1"
            />
            <animate
              repeatCount="indefinite"
              attributeName="x2"
              from={target.x}
              to={ray.b.x}
              begin={addUnit(delay, 'ms')}
              dur={addUnit(speed, 'ms')}
            />
            <animate
              repeatCount="indefinite"
              attributeName="y2"
              from={target.y}
              to={ray.b.y}
              begin={addUnit(delay, 'ms')}
              dur={addUnit(speed, 'ms')}
            />
          </line>
        ))}
      </g>
    );
  });
};

const Solar: React.FC = () => {
  const { width, height } = useWindowSize();
  const content = useMemo(() => renderContent(width, height), [height, width]);

  return <Svg>{content}</Svg>;
};

export default Solar;
