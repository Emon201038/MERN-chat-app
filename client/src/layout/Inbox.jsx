import { useEffect, useRef, useState } from "react";
import Contacts from "../pages/Contacts";
import Conversation from "../pages/Conversation";
import { connectSocket } from "../socket";
import { useSelector } from "react-redux";
import Layout from "../components/Layout";

function Inbox() {
  const [request, setRequest] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const socket = useRef();

  const { user: loggedInUser } = useSelector((state) => state.auth);

  useEffect(() => {
    socket.current = connectSocket(loggedInUser?._id);

    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data?.senderId,
        receiver: data?.receiverId,
        text: data?.text,
        createdAt: Date.now(),
      });
    });
    socket.current?.on("offline", (data) => console.log(data));

    return () => {
      socket.current.disconnect();
      socket.current?.off("disconnect");
    };
  }, [loggedInUser]);

  return (
    <Layout>
      <Contacts
        request={request}
        setRequest={setRequest}
        arrivalMessage={arrivalMessage}
      />
      <Conversation
        request={request}
        socket={socket}
        arrivalMessage={arrivalMessage}
      />
    </Layout>
  );
}

export default Inbox;
