import { useState, useEffect } from 'react';
import { StudentMealRecord, StudentActivityRecord, MenuOfTheDay, MealStatus, NapStatus, ParticipationStatus } from '@/config/types/activities';
import { ActivitiesService } from '@/services/activities';

export function useActivities() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'meals' | 'activities'>('meals');
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

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [menuData, mealsData, activitiesData] = await Promise.all([
          ActivitiesService.getMenuOfTheDay('today'),
          ActivitiesService.getStudentMealRecords('M1', 'today'),
          ActivitiesService.getStudentActivityRecords('M1', 'today')
        ]);
        setMenu(menuData);
        setEditedMenu(menuData);
        setMealRecords(mealsData);
        setActivityRecords(activitiesData);
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
      if (activeTab === 'meals') {
        await Promise.all([
          ActivitiesService.updateMenuOfTheDay('today', editedMenu),
          ActivitiesService.updateStudentMealRecords('M1', 'today', mealRecords)
        ]);
        setMenu(editedMenu);
        setIsMenuEditing(false);
      } else {
        await ActivitiesService.updateStudentActivityRecords('M1', 'today', activityRecords);
      }
      alert('Đã lưu thành công dữ liệu ngày hôm nay!');
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
    filteredMeals,
    filteredActivities,

    // Actions
    handleMealStatusChange,
    handleMealNoteChange,
    handleActivityNapChange,
    handleActivityParticipationChange,
    handleActivityNoteChange,
    handleBulkMarkMealsAll,
    handleBulkMarkActivitiesGood,
    handleSave,
  };
}
