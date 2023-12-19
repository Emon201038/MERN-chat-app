import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedConversation: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState: initialState,
  reducers: {
    selecteConversation: (state, action) => {
      state.selectedConversation = action.payload;
    },
    unSelectedConversation: (state) => {
      state.selectedConversation = null;
    },
  },
});

export default conversationSlice.reducer;
export const { selecteConversation, unSelectedConversation } =
  conversationSlice.actions;
