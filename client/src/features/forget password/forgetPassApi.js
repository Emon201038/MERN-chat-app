import { apiSlice } from "../api/apiSlice";

export const forgetPasswordSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    searchUser: builder.mutation({
      query: (formData) => ({
        url: `/api/users/search-user`,
        body: formData,
        method: "POST",
        credentials: "include",
      }),
    }),
    sentOtp: builder.mutation({
      query: (formData) => ({
        url: "/api/users/forget-password",
        body: formData,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const { useSearchUserMutation, useSentOtpMutation } =
  forgetPasswordSlice;
