import { createSlice } from "@reduxjs/toolkit";

export interface progressStatus {
  progress: 'login' | 'home';
  isLogin: boolean;
}

const initialState: progressStatus = {
    progress: 'login',
    isLogin: false,
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
    }
})
export const { setProgress, setIsLogin } = progressSlice.actions;
export default progressSlice.reducer;