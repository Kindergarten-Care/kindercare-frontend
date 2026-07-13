import React from 'react';
import { Badge } from './PublishBadge.styles';

interface PublishBadgeProps {
  published: 0 | 1;
  publishedAt: number | null;
}

function formatPublishedAt(publishedAt: number): string {
  const d = new Date(publishedAt * 1000);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `Công khai lúc ${pad(d.getHours())}:${pad(d.getMinutes())} ${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

/** Badge trạng thái công khai hóa đơn TUITION/MONTHLY — không dùng cho EXTRACURRICULAR (luôn coi như đã công khai). */
export default function PublishBadge({ published, publishedAt }: PublishBadgeProps) {
  const isPublished = published === 1;
  return (
    <Badge $published={isPublished} title={isPublished && publishedAt ? formatPublishedAt(publishedAt) : undefined}>
      {isPublished ? 'Đã công khai' : 'Nháp — chưa công khai'}
    </Badge>
  );
}
