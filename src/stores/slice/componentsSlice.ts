import { createSlice } from "@reduxjs/toolkit";

export interface componentsStatus {
  isSideBarExpanded: boolean;
}

const initialState: componentsStatus = {
    isSideBarExpanded: true,
};

const componentsSlice = createSlice({
    name: 'components',
    initialState,
    reducers: {
        setSideBarExpanded: (state, action) => {
            state.isSideBarExpanded = action.payload;
        }
    }
})
export const { setSideBarExpanded } = componentsSlice.actions;
export default componentsSlice.reducer;