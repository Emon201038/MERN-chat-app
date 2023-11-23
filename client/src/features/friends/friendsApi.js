import { apiSlice } from "../api/apiSlice";

export const ContactSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRemainingUsers: builder.query({
      query: (data) => ({
        url: `/api/friends/recommandedFriend?search=${data}`,
        method: "GET",
      }),
    }),
    getFriends: builder.query({
      query: (data) => ({
        url: `/api/friends?search=${data}`,
        method: "GET",
      }),
    }),
    getFriendById: builder.query({
      query: (data) => ({
        url: `/api/friends/getFriends?friendsId=${data}`,
        method: "GET",
      }),
    }),
    getUserById: builder.query({
      query: (data) => ({
        url: `/api/users/${data}`,
        method: "GET",
      }),
    }),
    getFriendsRequest: builder.query({
      query: (data) => ({
        url: `/api/friends/requests?search=${data}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetRemainingUsersQuery,
  useGetFriendsRequestQuery,
  useGetFriendsQuery,
  useGetUserByIdQuery,
  useGetFriendByIdQuery,
} = ContactSlice;
export default ContactSlice.reducer;
