'use client';

import React, { useState, MouseEvent, useEffect } from 'react';
import * as S from './styles';
import { Student } from '@/config/types/attendance';

interface GoodBehaviorWidgetProps {
  students: Student[];
}

export const GoodBehaviorWidget: React.FC<GoodBehaviorWidgetProps> = ({ students }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [evaluatedCount, setEvaluatedCount] = useState(0);
  const [confettiPieces, setConfettiPieces] = useState<any[]>([]);
  
  // State to track expanded card for Quick Praise
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  
  // Mock tracking of awarded certificates and selected praises
  const [awards, setAwards] = useState<Record<string, boolean>>({});
  const [praises, setPraises] = useState<Record<string, string[]>>({});

  // 1. AUTO-SCORING LOGIC
  // Base eligibility on actual attendance. For missing activities (eating/sleeping), 
  // we use a stable hash from student ID to simulate realistic "smart" scoring.
  const isEligible = (s: Student) => {
    // Basic condition: They must be present today.
    if (s.attendanceStatus !== 'PRESENT') return false;
    
    // Simulate past 5 days + activities check (80% mock criteria)
    let hash = 0;
    for (let i = 0; i < s.id.length; i++) hash = (hash * 31 + s.id.charCodeAt(i)) >>> 0;
    
    // 80% pass rate
    return (hash % 100) < 80;
  };

  const eligibleStudents = students.filter(isEligible);
  const totalStudents = students.length || 20;
  const percent = totalStudents === 0 ? 0 : Math.round((evaluatedCount / totalStudents) * 100);

  // 2. CONFETTI MICRO-INTERACTION
  const triggerConfetti = () => {
    const colors = ['#F59E0B', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6'];
    const newPieces = Array.from({ length: 60 }).map((_, i) => ({
      id: `confetti-${Date.now()}-${i}`,
      x: Math.random() * 100,
      color: colors[i % colors.length],
      delay: Math.random() * 0.5,
      duration: 1.5 + Math.random(),
    }));
    setConfettiPieces(newPieces);
    
    // Attempt Haptic feedback for mobile devices
    if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([100, 50, 100]);
    }

    setTimeout(() => {
      setConfettiPieces([]);
    }, 3000);
  };

  // 3. BATCH ACTIONS
  const handleBatchAward = () => {
    const newAwards = { ...awards };
    eligibleStudents.forEach(s => {
      newAwards[s.id] = true;
    });
    setAwards(newAwards);
    setEvaluatedCount(Object.keys(newAwards).length);
    triggerConfetti();
  };

  const toggleAward = (studentId: string) => {
    setAwards(prev => {
      const next = { ...prev, [studentId]: !prev[studentId] };
      setEvaluatedCount(Object.keys(next).filter(k => next[k]).length);
      return next;
    });
  };

  const togglePraise = (studentId: string, praise: string) => {
    setPraises(prev => {
      const current = prev[studentId] || [];
      if (current.includes(praise)) {
        return { ...prev, [studentId]: current.filter(p => p !== praise) };
      }
      return { ...prev, [studentId]: [...current, praise] };
    });
  };

  // 3D TILT EFFECT HANDLER
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const inner = card.querySelector('.tilt-inner') as HTMLElement;
    if (!inner) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg
    const rotateY = ((x - centerX) / centerX) * 10;
    
    inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    const inner = e.currentTarget.querySelector('.tilt-inner') as HTMLElement;
    if (inner) {
      inner.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    }
  };

  const getAvatarColor = (name: string) => {
    const colors = ['#FCA5A5', '#FCD34D', '#6EE7B7', '#93C5FD', '#C4B5FD', '#F9A8D4'];
    let h = 0;
    for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
    return colors[h % colors.length];
  };

  const QUICK_PRAISES = [
    '🍚 Tự xúc cơm ngoan',
    '😴 Ngủ không quấy',
    '🧸 Nhường đồ chơi',
    '🌟 Chăm phát biểu'
  ];

  return (
    <>
      <S.WidgetContainer>
        <S.WidgetHeader>
          <S.HeaderLeft>
            <S.IconContainer>🌟</S.IconContainer>
            <S.TitleBox>
              <S.WidgetTitle>Phiếu bé ngoan</S.WidgetTitle>
              <S.WidgetSubtitle>Tuần 22-26/06</S.WidgetSubtitle>
            </S.TitleBox>
          </S.HeaderLeft>
        </S.WidgetHeader>

        <S.ProgressSection>
          <S.ProgressCircle $percent={percent}>
            <S.ProgressContent>
              <S.ProgressValue>{percent}%</S.ProgressValue>
              <S.ProgressLabel>Hoàn thành</S.ProgressLabel>
            </S.ProgressContent>
          </S.ProgressCircle>
          
          <div style={{ fontSize: '13px', color: '#64748b', fontWeight: 600 }}>
            Đã trao: <strong style={{ color: '#047857' }}>{evaluatedCount}/{totalStudents}</strong> bé
          </div>
        </S.ProgressSection>

        <S.ActionButton onClick={() => setIsModalOpen(true)}>
          Đánh giá & Phát phiếu
        </S.ActionButton>
      </S.WidgetContainer>

      {isModalOpen && (
        <S.ModalOverlay onClick={() => setIsModalOpen(false)}>
          {confettiPieces.length > 0 && (
            <S.ConfettiContainer>
              {confettiPieces.map(p => (
                <S.ConfettiPiece 
                  key={p.id} 
                  $x={p.x} 
                  $color={p.color} 
                  $delay={p.delay} 
                  $duration={p.duration} 
                />
              ))}
            </S.ConfettiContainer>
          )}

          <S.ModalContent onClick={e => e.stopPropagation()}>
            <S.ModalHeader>
              <S.ModalTitleInfo>
                <S.ModalTitle>🎉 Tổng kết & Phát Phiếu bé ngoan</S.ModalTitle>
                <S.ModalSubtitle>Hệ thống đề xuất: {eligibleStudents.length}/{students.length} bé đủ điều kiện.</S.ModalSubtitle>
              </S.ModalTitleInfo>
              <S.HeaderActions>
                <S.BatchAwardButton onClick={handleBatchAward}>
                  <span>🌟</span> Phát tất cả ({eligibleStudents.length})
                </S.BatchAwardButton>
                <S.CloseButton onClick={() => setIsModalOpen(false)}>✕</S.CloseButton>
              </S.HeaderActions>
            </S.ModalHeader>

            <S.ModalBody>
              <S.SectionTitle>
                Danh sách học sinh
                <span>{students.length}</span>
              </S.SectionTitle>

              <S.GridContainer>
                {students.map(s => {
                  const eligible = isEligible(s);
                  const isAwarded = !!awards[s.id];
                  const initial = s.name.trim().split(' ').pop()?.charAt(0).toUpperCase() || 'B';
                  const studentPraises = praises[s.id] || [];

                  // Mock progress per student
                  let h = 0; for(let i=0;i<s.id.length;i++) h = (h*31+s.id.charCodeAt(i))>>>0;
                  const attendPct = eligible ? 100 : (h % 50) + 40;
                  const actPct = eligible ? (h % 20) + 80 : (h % 40) + 30;

                  return (
                    <S.CardWrapper 
                      key={s.id} 
                      onMouseMove={handleMouseMove} 
                      onMouseLeave={handleMouseLeave}
                      onClick={() => {
                        if (expandedCardId === s.id) setExpandedCardId(null);
                        else setExpandedCardId(s.id);
                      }}
                    >
                      <S.TiltCardInner className="tilt-inner" $isAwarded={isAwarded}>
                        {isAwarded && <S.AwardBadge>🌸</S.AwardBadge>}

                        <S.CardHeader>
                          <S.Avatar $bg={getAvatarColor(s.name)}>{initial}</S.Avatar>
                          <div>
                            <S.StudentName>{s.name}</S.StudentName>
                            <S.EligibilityTag $eligible={eligible}>
                              {eligible ? '✓ Đủ điều kiện' : '⚠ Cần cố gắng'}
                            </S.EligibilityTag>
                          </div>
                        </S.CardHeader>

                        <S.CardBody>
                          <S.CriteriaRow>
                            <S.CriteriaLabel>🏃‍♂️ Chuyên cần</S.CriteriaLabel>
                            <S.ProgressBarBg>
                              <S.ProgressBarFill $percent={attendPct} $color={attendPct >= 80 ? '#10B981' : '#F59E0B'} />
                            </S.ProgressBarBg>
                          </S.CriteriaRow>
                          <S.CriteriaRow>
                            <S.CriteriaLabel>🍲 Sinh hoạt (Ăn/Ngủ)</S.CriteriaLabel>
                            <S.ProgressBarBg>
                              <S.ProgressBarFill $percent={actPct} $color={actPct >= 80 ? '#3B82F6' : '#F43F5E'} />
                            </S.ProgressBarBg>
                          </S.CriteriaRow>
                        </S.CardBody>

                        {expandedCardId === s.id && (
                          <S.QuickPraiseBox onClick={e => e.stopPropagation()}>
                            <S.QuickPraiseTitle>💬 Lời khen nhanh (Quick Praise)</S.QuickPraiseTitle>
                            <S.ChipGroup>
                              {QUICK_PRAISES.map(p => (
                                <S.PraiseChip 
                                  key={p} 
                                  $active={studentPraises.includes(p)}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    togglePraise(s.id, p);
                                  }}
                                >
                                  {p}
                                </S.PraiseChip>
                              ))}
                            </S.ChipGroup>
                            <div style={{ marginTop: '12px', display: 'flex', gap: '8px' }}>
                              <S.BatchAwardButton 
                                style={{ width: '100%', justifyContent: 'center', padding: '8px', fontSize: '13px' }}
                                onClick={(e) => { e.stopPropagation(); toggleAward(s.id); }}
                              >
                                {isAwarded ? 'Thu hồi phiếu' : 'Trao phiếu riêng'}
                              </S.BatchAwardButton>
                            </div>
                          </S.QuickPraiseBox>
                        )}
                      </S.TiltCardInner>
                    </S.CardWrapper>
                  );
                })}
              </S.GridContainer>
            </S.ModalBody>
          </S.ModalContent>
        </S.ModalOverlay>
      )}
    </>
  );
};
