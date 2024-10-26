import { RootState } from '@/reducers';

export const selectCounter = (state: RootState) => state.app.counter;
