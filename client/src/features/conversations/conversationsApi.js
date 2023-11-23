import { socket } from "../../socket";
import { apiSlice } from "../api/apiSlice";

export const conversationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => ({
        url: `/api/conversation`,
        method: "GET",
      }),
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, updateCachedData, cacheEntryRemoved }
      ) {
        await cacheDataLoaded;
        if (socket) {
          socket?.on("getMessage", (data) => {
            updateCachedData((draft) => {
              const targetConversation = draft?.payload?.conversation?.find(
                (c) => c._id == data.conversationId
              );
              targetConversation.lastMessage = data;
            });
          });
        }
      },
    }),
    getMessages: builder.query({
      query: (data) => ({
        url: `/api/conversation/message/${data}`,
        method: "GET",
      }),
    }),
    sentMessage: builder.mutation({
      query: (formData) => ({
        url: `/api/conversation/message/${formData.conversationId.toString()}`,
        body: formData,
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        console.log(arg);
        const cnv = dispatch(
          apiSlice.util.updateQueryData(
            "getConversations",
            undefined,
            (draft) => {
              const draftConversation = draft?.payload?.conversation?.find(
                (c) => c._id == arg.conversationId
              );
              draftConversation.lastMessage = arg;
            }
          )
        );

        try {
          const res = await queryFulfilled;
          const message = res.data.payload.message;
          dispatch(
            apiSlice.util.updateQueryData(
              "getMessages",
              arg.conversationId,
              (draft) => {
                // console.log(draft)
                draft?.payload?.messages?.push(message);
              }
            )
          );
        } catch (error) {
          cnv.undo();
        }
      },
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useGetMessagesQuery,
  useSentMessageMutation,
} = conversationSlice;
