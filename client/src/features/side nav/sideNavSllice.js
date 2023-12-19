import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedIcon: 1,
  selectedFooter: {
    id: 1,
    name: "Chat",
  },
};

const sideNavSlice = createSlice({
  name: "sideNavSlice",
  initialState: initialState,
  reducers: {
    selecteNav: (state, action) => {
      state.selectedIcon = action.payload;
    },
    selectFooter: (state, action) => {
      state.selectedFooter = action.payload;
    },
  },
});

export default sideNavSlice.reducer;
export const { selecteNav, selectFooter } = sideNavSlice.actions;
