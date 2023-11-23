import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedFriend: {},
  onlineFriends: [],
};

const friendSlice = createSlice({
  name: "friendSlice",
  initialState: initialState,
  reducers: {
    selecteFriend: (state, action) => {
      state.selectedFriend = action.payload;
    },
    unSelecteFriend: (state) => {
      state.selectedFriend = {};
    },
    onlineFriends: (state, action) => {
      state.onlineFriends = action.payload;
    },
  },
});

export const { selecteFriend, unSelecteFriend, onlineFriends } =
  friendSlice.actions;
export default friendSlice.reducer;
