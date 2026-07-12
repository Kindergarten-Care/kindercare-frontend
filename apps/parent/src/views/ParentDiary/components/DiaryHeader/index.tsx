import * as S from './styles';
import { Svg } from '../Svg';
import { DatePicker } from '@kindercare/ui';

interface DiaryHeaderProps {
  studentName: string;
  className: string;
  selectedDate: Date;
  selectedDateStr: string;
  onDateChange: (date: Date) => void;
  title?: string;
}

export function DiaryHeader({
  studentName,
  className,
  selectedDate,
  selectedDateStr,
  onDateChange,
  title = 'Nhật ký hằng ngày',
}: DiaryHeaderProps) {
  return (
    <S.PageHeader>
      <div>
        <S.PageTitle>{title}</S.PageTitle>
        <S.PageCrumb>
          <Svg size={15}>
            <circle cx="12" cy="8" r="3.6" />
            <path d="M5 20c0-3.4 3.1-5.5 7-5.5s7 2.1 7 5.5" />
          </Svg>
          <b>{studentName}</b> · {className}
        </S.PageCrumb>
      </div>
      <S.HeaderActions>
        <DatePicker
          value={selectedDate}
          onChange={onDateChange}
          maxDate={new Date()}
          ariaLabel="Chọn ngày xem nhật ký"
        >
          {({ onClick }) => (
            <S.DateChip type="button" onClick={onClick}>
              <Svg size={16}>
                <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
                <path d="M3 9h18M8 2.5v4M16 2.5v4" />
              </Svg>
              {selectedDateStr}
              <Svg size={15} sw={2.2}>
                <path d="m6 9 6 6 6-6" />
              </Svg>
            </S.DateChip>
          )}
        </DatePicker>
      </S.HeaderActions>
    </S.PageHeader>
  );
}
