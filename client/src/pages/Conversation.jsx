import { useSelector } from "react-redux";
import {
  // useGetMessagesQuery,
  useSentMessageMutation,
} from "../features/conversations/conversationsApi";
import { useEffect, useState } from "react";
import Head from "../components/conversation/Head";
import Messages from "../components/conversation/Messages";
import Footer from "../components/conversation/Footer";
import { socket } from "../socket";

/*eslint-disable react/prop-types */
const Conversation = ({ request, arrivalMessage }) => {
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

    socket?.emit("stopTyping", {
      senderId: user?._id,
      receiverId: selectedFriend?._id,
    });

    socket?.emit("sendMessage", {
      senderId: user?._id,
      receiverId: selectedFriend?._id,
      text: inputValue,
      conversationId: selectedConversation,
      createdAt: Date.now(),
    });

    setInputValue("");
    try {
      await sentMessage({
        conversationId: selectedConversation,
        receiverId: selectedFriend._id,
        sender: user?._id,
        text: inputValue,
        createdAt: Date.now(),
      });

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

  // decide whats to render
  let content = null;
  if (!selectedConversation) {
    content = (
      <div className="w-[calc(100vw-380px)] lg:w-[calc(100vw-380px)] md:w-[calc(100vw-290px)] sm:w-[calc(100vw-270px)] h-full max-sm:hidden flex justify-center items-center text-2xl font-bold text-gray-400">
        &larr; Select a contact to open a conversation
      </div>
    );
  } else {
    content = (
      <div
        // style={{ width: "calc(100vw - 380px)" }}
        className="conversations  max-sm:hidden w-[calc(100vw-380px)] lg:w-[calc(100vw-380px)] md:w-[calc(100vw-290px)] sm:w-[calc(100vw-270px)] bg-white"
      >
        <div className="wrapper w-full h-full flex flex-col">
          <Head selectedFriend={selectedFriend} />
          <Messages skip={request} />
          <Footer
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
