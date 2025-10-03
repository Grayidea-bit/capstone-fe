import { createSlice } from "@reduxjs/toolkit";
import type { ProgressPage } from "@/utils/type";

export interface progressStatus {
  progress: 'login' | 'select' | 'reveal';
  isLogin: boolean;
  page: ProgressPage;
}

const initialState: progressStatus = {
    progress: 'login',
    isLogin: false,
    page: 'fileTreeAndOverview',
};

const progressSlice = createSlice({
    name: 'progress',
    initialState,
    reducers: {
        setProgress: (state, action) => {
            state.progress = action.payload;
        },
        setIsLogin: (state, action) => {
            state.isLogin = action.payload;
        },
        setPage: (state, action) => {
            state.page = action.payload;
        },
    }
})
export const { setProgress, setIsLogin, setPage } = progressSlice.actions;
export default progressSlice.reducer;