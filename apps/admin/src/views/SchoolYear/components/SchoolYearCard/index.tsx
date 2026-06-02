import React from 'react';
import {
  CardContainer,
  CardHeader,
  CardTitle,
  StatusBadge,
  StatusDot,
  DateBox,
  StatGrid,
  StatBox,
  StatLabel,
  StatValue,
  CardFooter,
  IconButton,
  TextButton
} from './styles';
import { 
  CalendarIcon, 
  EditIcon, 
  SettingsIcon, 
  ChevronRightIcon 
} from '@kindercare/ui';

export interface SchoolYearCardProps {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  totalFacilities: number;
  totalClasses: number;
  status: 'active' | 'past';
  onEdit?: (id: string) => void;
  onSettings?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

export function SchoolYearCard({
  id,
  name,
  startDate,
  endDate,
  totalFacilities,
  totalClasses,
  status,
  onEdit,
  onSettings,
  onViewDetails
}: SchoolYearCardProps): React.ReactElement {
  return (
    <CardContainer $status={status}>
      <CardHeader>
        <CardTitle $status={status}>{name}</CardTitle>
        <StatusBadge $status={status}>
          {status === 'active' && <StatusDot />}
          {status === 'active' ? 'Đang hoạt động' : 'Đã kết thúc'}
        </StatusBadge>
      </CardHeader>

      <DateBox $status={status}>
        <CalendarIcon size={18} />
        {startDate} - {endDate}
      </DateBox>

      <StatGrid>
        <StatBox $status={status}>
          <StatLabel $status={status}>Tổng Cơ sở</StatLabel>
          <StatValue $status={status}>
            {totalFacilities < 10 ? `0${totalFacilities}` : totalFacilities}
          </StatValue>
        </StatBox>
        <StatBox $status={status}>
          <StatLabel $status={status}>Tổng Lớp học</StatLabel>
          <StatValue $status={status}>
            {totalClasses < 10 ? `0${totalClasses}` : totalClasses}
          </StatValue>
        </StatBox>
      </StatGrid>

      <CardFooter>
        {status === 'active' ? (
          <>
            <IconButton onClick={() => onEdit?.(id)} aria-label="Edit">
              <EditIcon size={18} />
            </IconButton>
            <IconButton onClick={() => onSettings?.(id)} aria-label="Settings">
              <SettingsIcon size={18} />
            </IconButton>
          </>
        ) : (
          <TextButton onClick={() => onViewDetails?.(id)}>
            Xem chi tiết <ChevronRightIcon size={14} />
          </TextButton>
        )}
      </CardFooter>
    </CardContainer>
  );
}
