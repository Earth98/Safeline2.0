import { createSlice } from '@reduxjs/toolkit';
import { ChatRoomStatusEnum } from '../../Utils/Enum';

const initialState = {
  NewUser: true,
  UserDetail: {
    UserID: '',
    UserName: ''
  },
  ChatRooms: []
};
// Default chat room data
const ChatRoomsData = {
  Status: ChatRoomStatusEnum.Invited,
  ChatRoomID: '',
  ConversationName: ''

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
    CreateChatRoom(state, action) {
      const { ChatRoomID, ConversationName } = action.payload;
      state.ChatRooms.push({ ChatRoomID, ConversationName, Status: ChatRoomStatusEnum.Invited });
    },
  },
});

export const { SetNewUser, setSecretCode, CreateChatRoom } = safelineSlice.actions;
export default safelineSlice.reducer;
