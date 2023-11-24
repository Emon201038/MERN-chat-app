import { socket } from "../../socket";
import { apiSlice } from "../api/apiSlice";

export const conversationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: (id) => ({
        url: `/api/conversation`,
        method: "GET",
      }),
      async onCacheEntryAdded(arg, { cacheDataLoaded, updateCachedData }) {
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

        if (socket) {
          socket?.on("getUsers", (users) => {
            updateCachedData((draft) => {
              draft?.payload?.conversation.forEach((conversation) => {
                const matchedUser = conversation?.participients?.find((u) => {
                  return (
                    u._id !== arg && users.some((usr) => usr.userId == u._id)
                  );
                });
                if (matchedUser) {
                  matchedUser.status = "online";
                }
              });
              socket?.on("offlineUser", (data) => console.log(data));
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
      async onCacheEntryAdded(arg, { cacheDataLoaded, updateCachedData }) {
        await cacheDataLoaded;
        if (socket) {
          socket?.on("getMessage", (data) => {
            updateCachedData((draft) => {
              draft?.payload?.messages?.push({
                conversationId: data.conversationId,
                sender: data.senderId,
                receiver: data.receiverId,
                text: data.text,
                createdAt: data.createdAt,
                _id: data.createdAt,
              });
            });
          });
        }
      },
    }),
    sentMessage: builder.mutation({
      query: (formData) => ({
        url: `/api/conversation/message/${formData.conversationId.toString()}`,
        body: formData,
        method: "POST",
        credentials: "include",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
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

        const msg = dispatch(
          apiSlice.util.updateQueryData(
            "getMessages",
            arg.conversationId,
            (draft) => {
              draft?.payload?.messages?.push({
                conversationId: arg?.conversationId,
                sender: arg?.sender,
                receiver: arg?.receiverId,
                createdAt: arg?.createdAt,
                text: arg?.text,
                _id: arg?.createdAt,
              });
            }
          )
        );

        try {
          await queryFulfilled;
        } catch (error) {
          cnv.undo();
          msg.undo();
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

// apiResponse.payload.conversation.forEach((conversation) => {
//   const matchedUser = conversation.participients.find((participant) => {users.find((user) => user.userId === participant._id);

//   });
// });
