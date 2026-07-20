import React from 'react';
import { AlertTriangle, Pill, Activity } from 'lucide-react';
import * as S from '../styles';
import { BMI_CATEGORIES } from '@/config/types/health';

interface StatsSidebarProps {
  allergiesCount: number;
  pendingRequestsCount: number;
  pendingMeasurementCount: number;
  onShowAllergies: () => void;
  onShowMedications: () => void;
}

export const StatsSidebar: React.FC<StatsSidebarProps> = ({
  allergiesCount,
  pendingRequestsCount,
  pendingMeasurementCount,
  onShowAllergies,
  onShowMedications,
}) => {
  return (
    <S.LeftSidebar>
      <S.StatCardsCol>
        <S.StatCard
          $color="#DC2626"
          $bg="#FFF5F5"
          $border="#FECACA"
          onClick={onShowAllergies}
          type="button"
        >
          <S.StatIcon $color="#DC2626" $bg="#FEE2E2">
            <AlertTriangle size={20} />
          </S.StatIcon>
          <S.StatInfo>
            <S.StatValue>{allergiesCount}</S.StatValue>
            <S.StatLabel>Dị ứng trong lớp</S.StatLabel>
          </S.StatInfo>
        </S.StatCard>

        <S.StatCard
          $color="#2563EB"
          $bg="#EFF6FF"
          $border="#BFDBFE"
          onClick={onShowMedications}
          type="button"
        >
          <S.StatIcon $color="#2563EB" $bg="#DBEAFE">
            <Pill size={20} />
          </S.StatIcon>
          <S.StatInfo>
            <S.StatValue>{pendingRequestsCount}</S.StatValue>
            <S.StatLabel>Đơn dặn thuốc chờ</S.StatLabel>
          </S.StatInfo>
        </S.StatCard>

        <S.StatCard
          $color="#059669"
          $bg="#ECFDF5"
          $border="#A7F3D0"
          type="button"
        >
          <S.StatIcon $color="#059669" $bg="#D1FAE5">
            <Activity size={20} />
          </S.StatIcon>
          <S.StatInfo>
            <S.StatValue>{pendingMeasurementCount}</S.StatValue>
            <S.StatLabel>Học sinh cần đo</S.StatLabel>
          </S.StatInfo>
        </S.StatCard>
      </S.StatCardsCol>

      <S.BentoCard style={{ padding: '16px' }}>
        <S.BentoTitle style={{ color: '#6B7280', fontSize: 12, marginBottom: '12px' }}>
          Tham chiếu BMI trẻ em (5–19 tuổi)
        </S.BentoTitle>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {Object.entries(BMI_CATEGORIES).map(([key, cat]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: cat.color, flex: 'none',
              }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: '#374151' }}>
                {cat.label}
              </span>
              <span style={{ fontSize: 11, color: '#9CA3AF', marginLeft: 'auto' }}>
                {key === 'underweight' ? '< 18.5' : key === 'normal' ? '18.5 – 24.9' : key === 'overweight' ? '25 – 29.9' : '≥ 30'}
              </span>
            </div>
          ))}
        </div>
      </S.BentoCard>
    </S.LeftSidebar>
  );
};
