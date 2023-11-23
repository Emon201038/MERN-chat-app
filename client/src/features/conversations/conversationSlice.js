import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedConversation: null,
  socketServer: {},
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState: initialState,
  reducers: {
    selectedConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    unSelectedConversation: (state) => {
      state.selectedConversation = null;
    },
  },
});

export default conversationSlice.reducer;
export const { selectedConversation, unSelectedConversation } =
  conversationSlice.actions;
