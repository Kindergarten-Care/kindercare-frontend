import { useState, useEffect } from 'react';
import { StudentMealRecord, StudentActivityRecord, MenuOfTheDay, MealStatus, NapStatus, ParticipationStatus, WeeklyScheduleResponse } from '@/config/types/activities';
import { ActivitiesService } from '@/services/activities';

export function useActivities() {
  const [loading, setLoading] = useState(true);
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'meals' | 'activities' | 'schedule'>('meals');
  const [searchQuery, setSearchQuery] = useState('');
  
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

  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const formatDate = (d: Date) => {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const dateStr = formatDate(currentDate);
        const [menuData, mealsData, activitiesData, scheduleData] = await Promise.all([
          ActivitiesService.getMenuOfTheDay('1', dateStr),
          ActivitiesService.getStudentMealRecords('1', dateStr),
          ActivitiesService.getStudentActivityRecords('1', dateStr),
          ActivitiesService.getWeeklySchedule('1', dateStr)
        ]);
        setMenu(menuData);
        setEditedMenu(menuData);
        setMealRecords(mealsData);
        setActivityRecords(activitiesData);
        setWeeklySchedule(scheduleData);
      } catch (error) {
        console.error('Error fetching activities data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [currentDate]);

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
    try {
      setSaving(true);
      const dateStr = formatDate(currentDate);
      await ActivitiesService.updateMenuOfTheDay('1', dateStr, editedMenu);
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
    try {
      setSaving(true);
      const dateStr = formatDate(currentDate);

      // Nhóm chính (bắt buộc thành công): Lưu trạng thái Ăn + Ngủ
      await Promise.all([
        ActivitiesService.updateStudentMealRecords('1', dateStr, mealRecords),
        ActivitiesService.updateStudentActivityRecords('1', dateStr, activityRecords)
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

    // Records
    mealRecords,
    activityRecords,
    weeklySchedule,
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
