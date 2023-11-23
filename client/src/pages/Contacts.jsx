import OnlinePeople from "./OnlinePeople";
import SingleContact from "./SingleContact";
import { useEffect, useState } from "react";
import { useGetConversationsQuery } from "../features/conversations/conversationsApi";
import { People, Search } from "@mui/icons-material";
import { IconButton } from "@mui/material";

/*eslint-disable react/prop-types */
const Contacts = ({
  setIsFriendModalOpen,
  onlineUser,
  request,
  setRequest,
}) => {
  const [conversations, setConversations] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const auth = localStorage.getItem("auth");
  const authParsed = JSON.parse(auth);
  const user = authParsed.user;

  const { data } = useGetConversationsQuery();

  useEffect(() => {
    setConversations(data?.payload?.conversation);
  }, [data]);

  return (
    <>
      <div className="contacts h-full w-[320px]  flex flex-col items-center border-r-2">
        <div className="head flex justify-between w-full px-5 mt-[20px] font-bold text-lg">
          <h2>Chat</h2>
          <div className="flex justify-center items-center w-[30px] h-[30px]">
            <IconButton
              sx={{ width: "45px", height: "45px" }}
              onClick={() => setIsFriendModalOpen(true)}
            >
              <People />
            </IconButton>
          </div>
        </div>

        <div className="search-input p-2 w-full my-2">
          <form className="relative">
            <input
              type="text"
              className="w-full h-[35px] rounded-md relative p-2 bg-slate-200"
              placeholder="Search..."
            />
            <IconButton
              sx={{
                width: "30px",
                height: "30px",
                position: "absolute",
                top: "3px",
                right: "5px",
              }}
            >
              <Search sx={{ width: "20px", height: "20px" }} />
            </IconButton>
          </form>
        </div>
        <div className="container-contact w-full h-full overflow-y-auto">
          <OnlinePeople onlineUser={onlineUser} />

          <div
            className="all-contact w-full flex flex-col gap-1 flex-grow  overflow-y-auto"
            data-radix-scroll-area-viewport
          >
            {conversations?.map((c) => (
              <SingleContact
                conversation={c}
                key={c._id}
                currentUser={user}
                selectedUserId={selectedUserId}
                setSelectedUserId={setSelectedUserId}
                request={request}
                setRequest={setRequest}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;