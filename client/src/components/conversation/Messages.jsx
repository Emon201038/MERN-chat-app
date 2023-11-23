import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "../../features/conversations/conversationsApi";
import { SimpleBarStyle } from "../Scrollbar";
import Message from "./Message";

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
    content = <div>Loading.....</div>;
  }
  if (!isLoading && isError) {
    content = <div>{error}</div>;
  }
  if (!isLoading && !isError && data?.payload?.messages?.length === 0) {
    content = <div>No messages found</div>;
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
