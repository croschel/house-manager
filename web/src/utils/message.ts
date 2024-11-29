import { NotificationType } from '@/models/enums';
import { AppMessage } from '@/models/interfaces';

export const buildAppError = (error: {
  type: 'Fetch' | 'Delete' | 'Update' | 'Create';
  description?: string;
}): AppMessage => {
  return {
    title: `${error.type} Error`,
    type: NotificationType.ERROR,
    description:
      error.description !== undefined
        ? error.description
        : `There was a problem on ${error.type}. Please try again, if the problem persists. Please email support team.`
  };
};

export const buildAppSuccess = (message: {
  type: 'Fetch' | 'Delete' | 'Update' | 'Create';
  description?: string;
}): AppMessage => ({
  title: `Success`,
  type: NotificationType.SUCCESS,
  description:
    message.description !== undefined ? message.description : message.type
});
