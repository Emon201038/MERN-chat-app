import { apiSlice } from "../api/apiSlice";
import { unSelectedConversation } from "../conversations/conversationSlice";
import { unSelecteFriend } from "../friends/friendSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/api/users/process-register",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    verifyUer: builder.mutation({
      query: (data) => ({
        url: "/api/users/activate",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    uploadImage: builder.mutation({
      query: (data) => ({
        url: "https://api.cloudinary.com/v1_1/emadul-hoque-emon/image/upload",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "/api/user/login",
        method: "POST",
        body: userData,
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const accessToken = document.cookie.split("accessToken=")[1];
          localStorage.setItem(
            "auth",
            JSON.stringify({
              user: result.data.payload.userWithoutPass,
              accessToken: accessToken,
            })
          );
          dispatch(
            userLoggedIn({
              accessToken: accessToken,
              user: result.data?.payload?.userWithoutPass,
            })
          );
        } catch (error) {
          console.log(error);
        }
      },
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/api/user/logout",
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data.success) {
            localStorage.clear();
            dispatch(userLoggedOut());
            dispatch(unSelecteFriend());
            dispatch(unSelectedConversation());
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useUploadImageMutation,
  useVerifyUerMutation,
} = authApi;
