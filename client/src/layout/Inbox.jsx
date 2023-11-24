import { useEffect, useRef, useState } from "react";
import { useLogoutMutation } from "../features/auth/authApi";
import { useNavigate } from "react-router-dom";
import FriendsModal from "../Modals/FriendsModal";
import Sidebar from "../pages/Sidebar";
import Contacts from "../pages/Contacts";
import Conversation from "../pages/Conversation";
import ProfileModal from "../Modals/ProfileModal";
// import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { onlineFriends } from "../features/friends/friendSlice";
import { connectSocket } from "../socket";

function Inbox() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);
  const [onlineUser, setOnlineUser] = useState([]);
  const [request, setRequest] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const [logout, { data, error }] = useLogoutMutation();
  const navigate = useNavigate();
  const isLoggedIn = document.cookie.includes("accessToken=");
  const socket = useRef();
  const dispatch = useDispatch();

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

  const userInfo = localStorage.getItem("auth");
  const user = JSON.parse(userInfo);
  const user_id = user?.user._id;

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
    socket.current?.on("pre", (data) => console.log(data));
    return () => {
      socket.current.disconnect();
    };
  }, [loggedInUser, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = () => {
        if (!location.hash) {
          location = location + "#loaded";
          window.location.reload();
        }
      };
    }
  }, [isLoggedIn, user_id, loggedInUser]);

  useEffect(() => {
    socket.current?.emit("userId", loggedInUser);
    socket.current?.on("getUsers", (data) => {
      setOnlineUser(data);
    });
  }, [loggedInUser]);
  dispatch(onlineFriends(onlineUser));
  return (
    <div className="flex w-[100vw]  h-[100vh] overflow-hidden">
      <Sidebar setIsModalOpen={setIsModalOpen} />
      <Contacts
        setIsFriendModalOpen={setIsFriendModalOpen}
        onlineUser={onlineUser}
        request={request}
        setRequest={setRequest}
      />
      <Conversation
        request={request}
        socket={socket}
        arrivalMessage={arrivalMessage}
      />
      {isModalOpen && (
        <ProfileModal
          setIsModalOpen={setIsModalOpen}
          handleLogout={handleLogout}
          request={request}
          setRequest={setRequest}
        />
      )}
      {isFriendModalOpen && (
        <FriendsModal setIsFriendModalOpen={setIsFriendModalOpen} />
      )}
    </div>
  );
}

export default Inbox;
