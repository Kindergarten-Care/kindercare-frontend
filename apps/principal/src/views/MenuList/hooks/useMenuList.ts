import { useState, useEffect, useCallback, useMemo } from 'react';
import { menuService } from '@/services/Menu/MenuService';
import { gradeService } from '@/services/grade/GradeService';
import { MenuDto } from '@/config/types/menu';
import { GradeDomainModel } from '@/config/types/grade';

interface UseMenuListReturn {
  menus: MenuDto[];
  grades: GradeDomainModel[];
  loading: boolean;
  error: string | null;
  classId: string;
  year: string;
  weekNumber: string;
  search: string;
  filteredMenus: MenuDto[];
  setClassId: (v: string) => void;
  setYear: (v: string) => void;
  setWeekNumber: (v: string) => void;
  setSearch: (v: string) => void;
  refetch: () => Promise<void>;
}

export const useMenuList = (): UseMenuListReturn => {
  const [menus, setMenus] = useState<MenuDto[]>([]);
  const [grades, setGrades] = useState<GradeDomainModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [classId, setClassId] = useState('');
  const [year, setYear] = useState('');
  const [weekNumber, setWeekNumber] = useState('');
  const [search, setSearch] = useState('');

  const fetchAll = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const [menusData, gradesData] = await Promise.all([
        menuService.getMenus({
          classId: classId ? Number(classId) : undefined,
          year: year ? Number(year) : undefined,
          weekNumber: weekNumber ? Number(weekNumber) : undefined,
        }),
        gradeService.getGradesAndClasses(),
      ]);
      setMenus(menusData);
      setGrades(gradesData);
    } catch (err: any) {
      setError(err.message || 'Lỗi khi tải danh sách thực đơn');
    } finally {
      setLoading(false);
    }
  }, [classId, year, weekNumber]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const filteredMenus = useMemo(() => {
    const term = search.trim().toLowerCase();
    return menus
      .filter(m => !term || m.menuName.toLowerCase().includes(term) || m.className.toLowerCase().includes(term))
      .sort((a, b) => b.year - a.year || b.weekNumber - a.weekNumber || a.className.localeCompare(b.className));
  }, [menus, search]);

  return {
    menus, grades, loading, error,
    classId, year, weekNumber, search,
    filteredMenus,
    setClassId, setYear, setWeekNumber, setSearch,
    refetch: fetchAll,
  };
};
