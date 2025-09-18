import { createSlice } from "@reduxjs/toolkit";

export interface userStatus {
  name: string;
  avatarURL: string;
  access_token: string;
}

const initialState: userStatus = {
  name: "",
  avatarURL: "",
  access_token: "",
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
        setAccessToken: (state, action) => {
            state.access_token = action.payload;
        }
    }
})
export const { setName, setAvatarURL, setAccessToken } = userSlice.actions;
export default userSlice.reducer;