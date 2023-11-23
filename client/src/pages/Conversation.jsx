import { useSelector } from "react-redux";
import {
  useGetMessagesQuery,
  // useGetMessagesQuery,
  useSentMessageMutation,
} from "../features/conversations/conversationsApi";
import { useEffect, useState } from "react";
import ConversationForm from "../components/forms/ConversationForm";
import Head from "../components/conversation/Head";
import Message from "../components/conversation/Message";
import { SimpleBarStyle } from "../components/Scrollbar";

/*eslint-disable react/prop-types */
const Conversation = ({ socket, arrivalMessage }) => {
  const [message, setMessage] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const { selectedConversation } = useSelector((state) => state.conversation);
  const { selectedFriend } = useSelector((state) => state.friend);
  const { user } = useSelector((state) => state.auth);

  const { data } = useGetMessagesQuery(selectedConversation);
  console.log(data);

  const [sentMessage, { isLoading }] = useSentMessageMutation();

  useEffect(() => {
    if (arrivalMessage && arrivalMessage?.sender === selectedFriend?._id) {
      //message is not updating.......
      setMessage((prev) => [...prev, arrivalMessage]);
    }
  }, [arrivalMessage, selectedFriend]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await fetch(
          `http://localhost:3001/api/conversation/message/${selectedConversation}`,
          { method: "GET", credentials: "include" }
        );
        const data = await res.json();
        setMessage(data?.payload?.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  }, [selectedConversation]);

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

  // decide whats to render
  let content = null;
  if (!selectedConversation) {
    content = (
      <div className="w-full h-full flex justify-center items-center text-2xl font-bold text-gray-400">
        &larr; Select a contact to open a conversation
      </div>
    );
  } else {
    content = (
      <div className="conversations w-full h-full bg-white">
        <div className="wrapper w-full h-full flex flex-col">
          <Head selectedFriend={selectedFriend} />
          <div className="conversations-container h-full relative   overflow-scroll">
            <SimpleBarStyle timeout={500} autoHide={500}>
              <ul className="flex flex-col  h-full justify-end">
                {message?.map((msg) => {
                  return (
                    <Message
                      key={msg?.createdAt}
                      msg={msg}
                      user={user}
                      selectedFriend={selectedFriend}
                    />
                  );
                })}
              </ul>
            </SimpleBarStyle>
          </div>
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
