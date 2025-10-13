import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  NewUser: true,
  UserDetail: {
    UserID: '',
    UserName: ''
  },
  ChatRooms: []
};

const safelineSlice = createSlice({
  name: 'safeline',
  initialState,
  reducers: {
    SetNewUser(state, action) {
      state.NewUser = action.payload;
    },
    setSecretCode(state, action) {
      const { ID, UserName } = action.payload;
      state.UserDetail.UserID = ID;
      state.UserDetail.UserName = UserName;
    },
  },
});

export const { SetNewUser, setSecretCode } = safelineSlice.actions;
export default safelineSlice.reducer;
