import React, { useEffect, useMemo, useState } from 'react';
import { useWindowSize } from '../../../hooks';
import { addUnit } from '../../logic/geometry';
import styled, { keyframes } from 'styled-components';

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

const Line = styled.line`
  stroke-width: 1px;
  animation-name: ${appear};
  animation-duration: 500ms;
  animation-timing-function: ease;
  animation-direction: normal;
  animation-fill-mode: both;
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
    const color = `hsl(${hue}, 100%, 50%)`;
    const delay = addUnit((100 / count) * i * i, 'ms');

    return (
      <Line
        key={`${y}:${i}`}
        x1="0"
        y1={addUnit(y, '%')}
        x2="100%"
        y2={addUnit(y, '%')}
        stroke={color}
        style={{ animationDelay: delay }}
      />
    );
  });
};

const nextHue = (hue: number) => {
  if (hue === 360) {
    return 0;
  }

  return hue + 1;
};

const animateHue = (hue: number, setHue: (h: number) => void) => () => {
  const next = nextHue(hue);
  setHue(next);
  return requestAnimationFrame(animateHue(next, setHue));
};

const DarkLines: React.FC = () => {
  const { width, height } = useWindowSize();
  const [started, setStarted] = useState<boolean>(false);
  const [startHue, setHue] = useState<number>(70);
  const lines = useMemo(() => renderLines(width, height, startHue), [
    height,
    startHue,
    width,
  ]);

  useEffect(() => {
    if (!started) {
      setStarted(true);
      let frame = animateHue(startHue, setHue)();
      return () => {
        cancelAnimationFrame(frame);
        setStarted(false);
      };
    }
  }, [startHue, started]);

  return <svg>{lines}</svg>;
};

export default DarkLines;
