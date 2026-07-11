import { useState, useEffect } from 'react';
import { StudentMealRecord, StudentActivityRecord, MenuOfTheDay, MealStatus, NapStatus, ParticipationStatus, WeeklyScheduleResponse, WeeklyMenuResponse } from '@/config/types/activities';
import { ActivitiesService } from '@/services/activities';
import { classService } from '@/services/class/ClassService';
import type { TeacherClassDomainModel } from '@/config/types/class';

export function useActivities() {
  const [loading, setLoading] = useState(true);
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'meals' | 'activities' | 'schedule'>('meals');
  const [searchQuery, setSearchQuery] = useState('');

  // Active class — resolved from /teacher/my-class once, then overridable via picker
  const [classId, setClassId] = useState<string | null>(null);
  const [className, setClassName] = useState<string | null>(null);
  const [availableClasses, setAvailableClasses] = useState<TeacherClassDomainModel[]>([]);
  const [classOptionsLoaded, setClassOptionsLoaded] = useState(false);
  
  // Menu State
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isMenuEditing, setIsMenuEditing] = useState(false);
  const [menu, setMenu] = useState<MenuOfTheDay>({
    breakfastMenu: '',
    lunchMenu: '',
    afternoonSnackMenu: ''
  });
  const [editedMenu, setEditedMenu] = useState<MenuOfTheDay>({
    breakfastMenu: '',
    lunchMenu: '',
    afternoonSnackMenu: ''
  });

  // Records State
  const [mealRecords, setMealRecords] = useState<StudentMealRecord[]>([]);
  const [activityRecords, setActivityRecords] = useState<StudentActivityRecord[]>([]);
  
  // Weekly Schedule State
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklyScheduleResponse | null>(null);

  // Weekly Menu State
  const [weeklyMenu, setWeeklyMenu] = useState<WeeklyMenuResponse | null>(null);

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const formatDate = (d: Date) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  // Get today's day name
  const getDayName = (d: Date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[d.getDay()];
  };

  useEffect(() => {
    let cancelled = false;
    async function resolveClass() {
      try {
        // Fetch the full class list (used by the picker in the header)
        const all = await classService.getClasses().catch(() => []);
        if (cancelled) return;
        setAvailableClasses(all);
        setClassOptionsLoaded(true);

        // Default selection: the active class returned by /teacher/my-class.
        // If the API rejects (e.g. dev environment), fall back to the first
        // available class so the user still sees something meaningful.
        const active = await classService.getMyActiveClass();
        if (cancelled) return;
        const fallback = all[0];
        const target = active?.classInfo?.classId != null
          ? active.classInfo
          : fallback
            ? { classId: fallback.classId, className: fallback.className }
            : null;
        if (target) {
          setClassId(String(target.classId));
          setClassName(target.className ?? null);
        } else {
          // Last-resort fallback: hardcode class 13 (Chồi 1) so the page
          // never sits in "Loading…" forever when both APIs fail
          // (e.g. expired token / dev environment with no my-class data).
          console.warn('No class returned by API, defaulting to hardcoded class 13.');
          setClassId('13');
          setClassName('Chồi 1');
        }
      } catch (error) {
        console.warn('Failed to resolve my-active-class, falling back to no data:', error);
        setClassId('13');
        setClassName('Chồi 1');
      }
    }
    resolveClass();
    return () => {
      cancelled = true;
    };
  }, []);

  // Manual class switcher (when the user picks a different class in the picker)
  const handleSelectClass = (nextClassId: string, nextClassName?: string) => {
    setClassId(nextClassId);
    if (nextClassName) setClassName(nextClassName);
    else {
      const found = availableClasses.find(c => String(c.classId) === String(nextClassId));
      if (found) setClassName(found.className);
    }
  };

  useEffect(() => {
    if (!classId) return;
    async function loadData() {
      try {
        setLoading(true);
        const dateStr = formatDate(currentDate);
        const [menuData, mealsData, activitiesData, scheduleData, weeklyMenuData] = await Promise.all([
          ActivitiesService.getMenuOfTheDay(classId!, dateStr),
          ActivitiesService.getStudentMealRecords(classId!, dateStr),
          ActivitiesService.getStudentActivityRecords(classId!, dateStr),
          ActivitiesService.getWeeklySchedule(classId!, dateStr),
          ActivitiesService.getWeeklyMenu(classId!, dateStr)
        ]);
        setMenu(menuData);
        setEditedMenu(menuData);
        setMealRecords(mealsData);
        setActivityRecords(activitiesData);
        setWeeklySchedule(scheduleData);
        setWeeklyMenu(weeklyMenuData);
      } catch (error) {
        console.error('Error fetching activities data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [currentDate, classId]);

  const handleMealStatusChange = (studentId: string, meal: 'breakfast' | 'lunch' | 'afternoonSnack', status: MealStatus) => {
    setMealRecords(prev =>
      prev.map(record =>
        record.studentId === studentId ? { ...record, [meal]: status } : record
      )
    );
  };

  const handleMealNoteChange = (studentId: string, note: string) => {
    setMealRecords(prev =>
      prev.map(record =>
        record.studentId === studentId ? { ...record, note } : record
      )
    );
  };

  const handleMealPhotoChange = (studentId: string, photoUrl: string | undefined) => {
    setMealRecords(prev =>
      prev.map(record =>
        record.studentId === studentId ? { ...record, photoUrl } : record
      )
    );
  };

  const handleActivityNapChange = (studentId: string, nap: NapStatus) => {
    setActivityRecords(prev =>
      prev.map(record =>
        record.studentId === studentId ? { ...record, nap } : record
      )
    );
  };

  const handleActivityParticipationChange = (studentId: string, participation: ParticipationStatus) => {
    setActivityRecords(prev =>
      prev.map(record =>
        record.studentId === studentId ? { ...record, participation } : record
      )
    );
  };

  const handleActivityNoteChange = (studentId: string, note: string) => {
    setActivityRecords(prev =>
      prev.map(record =>
        record.studentId === studentId ? { ...record, note } : record
      )
    );
  };

  const handleActivityPhotoChange = (studentId: string, photoUrl: string | undefined) => {
    setActivityRecords(prev =>
      prev.map(record =>
        record.studentId === studentId ? { ...record, photoUrl } : record
      )
    );
  };



  // Bulk status appliers
  const handleBulkMarkMealsAll = () => {
    setMealRecords(prev =>
      prev.map(record => ({
        ...record,
        breakfast: 'ALL',
        lunch: 'ALL',
        afternoonSnack: 'ALL'
      }))
    );
  };

  const handleBulkMarkActivitiesGood = () => {
    setActivityRecords(prev =>
      prev.map(record => ({
        ...record,
        nap: 'GOOD',
        participation: 'ACTIVE'
      }))
    );
  };

  const handleSaveMenu = async () => {
    if (!classId) return false;
    try {
      setSaving(true);
      const dateStr = formatDate(currentDate);
      await ActivitiesService.updateMenuOfTheDay(classId, dateStr, editedMenu);
      setMenu(editedMenu);
      setIsMenuEditing(false);
      return true;
    } catch (e) {
      console.warn('Lỗi lưu menu:', e);
      return false;
    } finally {
      setSaving(false);
    }
  };

  // Save changes handler (for everything else)
  const handleSave = async () => {
    if (!classId) return;
    try {
      setSaving(true);
      const dateStr = formatDate(currentDate);

      // Nhóm chính (bắt buộc thành công): Lưu trạng thái Ăn + Ngủ
      await Promise.all([
        ActivitiesService.updateStudentMealRecords(classId, dateStr, mealRecords),
        ActivitiesService.updateStudentActivityRecords(classId, dateStr, activityRecords)
      ]);

      alert('Đã lưu thành công trạng thái Ăn/Ngủ của các bé!');
    } catch (error) {
      console.error('Error saving daily activities:', error);
      alert('Có lỗi xảy ra trong quá trình lưu dữ liệu!');
    } finally {
      setSaving(false);
    }
  };

  // Filters students depending on the search query
  const filteredMeals = mealRecords.filter(record =>
    record.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredActivities = activityRecords.filter(record =>
    record.studentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    loading,
    saving,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    
    // Menu States
    isMenuOpen,
    setIsMenuOpen,
    isMenuEditing,
    setIsMenuEditing,
    menu,
    setMenu,
    editedMenu,
    setEditedMenu,
    
    // Date Navigator States
    currentDate,
    setCurrentDate,

    // Active class context
    classId,
    className,
    availableClasses,
    classOptionsLoaded,
    handleSelectClass,

    // Records
    mealRecords,
    activityRecords,
    weeklySchedule,
    weeklyMenu,
    filteredMeals,
    filteredActivities,

    // Actions
    handleMealStatusChange,
    handleMealNoteChange,
    handleMealPhotoChange,
    handleActivityNapChange,
    handleActivityParticipationChange,
    expandedStudentId,
    setExpandedStudentId,
    handleActivityNoteChange,
    handleActivityPhotoChange,
    handleBulkMarkMealsAll,
    handleBulkMarkActivitiesGood,
    handleSave,
    handleSaveMenu,
  };
}
