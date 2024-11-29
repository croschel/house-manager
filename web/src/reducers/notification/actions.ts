import { AppMessage } from '@/models/interfaces';
import { createAction } from '@reduxjs/toolkit';

export const addNotificationAction = createAction<AppMessage | undefined>(
  'NOTIFY/ADD_NOTIFICATION'
);
