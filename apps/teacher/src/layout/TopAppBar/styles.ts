import styled from 'styled-components';

export const HeaderContainer = styled.header`
  background-color: #f6fbf2;
  border-bottom: 1px solid rgba(190, 202, 188, 0.1);
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  box-shadow: 0px 4px 10px rgba(14, 121, 60, 0.05);
  position: relative;
  z-index: 2;
  width: 100%;
`;

export const GreetingSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GreetingTitle = styled.h2`
  color: #005e2c;
  font-size: 24px;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  line-height: 1.4;
  padding-top: 4px; /* extra space for top accents */
`;

export const GreetingDate = styled.p`
  color: #3f493f;
  font-size: 16px;
  font-family: 'Montserrat', sans-serif;
  margin: 0;
  margin-top: 4px;
`;

export const ActionsSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

export const NotificationWrapper = styled.div`
  position: relative;
`;

export const NotificationButton = styled.div`
  position: relative;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  cursor: pointer;
`;

export const NotificationBadge = styled.div`
  position: absolute;
  top: 6px;
  right: 6px;
  width: 8px;
  height: 8px;
  background-color: #ba1a1a;
  border-radius: 50%;
  border: 2px solid #f6fbf2;
`;

export const ProfileSection = styled.div`
  background-color: #dcfce7;
  border-radius: 12px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  min-width: 200px;
`;

export const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #97f7ac;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ProfileName = styled.span`
  color: #181d18;
  font-size: 14px;
  font-weight: bold;
  font-family: 'Montserrat', sans-serif;
  line-height: 1.4;
`;

export const ProfileRole = styled.span`
  color: #6f7a6e;
  font-size: 12px;
  font-family: 'Montserrat', sans-serif;
`;
