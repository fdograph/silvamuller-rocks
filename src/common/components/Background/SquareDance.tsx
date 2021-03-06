import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useWindowSize } from '../../../hooks';
import {
  addUnit,
  centerOfSquare,
  createPoint,
  gridIteration,
  isEven,
  randomBetween,
} from '../../logic/geometry';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform:  rotateZ(720deg);
  }
`;

const Svg = styled.svg`
  rect {
    stroke-width: 0;
    fill: transparent;
    transform-origin: center center;
  }

  rect.marked {
    stroke-width: 1px;
    stroke: var(--secondary-color);
    animation-name: ${rotate};
    animation-duration: 10000ms;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-fill-mode: both;
  }
`;

const renderContent = (width: number, height: number) => {
  const isVertical = width < height;
  const vMax = isVertical ? height : width;
  const vMin = isVertical ? width : height;

  const size = 100;
  const maxCount = Math.ceil(vMax / size);
  const minCount = Math.ceil(vMin / size);

  const xCount = isVertical ? minCount : maxCount;
  const yCount = isVertical ? maxCount : minCount;

  const xShift = (size * xCount - width) / 2;
  const YShift = (size * yCount - height) / 2;

  const duration = 10000;

  const grid: JSX.Element[] = [];
  gridIteration(yCount, xCount, (col, row) => {
    const isEvenCol = isEven(col);
    const isEvenRow = isEven(row);

    const isMarked = (isEvenRow && isEvenCol) || (!isEvenRow && !isEvenCol);

    const x = size * col - xShift;
    const y = size * row - YShift;

    const delay = randomBetween(0, duration / 2);
    const speed = randomBetween(duration / 2, duration * 2);

    const squareSize = size;
    const center = centerOfSquare(x, y, squareSize);

    grid.push(
      <rect
        className={classNames({
          marked: isMarked,
        })}
        key={`${x}:${y}`}
        x={x}
        y={y}
        width={squareSize}
        height={squareSize}
        style={{
          transformOrigin: `${addUnit(center.x, 'px')} ${addUnit(
            center.y,
            'px'
          )}`,
          animationDelay: addUnit(delay, 'ms'),
          animationDuration: addUnit(speed, 'ms'),
        }}
      />
    );
  });

  return grid;
};

const SquareDance: React.FC = () => {
  const { width, height } = useWindowSize();
  const content = useMemo(() => renderContent(width, height), [height, width]);

  return <Svg>{content}</Svg>;
};

export default SquareDance;
