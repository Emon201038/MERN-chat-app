import { socket } from "../../socket";
import { apiSlice } from "../api/apiSlice";

export const conversationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      // eslint-disable-next-line no-unused-vars
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
              draft?.payload?.conversation?.forEach((conversation) => {
                const matchedUser = conversation?.participients?.find((u) => {
                  return (
                    u._id !== arg && users?.some((usr) => usr.userId == u._id)
                  );
                });
                console.log(JSON.stringify(matchedUser, "online User"));
                if (matchedUser) {
                  matchedUser.status = "online";
                }
              });
              socket?.on("offlineUser", (data) => {
                updateCachedData((draft) => {
                  draft?.payload?.conversation.forEach((conversation) => {
                    const matchedUser = conversation?.participients?.find(
                      (u) => {
                        return data?.some((usr) => usr?.userId == u._id);
                      }
                    );
                    console.log(JSON.stringify(matchedUser));
                    if (matchedUser) {
                      matchedUser.status = "offline";
                    }
                  });
                });
              });
            });
          });
        }
      },
    }),
    getMessages: builder.query({
      query: (data) => ({
        url: `/api/conversation/message/${data}?limit=8&page=1`,
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
    getMoreMessages: builder.query({
      query: (data) => ({
        url: `/api/conversation/message/${data.conversationId}?limit=8&page=${data.page}`,
        method: "GET",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const messagesRes = await queryFulfilled;
          if (messagesRes?.data?.payload?.messages?.length > 0) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getMessages",
                arg?.conversationId,
                (draft) => {
                  console.log("draft", JSON.stringify(draft));
                  console.log("newMessages", JSON.stringify(messagesRes));
                  draft.payload.messages = [
                    ...messagesRes.data.payload.messages,
                    ...draft.payload.messages,
                  ];
                  draft.payload.pagination =
                    messagesRes.data.payload.pagination;
                }
              )
            );
          }
        } catch (error) {
          console.log(error);
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
