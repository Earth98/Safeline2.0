import { createSlice } from '@reduxjs/toolkit';
import { StatusEnum } from '../../Utils/Enum';

const initialState = {
  hub: null,
};

const SignalR = createSlice({
  name: 'SignalR',
  initialState,
  reducers: {
   setHub(state, action) {
      state.hub = action.payload;
    },
  },
});

export const { setHub } = SignalR.actions;
export default SignalR.reducer;
