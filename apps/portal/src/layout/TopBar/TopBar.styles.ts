"use client";
import styled from 'styled-components';

export const TopBarWrapper = styled.div`
  width: 94%;
  height: 64px;
  padding-left: 32px;
  padding-right: 32px;
  background: rgba(255, 255, 255, 0.80);
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  border-bottom: 1px #F1F5F9 solid;
  backdrop-filter: blur(6px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 50;
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const TitleText = styled.h1`
  color: #1E293B;
  font-size: 14px;
  font-family: Montserrat, sans-serif;
  font-weight: 600;
  line-height: 20px;
  margin: 0;
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
`;

export const IconButton = styled.button`
  padding: 8px;
  border-radius: 9999px;
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #F1F5F9;
  }
`;

export const ProfileBox = styled.div`
  width: 32px;
  height: 32px;
  margin-left: 8px;
  background: #DCFCE7;
  border-radius: 9999px;
  outline: 2px solid #BBF7D0;
  outline-offset: -2px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
