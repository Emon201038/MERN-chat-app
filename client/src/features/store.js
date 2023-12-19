import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authSlice from "./auth/authSlice";
import ContactSlice from "./friends/friendsApi";
import conversationSlice from "./conversations/conversationSlice";
import friendSlice from "./friends/friendSlice";
import sideNavSllice from "./side nav/sideNavSllice";

const reduxStore = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    friends: ContactSlice,
    friend: friendSlice,
    conversation: conversationSlice,
    sideNav: sideNavSllice,
  },
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export default reduxStore;
