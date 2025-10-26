import { createSlice } from '@reduxjs/toolkit';
import { ChatRoomStepEnum, safelineStepEnum, StatusEnum } from '../../Utils/Enum';

const initialState = {
  Status: StatusEnum.Ideal,
  Step: safelineStepEnum.Ideal,
  SelectedChat: null,
  ChatRoomStep: ChatRoomStepEnum.ChatList,
  ConnectedChatRooms: [],
  loader: false,
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
    setChatRoomStep(state, action) {
      state.ChatRoomStep = action.payload;
    },
    setSelectedChatRoom(state, action) {
      state.SelectedChat = action.payload;
    },
    setLoader(state, action) {
      if (action.payload === true) {
        state.loader = true;
      } else {
        state.loader = false;
      }
    },
    setConnectedChatRooms(state, action) {
      const { ChatRoomID } = action.payload;
      if (!state.ConnectedChatRooms.includes(ChatRoomID)) {
        state.ConnectedChatRooms.push(ChatRoomID);
      }
    }

  },
});

export const { setStatus, setStep, setChatRoomStep, setSelectedChatRoom, setLoader, setConnectedChatRooms } = stateSlice.actions;
export default stateSlice.reducer;
