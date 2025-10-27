import { createSlice } from "@reduxjs/toolkit";

export interface componentsStatus {
  isChatOpen: boolean;
}

const initialState: componentsStatus = {
    isChatOpen: false,
};

const componentsSlice = createSlice({
    name: 'components',
    initialState,
    reducers: {
        setChatOpen: (state, action) => {
            state.isChatOpen = !state.isChatOpen;
        }
    }
})
export const { setChatOpen } = componentsSlice.actions;
export default componentsSlice.reducer;