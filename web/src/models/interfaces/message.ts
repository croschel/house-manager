import { NotificationType } from '../enums';

export interface AppMessage {
  title?: string;
  description?: string;
  type: NotificationType;
}
