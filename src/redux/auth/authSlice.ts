import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface authModel {
  accessToken: string | null;
}

const initialState: authModel = {
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{accessToken: string}>) => {
      state.accessToken = action.payload.accessToken;
    },
    defaultState: state => {
      state.accessToken = initialState.accessToken;
    },
  },
});

export const {setUser, defaultState} = authSlice.actions;

export default authSlice.reducer;
