import { createSlice } from "@reduxjs/toolkit";

export interface componentsStatus {
  isSideBarExpanded: boolean;
  isChatExpanded: boolean;
}

const initialState: componentsStatus = {
    isSideBarExpanded: true,
    isChatExpanded: true,
};

const componentsSlice = createSlice({
    name: 'components',
    initialState,
    reducers: {
        setSideBarExpanded: (state, action) => {
            state.isSideBarExpanded = action.payload;
        },
        setChatExpanded: (state, action) => {
            state.isChatExpanded = action.payload;
        }
    }
})
export const { setSideBarExpanded, setChatExpanded } = componentsSlice.actions;
export default componentsSlice.reducer;