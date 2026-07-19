import React, { useState, useEffect, useRef } from 'react';
import * as S from './styles';
import { useActivities } from '../Activities/hooks';
import { 
  Utensils, 
  Moon, 
  Sun, 
  BookOpen, 
  Users,
  Check,
  MapPin,
  X,
  Upload,
  Edit2,
  ChevronLeft,
  ChevronRight,
  Plus
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
    { k: 'NORMAL', label: '🔵 Bình thg', dot: '#2563EB' }, 
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

const timeToMinutes = (t: string): number => {
  if (!t) return 0;
  const [h, m] = t.split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
};

const filterOverlapAndEmptyDetails = (details: any[]): any[] => {
  if (!details || !Array.isArray(details)) return [];
  
  // 1. Filter out empty activities
  const validDetails = details.filter(d => d && d.activityName && d.activityName.trim());
  
  // 2. Group by day to filter overlapping events
  const grouped: Record<string, any[]> = {};
  validDetails.forEach(d => {
    const day = d.dayOfWeek;
    if (!grouped[day]) grouped[day] = [];
    grouped[day].push(d);
  });
  
  const result: any[] = [];
  
  // 3. Keep first and eliminate any overlapping child events in order
  Object.keys(grouped).forEach(day => {
    const items = grouped[day];
    items.sort((a, b) => a.startTime.localeCompare(b.startTime));
    
    const cleanItems: any[] = [];
    let lastItem: any = null;
    
    items.forEach(item => {
      if (!lastItem) {
        cleanItems.push(item);
        lastItem = item;
      } else {
        const start = timeToMinutes(item.startTime);
        const lastEnd = timeToMinutes(lastItem.endTime);
        
        if (start >= lastEnd) {
          cleanItems.push(item);
          lastItem = item;
        } else {
          console.warn(`[Overlap Filtered] Removed overlap item "${item.activityName}" (${item.startTime}-${item.endTime}) conflicts with "${lastItem.activityName}" (${lastItem.startTime}-${lastItem.endTime}) on ${day}`);
        }
      }
    });
    
    result.push(...cleanItems);
  });
  
  return result;
};

export const ScheduleView: React.FC = () => {
  const {
    loading,
    mealRecords,
    activityRecords,
    weeklySchedule,
    handleMealStatusChange,
    handleActivityNapChange,
    handleActivityParticipationChange,
    handleMealNoteChange,
    handleMealPhotoChange,
    handleActivityNoteChange,
    handleActivityPhotoChange,
    handleBulkMarkMealsAll,
    handleBulkMarkActivitiesGood,
    handleSave,
    saving,
    isMenuEditing,
    setIsMenuEditing,
    menu,
    editedMenu,
    setEditedMenu,
    handleSaveMenu,
    currentDate,
    setCurrentDate,
    weeklyMenu,
    classId,
    className,
    availableClasses,
    classOptionsLoaded,
    handleSelectClass,
  } = useActivities();

  const [selectedActId, setSelectedActId] = useState<string | null>(null);

  // Memoize clean details with no overlapping slots
  const cleanDetails = React.useMemo(() => {
    return filterOverlapAndEmptyDetails(weeklySchedule?.details || []);
  }, [weeklySchedule?.details]);

  // Note Modal State
  const [noteOpen, setNoteOpen] = useState(false);
  const [noteStudentId, setNoteStudentId] = useState<string>('');
  const [noteName, setNoteName] = useState('');
  const [noteInitial, setNoteInitial] = useState('');
  const [noteGrad, setNoteGrad] = useState('');
  const [noteDraft, setNoteDraft] = useState('');
  const [draftPhoto, setDraftPhoto] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const daysStr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const todayDayStr = daysStr[currentDate.getDay()];
  const todaySchedule = cleanDetails.filter(d => d.dayOfWeek === todayDayStr);
  const sortedTodaySchedule = [...todaySchedule].sort((a, b) => a.startTime.localeCompare(b.startTime));

  useEffect(() => {
    if (sortedTodaySchedule.length > 0 && !selectedActId) {
      const now = new Date();
      const currentTotal = now.getHours() * 60 + now.getMinutes();
      let closest = sortedTodaySchedule[0];
      for (const item of sortedTodaySchedule) {
        const [h, m] = (item.startTime || '00:00').split(':').map(Number);
        if (h * 60 + m <= currentTotal) closest = item;
      }
      setSelectedActId(closest.id);
    }
  }, [weeklySchedule, currentDate, selectedActId, sortedTodaySchedule]);

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280' }}>Đang tải lịch trình...</div>;
  }

  const selectedItem = sortedTodaySchedule.find(i => i.id === selectedActId) || sortedTodaySchedule[0];
  const curGroup = selectedItem ? getUIGroup(selectedItem.activityName, selectedItem.activityType) : 'study';

  // Format today date
  const todayDisplayStr = new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'long' });

  // Dummy menus for UI (Can be replaced with real API data)
  const dummyMenus = [
    { meal: 'Bữa sáng', time: '08:00', icon: '🥣', bg: '#FEF3C7', color: '#D97706', dishes: [
      { emoji: '🍲', name: 'Cháo thịt bằm bí đỏ' }, { emoji: '🥛', name: 'Sữa tươi không đường' } ] },
    { meal: 'Bữa trưa', time: '11:00', icon: '🍱', bg: '#E6F3ED', color: '#005A36', dishes: [
      { emoji: '🍚', name: 'Cơm trắng' }, { emoji: '🍳', name: 'Thịt kho trứng cút' }, { emoji: '🥬', name: 'Canh cải nấu tôm' } ] },
    { meal: 'Bữa xế', time: '14:30', icon: '🍮', bg: '#E3EDFD', color: '#2563EB', dishes: [
      { emoji: '🦀', name: 'Súp cua trứng' }, { emoji: '🍮', name: 'Bánh flan' } ] }
  ];

  // Matrix Resolution
  let optType: keyof typeof OPTSETS | null = null;
  let records: any[] = [];
  let field = '';
  
  if (curGroup === 'meal') {
    optType = 'meal';
    records = mealRecords;
    const h = parseInt((selectedItem?.startTime || '00:00').split(':')[0] || '0', 10);
    field = h < 10 ? 'breakfast' : (h < 13 ? 'lunch' : 'afternoonSnack');
  } else if (curGroup === 'nap') {
    optType = 'nap';
    records = activityRecords;
    field = 'nap';
  } else if (curGroup === 'study' || curGroup === 'play') {
    optType = 'study';
    records = activityRecords;
    field = 'participation';
  }

  const hasMatrix = !!selectedItem && !!optType && records.length > 0;
  const opts = hasMatrix ? OPTSETS[optType!] : [];
  const batchLabel = hasMatrix ? 'Tất cả: ' + opts[0].label.replace(/^.*? /, '') : '';

  const matrix = hasMatrix ? records.map((rec, i) => {
    const val = rec[field];
    return {
      id: rec.studentId,
      name: rec.studentName,
      initial: rec.studentName.charAt(0).toUpperCase(),
      grad: ['linear-gradient(135deg,#00794A,#005A36)', 'linear-gradient(135deg,#3B82F6,#2563EB)', 'linear-gradient(135deg,#A78BFA,#8B5CF6)', 'linear-gradient(135deg,#FB923C,#F97316)', 'linear-gradient(135deg,#34D399,#059669)', 'linear-gradient(135deg,#F472B6,#DB2777)'][i % 6],
      hasNote: !!rec.note,
      hasPhoto: !!rec.photoUrl,
      photoUrl: rec.photoUrl,
      noteText: rec.note || '',
      options: opts.map(o => ({
        k: o.k,
        label: o.label.replace(/^.*? /, ''),
        active: val === o.k,
        activeColor: o.dot,
        pick: () => {
          if (curGroup === 'meal') handleMealStatusChange(rec.studentId, field as any, o.k as any);
          if (curGroup === 'nap') handleActivityNapChange(rec.studentId, o.k as any);
          if (curGroup === 'study' || curGroup === 'play') handleActivityParticipationChange(rec.studentId, o.k as any);
        }
      }))
    };
  }) : [];

  // Modal Handlers
  const openNote = (m: any) => {
    setNoteStudentId(m.id);
    setNoteName(m.name);
    setNoteInitial(m.initial);
    setNoteGrad(m.grad);
    setNoteDraft(m.noteText);
    setDraftPhoto(m.photoUrl);
    setNoteOpen(true);
  };

  const closeNote = () => setNoteOpen(false);

  const saveNote = () => {
    if (curGroup === 'meal') {
      handleMealNoteChange(noteStudentId, noteDraft);
      handleMealPhotoChange(noteStudentId, draftPhoto || undefined);
    } else {
      handleActivityNoteChange(noteStudentId, noteDraft);
      handleActivityPhotoChange(noteStudentId, draftPhoto || undefined);
    }
    setNoteOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setDraftPhoto(url);
    }
  };

  const formatDisplayDate = (d: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const isSameDate = (d1: Date, d2: Date) => d1.toDateString() === d2.toDateString();

    if (isSameDate(d, today)) return 'Hôm nay';
    if (isSameDate(d, tomorrow)) return 'Ngày mai';
    if (isSameDate(d, yesterday)) return 'Hôm qua';

    const dayName = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'][d.getDay()];
    return `${dayName}, ${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
  };

  const changeDate = (days: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
  };

  return (
    <S.Container>
      {/* HERO SECTION */}
      <S.HeroSection>
        <S.HeroBgOverlay />
        <S.HeroContent>
          <S.HeroTextContainer>
            <S.HeroSubtitle>
              {classOptionsLoaded && availableClasses.length > 1 ? (
                <select
                  aria-label="Chọn lớp"
                  value={classId ?? ''}
                  onChange={(e) => {
                    const nextId = e.target.value;
                    const next = availableClasses.find(c => String(c.classId) === nextId);
                    handleSelectClass(nextId, next?.className);
                  }}
                  style={{
                    background: 'rgba(255,255,255,0.18)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,0.35)',
                    borderRadius: 999,
                    padding: '6px 14px',
                    fontSize: 14,
                    fontWeight: 600,
                    outline: 'none',
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {availableClasses.map(c => (
                    <option key={c.classId} value={String(c.classId)} style={{ color: '#111' }}>
                      Lớp {c.className}
                    </option>
                  ))}
                </select>
              ) : (
                `Lớp ${className ?? 'Chồi 1'}`
              )}
            </S.HeroSubtitle>
            <S.DateNavigator>
              <S.NavBtn onClick={() => changeDate(-1)} title="Ngày hôm trước">
                <ChevronLeft size={18} />
              </S.NavBtn>
              <S.NavDateText>{formatDisplayDate(currentDate)}</S.NavDateText>
              <S.NavBtn onClick={() => changeDate(1)} title="Ngày hôm sau">
                <ChevronRight size={18} />
              </S.NavBtn>
            </S.DateNavigator>
            
            <S.HeroTitle>Thực đơn & Lịch học</S.HeroTitle>
            <S.HeroLiveBadge>
              <S.PulseDotWrapper>
                <S.PulseDotInner />
                <S.PulseDotOuter />
              </S.PulseDotWrapper>
              <S.HeroLiveText>
                Đang diễn ra: <strong>{selectedItem?.activityName || 'N/A'}</strong> · {selectedItem?.startTime ? `${selectedItem.startTime.slice(0,5)} - ${selectedItem.endTime.slice(0,5)}` : ''}
              </S.HeroLiveText>
            </S.HeroLiveBadge>
            {weeklySchedule && (
              <div style={{ marginTop: 12, color: '#A7E0C6', fontSize: 13, fontWeight: 500 }}>
                <div>Chủ đề tháng: <strong style={{color:'#fff'}}>{weeklySchedule.monthTheme}</strong></div>
              </div>
            )}
          </S.HeroTextContainer>
          <S.HeroEmojis>
            <span>🍱</span>
            <span>📚</span>
          </S.HeroEmojis>
        </S.HeroContent>
      </S.HeroSection>

      {/* MENU SECTION */}
      <S.MenuSection>
        <S.MenuHeader>
          <S.MenuIconBox><Utensils size={22} /></S.MenuIconBox>
          <S.MenuHeaderText>
            <div>{weeklyMenu ? 'Thực đơn cả tuần' : 'Thực đơn hôm nay'}</div>
            <div>
              {weeklyMenu?.menuName
                ? weeklyMenu.menuName
                : className
                  ? `Bếp ăn lớp ${className} · đã duyệt dinh dưỡng`
                  : 'Bếp ăn lớp · đã duyệt dinh dưỡng'}
            </div>
          </S.MenuHeaderText>
          <S.MenuTag style={{ marginRight: 'auto' }}>🥗 Cân bằng 4 nhóm chất</S.MenuTag>



        </S.MenuHeader>

        {/* Weekly menu overview - shows Mon-Fri in a compact grid */}
        {weeklyMenu && weeklyMenu.days && weeklyMenu.days.some(d => d.breakfast.length + d.lunch.length + d.snack.length > 0) && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '10px',
            marginBottom: '16px'
          }}>
            {weeklyMenu.days.filter(d => d.dayOfWeek !== 'Saturday' && d.dayOfWeek !== 'Sunday').map((d) => {
              const breakfastNames = d.breakfast.map(x => x.dishName).join(', ');
              const lunchNames = d.lunch.map(x => x.dishName).join(', ');
              const snackNames = d.snack.map(x => x.dishName).join(', ');
              const totalDishes = d.breakfast.length + d.lunch.length + d.snack.length;
              const dayShort = d.dayOfWeek === 'Monday' ? 'T2'
                : d.dayOfWeek === 'Tuesday' ? 'T3'
                : d.dayOfWeek === 'Wednesday' ? 'T4'
                : d.dayOfWeek === 'Thursday' ? 'T5'
                : d.dayOfWeek === 'Friday' ? 'T6'
                : d.dayOfWeek === 'Saturday' ? 'T7' : 'CN';
              const today = new Date();
              const todayDayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][today.getDay()];
              const isToday = d.dayOfWeek === todayDayName;
              return (
                <div key={d.dayOfWeek} style={{
                  border: isToday ? '2px solid #005A36' : '1px solid #E6EEE9',
                  borderRadius: '12px',
                  padding: '10px',
                  background: isToday ? '#E6F3ED' : '#F9FAFB',
                  fontSize: '11.5px'
                }}>
                  <div style={{
                    fontWeight: 800,
                    color: isToday ? '#005A36' : '#1F2937',
                    marginBottom: '6px',
                    fontSize: '12.5px'
                  }}>
                    {dayShort} {isToday && '· hôm nay'}
                  </div>
                  {totalDishes === 0 ? (
                    <div style={{ color: '#9CA3AF', fontStyle: 'italic' }}>—</div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', color: '#374151', lineHeight: 1.35 }}>
                      {breakfastNames && (
                        <div><span style={{ color: '#D97706', fontWeight: 700 }}>🥣 </span>{breakfastNames}</div>
                      )}
                      {lunchNames && (
                        <div><span style={{ color: '#005A36', fontWeight: 700 }}>🍚 </span>{lunchNames}</div>
                      )}
                      {snackNames && (
                        <div><span style={{ color: '#2563EB', fontWeight: 700 }}>🍮 </span>{snackNames}</div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Display real menu with dishes (today's focus, fall back to current date) */}
        <S.MenuGrid>
          {[
            { 
              key: 'breakfastMenu', 
              meal: 'Bữa sáng', 
              time: '08:00', 
              icon: '🥣', 
              bg: '#FEF3C7', 
              color: '#D97706',
              dishes: menu.breakfastMenu ? menu.breakfastMenu.split('\n') : []
            },
            { 
              key: 'lunchMenu', 
              meal: 'Bữa trưa', 
              time: '11:00', 
              icon: '🍱', 
              bg: '#E6F3ED', 
              color: '#005A36',
              dishes: menu.lunchMenu ? menu.lunchMenu.split('\n') : []
            },
            { 
              key: 'afternoonSnackMenu', 
              meal: 'Bữa xế', 
              time: '14:30', 
              icon: '🍮', 
              bg: '#E3EDFD', 
              color: '#2563EB',
              dishes: menu.afternoonSnackMenu ? menu.afternoonSnackMenu.split('\n') : []
            }
          ].map(m => (
            <S.MenuCard key={m.meal} $bg={m.bg} $borderColor={m.color}>
              <S.MenuCardHeader>
                <S.MenuCardIcon>{m.icon}</S.MenuCardIcon>
                <S.MenuCardTitle $timeColor={m.color}>
                  <div>{m.meal}</div>
                  <div>{m.time}</div>
                </S.MenuCardTitle>
              </S.MenuCardHeader>
              <div>
                {m.dishes.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {m.dishes.map((dish, idx) => (
                      <div key={idx} style={{ 
                        fontSize: '13px', 
                        fontWeight: 500, 
                        color: '#374151', 
                        lineHeight: 1.4,
                        padding: '4px 0',
                        borderBottom: idx < m.dishes.length - 1 ? '1px dashed #E5E7EB' : 'none'
                      }}>
                        {dish}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ fontSize: '13px', color: '#9CA3AF', fontStyle: 'italic' }}>
                    (Chưa có thực đơn)
                  </div>
                )}
              </div>
            </S.MenuCard>
          ))}
        </S.MenuGrid>
      </S.MenuSection>

      {/* WEEKLY TIMETABLE GRID */}
      {weeklySchedule && (
        <S.WeeklyGridSection>
          <S.WeeklyGridHeader>
            <S.WeeklyGridTitle>Thời khóa biểu Tuần</S.WeeklyGridTitle>
            <S.WeeklyThemeBadge>{weeklySchedule.weekTheme}</S.WeeklyThemeBadge>
          </S.WeeklyGridHeader>
          
          <S.WeeklyGridTable>
            <thead>
              <tr>
                <S.WeeklyGridTh style={{width: '90px'}}>Thời gian</S.WeeklyGridTh>
                <S.WeeklyGridTh>Thứ 2</S.WeeklyGridTh>
                <S.WeeklyGridTh>Thứ 3</S.WeeklyGridTh>
                <S.WeeklyGridTh>Thứ 4</S.WeeklyGridTh>
                <S.WeeklyGridTh>Thứ 5</S.WeeklyGridTh>
                <S.WeeklyGridTh>Thứ 6</S.WeeklyGridTh>
              </tr>
            </thead>
            <tbody>
              {Array.from(new Set(cleanDetails.map(d => `${d.startTime.slice(0, 5)} - ${d.endTime.slice(0, 5)}`))).sort().map(timeSlot => {
                return (
                  <tr key={timeSlot}>
                    <S.WeeklyGridTd style={{ textAlign: 'center', verticalAlign: 'middle', background: '#fff' }}>
                      <S.GridCellTime color="#374151">{timeSlot}</S.GridCellTime>
                    </S.WeeklyGridTd>
                    {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => {
                      const detail = cleanDetails.find(d => 
                        d.dayOfWeek === day && 
                        `${d.startTime.slice(0,5)} - ${d.endTime.slice(0,5)}` === timeSlot
                      );
                      
                      if (!detail) return <S.WeeklyGridTd key={day} />;
                      
                      const uigroup = getUIGroup(detail.activityName, detail.activityType);
                      const pal = PALETTES[uigroup];
                      const isCur = detail.id === selectedActId;
                      // Logic for "isDone": if current time is past endTime
                      const now = new Date();
                      const curMins = now.getHours() * 60 + now.getMinutes();
                      const [endH, endM] = detail.endTime.split(':').map(Number);
                      const isPast = (endH * 60 + endM) < curMins;
                      const isToday = todayDayStr === day;
                      const isDone = isToday && isPast;

                      return (
                        <S.WeeklyGridTd 
                          key={day}
                          $bg={isCur ? pal.tint : '#fff'}
                          $border={isCur ? pal.solid : '#EEF4F0'}
                          $isDone={isDone && !isCur}
                          onClick={() => {
                            if (isToday) setSelectedActId(detail.id);
                          }}
                        >
                          <S.GridCellName>{detail.activityName}</S.GridCellName>
                          {detail.details && <div style={{fontSize: 12, color: '#6B7280', marginTop: 4}}>{detail.details}</div>}
                          {isCur && <S.TimelineLiveBadge style={{marginTop: 8, display: 'inline-block', position: 'relative', top: 0, right: 0}}>LIVE</S.TimelineLiveBadge>}
                        </S.WeeklyGridTd>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </S.WeeklyGridTable>
        </S.WeeklyGridSection>
      )}

      {/* QUICK LOG */}
      <S.SplitContainer>
        <S.RightCol style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
          <S.SectionCard>
            <S.MatrixHeader>
              <S.MatrixIconBox $bg={PALETTES[curGroup].tint} $color={PALETTES[curGroup].solid}>
                {ICON_MAP[curGroup]}
              </S.MatrixIconBox>
              <S.MatrixTitleArea>
                <S.MatrixTitle>{selectedItem?.activityName}</S.MatrixTitle>
                <S.MatrixDesc>
                  {selectedItem?.startTime ? `${selectedItem.startTime.slice(0,5)} - ${selectedItem.endTime.slice(0,5)}` : ''} · Ghi nhận điểm danh & sinh hoạt
                </S.MatrixDesc>
              </S.MatrixTitleArea>
              
              {hasMatrix && (
                <S.BatchBtn onClick={() => curGroup === 'meal' ? handleBulkMarkMealsAll() : handleBulkMarkActivitiesGood()}>
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
                          $activeStyle={`box-shadow: 0 2px 8px -2px rgba(0,0,0,0.12);`}
                          onClick={opt.pick}
                        >
                          {opt.label}
                        </S.OptionBtn>
                      ))}
                    </S.OptionsGroup>
                    <S.NoteBtn $hasPhoto={m.hasPhoto} onClick={() => openNote(m)} title="Nhận xét & ảnh">
                      {m.hasPhoto && (
                        <img src={m.photoUrl!} alt="" style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: 10}} />
                      )}
                      {!m.hasPhoto && <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>}
                      {m.hasNote && <S.NoteIndicator />}
                    </S.NoteBtn>
                  </S.MatrixRow>
                ))}
              </S.MatrixList>
            ) : (
              <S.EmptyMatrixCard>
                <S.MatrixIconBox $bg="#E6EEE9" $color="#9CA3AF"><MapPin size={24} /></S.MatrixIconBox>
                <div>
                  <S.EmptyMatrixTitle>Hoạt động này không cần ghi nhận chi tiết</S.EmptyMatrixTitle>
                  <S.EmptyMatrixDesc>Chọn một mốc sinh hoạt khác (ăn, ngủ, học) ở cột trái để ghi nhanh cho từng bé.</S.EmptyMatrixDesc>
                </div>
              </S.EmptyMatrixCard>
            )}
            
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 14 }}>
              {saving && <span style={{fontSize: 13, color: '#6b7280'}}>Đang lưu...</span>}
              <S.BatchBtn onClick={handleSave}>Lưu cập nhật</S.BatchBtn>
            </div>
          </S.SectionCard>


        </S.RightCol>
      </S.SplitContainer>

      {/* NOTE MODAL */}
      {noteOpen && (
        <S.ModalBackdrop onClick={closeNote}>
          <S.ModalContainer onClick={e => e.stopPropagation()}>
            <S.ModalHeader>
              <S.AvatarNode $bg={noteGrad} style={{width: 42, height: 42, fontSize: 16}}>{noteInitial}</S.AvatarNode>
              <S.ModalTitleArea>
                <div>{noteName}</div>
                <div>Nhận xét · {selectedItem?.activityName}</div>
              </S.ModalTitleArea>
              <S.ModalCloseBtn onClick={closeNote}><X size={18} /></S.ModalCloseBtn>
            </S.ModalHeader>
            <S.ModalBody>
              <div>
                <S.InputLabel>Nhận xét của cô</S.InputLabel>
                <S.NoteTextarea 
                  value={noteDraft}
                  onChange={e => setNoteDraft(e.target.value)}
                  placeholder="Ví dụ: Bé ăn ngoan, tự xúc cơm rất giỏi…" 
                />
              </div>
              <div>
                <S.InputLabel>Ảnh đính kèm</S.InputLabel>
                {draftPhoto ? (
                  <div style={{ position: 'relative', borderRadius: 13, overflow: 'hidden', border: '1px solid #E6EEE9' }}>
                    <img src={draftPhoto} alt="" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', display: 'block' }} />
                    <button 
                      onClick={() => setDraftPhoto(null)} 
                      style={{ position: 'absolute', top: 8, right: 8, width: 32, height: 32, borderRadius: 9, border: 'none', background: 'rgba(15,23,42,.6)', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <X size={15} />
                    </button>
                  </div>
                ) : (
                  <S.PhotoUploadBtn onClick={() => fileInputRef.current?.click()}>
                    <Upload size={24} />
                    <span style={{ fontSize: 13, fontWeight: 700 }}>Tải ảnh lên</span>
                    <span style={{ fontSize: 11.5, color: '#9CA3AF', fontWeight: 500 }}>Chạm để chọn ảnh hoạt động của bé</span>
                  </S.PhotoUploadBtn>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
              </div>
              <S.ModalActionRow>
                <S.CancelBtn onClick={closeNote}>Huỷ</S.CancelBtn>
                <S.SaveBtn onClick={saveNote}>Lưu nhận xét</S.SaveBtn>
              </S.ModalActionRow>
            </S.ModalBody>
          </S.ModalContainer>
        </S.ModalBackdrop>
      )}
    </S.Container>
  );
};
