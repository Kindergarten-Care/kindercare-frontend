import styled from 'styled-components';

export const Container = styled.div`
  padding: 24px;
`;

export const LoadingText = styled.div`
  text-align: center;
  padding: 40px;
  color: #64748b;
  font-size: 16px;
`;

export const ErrorText = styled.div`
  text-align: center;
  padding: 40px;
  color: #ef4444;
  font-size: 16px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

export const BackButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background-color: white;
  cursor: pointer;
  color: #64748b;
  transition: all 0.2s;

  &:hover {
    background-color: #f8fafc;
    color: #0f172a;
    border-color: #cbd5e1;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
`;

export const Card = styled.div`
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 24px;
  margin-bottom: 24px;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e2e8f0;
`;

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoLabel = styled.span`
  font-size: 14px;
  color: #64748b;
`;

export const InfoValue = styled.span`
  font-size: 15px;
  font-weight: 500;
  color: #0f172a;
`;

export const Avatar = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 24px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Badge = styled.span<{ $status?: string }>`
  display: inline-block;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 13px;
  font-weight: 500;
  background-color: ${props => 
    props.$status === 'Studying' ? '#ecfccb' :
    props.$status === 'Pending_Assignment' ? '#fef08a' : '#f1f5f9'
  };
  color: ${props => 
    props.$status === 'Studying' ? '#4d7c0f' :
    props.$status === 'Pending_Assignment' ? '#854d0e' : '#475569'
  };
`;

export const AvatarWrapper = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InitialsText = styled.span`
  font-size: 24px;
  font-weight: 600;
  color: #94a3b8;
`;
