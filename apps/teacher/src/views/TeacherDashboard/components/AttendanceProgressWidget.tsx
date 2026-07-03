import React from 'react';
import styled from 'styled-components';
import { CheckSquare } from 'lucide-react';

interface AttendanceProgressProps {
  presentCount: number;
  totalCount: number;
  onScanMore: () => void;
}

const Wrapper = styled.div`
  width: 100%;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 13px;
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: 800;
  letter-spacing: -.01em;
  color: #1F2937;
`;

const DetailLink = styled.button`
  font-size: 13px;
  font-weight: 700;
  color: #005A36;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  background: #fff;
  border: 1px solid #E6EEE9;
  border-radius: 18px;
  box-shadow: 0 4px 18px -8px rgba(0, 90, 54, 0.08);
  padding: 16px 18px;
`;

const IconBox = styled.span`
  flex: none;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: #E6F3ED;
  color: #005A36;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentCol = styled.div`
  flex: 1;
  min-width: 0;
`;

const TextRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const MainText = styled.span`
  font-weight: 700;
  font-size: 14.5px;
  color: #1F2937;
`;

const SubText = styled.span`
  font-size: 12.5px;
  font-weight: 600;
  color: #9CA3AF;
`;

const ProgressTrack = styled.div`
  height: 9px;
  border-radius: 999px;
  background: #EEF4F0;
  margin-top: 9px;
  overflow: hidden;
`;

const ProgressFill = styled.span<{ $pct: number }>`
  display: block;
  height: 100%;
  width: ${props => props.$pct}%;
  background: linear-gradient(90deg, #00794A, #34D399);
  border-radius: 999px;
  transition: width 0.5s ease;
`;

const ScanBtn = styled.button`
  flex: none;
  height: 40px;
  padding: 0 16px;
  border-radius: 12px;
  border: none;
  background: #005A36;
  color: #fff;
  font-family: inherit;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  transition: transform 0.15s;

  &:hover {
    transform: scale(1.04);
  }
`;

export const AttendanceProgressWidget: React.FC<AttendanceProgressProps> = ({ 
  presentCount, 
  totalCount, 
  onScanMore 
}) => {
  const percent = totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0;
  const remaining = Math.max(0, totalCount - presentCount);

  return (
    <Wrapper>
      <HeaderRow>
        <Title>Tiến độ điểm danh đầu ngày</Title>
        <DetailLink>Chi tiết</DetailLink>
      </HeaderRow>
      <Card>
        <IconBox>
          <CheckSquare size={22} strokeWidth={1.8} />
        </IconBox>
        <ContentCol>
          <TextRow>
            <MainText>Đã điểm danh {presentCount} / {totalCount} bé</MainText>
            <SubText>còn {remaining} bé chưa đến</SubText>
          </TextRow>
          <ProgressTrack>
            <ProgressFill $pct={percent} />
          </ProgressTrack>
        </ContentCol>
        <ScanBtn onClick={onScanMore}>Quét tiếp</ScanBtn>
      </Card>
    </Wrapper>
  );
};
