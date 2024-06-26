import { useDispatch, useSelector } from "react-redux";
import {
  conversationSlice,
  useGetMessagesQuery,
} from "../../features/conversations/conversationsApi";
import { SimpleBarStyle } from "../Scrollbar";
import Message from "./Message";
import { Alert, CircularProgress, Stack } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import { socket } from "../../socket";

/*eslint-disable react/prop-types */
const Messages = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { data, isLoading, isError, error } =
    useGetMessagesQuery(selectedConversation, { skip: false }) || {};
  const dispatch = useDispatch();
  const theme = useTheme();

  const { totalPage, nextPage } = data?.payload?.pagination || {};

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchMore = () => {
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    if (totalPage > 0) {
      if (totalPage > page && nextPage !== null) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    }
  }, [totalPage, page, nextPage]);

  useEffect(() => {
    if (page > 1) {
      dispatch(
        conversationSlice.endpoints.getMoreMessages.initiate({
          conversationId: selectedConversation,
          page,
        })
      );
    }
  }, [page, dispatch, selectedConversation]);

  useEffect(() => {
    socket?.on("seen", (checkData) => {
      if (selectedConversation === checkData.conversationId) {
        dispatch(
          conversationSlice.util.updateQueryData(
            "getMessages",
            selectedConversation,
            (draft) => {
              const updateMessage = draft?.payload?.messages?.find((msg) => {
                msg._id === checkData._id;
              });
              console.log(JSON.stringify(updateMessage));
            }
          )
        );
      }
    });
  }, [dispatch, selectedConversation]);

  //decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <Stack
        width="100%"
        height="100%"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Stack>
    );
  }
  if (!isLoading && isError) {
    content = <Alert severity="error">{error}</Alert>;
  }
  if (!isLoading && !isError && data?.payload?.messages?.length === 0) {
    content = <Alert severity="info">This is an error message!</Alert>;
  }
  if (!isLoading && !isError && data?.payload?.messages?.length > 0) {
    const lastMessage =
      data?.payload?.messages[data?.payload?.messages?.length - 1];
    console.log(lastMessage);
    content = (
      <div
        className={`conversations-container h-[calc(100%_ - _120px)] relative  flex flex-col-reverse ${
          theme.palette.mode === "dark" ? "bg-[#1e1e1e]" : ""
        }`}
      >
        <InfiniteScroll
          dataLength={data?.payload.messages.length}
          next={fetchMore}
          hasMore={hasMore}
          loader={
            <Stack
              width="100%"
              height="100%"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Stack>
          }
          style={{ display: "flex", flexDirection: "column-reverse" }}
          inverse={true}
          height={window.innerHeight - 120}
        >
          <SimpleBarStyle timeout={500} autoHide={500}>
            <ul className="flex flex-col  h-full justify-end p-3">
              {data?.payload?.messages?.map((msg) => {
                return (
                  <Message
                    key={msg?.createdAt}
                    msg={msg}
                    lastMessage={lastMessage}
                  />
                );
              })}
            </ul>
          </SimpleBarStyle>
        </InfiniteScroll>
      </div>
    );
  }
  return <>{content}</>;
};

export default Messages;
