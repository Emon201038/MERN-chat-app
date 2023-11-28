import { useState } from "react";
import { GetUsers } from "../components/friends/RecommandedFriend";
import FriendRequests from "../components/friends/FriendRequests";
import Friends from "../components/friends/Friends";
import { CloseOutlined } from "@mui/icons-material";
// import { socket } from "../socket";

/*eslint-disable react/prop-types*/
const FriendsModal = ({ setIsFriendModalOpen }) => {
  const [requestModalOpen, setRequestModalOpen] = useState(false);

  const [tabActive, setTabActive] = useState("Explore");

  const handleModalClose = () => {};
  const handleRequestModalOpen = () => {
    setRequestModalOpen(!requestModalOpen);
  };

  const handleTabClick = (tabName) => {
    setTabActive(tabName);
  };

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-20"
      onClick={handleModalClose}
    >
      <div
        className={`container w-2/6 max-sm:min-w-[400px] shadow-2xl rounded bg-white flex flex-col justify-center gap-2 `}
      >
        <div
          className={`flex justify-end px-2 py-1 ${
            requestModalOpen ? "hidden" : "block"
          }`}
        >
          <div
            className="w-[30px] h-[30px] p-1 cursor-pointer"
            onClick={() => setIsFriendModalOpen(false)}
          >
            <CloseOutlined />
          </div>
        </div>
        <div className="head w-full flex  justify-center items-center gap-9 h-9 max-sm:min-w-full max-sm:bg-white max-sm:rounded md:bg-teal-300">
          <div
            onClick={() => handleTabClick("Explore")}
            className={`p-1 cursor-pointer ${
              tabActive === "Explore" ? "border-b-2 border-black" : ""
            }`}
          >
            Explore
          </div>
          <div
            onClick={() => handleTabClick("Friend Requests")}
            className={`p-1 cursor-pointer ${
              tabActive === "Friend Requests" ? "border-b-2 border-black" : ""
            }`}
          >
            Friend Requests
          </div>
          <div
            onClick={() => handleTabClick("Friends")}
            className={`p- cursor-pointer ${
              tabActive === "Friends" ? "border-b-2 border-black" : ""
            }`}
          >
            Friends
          </div>
        </div>

        <div className="bg-slate-100 flex flex-col gap-1">
          {tabActive === "Explore" && (
            <GetUsers
              handleRequestModalOpen={handleRequestModalOpen}
              requestModalOpen={requestModalOpen}
              setRequestModalOpen={setRequestModalOpen}
            />
          )}
          {tabActive === "Friend Requests" && <FriendRequests />}
          {tabActive === "Friends" && <Friends />}
        </div>
      </div>
    </div>
  );
};

export default FriendsModal;
