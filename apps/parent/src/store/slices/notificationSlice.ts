import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { notificationService, type NotificationDto } from '@kindercare/core';

// ─── State ────────────────────────────────────────────────────────────────────

interface NotificationState {
  items:   NotificationDto[];
  loading: boolean;
  error:   string | null;
}

const initialState: NotificationState = {
  items:   [],
  loading: false,
  error:   null,
};

// ─── Async thunks ─────────────────────────────────────────────────────────────

export const fetchNotifications = createAsyncThunk(
  'notifications/fetch',
  () => notificationService.getInbox(),
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // Optimistic: mark one as read immediately; caller fires the API in background
    markOneRead(state, action: PayloadAction<number>) {
      const item = state.items.find(n => n.notifId === action.payload);
      if (item) item.isRead = 1;
    },
    // Optimistic: mark all as read immediately
    markAllRead(state) {
      state.items.forEach(n => { n.isRead = 1; });
    },
    // Prepend a new item received via FCM foreground
    prependItem(state, action: PayloadAction<NotificationDto>) {
      state.items.unshift(action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNotifications.pending, state => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.items   = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.error.message ?? 'Lỗi tải thông báo';
      });
  },
});

export const { markOneRead, markAllRead, prependItem } = notificationSlice.actions;

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectNotifications = (state: { notifications: NotificationState }) =>
  state.notifications.items;

export const selectUnreadCount = (state: { notifications: NotificationState }) =>
  state.notifications.items.filter(n => n.isRead === 0).length;

export const selectNotifLoading = (state: { notifications: NotificationState }) =>
  state.notifications.loading;

export default notificationSlice.reducer;
