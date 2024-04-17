import OnlinePeople from "./OnlinePeople";
import SingleContact from "./SingleContact";
import { useEffect, useState } from "react";
import { useGetConversationsQuery } from "../features/conversations/conversationsApi";
import { Search } from "@mui/icons-material";
import {
  Box,
  FormControl,
  Hidden,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Skeleton,
  Stack,
} from "@mui/material";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import MobileConversation from "../components/conversation/MobileConversation";
import ContactLayout from "../components/contact/ContactLayout";

/*eslint-disable react/prop-types */
const Contacts = ({ request, setRequest }) => {
  const [onlineUser, setOnlineUser] = useState([]);

  const { user } = useSelector((state) => state.auth);
  const { data, isLoading, isError, error } = useGetConversationsQuery(
    user._id
  );
  const { selectedConversation } = useSelector((state) => state.conversation);

  useEffect(() => {
    socket?.on("getUsers", (data) => {
      setOnlineUser(data);
    });
  }, [user]);

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
        {data?.payload?.conversations?.map((c) => (
          <SingleContact
            conversation={c}
            key={c._id}
            currentUser={user}
            request={request}
            setRequest={setRequest}
          />
        ))}
      </>
    );
  }

  return (
    <>
      <Hidden smDown={selectedConversation !== null}>
        <div className="contacts h-[100vh] w-[320px] lg:w-[320px] md:w-[250px] sm:w-[230px] max-sm:w-full max-sm:px-2 flex flex-col items-center border-r-2">
          <ContactLayout>
            <div className="container-contact w-full flex-1 overflow-y-auto">
              <div className="search-input p-2 w-full h-[56px] my-2">
                <FormControl sx={{ width: "100%" }}>
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
              <OnlinePeople onlineUser={onlineUser} />
              <div className="all-contact w-full h-[calc(100%_ - _92px)] flex flex-col gap-1  overflow-y-auto">
                {content}
              </div>
            </div>
          </ContactLayout>
        </div>
      </Hidden>
      <Hidden smUp>{selectedConversation && <MobileConversation />}</Hidden>
    </>
  );
};

export default Contacts;
