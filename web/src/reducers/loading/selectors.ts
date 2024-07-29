import { RootState } from "@/reducers";

export const selectInitLoading = (state: RootState) => state.loading.init > 0;
