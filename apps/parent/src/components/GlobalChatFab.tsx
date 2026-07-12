'use client';

import React from 'react';
import { useStudent } from '@/contexts/StudentContext';
import ChatFab from '@/views/ParentDashboard/components/ChatFab';
import { getTeacherDisplayName } from '@/utils/Teacher/TeacherDisplay';

const MOCK_MESSAGES = [
  {
    id: '1',
    sender: 'Cô Phạm Thị Hương',
    avatar: '👩‍🏫',
    preview: 'Hôm nay bé Châu rất ngoan, chị xem ảnh lúc vẽ tranh ạ 😊',
    time: '9:30',
    unread: true,
  },
  {
    id: '2',
    sender: 'Phụ huynh (Bạn)',
    avatar: '👩',
    preview: 'Cảm ơn cô, chiều cháu học thêm tiếng Anh không ạ?',
    time: '9:45',
    unread: false,
    isMe: true,
  },
  {
    id: '3',
    sender: 'Cô Phạm Thị Hương',
    avatar: '👩‍🏫',
    preview: 'Dạ có ạ, 14:00-14:30 là tiếng Anh về chủ đề con vật nhé chị!',
    time: '9:50',
    unread: true,
  },
];

export default function GlobalChatFab() {
  const { activeStudent } = useStudent();

  if (!activeStudent) return null;

  const leadTeacher = activeStudent.teachers && activeStudent.teachers.length > 0
    ? activeStudent.teachers[0]
    : null;

  const teacherName = leadTeacher ? getTeacherDisplayName(leadTeacher) : 'Giáo viên';
  const unreadCount = MOCK_MESSAGES.filter(m => m.unread && !m.isMe).length;

  return (
    <ChatFab
      teacherName={teacherName}
      initialMessages={MOCK_MESSAGES}
      unreadCount={unreadCount}
      classroom={activeStudent.className}
    />
  );
}
