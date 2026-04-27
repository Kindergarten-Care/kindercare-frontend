import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { Section, Container, SectionHeading, SectionTitle, SectionDescription } from '../styles';

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ClassCard = styled.div`
  background-color: ${props => props.theme.colors.bgWhite};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0px 10px 40px -10px rgba(43, 105, 77, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 20px 40px -10px rgba(43, 105, 77, 0.15);
  }
`;

const CardAccent = styled.div<{ $color: string }>`
  height: 16px;
  background-color: ${props => props.$color};
`;

const CardContent = styled.div`
  padding: 32px 24px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const ClassName = styled.h3`
  font-size: 24px;
  font-weight: 600;
  color: ${props => props.theme.colors.textDark};
`;

const AgeBadge = styled.div`
  background-color: ${props => props.theme.colors.bgLight};
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  color: ${props => props.theme.colors.textGray};
  font-weight: 500;
`;

const ClassDesc = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: ${props => props.theme.colors.textGray};
  margin-bottom: 24px;
  min-height: 72px;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 192px;
  border-radius: 16px;
  overflow: hidden;
`;

export const Facilities: React.FC = () => {
  const classes = [
    {
      name: 'Khối Mầm',
      age: '18 - 36 tháng',
      desc: 'Tập trung phát triển vận động thô, cảm giác và nhận thức cơ bản trong môi trường an toàn tuyệt đối.',
      image: '/images/class_mam.png',
      color: '#E5E7A0',
    },
    {
      name: 'Khối Chồi',
      age: '3 - 4 tuổi',
      desc: 'Khuyến khích khám phá, phát triển ngôn ngữ, tư duy logic sơ khai và kỹ năng giao tiếp xã hội.',
      image: '/images/class_choi.png',
      color: '#A1D1FE',
    },
    {
      name: 'Khối Lá',
      age: '4 - 5 tuổi',
      desc: 'Trang bị hành trang tiền tiểu học: chữ cái, con số, kỹ năng tự lập và tư duy phản biện.',
      image: '/images/class_la.png',
      color: '#95D5B2',
    },
  ];

  return (
    <Section id="environment" $bg="#F8F9FA">
      <Container>
        <SectionHeading>CƠ SỞ VẬT CHẤT & LỚP HỌC</SectionHeading>
        <SectionTitle>Môi Trường Học Tập Lý Tưởng</SectionTitle>
        <SectionDescription>
          Không gian được thiết kế an toàn, kích thích sự sáng tạo và phù hợp với từng giai
          đoạn phát triển của trẻ.
        </SectionDescription>

        <CardsGrid>
          {classes.map((item, index) => (
            <ClassCard key={index}>
              <CardAccent $color={item.color} />
              <CardContent>
                <CardHeader>
                  <ClassName>{item.name}</ClassName>
                  <AgeBadge>{item.age}</AgeBadge>
                </CardHeader>
                <ClassDesc>{item.desc}</ClassDesc>
                <ImageContainer>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 350px"
                  />
                </ImageContainer>
              </CardContent>
            </ClassCard>
          ))}
        </CardsGrid>
      </Container>
    </Section>
  );
};
