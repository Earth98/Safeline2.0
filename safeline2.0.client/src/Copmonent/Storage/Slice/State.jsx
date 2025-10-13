import { createSlice } from '@reduxjs/toolkit';
import { safelineStepEnum, StatusEnum } from '../../Utils/Enum';

const initialState = {
  Status: StatusEnum.Ideal,
  Step: safelineStepEnum.Ideal,
  loader: true,
  UserDetail: { UserName: '', UserID: '' },
  ChatRooms: []
};

const stateSlice = createSlice({
  name: 'SafelineState',
  initialState,
  reducers: {
    setStatus(state, action) {
      state.Status = action.payload;
    },
    setStep(state, action) {
      state.Step = action.payload;
    },
    setLoader(state, action) {
      if (action.payload === true) {
        state.loader = true;
      } else {
        state.loader = false;
      }
    }
  },
});

export const { setStatus, setStep, setLoader } = stateSlice.actions;
export default stateSlice.reducer;
