import { createReducer } from '@reduxjs/toolkit';

import * as NotificationActions from './actions';
import { AppMessage } from '@/models/interfaces';

export interface NotificationState {
  currentNotification?: AppMessage;
}

const initialState: NotificationState = {
  currentNotification: undefined
};

export const NotificationReducer = createReducer(
  initialState,
  (notification) => {
    notification.addCase(
      NotificationActions.addNotificationAction,
      (state: NotificationState, { payload }) => ({
        ...state,
        currentNotification: payload
      })
    );
  }
);
