import React, { useState } from 'react';
import * as S from './styles';

interface LiveFeedItem {
  id: string;
  name: string;
  time: string;
  note: string | null;
  initial: string;
  color: string;
}

interface QRSmartHubWidgetProps {
  presentCount: number;
  totalCount: number;
  liveFeed: LiveFeedItem[];
  onScanSuccess: (name: string, note: string | null) => void;
}

const CHECK_IN_QUEUE = [
  { name: 'Gia Bảo', note: null },
  { name: 'Bảo Long', note: 'Dị ứng đậu phộng — RẤT nghiêm trọng, tránh xa món lạ' },
  { name: 'Thảo My', note: null },
  { name: 'Hải Anh', note: 'Đang sốt nhẹ 37.5°, cần theo dõi thêm' },
  { name: 'Đức Anh', note: null },
  { name: 'Phương Vy', note: null },
  { name: 'Tuấn Kiệt', note: 'Hôm nay ho nhiều, nhắc uống nước ấm' },
  { name: 'Bảo Ngọc', note: null },
];

export const QRSmartHubWidget: React.FC<QRSmartHubWidgetProps> = ({
  presentCount,
  totalCount,
  liveFeed,
  onScanSuccess
}) => {
  const [queueIndex, setQueueIndex] = useState(0);
  const [scanFlash, setScanFlash] = useState(false);

  const triggerSimulation = () => {
    setScanFlash(true);
    setTimeout(() => setScanFlash(false), 500);

    const child = CHECK_IN_QUEUE[queueIndex];
    onScanSuccess(child.name, child.note);

    setQueueIndex((prev) => (prev + 1) % CHECK_IN_QUEUE.length);
  };

  return (
    <S.WidgetContainer>
      <S.HeaderRow>
        <S.TitleContainer>
          <S.IconBlock>📷</S.IconBlock>
          <div>
            <S.Title>QR Smart Hub · Điểm danh thông minh</S.Title>
            <S.Subtitle>Bé quét mã QR tại cửa lớp, hệ thống ghi nhận tức thì</S.Subtitle>
          </div>
        </S.TitleContainer>
        
        <S.AttendanceCounter>
          <S.CounterDot />
          <S.CounterText>
            Có mặt: {presentCount} <span>/ {totalCount}</span>
          </S.CounterText>
        </S.AttendanceCounter>
      </S.HeaderRow>

      <S.GridContainer>
        {/* SCANNER CONTAINER */}
        <S.ScannerColumn>
          <S.CameraContainer>
            <S.GridOverlay />
            <S.LiveBadge>
              <S.PulseDot />
              LIVE · Cam lớp Mầm 1
            </S.LiveBadge>

            {/* Scanning viewport guidance corners */}
            <S.CornerGuide $pos="tl" />
            <S.CornerGuide $pos="tr" />
            <S.CornerGuide $pos="bl" />
            <S.CornerGuide $pos="br" />

            {/* Neon sweeping line */}
            <S.LaserLine />

            <S.CenterInfo>
              <S.BoxIcon>▣</S.BoxIcon>
              <S.HelpText>Đưa mã QR vào khung</S.HelpText>
            </S.CenterInfo>

            {/* Flash feedback overlay */}
            <S.FlashOverlay $active={scanFlash} />
          </S.CameraContainer>

          <S.TriggerButton onClick={triggerSimulation}>
            ▣ Mô phỏng một lượt quét
          </S.TriggerButton>

          <S.ButtonRow>
            <S.ActionButton onClick={triggerSimulation}>🔄 Đổi camera</S.ActionButton>
            <S.ActionButton onClick={triggerSimulation}>📝 Điểm danh thủ công</S.ActionButton>
          </S.ButtonRow>
        </S.ScannerColumn>

        {/* LOG FEED */}
        <S.FeedColumn>
          <S.FeedHeaderRow>
            <S.FeedTitle>Bảng tin điểm danh · Real-time</S.FeedTitle>
            <S.FeedBadge>{liveFeed.length} bé hôm nay</S.FeedBadge>
          </S.FeedHeaderRow>

          <S.FeedList>
            {liveFeed.map((item) => (
              <S.FeedItem key={item.id} $color={item.color}>
                <S.FeedAvatar $color={item.color}>{item.initial}</S.FeedAvatar>
                <S.FeedInfo>
                  <S.FeedNameRow>
                    <S.FeedName>{item.name}</S.FeedName>
                    <S.FeedTimeBadge>✓ Check-in {item.time}</S.FeedTimeBadge>
                  </S.FeedNameRow>
                  {item.note && (
                    <S.FeedWarning>
                      ⚠️ {item.note}
                    </S.FeedWarning>
                  )}
                </S.FeedInfo>
              </S.FeedItem>
            ))}

            <S.WaitingRow>
              <S.RippleWrapper>
                <S.RippleDot />
                <S.Ripples />
              </S.RippleWrapper>
              <S.WaitingText>Đang chờ lượt quét tiếp theo…</S.WaitingText>
            </S.WaitingRow>
          </S.FeedList>
        </S.FeedColumn>
      </S.GridContainer>
    </S.WidgetContainer>
  );
};
