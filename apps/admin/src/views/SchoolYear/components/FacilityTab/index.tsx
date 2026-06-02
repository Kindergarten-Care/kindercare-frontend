import React from 'react';
import { BuildingIcon, EditIcon, ClassIcon } from '@kindercare/ui';
import {
  Container,
  Grid,
  Card,
  TopSection,
  HeaderLeft,
  MainIconBox,
  HeaderText,
  Title,
  StatusBadge,
  StatusDot,
  StatusText,
  ActionWrapper,
  ActionBtn,
  Divider,
  BottomSection,
  AddressRow,
  AddressText,
  StatsRow,
  StatBox,
  StatText
} from './styles';

const PinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const TrashIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const mockData = [
  {
    id: '1',
    name: 'Cơ sở Quận 7',
    status: 'Đang hoạt động',
    address: '123 Nguyễn Văn Linh, P. Tân Thuận Tây, Quận 7, TP.HCM',
    buildings: 4,
    classes: 25
  },
  {
    id: '2',
    name: 'Cơ sở Gò Vấp',
    status: 'Đang hoạt động',
    address: '456 Quang Trung, P. 10, Q. Gò Vấp, TP.HCM',
    buildings: 2,
    classes: 12
  }
];

export const FacilityTab: React.FC = () => {
  return (
    <Container>
      <Grid>
        {mockData.map((item) => (
          <Card key={item.id}>
            <TopSection>
              <HeaderLeft>
                <MainIconBox>
                  <BuildingIcon size={18} />
                </MainIconBox>
                <HeaderText>
                  <Title>{item.name}</Title>
                  <StatusBadge>
                    <StatusDot />
                    <StatusText>{item.status}</StatusText>
                  </StatusBadge>
                </HeaderText>
              </HeaderLeft>
              <ActionWrapper>
                <ActionBtn>
                  <EditIcon size={14} />
                </ActionBtn>
                <ActionBtn>
                  <TrashIcon size={14} />
                </ActionBtn>
              </ActionWrapper>
            </TopSection>
            <Divider />
            <BottomSection>
              <AddressRow>
                <PinIcon size={16} />
                <AddressText>{item.address}</AddressText>
              </AddressRow>
              <StatsRow>
                <StatBox>
                  <BuildingIcon size={14} />
                  <StatText>{item.buildings} Tòa nhà</StatText>
                </StatBox>
                <StatBox>
                  <ClassIcon size={14} />
                  <StatText>{item.classes} Phòng học</StatText>
                </StatBox>
              </StatsRow>
            </BottomSection>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};
