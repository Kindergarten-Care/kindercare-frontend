'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown } from '@kindercare/ui';
import { menuService } from '@/services/Menu/MenuService';
import { MenuDto } from '@/config/types/menu';
import { useMenuList } from './hooks/useMenuList';
import MenuImportModal from './components/MenuImportModal';
import DeleteMenuModal from './components/DeleteMenuModal';
import {
  Container, PageHeader, Title, PageSubtitle, BtnImport, ErrorBanner,
  FilterBar, FGroup, FLabel, SearchBox, SearchInput, SearchIcon,
  TableCard, Table, Th, Tr, Td, ClsCell, ClsAv, ClsName, WeekPill, MenuName, Updated, DelBtn,
  LoadingText, EmptyState, EmptyIcon, EmptyTitle, EmptyDesc,
} from './styles';

const CLASS_AV = [
  'linear-gradient(140deg,#fcd34d,#f59e0b)',
  'linear-gradient(140deg,#6ee7b7,#10b981)',
  'linear-gradient(140deg,#60a5fa,#2563eb)',
  'linear-gradient(140deg,#fda4af,#f43f5e)',
  'linear-gradient(140deg,#c4b5fd,#8b5cf6)',
  'linear-gradient(140deg,#0a7a4c,#005a36)',
];

function formatDateTime(ts: number) {
  const d = new Date(ts * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${pad(d.getHours())}:${pad(d.getMinutes())} · ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export default function MenuListView() {
  const router = useRouter();
  const {
    grades, loading, error,
    classId, year, weekNumber, search,
    filteredMenus,
    setClassId, setYear, setWeekNumber, setSearch,
    refetch,
  } = useMenuList();

  const [showImport, setShowImport] = useState(false);
  const [deletingMenu, setDeletingMenu] = useState<MenuDto | null>(null);

  const classOptions = useMemo(
    () => [
      { value: '', label: 'Tất cả lớp' },
      ...grades.flatMap(g => g.classes.map(c => ({ value: String(c.classId), label: c.className, group: g.gradeName }))),
    ],
    [grades]
  );

  const yearOptions = useMemo(() => {
    const current = new Date().getFullYear();
    return [
      { value: '', label: 'Tất cả' },
      ...[current, current - 1].map(y => ({ value: String(y), label: String(y) })),
    ];
  }, []);

  const weekOptions = useMemo(() => {
    const weeks = Array.from(new Set(filteredMenus.map(m => m.weekNumber))).sort((a, b) => b - a);
    return [
      { value: '', label: 'Tất cả tuần' },
      ...weeks.map(w => ({ value: String(w), label: `Tuần ${w}` })),
    ];
  }, [filteredMenus]);

  return (
    <Container>
      <PageHeader>
        <div>
          <Title>Thực đơn</Title>
          <PageSubtitle>Quản lý thực đơn tuần theo lớp · nhập từ file bếp gửi</PageSubtitle>
        </div>
        <BtnImport onClick={() => setShowImport(true)}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3M8 7l4-4 4 4" /><path d="M4 15v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4" /></svg>
          Nhập thực đơn
        </BtnImport>
      </PageHeader>

      {error && <ErrorBanner>{error}</ErrorBanner>}

      <FilterBar>
        <FGroup>
          <FLabel>Lớp</FLabel>
          <Dropdown value={classId} onChange={setClassId} options={classOptions} ariaLabel="Lớp" />
        </FGroup>
        <FGroup>
          <FLabel>Năm</FLabel>
          <Dropdown value={year} onChange={setYear} options={yearOptions} ariaLabel="Năm" />
        </FGroup>
        <FGroup>
          <FLabel>Tuần</FLabel>
          <Dropdown value={weekNumber} onChange={setWeekNumber} options={weekOptions} ariaLabel="Tuần" />
        </FGroup>
        <FGroup>
          <FLabel>Tìm kiếm</FLabel>
          <SearchBox>
            <SearchIcon>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
            </SearchIcon>
            <SearchInput placeholder="Tìm thực đơn…" value={search} onChange={e => setSearch(e.target.value)} />
          </SearchBox>
        </FGroup>
      </FilterBar>

      <TableCard>
        <Table>
          <thead>
            <tr>
              <Th>Lớp</Th>
              <Th>Tuần / Năm</Th>
              <Th>Tên thực đơn</Th>
              <Th>Cập nhật</Th>
              <Th $align="center">Xóa</Th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5}><LoadingText>Đang tải dữ liệu...</LoadingText></td></tr>
            ) : filteredMenus.length === 0 ? (
              <tr>
                <td colSpan={5}>
                  <EmptyState>
                    <EmptyIcon>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3v7a2 2 0 0 0 4 0V3M7 10v11" /><path d="M16 3c-1.4 0-2.5 2-2.5 4.5S14.6 12 16 12v9" /></svg>
                    </EmptyIcon>
                    <EmptyTitle>Chưa có thực đơn nào</EmptyTitle>
                    <EmptyDesc>Bấm "Nhập thực đơn" để tải lên file từ bếp, hoặc đổi bộ lọc.</EmptyDesc>
                  </EmptyState>
                </td>
              </tr>
            ) : (
              filteredMenus.map((m, i) => (
                <Tr key={m.id} onClick={() => router.push(`/menus/${m.id}`)}>
                  <Td>
                    <ClsCell>
                      <ClsAv $bg={CLASS_AV[i % CLASS_AV.length]}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 3v7a2 2 0 0 0 4 0V3M7 10v11" /><path d="M16 3c-1.4 0-2.5 2-2.5 4.5S14.6 12 16 12v9" /></svg>
                      </ClsAv>
                      <ClsName>{m.className}</ClsName>
                    </ClsCell>
                  </Td>
                  <Td>
                    <WeekPill>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></svg>
                      Tuần {m.weekNumber}/{m.year}
                    </WeekPill>
                  </Td>
                  <Td><MenuName>{m.menuName}</MenuName></Td>
                  <Td><Updated>{formatDateTime(m.updatedAt)}</Updated></Td>
                  <Td $align="center">
                    <DelBtn
                      title="Xóa thực đơn"
                      onClick={e => { e.stopPropagation(); setDeletingMenu(m); }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /></svg>
                    </DelBtn>
                  </Td>
                </Tr>
              ))
            )}
          </tbody>
        </Table>
      </TableCard>

      {showImport && (
        <MenuImportModal
          onClose={() => setShowImport(false)}
          onSuccess={() => { setShowImport(false); refetch(); }}
        />
      )}

      {deletingMenu && (
        <DeleteMenuModal
          menuName={deletingMenu.menuName}
          onClose={() => setDeletingMenu(null)}
          onConfirm={async () => {
            await menuService.deleteMenu(deletingMenu.id);
            await refetch();
          }}
        />
      )}
    </Container>
  );
}
