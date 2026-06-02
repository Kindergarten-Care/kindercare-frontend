import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin-top: 32px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
`;

export const Card = styled.div`
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.03);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  position: relative;
  z-index: 1;
`;

export const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const MainIconBox = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #f8fafc;
  border: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
`;

export const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #1f2937;
  margin: 0;
  line-height: 1.5;
`;

export const StatusBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 2px 10px;
  background-color: #dcfce7;
  border: 1px solid #bbf7d0;
  border-radius: 9999px;
  width: fit-content;
`;

export const StatusDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #22c55e;
`;

export const StatusText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  font-size: 12px;
  color: #046e1e;
`;

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ActionBtn = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: none;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #64748b;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f1f5f9;
  }
`;

export const Divider = styled.div`
  width: 100%;
  border-top: 1px solid #f8fafc;
  margin: 0;
`;

export const BottomSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`;

export const AddressRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #64748b;
`;

export const AddressText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.5;
`;

export const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const StatBox = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  background-color: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 6px;
  padding: 7px 13px;
  color: #334155;
`;

export const StatText = styled.span`
  font-family: 'Montserrat', sans-serif;
  font-weight: 500;
  font-size: 14px;
`;
