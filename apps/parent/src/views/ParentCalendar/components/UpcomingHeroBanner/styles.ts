'use client';

import styled from 'styled-components';

export const Banner = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: linear-gradient(120deg, #014728 0%, #026B43 100%);
  border-radius: 16px;
  box-shadow: 0 8px 24px -6px rgba(0, 90, 54, 0.35);
  padding: 20px 24px;
  margin-bottom: 22px;
  color: #fff;
  flex-wrap: wrap;
`;

export const BannerIcon = styled.div`
  width: 46px;
  height: 46px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.18);
  flex-shrink: 0;
`;

export const BannerInfo = styled.div`
  min-width: 0;
`;

export const BannerLabel = styled.div`
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
`;

export const BannerTitle = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 19px;
  font-weight: 800;
  letter-spacing: -0.01em;
  margin-top: 3px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const BannerMeta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12.5px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.82);
  margin-top: 5px;
`;

export const StatTiles = styled.div`
  margin-left: auto;
  display: flex;
  gap: 10px;
`;

export const StatTile = styled.div`
  min-width: 72px;
  padding: 10px 12px;
  border-radius: 13px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.08);
  text-align: center;
`;

export const StatValue = styled.div`
  font-family: var(--font-plus-jakarta, 'Plus Jakarta Sans'), sans-serif;
  font-size: 21px;
  font-weight: 800;
  line-height: 1.1;
`;

export const StatLabel = styled.div`
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.72);
  margin-top: 3px;
`;
