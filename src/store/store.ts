import { configureStore } from '@reduxjs/toolkit';
import musicSlice from '../slice/musicSlice';
// import { middleware } from '../middleware/middleware';

export const store = configureStore({
  reducer: {
    music:musicSlice,
  },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;