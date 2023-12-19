import { useEffect, useRef, useState } from "react";
import { useLogoutMutation } from "../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import FriendsModal from "../Modals/FriendsModal";
import Sidebar from "../pages/Sidebar";
import Contacts from "../pages/Contacts";
import Conversation from "../pages/Conversation";
import ProfileModal from "../Modals/ProfileModal";
import { connectSocket } from "../socket";
import { useSelector } from "react-redux";
import { Hidden } from "@mui/material";
import Layout from "../components/Layout";

function Inbox() {
  const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);
  const [request, setRequest] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [logout, { data, error }] = useLogoutMutation();
  const navigate = useNavigate();
  const socket = useRef();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    if (error) {
      console.log("Some error occurred while logging out");
    }
    if (data?.success) {
      console.log("logged out successfully");
      navigate("/");
      localStorage.clear();
      socket.current?.disconnect();
    }
  }, [data, error, navigate]);

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

    return () => {
      socket.current.disconnect();
    };
  }, [loggedInUser]);

  return (
    <Layout>
      <Contacts
        setIsFriendModalOpen={setIsFriendModalOpen}
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
    // <div className="flex w-[100vw]  h-[100vh] overflow-hidden">
    //   <Hidden smDown>
    //     <Sidebar />
    //   </Hidden>
    //   <Contacts
    //     setIsFriendModalOpen={setIsFriendModalOpen}
    //     request={request}
    //     setRequest={setRequest}
    //     arrivalMessage={arrivalMessage}
    //   />
    //   <Conversation
    //     request={request}
    //     socket={socket}
    //     arrivalMessage={arrivalMessage}
    //   />

    //   {/* {isModalOpen && (
    //     <ProfileModal
    //       setIsModalOpen={setIsModalOpen}
    //       handleLogout={handleLogout}
    //       request={request}
    //       setRequest={setRequest}
    //     /> */}
    //   {/* )} */}
    //   {isFriendModalOpen && (
    //     <FriendsModal setIsFriendModalOpen={setIsFriendModalOpen} />
    //   )}
    // </div>
  );
}

export default Inbox;
