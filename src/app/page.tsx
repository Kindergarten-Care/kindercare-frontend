'use client';

import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
  color: #1e293b;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
`;

const Hero = styled.section`
  position: relative;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #ec4899 100%);
  color: white;
  padding: 0 2rem;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://www.transparenttextures.com/patterns/cubes.png');
    opacity: 0.1;
  }
`;

const Badge = styled.span`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  padding: 0.5rem 1.5rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 2rem;
  border: 1px border rgba(255, 255, 255, 0.3);
  animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 1.5rem;
  line-height: 1.1;
  animation: ${fadeIn} 1s ease-out;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  max-width: 600px;
  text-align: center;
  opacity: 0.9;
  margin-bottom: 3rem;
  animation: ${fadeIn} 1.2s ease-out;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  animation: ${fadeIn} 1.4s ease-out;
`;

const PrimaryButton = styled.button`
  background: white;
  color: #6366f1;
  padding: 1rem 2.5rem;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 1.125rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
    background: #f1f5f9;
  }
`;

const SecondaryButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: white;
  padding: 1rem 2.5rem;
  border-radius: 0.75rem;
  font-weight: 700;
  font-size: 1.125rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const Grid = styled.section`
  max-width: 1200px;
  margin: -5rem auto 5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
  position: relative;
  z-index: 10;
`;

const Card = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid #e2e8f0;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  }
`;

const IconWrapper = styled.div<{ color: string }>`
  width: 4rem;
  height: 4rem;
  background: ${props => props.color};
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: white;
  font-size: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const CardText = styled.p`
  color: #64748b;
  line-height: 1.6;
`;

export default function Home() {
  return (
    <Container>
      <Hero>
        <Badge>✨ New Version 2.0 is out</Badge>
        <Title>Kindergarten Care</Title>
        <Subtitle>
          Nền tảng quản lý mầm non toàn diện, hiện đại và bảo mật nhất cho con yêu của bạn.
        </Subtitle>
        <ButtonGroup>
          <PrimaryButton>Bắt đầu ngay</PrimaryButton>
          <SecondaryButton>Tìm hiểu thêm</SecondaryButton>
        </ButtonGroup>
      </Hero>

      <Grid>
        <Card>
          <IconWrapper color="#6366f1">📚</IconWrapper>
          <CardTitle>Quản lý Học tập</CardTitle>
          <CardText>
            Theo dõi tiến độ phát triển, bài giảng và hoạt động hàng ngày của bé một cách chi tiết.
          </CardText>
        </Card>
        <Card>
          <IconWrapper color="#ec4899">🥗</IconWrapper>
          <CardTitle>Dinh dưỡng & Sức khỏe</CardTitle>
          <CardText>
            Test site build at dev
          </CardText>
        </Card>
        <Card>
          <IconWrapper color="#a855f7">👨‍👩‍👧</IconWrapper>
          <CardTitle>Kết nối Phụ huynh</CardTitle>
          <CardText>
            Hệ thống liên lạc trực tiếp giữa nhà trường và phụ huynh qua tin nhắn và thông báo.
          </CardText>
        </Card>
      </Grid>
    </Container>
  );
}
