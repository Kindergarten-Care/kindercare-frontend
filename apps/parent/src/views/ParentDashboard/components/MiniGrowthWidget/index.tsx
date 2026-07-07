'use client';

import React from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import * as S from './styles';
import { IconChart } from '@/assets/icons/dashboard';
import { useGrowthData } from '../GrowthWidget/hooks/useGrowthData';
import { AssessmentDomainModel } from '@/config/types/assessment';

interface MiniGrowthWidgetProps {
  assessment: AssessmentDomainModel | null;
}

const MiniGrowthWidget: React.FC<MiniGrowthWidgetProps> = ({ assessment }) => {
  const router = useRouter();
  const t = useTranslations('Dashboard');
  const { latest, bmiStatus, loading: growthLoading } = useGrowthData();

  const handleViewDetails = () => {
    router.push('/growth');
  };

  const domainScores = assessment ? [
    { name: 'Thể chất', score: assessment.physicalScore, color: '#3b82f6' },
    { name: 'Nhận thức', score: assessment.cognitiveScore, color: '#10b981' },
    { name: 'Ngôn ngữ', score: assessment.languageScore, color: '#f59e0b' },
    { name: 'Tình cảm - XH', score: assessment.socioEmotionalScore, color: '#ec4899' },
    { name: 'Thẩm mỹ', score: assessment.aestheticScore, color: '#8b5cf6' }
  ] : [];

  return (
    <S.Card>
      <S.CardHead>
        <S.CardTitle>
          <IconChart size={18} color="var(--brand)" />
          Phát triển của bé
        </S.CardTitle>
        <S.ViewDetailsBtn onClick={handleViewDetails}>
          Xem chi tiết
        </S.ViewDetailsBtn>
      </S.CardHead>

      <S.WidgetBody>
        {/* Physical Growth Section */}
        <S.SummarySection>
          <S.SectionTitle>
            Chỉ số thể chất {latest ? `(${latest.month.replace('-', '/')})` : ''}
          </S.SectionTitle>
          {growthLoading ? (
            <div style={{ fontSize: '12px', color: 'var(--muted)', padding: '12px 0', textAlign: 'center' }}>
              Đang tải chỉ số...
            </div>
          ) : latest ? (
            <>
              <S.MetricsRow>
                <S.MetricBox>
                  <S.MetricLabel>Cân nặng</S.MetricLabel>
                  <S.MetricValue>{latest.weight} <span>kg</span></S.MetricValue>
                </S.MetricBox>
                <S.MetricBox>
                  <S.MetricLabel>Chiều cao</S.MetricLabel>
                  <S.MetricValue>{latest.height} <span>cm</span></S.MetricValue>
                </S.MetricBox>
                <S.MetricBox>
                  <S.MetricLabel>BMI</S.MetricLabel>
                  <S.MetricValue>{latest.bmi}</S.MetricValue>
                </S.MetricBox>
              </S.MetricsRow>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <S.BmiBadge $type={bmiStatus.type}>{bmiStatus.label}</S.BmiBadge>
              </div>
            </>
          ) : (
            <div style={{ fontSize: '12px', color: 'var(--muted)', padding: '12px 0', textAlign: 'center' }}>
              Chưa có dữ liệu thể chất
            </div>
          )}
        </S.SummarySection>

        {/* Learning & Developmental Domains Section */}
        <S.SummarySection>
          <S.SectionTitle>
            5 Lĩnh vực phát triển {assessment ? `(${assessment.assessmentMonth.replace('-', '/')})` : ''}
          </S.SectionTitle>
          {assessment ? (
            <S.DomainsList>
              {domainScores.map((dom, idx) => {
                const scoreNum = Number(dom.score || 0);
                const percent = Math.min(100, Math.max(0, (scoreNum / 10) * 100));
                return (
                  <div key={idx}>
                    <S.DomainRow>
                      <S.DomainName>{dom.name}</S.DomainName>
                      <S.DomainScore>{scoreNum.toFixed(1)}/10</S.DomainScore>
                    </S.DomainRow>
                    <S.ProgressBar>
                      <S.ProgressFill $percent={percent} $color={dom.color} />
                    </S.ProgressBar>
                  </div>
                );
              })}
            </S.DomainsList>
          ) : (
            <div style={{ fontSize: '12px', color: 'var(--muted)', padding: '24px 0', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
              Chưa có đánh giá tháng này
            </div>
          )}
        </S.SummarySection>
      </S.WidgetBody>
    </S.Card>
  );
};

export default MiniGrowthWidget;
