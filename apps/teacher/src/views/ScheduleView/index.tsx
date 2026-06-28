import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { useAuth } from '@/contexts/AuthContext';
import { useActivities } from '../Activities/hooks';
import { MealStatus, NapStatus, ParticipationStatus } from '@/config/types/activities';
import { 
  Utensils, 
  Moon, 
  Sun, 
  BookOpen, 
  Users,
  Check,
  MapPin
} from 'lucide-react';

// Activity Type mapping for Timeline & Matrix
type ActivityUIGroup = 'arrival' | 'meal' | 'study' | 'play' | 'nap';

const getUIGroup = (title: string, type?: string): ActivityUIGroup => {
  const lower = title.toLowerCase();
  const lowerType = (type || '').toLowerCase();
  if (lower.includes('đón') || lower.includes('trả') || lowerType.includes('arrival')) return 'arrival';
  if (lower.includes('ăn') || lowerType.includes('meal')) return 'meal';
  if (lower.includes('ngủ') || lowerType.includes('sleep') || lowerType.includes('nap')) return 'nap';
  if (lower.includes('học') || lower.includes('bài') || lowerType.includes('learn')) return 'study';
  return 'play';
};

const PALETTES: Record<ActivityUIGroup, { solid: string; tint: string; c: string }> = {
  meal:    { c: '#92400E', tint: '#FEF3C7', solid: '#D97706' },
  nap:     { c: '#2563EB', tint: '#E3EDFD', solid: '#2563EB' },
  study:   { c: '#005A36', tint: '#E6F3ED', solid: '#005A36' },
  play:    { c: '#005A36', tint: '#E6F3ED', solid: '#005A36' },
  arrival: { c: '#8B5CF6', tint: '#F1ECFE', solid: '#8B5CF6' },
};

const OPTSETS = {
  meal:  [
    { k: 'ALL', label: '🟢 Ăn hết', dot: '#005A36' }, 
    { k: 'HALF', label: '🟠 Ăn 1/2', dot: '#D97706' }, 
    { k: 'NONE', label: '🔴 Bỏ bữa', dot: '#DC2626' }
  ],
  nap:   [
    { k: 'GOOD', label: '🟢 Ngủ ngoan', dot: '#005A36' }, 
    { k: 'POOR', label: '🟠 Khó ngủ', dot: '#D97706' },
    { k: 'NONE', label: '🔴 Không ngủ', dot: '#DC2626' }
  ],
  study: [
    { k: 'ACTIVE', label: '🟢 Hăng hái', dot: '#005A36' }, 
    { k: 'NORMAL', label: '🔵 Bình thường', dot: '#2563EB' }, 
    { k: 'TIRED', label: '🟠 Uể oải', dot: '#D97706' }
  ],
};

const ICON_MAP = {
  meal: <Utensils size={19} />,
  nap: <Moon size={19} />,
  study: <BookOpen size={19} />,
  play: <Users size={19} />,
  arrival: <Sun size={19} />
};

export const ScheduleView: React.FC = () => {
  const { user } = useAuth();
  
  // Using hooks from Activities to get data
  const {
    loading,
    mealRecords,
    activityRecords,
    scheduleItems,
    handleMealStatusChange,
    handleActivityNapChange,
    handleActivityParticipationChange,
    handleBulkMarkMealsAll,
    handleBulkMarkActivitiesGood,
    handleSave,
    saving
  } = useActivities();

  // Selected item tracking
  const [selectedActId, setSelectedActId] = useState<string | null>(null);

  useEffect(() => {
    if (scheduleItems.length > 0 && !selectedActId) {
      // Auto select current time item or first
      const now = new Date();
      const currentH = now.getHours();
      const currentM = now.getMinutes();
      const currentTotal = currentH * 60 + currentM;
      
      let closest = scheduleItems[0];
      for (const item of scheduleItems) {
        const [h, m] = (item.timeSlot || '00:00').split(':').map(Number);
        const itemTotal = h * 60 + m;
        if (itemTotal <= currentTotal) {
          closest = item;
        }
      }
      setSelectedActId(closest.id);
    }
  }, [scheduleItems, selectedActId]);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Đang tải lịch trình...</div>;
  }

  // --- MAPPING SCHEDULE ---
  const sortedSchedule = [...scheduleItems].sort((a, b) => {
    return (a.timeSlot || '').localeCompare(b.timeSlot || '');
  });

  const selectedItem = sortedSchedule.find(i => i.id === selectedActId) || sortedSchedule[0];
  const curGroup = selectedItem ? getUIGroup(selectedItem.activityName) : 'study';

  // --- MATRIX RESOLUTION ---
  const getMatrixData = () => {
    if (!selectedItem) return { hasMatrix: false, batchLabel: '', matrix: [] };
    const group = getUIGroup(selectedItem.activityName);
    
    // Determine which field to log based on group
    let optType: keyof typeof OPTSETS | null = null;
    let records: any[] = [];
    let field = '';
    
    if (group === 'meal') {
      optType = 'meal';
      records = mealRecords;
      // Guess which meal based on time
      const h = parseInt((selectedItem.timeSlot || '00:00').split(':')[0] || '0', 10);
      if (h < 10) field = 'breakfast';
      else if (h < 13) field = 'lunch';
      else field = 'afternoonSnack';
    } else if (group === 'nap') {
      optType = 'nap';
      records = activityRecords;
      field = 'nap';
    } else if (group === 'study' || group === 'play') {
      optType = 'study';
      records = activityRecords;
      field = 'participation';
    }

    if (!optType || records.length === 0) {
      return { hasMatrix: false, batchLabel: '', matrix: [] };
    }

    const opts = OPTSETS[optType];
    const batchLabel = 'Tất cả: ' + opts[0].label.replace(/^.*? /, '');

    const matrix = records.map((rec, i) => {
      const val = rec[field];
      const selectedOpt = opts.find(o => o.k === val);
      
      return {
        id: rec.studentId,
        name: rec.studentName,
        initial: rec.studentName.charAt(0).toUpperCase(),
        grad: ['#00794A', '#2563EB', '#8B5CF6', '#D97706', '#059669', '#DB2777'][i % 6],
        options: opts.map(o => ({
          k: o.k,
          label: o.label.replace(/^.*? /, ''), // remove emoji
          active: val === o.k,
          activeColor: o.dot,
          pick: () => {
            if (group === 'meal') handleMealStatusChange(rec.studentId, field as any, o.k as any);
            if (group === 'nap') handleActivityNapChange(rec.studentId, o.k as any);
            if (group === 'study' || group === 'play') handleActivityParticipationChange(rec.studentId, o.k as any);
          }
        }))
      };
    });

    return { hasMatrix: true, batchLabel, matrix, group };
  };

  const { hasMatrix, batchLabel, matrix, group } = getMatrixData();

  return (
    <S.Container>
      <S.TopHeader>
        <div>
          <S.HeaderSubtitle>Lớp Mầm 1 · Hôm nay</S.HeaderSubtitle>
          <S.Title>Hoạt động & Lịch trình</S.Title>
        </div>
        <S.CurrentStatusBadge>
          <S.DotPulse />
          <S.StatusText>
            Đang diễn ra: <strong>{selectedItem?.activityName || 'N/A'}</strong>
          </S.StatusText>
          {saving && <span style={{fontSize: 12, color: '#6b7280'}}>Đang lưu...</span>}
        </S.CurrentStatusBadge>
      </S.TopHeader>

      <S.SplitContainer>
        {/* LEFT COLUMN: TIMELINE */}
        <S.TimelineColumn>
          <S.TimelineHeader>
            <S.TimelineTitle>Lịch sinh hoạt</S.TimelineTitle>
            <S.TimelineProgress>{sortedSchedule.filter(i => i.completed).length}/{sortedSchedule.length} xong</S.TimelineProgress>
          </S.TimelineHeader>
          
          <S.TimelineList>
            {sortedSchedule.map((item, i) => {
              const uigroup = getUIGroup(item.activityName);
              const pal = PALETTES[uigroup];
              const isCur = item.id === selectedActId;
              const isDone = item.completed;
              const dotColor = isDone ? '#A7C9B6' : (isCur ? '#005A36' : '#D1D5DB');
              
              return (
                <S.TimelineItemWrapper key={item.id}>
                  <S.TimelineDotCol>
                    <S.DotNode $bg={dotColor} $isCur={isCur} />
                    {i < sortedSchedule.length - 1 && <S.VerticalLine />}
                  </S.TimelineDotCol>
                  
                  <S.TimelineCard 
                    $bg={isCur ? pal.tint : '#fff'}
                    $borderColor={isCur ? pal.solid : '#EEF4F0'}
                    $isDone={isDone && !isCur}
                    $isCur={isCur}
                    onClick={() => setSelectedActId(item.id)}
                  >
                    <S.TimelineIconBox $bg={pal.tint} $color={pal.solid}>
                      {ICON_MAP[uigroup]}
                    </S.TimelineIconBox>
                    <S.TimelineCardContent>
                      <S.TimelineTimeText $color={isDone && !isCur ? '#9CA3AF' : pal.solid}>
                        {item.timeSlot}
                      </S.TimelineTimeText>
                      <S.TimelineNameText $color={isDone && !isCur ? '#9CA3AF' : '#1F2937'}>
                        {item.activityName}
                      </S.TimelineNameText>
                    </S.TimelineCardContent>
                    {isDone && (
                      <S.TimelineDoneIcon>
                        <Check size={17} strokeWidth={2.5} />
                      </S.TimelineDoneIcon>
                    )}
                  </S.TimelineCard>
                </S.TimelineItemWrapper>
              );
            })}
          </S.TimelineList>
        </S.TimelineColumn>

        {/* RIGHT COLUMN: LOGGING & MATRIX */}
        <S.RightCol>
          <S.SectionCard>
            <S.MatrixHeader>
              <S.MatrixIconBox $bg={PALETTES[curGroup].tint} $color={PALETTES[curGroup].solid}>
                {ICON_MAP[curGroup]}
              </S.MatrixIconBox>
              <S.MatrixTitleArea>
                <S.MatrixTitle>{selectedItem?.activityName}</S.MatrixTitle>
                <S.MatrixDesc>{selectedItem?.timeSlot} · Ghi nhận điểm danh & sinh hoạt</S.MatrixDesc>
              </S.MatrixTitleArea>
              
              {hasMatrix && (
                <S.BatchBtn onClick={() => {
                  if (group === 'meal') handleBulkMarkMealsAll();
                  else handleBulkMarkActivitiesGood();
                }}>
                  ⚡ {batchLabel}
                </S.BatchBtn>
              )}
            </S.MatrixHeader>

            {hasMatrix ? (
              <S.MatrixList>
                {matrix.map((m) => (
                  <S.MatrixRow key={m.id}>
                    <S.AvatarNode $bg={m.grad}>{m.initial}</S.AvatarNode>
                    <S.StudentNameNode>{m.name}</S.StudentNameNode>
                    <S.OptionsGroup>
                      {m.options.map((opt: any) => (
                        <S.OptionBtn 
                          key={opt.k} 
                          $active={opt.active} 
                          $activeColor={opt.activeColor}
                          onClick={opt.pick}
                        >
                          {opt.label}
                        </S.OptionBtn>
                      ))}
                    </S.OptionsGroup>
                  </S.MatrixRow>
                ))}
              </S.MatrixList>
            ) : (
              <S.EmptyMatrixCard>
                <S.MatrixIconBox $bg="#E6EEE9" $color="#9CA3AF">
                  <MapPin size={24} />
                </S.MatrixIconBox>
                <div>
                  <S.EmptyMatrixTitle>Hoạt động này không cần ghi nhận chi tiết</S.EmptyMatrixTitle>
                  <S.EmptyMatrixDesc>Chọn một mốc sinh hoạt khác (ăn, ngủ, học) ở cột trái để ghi nhanh cho từng bé.</S.EmptyMatrixDesc>
                </div>
              </S.EmptyMatrixCard>
            )}
            
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <S.BatchBtn onClick={handleSave}>Lưu cập nhật</S.BatchBtn>
            </div>
          </S.SectionCard>

          {/* SECTION B: LESSON LOG */}
          <S.SectionCard style={{ padding: '18px 22px' }}>
            <S.LessonHeaderRow>
              <span style={{ fontWeight: 700, fontSize: '16px', color: '#1F2937' }}>Bài học hôm nay</span>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>· Nhật ký giảng dạy</span>
            </S.LessonHeaderRow>
            <S.LessonGrid>
              <S.LessonCard $bg="#FFFBEB" $borderColor="#FEF3C7">
                <S.LessonWatermark $color="#FDE68A"><BookOpen size={48} /></S.LessonWatermark>
                <S.LessonSubject $color="#D97706">TOÁN HỌC</S.LessonSubject>
                <S.LessonTitle>Đếm số 1 đến 10</S.LessonTitle>
                <S.LessonNote>Các bé rất hào hứng nhận biết các chữ số qua thẻ màu.</S.LessonNote>
              </S.LessonCard>

              <S.LessonCard $bg="#EFF6FF" $borderColor="#DBEAFE">
                <S.LessonWatermark $color="#BFDBFE"><Sun size={48} /></S.LessonWatermark>
                <S.LessonSubject $color="#2563EB">NGÔN NGỮ</S.LessonSubject>
                <S.LessonTitle>Kể chuyện Thỏ & Rùa</S.LessonTitle>
                <S.LessonNote>Lớp chia nhóm đóng kịch truyện cổ tích, bé ngoan.</S.LessonNote>
              </S.LessonCard>

              <S.LessonCard $bg="#ECFDF5" $borderColor="#D1FAE5">
                <S.LessonWatermark $color="#A7F3D0"><Users size={48} /></S.LessonWatermark>
                <S.LessonSubject $color="#059669">THỂ CHẤT</S.LessonSubject>
                <S.LessonTitle>Tập dân vũ</S.LessonTitle>
                <S.LessonNote>Khởi động ngoài trời, rèn luyện sự dẻo dai.</S.LessonNote>
              </S.LessonCard>
            </S.LessonGrid>
          </S.SectionCard>
        </S.RightCol>
      </S.SplitContainer>
    </S.Container>
  );
};
