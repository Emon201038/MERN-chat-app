import OnlinePeople from "./OnlinePeople";
import SingleContact from "./SingleContact";
import { useEffect, useState } from "react";
import { useGetConversationsQuery } from "../features/conversations/conversationsApi";
import {
  Archive,
  Mail,
  People,
  Search,
  Settings,
  SmsOutlined,
  Storefront,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  FormControl,
  Hidden,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Skeleton,
  Stack,
} from "@mui/material";
import { socket } from "../socket";
import { useSelector } from "react-redux";
import SideBarItems from "../layout/SideBarItems";
import MobileConversation from "../components/conversation/MobileConversation";

/*eslint-disable react/prop-types */
const Contacts = ({ setIsFriendModalOpen, request, setRequest }) => {
  const [conversations, setConversations] = useState([]);
  const [onlineUser, setOnlineUser] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(1);

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

  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const handleClick = (index) => {
    setSelectedItem((prev) => (index !== 0 ? index : prev));
    if (index !== 0) {
      setDrawerOpen(false);
    }
  };

  const drawerContent = [
    {
      name: "profile",
    },
    {
      name: "Chats",
      icon: <Mail />,
    },
    {
      name: "Market place",
      icon: <Storefront />,
    },
    {
      name: "Message Requests",
      icon: <SmsOutlined />,
    },
    {
      name: "Archived",
      icon: <Archive />,
    },
  ];

  const list = (anchor) => (
    <Box
      sx={{ width: "100%" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {drawerContent.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            sx={{ bgcolor: selectedItem === index && "lightgray" }}
            onClick={() => handleClick(index)}
          >
            <ListItemButton>
              {item.name === "profile" ? (
                <Stack
                  width="100%"
                  height="40px"
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  sx={{ cursor: "default" }}
                >
                  <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}
                  >
                    <Avatar src={user.image} />
                    <ListItemText
                      primary={user.firstName + " " + user.lastName}
                    />
                  </Stack>
                  <IconButton>
                    <Settings />
                  </IconButton>
                </Stack>
              ) : (
                <>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.name} />
                </>
              )}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Hidden smDown={selectedConversation !== null}>
        <div className="contacts h-full w-[320px] max-sm:w-full max-sm:px-2 flex flex-col items-center border-r-2">
          <div className="head flex justify-between w-full px-5 max-sm:pl-0  mt-[20px] font-bold text-lg">
            <SideBarItems
              toggleDrawer={toggleDrawer}
              drawerOpen={drawerOpen}
              list={list}
            />
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
          <div className="container-contact w-full h-full overflow-y-auto">
            <OnlinePeople onlineUser={onlineUser} />
            <div className="all-contact w-full flex flex-col gap-1 flex-grow  overflow-y-scroll">
              {content}
            </div>
          </div>
        </div>
      </Hidden>
      <Hidden smUp>{selectedConversation && <MobileConversation />}</Hidden>
    </>
  );
};

export default Contacts;
