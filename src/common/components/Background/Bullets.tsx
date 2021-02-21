import React, { useMemo } from 'react';
import { useWindowSize } from '../../../hooks';
import {
  addUnit,
  createLine,
  Point,
  projectPoint,
  randomBetween,
  randomPoint,
} from '../../logic/geometry';
import styled from 'styled-components';

const Svg = styled.svg`
  line {
    stroke-width: 1px;
    stroke: var(--secondary-color);
  }
`;

const buildRays = (
  target: Point,
  distance: number,
  length: number,
  angle: number
) => {
  const mirrorAngle = 180 - angle;

  const topLeftPointAngle = mirrorAngle * -1;
  const topLeftPoint = projectPoint(target, distance, topLeftPointAngle);
  const topLeftRay = createLine(topLeftPoint, length, topLeftPointAngle);

  const topRightPointAngle = angle * -1;
  const topRightPoint = projectPoint(target, distance, topRightPointAngle);
  const topRightRay = createLine(topRightPoint, length, topRightPointAngle);

  const bottomLeftPointAngle = mirrorAngle;
  const bottomLeftPoint = projectPoint(target, distance, bottomLeftPointAngle);
  const bottomLeftRay = createLine(
    bottomLeftPoint,
    length,
    bottomLeftPointAngle
  );

  const bottomRightPointAngle = angle;
  const bottomRightPoint = projectPoint(
    target,
    distance,
    bottomRightPointAngle
  );
  const bottomRightRay = createLine(
    bottomRightPoint,
    length,
    bottomRightPointAngle
  );

  return [topLeftRay, topRightRay, bottomLeftRay, bottomRightRay];
};

const renderContent = (width: number, height: number) => {
  const base = width > height ? width : height;
  const count = 20;

  return [...new Array(count)]
    .map(() => {
      const target = randomPoint(width, height);
      const distance = base;
      const length = 400;
      const speed = randomBetween(1500, 4500);
      const delay = randomBetween(-10000, 10000);
      const angle = 45;
      const rays = buildRays(target, distance, length, angle);

      return rays.map((ray, i) => (
        <line
          key={`${i}:${target.x}:${target.y}:${ray.a.x}:${ray.a.x}:${ray.b.x}:${ray.b.x}`}
          x1={target.x}
          y1={target.y}
          x2={target.x}
          y2={target.y}
        >
          <animate
            repeatCount="indefinite"
            attributeName="x1"
            from={target.x}
            to={ray.a.x}
            begin={addUnit(delay, 'ms')}
            dur={addUnit(speed, 'ms')}
          />
          <animate
            repeatCount="indefinite"
            attributeName="y1"
            from={target.y}
            to={ray.a.y}
            begin={addUnit(delay, 'ms')}
            dur={addUnit(speed, 'ms')}
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
      ));
    })
    .flat(Infinity);
};

const Bullets: React.FC = () => {
  const { width, height } = useWindowSize();
  const content = useMemo(() => renderContent(width, height), [height, width]);

  return <Svg>{content}</Svg>;
};

export default Bullets;
