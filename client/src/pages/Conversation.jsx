import { useSelector } from "react-redux";
import {
  // useGetMessagesQuery,
  useSentMessageMutation,
} from "../features/conversations/conversationsApi";
import { useEffect, useState } from "react";
import ConversationForm from "../components/forms/ConversationForm";
import Head from "../components/conversation/Head";
import Messages from "../components/conversation/Messages";

/*eslint-disable react/prop-types */
const Conversation = ({ request, socket, arrivalMessage }) => {
  const [message, setMessage] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const { selectedConversation } = useSelector((state) => state.conversation);
  const { selectedFriend } = useSelector((state) => state.friend);
  const { user } = useSelector((state) => state.auth);

  const [sentMessage, { isLoading }] = useSentMessageMutation();

  useEffect(() => {
    if (arrivalMessage && arrivalMessage?.sender === selectedFriend?._id) {
      //message is not updating.......
      setMessage((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, selectedFriend]);

  const handleSentMessage = async (e) => {
    e.preventDefault();

    socket.current?.emit("stopTyping", {
      senderId: user?._id,
      receiverId: selectedFriend?._id,
    });

    socket.current?.emit("sendMessage", {
      senderId: user?._id,
      receiverId: selectedFriend?._id,
      text: inputValue,
      conversationId: selectedConversation,
      createdAt: Date.now(),
    });

    try {
      await sentMessage({
        conversationId: selectedConversation,
        receiverId: selectedFriend._id,
        sender: user?._id,
        text: inputValue,
        createdAt: Date.now(),
      });

      setInputValue("");
      setMessage([
        ...message,
        {
          sender: user?._id,
          receiverId: selectedFriend?._id,
          text: inputValue,
          createdAt: Date.now(),
        },
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(selectedConversation);

  // decide whats to render
  let content = null;
  if (!selectedConversation) {
    content = (
      <div className="w-full  h-full max-sm:hidden flex justify-center items-center text-2xl font-bold text-gray-400">
        &larr; Select a contact to open a conversation
      </div>
    );
  } else {
    content = (
      <div className="conversations w-full max-sm:hidden  bg-white">
        <div className="wrapper w-full h-full flex flex-col">
          <Head selectedFriend={selectedFriend} />
          <Messages skip={request} />
          <ConversationForm
            inputValue={inputValue}
            setInputValue={setInputValue}
            isLoading={isLoading}
            handleSentMessage={handleSentMessage}
            socket={socket}
          />
        </div>
      </div>
    );
  }
  return <>{content}</>;
};

export default Conversation;
