import { createSlice } from "@reduxjs/toolkit";

export interface repoStatus {

}

const initialState: repoStatus = {
};

const repoSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {
    }
})
export const {} = repoSlice.actions;
export default repoSlice.reducer;