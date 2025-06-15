import { RootState } from '..';

export const selectToken = (state: RootState): string | undefined => {
  return state.user.token;
};
