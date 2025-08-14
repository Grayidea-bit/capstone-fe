import { createSlice } from "@reduxjs/toolkit";

export interface userStatus {
  name: string;
  avatarURL: string;
  sessionId: string;
}

const initialState: userStatus = {
  name: "",
  avatarURL: "",
  sessionId: "",
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setAvatarURL: (state, action) => {
            state.avatarURL = action.payload;
        },
        setSessionId: (state, action) => {
            state.sessionId = action.payload;
        }
    }
})
export const { setName, setAvatarURL, setSessionId } = userSlice.actions;
export default userSlice.reducer;