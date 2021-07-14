import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from '../../../hooks';
import styled from 'styled-components';
import { ParticleOrchestrator } from '../../logic/particles';

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

const Bubbles: React.FC = () => {
  const { width, height } = useWindowSize();
  const [bubbles, setBubbles] = useState<ParticleOrchestrator | null>(null);
  const refCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (refCanvas.current) {
      if (bubbles === null) {
        setBubbles(new ParticleOrchestrator(width, height, refCanvas.current));
        return;
      }

      bubbles.init(width, height, refCanvas.current);
    }

    return () => {
      bubbles?.reset();
    };
  }, [width, height, bubbles]);

  return <Canvas ref={refCanvas} />;
};

export default Bubbles;
