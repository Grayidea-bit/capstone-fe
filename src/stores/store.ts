import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slice/userSlice';
import progressReducer from './slice/progressSlice';
import componentsReducer from './slice/componentsSlice';
import chatReducer from './slice/chatSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    progress: progressReducer,
    components: componentsReducer,
    chat: chatReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch