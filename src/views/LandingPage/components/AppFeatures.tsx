'use client';

import React from 'react';
import styled from 'styled-components';
import { Section, Container, SectionHeading, SectionTitle, SectionDescription } from '../styles';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FeatureItem = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  box-shadow: 0px 10px 30px -10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 15px 30px -10px rgba(0, 0, 0, 0.1);
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FeatureHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconWrapper = styled.div<{ $bg: string }>`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background-color: ${props => props.$bg};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-size: 28px;
  line-height: 1;
  font-family: "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", sans-serif;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
`;

const FeatureText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const FeatureTitle = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.textDark};
  margin: 0;
`;

const FeatureDesc = styled.p`
  font-size: 15px;
  line-height: 1.6;
  color: ${props => props.theme.colors.textGray};
  padding-left: 72px;
  margin: 0;
  
  @media (max-width: 480px) {
    padding-left: 0;
  }
`;

const MockupWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 600px;
  width: 100%;
`;

const BlurOverlay = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-color: rgba(149, 213, 178, 0.3);
  filter: blur(100px);
  z-index: 1;
`;

const PhoneMockup = styled.div`
  width: 300px;
  height: 600px;
  border-radius: 40px;
  border: 8px solid ${props => props.theme.colors.borderDark};
  background-color: ${props => props.theme.colors.bgWhite};
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
  z-index: 2;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const StyledSwiper = styled(Swiper)`
  width: 100%;
  max-width: 340px;
  padding-bottom: 40px;
  z-index: 2;
  
  .swiper-pagination-bullet-active {
    background-color: ${props => props.theme.colors.primary};
  }
`;

const PhoneScreen = styled.div`
  background-color: ${props => props.theme.colors.primary};
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 32px 16px 16px;
`;

const AppName = styled.h5`
  font-size: 18px;
  font-weight: 700;
  color: ${props => props.theme.colors.bgWhite};
  margin-bottom: 24px;
`;

const NotificationArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${props => props.theme.colors.bgLight};
  padding: 16px;
  border-radius: 24px 24px 0px 0px;
  flex: 1;
`;

const NotificationCard = styled.div`
  background-color: ${props => props.theme.colors.bgWhite};
  border: 1px solid ${props => props.theme.colors.borderLight};
  border-radius: 12px;
  padding: 12px;
  display: flex;
  gap: 12px;
  align-items: center;
  box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.05);
`;

const NotifIcon = styled.div<{ $bg: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.$bg};
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

const NotifText = styled.div`
  display: flex;
  flex-direction: column;
`;

const NotifTitle = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${props => props.theme.colors.textDark};
`;

const NotifTime = styled.span`
  font-size: 10px;
  color: ${props => props.theme.colors.textGray};
`;

export const AppFeatures: React.FC = () => {
  const features = [
    {
      title: 'Điểm danh thông minh',
      desc: 'Nhận thông báo ngay khi bé đến lớp và lúc ra về, đảm bảo an toàn tuyệt đối.',
      icon: '🔔',
      bg: '#B0F1CC',
    },
    {
      title: 'Nhật ký sinh hoạt',
      desc: 'Theo dõi bữa ăn, giấc ngủ, tình hình sức khỏe và các hoạt động học tập hàng ngày qua hình ảnh.',
      icon: '📅',
      bg: '#CDE5FF',
    },
    {
      title: 'Minh bạch tài chính',
      desc: 'Thông báo học phí chi tiết, thanh toán trực tuyến dễ dàng và an toàn ngay trên ứng dụng.',
      icon: '💳',
      bg: '#E5E7A0',
    },
    {
      title: 'Bảo mật dữ liệu',
      desc: 'Thông tin và hình ảnh của bé chỉ được chia sẻ riêng tư giữa giáo viên và phụ huynh.',
      icon: '🔒',
      bg: '#E1E3E4',
    },
  ];

  return (
    <Section id="technology" $bg="#E8F5E9">
      <Container>
        <SectionHeading>CÔNG NGHỆ KẾT NỐI</SectionHeading>
        <SectionTitle>Ứng dụng Quản lý KinderCare</SectionTitle>
        <SectionDescription>
          Kết nối liên tục giữa nhà trường và gia đình. Mọi hoạt động của bé đều
          được cập nhật nhanh chóng, minh bạch và bảo mật.
        </SectionDescription>

        <ContentGrid>
          <FeaturesList>
            {features.map((item, index) => (
              <FeatureItem key={index}>
                <FeatureHeader>
                  <IconWrapper $bg={item.bg}>{item.icon}</IconWrapper>
                  <FeatureTitle>{item.title}</FeatureTitle>
                </FeatureHeader>
                <FeatureDesc>{item.desc}</FeatureDesc>
              </FeatureItem>
            ))}
          </FeaturesList>

          <MockupWrapper>
            <BlurOverlay />
            <StyledSwiper
              modules={[Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
            >
              <SwiperSlide>
                <PhoneMockup>
                  <PhoneScreen>
                    <AppName>KinderCare App</AppName>
                    <NotificationArea>
                      <NotificationCard>
                        <NotifIcon $bg="#A1D1FE">👶</NotifIcon>
                        <NotifText>
                          <NotifTitle>Bé đã đến trường</NotifTitle>
                          <NotifTime>07:45 AM - Điểm danh bởi Cô Lan</NotifTime>
                        </NotifText>
                      </NotificationCard>
                      <NotificationCard>
                        <NotifIcon $bg="#B0F1CC">🚌</NotifIcon>
                        <NotifText>
                          <NotifTitle>Bé đã lên xe đưa đón</NotifTitle>
                          <NotifTime>04:15 PM - Tài xế Nguyễn Văn A</NotifTime>
                        </NotifText>
                      </NotificationCard>
                    </NotificationArea>
                  </PhoneScreen>
                </PhoneMockup>
              </SwiperSlide>

              <SwiperSlide>
                <PhoneMockup>
                  <PhoneScreen>
                    <AppName>KinderCare App</AppName>
                    <NotificationArea>
                      <NotificationCard>
                        <NotifIcon $bg="#E5E7A0">🍲</NotifIcon>
                        <NotifText>
                          <NotifTitle>Thực đơn trưa nay</NotifTitle>
                          <NotifTime>Cơm gà, canh bí đỏ, chuối chín</NotifTime>
                        </NotifText>
                      </NotificationCard>
                      <NotificationCard>
                        <NotifIcon $bg="#CDE5FF">📸</NotifIcon>
                        <NotifText>
                          <NotifTitle>Hình ảnh hoạt động mới</NotifTitle>
                          <NotifTime>Giờ học vẽ sáng nay của bé</NotifTime>
                        </NotifText>
                      </NotificationCard>
                    </NotificationArea>
                  </PhoneScreen>
                </PhoneMockup>
              </SwiperSlide>

              <SwiperSlide>
                <PhoneMockup>
                  <PhoneScreen>
                    <AppName>KinderCare App</AppName>
                    <NotificationArea>
                      <NotificationCard>
                        <NotifIcon $bg="#B0F1CC">💳</NotifIcon>
                        <NotifText>
                          <NotifTitle>Thông báo học phí tháng 5</NotifTitle>
                          <NotifTime>Đã gửi hóa đơn chi tiết</NotifTime>
                        </NotifText>
                      </NotificationCard>
                      <NotificationCard>
                        <NotifIcon $bg="#E1E3E4">✅</NotifIcon>
                        <NotifText>
                          <NotifTitle>Thanh toán thành công</NotifTitle>
                          <NotifTime>Cảm ơn phụ huynh đã đóng phí</NotifTime>
                        </NotifText>
                      </NotificationCard>
                    </NotificationArea>
                  </PhoneScreen>
                </PhoneMockup>
              </SwiperSlide>

              <SwiperSlide>
                <PhoneMockup>
                  <PhoneScreen>
                    <AppName>KinderCare App</AppName>
                    <NotificationArea>
                      <NotificationCard>
                        <NotifIcon $bg="#E1E3E4">🔒</NotifIcon>
                        <NotifText>
                          <NotifTitle>Quyền truy cập camera</NotifTitle>
                          <NotifTime>Chỉ mở trong khung giờ học</NotifTime>
                        </NotifText>
                      </NotificationCard>
                      <NotificationCard>
                        <NotifIcon $bg="#A1D1FE">👥</NotifIcon>
                        <NotifText>
                          <NotifTitle>Chia sẻ riêng tư</NotifTitle>
                          <NotifTime>Hình ảnh chỉ hiển thị với gia đình</NotifTime>
                        </NotifText>
                      </NotificationCard>
                    </NotificationArea>
                  </PhoneScreen>
                </PhoneMockup>
              </SwiperSlide>
            </StyledSwiper>
          </MockupWrapper>
        </ContentGrid>
      </Container>
    </Section>
  );
};
