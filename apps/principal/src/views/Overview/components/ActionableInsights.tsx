import React, { useState } from 'react';
import { 
  ActionableGrid, 
  ActionCard, 
  SectionTitle, 
  ActionList, 
  ActionItem, 
  ActionTitle, 
  ActionSubtext, 
  ActionButton, 
  BroadcastInput 
} from '../styles';
import { mockApprovalQueue, mockMedicalAlerts, mockTeacherSubstitutions } from '../mockData';

export default function ActionableInsights() {
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const handleBroadcast = () => {
    if (!broadcastMessage) return;
    alert(`Đã gửi thông báo khẩn cấp: ${broadcastMessage}`);
    setBroadcastMessage('');
  };

  return (
    <ActionableGrid>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <ActionCard>
          <SectionTitle>Danh sách Duyệt nhanh</SectionTitle>
          <ActionList>
            {mockApprovalQueue.map((item) => (
              <ActionItem key={item.id}>
                <div>
                  <ActionTitle>{item.type}: {item.title}</ActionTitle>
                  <ActionSubtext>{item.submittedBy} • {item.time}</ActionSubtext>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <ActionButton>Duyệt</ActionButton>
                  <ActionButton $danger>Từ chối</ActionButton>
                </div>
              </ActionItem>
            ))}
          </ActionList>
        </ActionCard>

        <ActionCard style={{ borderLeft: '4px solid #f59e0b' }}>
          <SectionTitle>Điều phối Giáo viên Khẩn cấp</SectionTitle>
          <ActionList>
            {mockTeacherSubstitutions.map((item) => (
              <ActionItem key={item.id}>
                <div>
                  <ActionTitle>Trống {item.class}</ActionTitle>
                  <ActionSubtext>Vắng: {item.absentTeacher} ({item.reason})</ActionSubtext>
                  <ActionSubtext style={{ color: '#10b981', marginTop: '8px' }}>
                    Gợi ý thay thế: {item.substituteOptions.join(', ')}
                  </ActionSubtext>
                </div>
                <ActionButton>Phân công</ActionButton>
              </ActionItem>
            ))}
          </ActionList>
        </ActionCard>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <ActionCard $warning>
          <SectionTitle style={{ color: '#b91c1c' }}>⚠️ Cảnh báo An toàn & Y tế Hôm nay</SectionTitle>
          <ActionList>
            {mockMedicalAlerts.map((alert) => (
              <ActionItem key={alert.id} style={{ background: '#fef2f2', borderColor: '#fee2e2' }}>
                <div>
                  <ActionTitle>{alert.student} ({alert.class}) có mặt hôm nay</ActionTitle>
                  <ActionSubtext style={{ color: '#b91c1c', fontWeight: 500 }}>
                    Dị ứng: {alert.allergy}
                  </ActionSubtext>
                  <ActionSubtext>
                    Thực đơn trưa nay có: <strong>"{alert.menuConflict}"</strong>{' -> '}Vui lòng kiểm tra suất ăn thay thế.
                  </ActionSubtext>
                </div>
              </ActionItem>
            ))}
          </ActionList>
        </ActionCard>

        <ActionCard>
          <SectionTitle>Phát thanh Thông báo Khẩn cấp</SectionTitle>
          <BroadcastInput 
            placeholder="Nhập nội dung thông báo khẩn tới toàn bộ thiết bị Phụ huynh & Giáo viên..."
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
          />
          <ActionButton onClick={handleBroadcast} style={{ width: '100%', padding: '10px', fontSize: '0.9rem' }}>
            🚀 Phát thông báo ngay lập tức
          </ActionButton>
        </ActionCard>
      </div>
    </ActionableGrid>
  );
}
