import React, { useMemo } from 'react';
import classNames from 'classnames';
import { useWindowSize } from '../../../hooks';
import { addUnit, gridIteration, randomBetween } from '../../logic/geometry';
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
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: normal;
    animation-fill-mode: both;
  }
`;

const renderContent = (width: number, height: number) => {
  const isVertical = width < height;
  const vMax = isVertical ? height : width;
  const vMin = isVertical ? width : height;

  // const size = 320 / 3;
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
    const isEvenCol = col % 2 !== 0;
    const isEvenRow = row % 2 !== 0;

    let isMarked = false;

    if ((isEvenRow && isEvenCol) || (!isEvenRow && !isEvenCol)) {
      isMarked = true;
    }

    const x = size * col - xShift;
    const y = size * row - YShift;

    const cx = x + size / 2;
    const cy = y + size / 2;

    const delay = randomBetween(0, duration / 2);

    grid.push(
      <rect
        className={classNames({
          marked: isMarked,
        })}
        key={`${x}:${y}`}
        x={x}
        y={y}
        width={size}
        height={size}
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
