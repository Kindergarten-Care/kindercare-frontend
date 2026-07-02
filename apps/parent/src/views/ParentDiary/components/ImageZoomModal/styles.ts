'use client';

import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const zoomIn = keyframes`
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.85);
  backdrop-filter: blur(8px);
  z-index: 1200;
  display: grid;
  place-items: center;
  cursor: zoom-out;
  animation: ${fadeIn} 0.2s ease-out forwards;
`;

export const ImageWrapper = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${zoomIn} 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`;

export const ZoomedImage = styled.img`
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  cursor: default;
`;

export const CloseBtn = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  border: none;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
`;

export const DownloadLink = styled.a`
  position: absolute;
  top: -50px;
  right: 48px;
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
  display: grid;
  place-items: center;
  transition: all 0.15s ease;
  text-decoration: none;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
`;

export const Caption = styled.div`
  color: #f1f5f9;
  font-family: inherit;
  font-size: 14px;
  font-weight: 500;
  margin-top: 12px;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
`;
