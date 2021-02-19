import React from 'react';
import styled from 'styled-components';

const StyledLink = styled.a<{ size: number }>`
  display: inline-flex;
  margin: 0 5px;

  &:first-child {
    margin-left: 0;
  }

  &:last-child {
    margin-right: 0;
  }

  span {
    --icon-size: ${({ size }) => size}px;
    width: var(--icon-size);
    height: var(--icon-size);
    display: inline-flex;
    background: var(--secondary-color);
    padding: 5px;
    border-radius: 100em;
    transition: all 250ms ease;
  }

  &:hover span {
    background: var(--primary-color);
  }

  span > svg {
    display: inline-flex;
    flex: 1;
    width: 100%;
    height: 100%;
    fill: var(--primary-color);
    transform: scale(1);
    transition: all 250ms ease;
  }

  &:hover span > svg {
    transform: scale(0.8);
    fill: var(--secondary-color);
  }
`;

export interface IconLinkProps {
  className?: string;
  title: string;
  href: string;
  icon: React.ReactNode;
}

export const IconLink: React.FC<IconLinkProps> = ({
  className,
  title,
  href,
  icon,
}) => {
  return (
    <StyledLink
      size={40}
      className={className}
      href={href}
      title={title}
      aria-label={title}
      target="_blank"
      rel="external nofollow"
    >
      <span>{icon}</span>
    </StyledLink>
  );
};
