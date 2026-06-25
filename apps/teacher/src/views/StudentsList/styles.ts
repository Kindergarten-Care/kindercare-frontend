import styled from 'styled-components';
import Image from 'next/image';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: ${props => props.theme.colors.fg};
  margin: 0;
  font-family: ${props => props.theme.fonts.display};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

export const Card = styled.div`
  background: ${props => props.theme.colors.surface};
  border-radius: 20px;
  padding: 24px;
  border: 1px solid ${props => props.theme.colors.border};
  box-shadow: ${props => props.theme.shadows.soft};
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

export const StudentInfo = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const AvatarWrapper = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 16px;
  overflow: hidden;
  position: relative;
  background: #E5E7EB;
  flex-shrink: 0;
`;

export const StudentAvatar = styled(Image)`
  object-fit: cover;
`;

export const InfoCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StudentName = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
  margin: 0;
`;

export const StudentDetails = styled.span`
  font-size: 13px;
  color: ${props => props.theme.colors.muted};
`;

export const Divider = styled.div`
  height: 1px;
  background: ${props => props.theme.colors.border};
  width: 100%;
`;

export const MetricsRow = styled.div`
  display: flex;
  gap: 12px;
`;

export const MetricBox = styled.div`
  flex: 1;
  background: #F9FAFB;
  border-radius: 12px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;

export const MetricLabel = styled.span`
  font-size: 11px;
  color: #6B7280;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.5px;
`;

export const MetricValue = styled.span`
  font-size: 14px;
  font-weight: 700;
  color: ${props => props.theme.colors.fg};
`;

export const ContactSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ParentItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #F3F4F6;
  padding: 10px 14px;
  border-radius: 12px;
`;

export const ParentInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ParentName = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: ${props => props.theme.colors.fg};
`;

export const ParentRel = styled.span`
  font-size: 12px;
  color: ${props => props.theme.colors.muted};
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconButton = styled.a`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #E5E7EB;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #4B5563;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.theme.colors.green};
    color: white;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 48px;
  color: ${props => props.theme.colors.muted};
  font-size: 16px;
  background: ${props => props.theme.colors.surface};
  border-radius: 16px;
`;
