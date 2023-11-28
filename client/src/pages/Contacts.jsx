import OnlinePeople from "./OnlinePeople";
import SingleContact from "./SingleContact";
import { useEffect, useState } from "react";
import { useGetConversationsQuery } from "../features/conversations/conversationsApi";
import { People, Search } from "@mui/icons-material";
import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Skeleton,
  Stack,
} from "@mui/material";
import { socket } from "../socket";
import { useSelector } from "react-redux";

/*eslint-disable react/prop-types */
const Contacts = ({ setIsFriendModalOpen, request, setRequest }) => {
  const [conversations, setConversations] = useState([]);
  const [onlineUser, setOnlineUser] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isError, error } = useGetConversationsQuery(
    user._id
  );

  useEffect(() => {
    socket?.on("getUsers", (data) => {
      setOnlineUser(data);
    });
  }, [user]);

  useEffect(() => {
    setConversations(data?.payload?.conversation);
  }, [data]);

  //decide what to render
  let content = null;
  if (isLoading) {
    content = (
      <>
        <Stack direction="row" width="100%" height="70px" padding={4}>
          <Skeleton
            animation="pulse"
            variant="circular"
            width={40}
            height={40}
          />
          <Box>
            <Skeleton animation="pulse" width={40} height={10} />
            <Skeleton animation="pulse" width={20} height={10} />
          </Box>
        </Stack>
      </>
    );
  }
  if (!isLoading && isError) {
    content = <div>{error}</div>;
  }
  if (!isLoading && !isError && data?.payload?.conversation?.length === 0) {
    content = <div>No conversation found</div>;
  }
  if (!isLoading && !isError && data?.payload?.conversation?.length > 0) {
    content = (
      <>
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
      </>
    );
  }
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
          <FormControl>
            <OutlinedInput
              size="small"
              id="input-with-icon-adornment"
              placeholder="Search in conversation"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <Search color="primary" />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>
        <div className="container-contact w-full h-full overflow-y-auto">
          <OnlinePeople onlineUser={onlineUser} />
          <div className="all-contact w-full flex flex-col gap-1 flex-grow  overflow-y-scroll">
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contacts;
