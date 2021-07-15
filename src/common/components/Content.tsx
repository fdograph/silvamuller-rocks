import React from 'react';
import styled, { keyframes } from 'styled-components';
import { IconLink } from './IconLink';
import { Github, LinkedIn, Npm } from './Icons';

const appear = keyframes`
  0% {
    opacity: 0;
    transform: translateY(80px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Wrapper = styled.div`
  flex: 1;
  z-index: 10;
  transform: translateZ(0);

  h1,
  h2,
  h3,
  .socials {
    animation-name: ${appear};
    animation-duration: 500ms;
    animation-timing-function: ease;
    animation-direction: normal;
    animation-fill-mode: both;
    opacity: 0;
    transform: translateY(80px);
  }

  h1 {
    font-size: 54px;
    font-weight: 800;
    line-height: 1.2em;
    animation-delay: 300ms;
  }

  h2 {
    font-size: 28px;
    font-weight: 400;
    animation-delay: 500ms;
  }

  h3 {
    font-weight: 400;
    animation-delay: 700ms;
  }

  .socials {
    animation-delay: 1000ms;
  }
`;

const Socials = styled.div`
  margin-top: 18px;
  background: var(--secondary-color);
  padding: 4px 6px;
  border-radius: 48px;
  display: inline-flex;
`;

export const Content: React.FC = () => {
  return (
    <Wrapper>
      <h1>
        Fernando
        <br />
        Silva Müller
      </h1>
      <h2>Fullstack developer</h2>
      <h3>Creative web artisan</h3>

      <Socials className="socials">
        <IconLink
          title="Check out my Github!"
          href="https://github.com/fdograph"
          icon={<Github />}
        />
        <IconLink
          title="LinkedIn Profile"
          href="https://www.linkedin.com/in/fernando-silva-muller"
          icon={<LinkedIn />}
        />
        <IconLink
          title="Npm profile"
          href="https://www.npmjs.com/~fdograph"
          icon={<Npm />}
        />
      </Socials>
    </Wrapper>
  );
};
