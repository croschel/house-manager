import { RootState } from '..';

export const selectCurrentNotification = (state: RootState) =>
  state.notification.currentNotification;
