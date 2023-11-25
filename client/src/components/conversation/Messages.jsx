import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../../features/conversations/conversationsApi";
import { SimpleBarStyle } from "../Scrollbar";
import Message from "./Message";
import { Alert, CircularProgress, Stack } from "@mui/material";

/*eslint-disable react/prop-types */
const Messages = ({ skip }) => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  const { data, isLoading, isError, error } = useGetMessagesQuery(
    selectedConversation,
    {
      skip: !skip,
    }
  );

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
    content = (
      <SimpleBarStyle timeout={500} autoHide={500}>
        <ul className="flex flex-col  h-full justify-end">
          {data?.payload?.messages?.map((msg) => {
            return <Message key={msg?.createdAt} msg={msg} />;
          })}
        </ul>
      </SimpleBarStyle>
    );
  }
  return (
    <div className="conversations-container h-full relative   overflow-y-scroll">
      {content}
    </div>
  );
};

export default Messages;
