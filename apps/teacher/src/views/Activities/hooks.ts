import { useState, useEffect } from 'react';
import { StudentMealRecord, StudentActivityRecord, MenuOfTheDay, MealStatus, NapStatus, ParticipationStatus, ScheduleItem } from '@/config/types/activities';
import { ActivitiesService } from '@/services/activities';

export function useActivities() {
  const [loading, setLoading] = useState(true);
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
  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [menuData, mealsData, activitiesData, scheduleData] = await Promise.all([
          ActivitiesService.getMenuOfTheDay('today'),
          ActivitiesService.getStudentMealRecords('1', 'today'),
          ActivitiesService.getStudentActivityRecords('1', 'today'),
          ActivitiesService.getDailySchedule('1', 'today')
        ]);
        setMenu(menuData);
        setEditedMenu(menuData);
        setMealRecords(mealsData);
        setActivityRecords(activitiesData);
        setScheduleItems(scheduleData);
      } catch (error) {
        console.error('Error fetching activities data:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

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

  const handleScheduleStatusChange = (id: string, completed: boolean) => {
    setScheduleItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, completed } : item
      )
    );
  };

  const handleSchedulePhotoChange = (id: string, photoUrl: string | undefined) => {
    setScheduleItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, classPhoto: photoUrl } : item
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

  // Save changes handler
  const handleSave = async () => {
    try {
      setSaving(true);

      // Nhóm chính (bắt buộc thành công): Lưu trạng thái Ăn + Ngủ
      await Promise.all([
        ActivitiesService.updateStudentMealRecords('1', 'today', mealRecords),
        ActivitiesService.updateStudentActivityRecords('1', 'today', activityRecords)
      ]);

      // Nhóm phụ (chấp nhận lỗi): Menu + Lịch trình
      try {
        await ActivitiesService.updateMenuOfTheDay('today', editedMenu);
        setMenu(editedMenu);
        setIsMenuEditing(false);
      } catch (e) {
        console.warn('Lỗi lưu menu (không ảnh hưởng):', e);
      }

      try {
        await ActivitiesService.updateDailySchedule('1', 'today', scheduleItems);
      } catch (e) {
        console.warn('Lỗi lưu lịch trình (không ảnh hưởng):', e);
      }

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

    // Records
    mealRecords,
    activityRecords,
    scheduleItems,
    filteredMeals,
    filteredActivities,

    // Actions
    handleMealStatusChange,
    handleMealNoteChange,
    handleActivityNapChange,
    handleActivityParticipationChange,
    handleActivityNoteChange,
    handleScheduleStatusChange,
    handleSchedulePhotoChange,
    handleBulkMarkMealsAll,
    handleBulkMarkActivitiesGood,
    handleSave,
  };
}
