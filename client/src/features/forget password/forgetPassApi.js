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
    verifyOtp: builder.mutation({
      query: (formData) => ({
        url: "/api/users/forget-password/verify-code",
        method: "POST",
        body: formData,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useSearchUserMutation,
  useSentOtpMutation,
  useVerifyOtpMutation,
} = forgetPasswordSlice;
