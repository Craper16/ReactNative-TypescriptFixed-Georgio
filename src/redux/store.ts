import {configureStore} from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import articlesSlice from './articles/articlesSlice';
import {authApi} from './api/authApi';
import {articlesApi} from './api/articlesApi';
import {setupListeners} from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    articles: articlesSlice,
    [authApi.reducerPath]: authApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(articlesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
