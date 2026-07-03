'use client';

import { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { useAuth } from '@kindercare/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParent } from '@/contexts/ParentContext';
import { useStudent } from '@/contexts/StudentContext';
import { useSidebar } from '@/contexts/SidebarContext';
import { fetchNotifications, prependItem, selectUnreadCount } from '@/store/slices/notificationSlice';
import type { AppDispatch } from '@/store';
import { initPushNotification, type NotificationDto } from '@kindercare/core';
import { getGreeting, getFormattedDate, resolveRelationship } from '../utils/layoutHelpers';

let _localNotifId = 0;

export function useDashboardLayout() {
  const { collapsed, toggleCollapsed: handleToggle } = useSidebar();
  const [isNotifOpen, setIsNotifOpen] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const settingsRef = useRef<HTMLDivElement>(null);
  const locale = useLocale() as 'vi' | 'en';
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useAuth();
  const { parentProfile } = useParent();
  const { activeStudent } = useStudent();
  const dispatch = useDispatch<AppDispatch>();
  const unreadCount = useSelector(selectUnreadCount);

  // Init FCM only after login — user must be present
  useEffect(() => {
    if (user) initPushNotification();
  }, [user]);

  // Load inbox on mount
  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  // Refresh inbox when a foreground FCM push arrives + prepend the new item
  useEffect(() => {
    const handler = (e: Event) => {
      const payload = (e as CustomEvent).detail;
      const notif: NotificationDto = {
        notifId: --_localNotifId,
        userId: 0,
        title: payload.notification?.title ?? '',
        message: payload.notification?.body ?? '',
        type: payload.data?.type ?? 'OTHER',
        isRead: 0,
        isCritical: Number(payload.data?.isCritical ?? 0) as 0 | 1,
        dataPayload: payload.data ?? {},
        createdAt: Math.floor(Date.now() / 1000),
        updatedAt: Math.floor(Date.now() / 1000),
      };
      dispatch(prependItem(notif));
    };
    window.addEventListener('kc:push:message', handler);
    return () => window.removeEventListener('kc:push:message', handler);
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLocaleChange = useCallback(
    (nextLocale: 'vi' | 'en') => {
      if (nextLocale === locale) return;
      router.replace(pathname, { locale: nextLocale });
    },
    [locale, pathname, router]
  );

  const rawRelationship = activeStudent?.relationship ?? user?.relationship ?? user?.children?.[0]?.relationship;
  const rel = useMemo(() => resolveRelationship(rawRelationship, locale), [rawRelationship, locale]);

  const greetingText = useMemo(() => {
    const greeting = getGreeting(locale);
    if (!user) return `${greeting} 👋`;
    const fullName = parentProfile?.fullName || user.fullName || user.username || '';
    const shortName = fullName.trim().split(/\s+/).slice(-2).join(' ');
    const displayName = rel.label ? `${rel.label} ${shortName}` : shortName;
    return `${greeting}, ${displayName} 👋`;
  }, [locale, user, parentProfile, rel]);

  const formattedDate = useMemo(() => getFormattedDate(locale), [locale]);

  return {
    collapsed,
    handleToggle,
    isNotifOpen,
    setIsNotifOpen,
    isSettingsOpen,
    setIsSettingsOpen,
    settingsRef,
    locale,
    parentProfile,
    unreadCount,
    greetingText,
    formattedDate,
    handleLocaleChange,
    rel,
  };
}
