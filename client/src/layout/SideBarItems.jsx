import {
  Archive,
  Mail,
  Menu,
  Settings,
  SmsOutlined,
  Storefront,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selecteNav } from "../features/side nav/sideNavSllice";

/*eslint-disable react/prop-types*/
const SideBarItems = ({ toggleDrawer, drawerOpen, setDrawerOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { selectedIcon } = useSelector((state) => state.sideNav);

  const { selectedFooter } = useSelector((state) => state.sideNav);

  const drawerContent = [
    {
      id: 5,
      name: "profile",
    },
    {
      id: 1,
      name: "Chats",
      icon: <Mail />,
      link: "/inbox",
    },
    {
      id: 2,
      name: "Market place",
      icon: <Storefront />,
      link: "/store",
    },
    {
      id: 3,
      name: "Message Requests",
      icon: <SmsOutlined />,
      link: "/message-requests",
    },
    {
      id: 4,
      name: "Archived",
      icon: <Archive />,
      link: "/archived-messages",
    },
  ];

  const handleClick = (item) => {
    dispatch(selecteNav({ id: item.id, name: item.name, link: item.link }));
    if (item.id !== 5) {
      setDrawerOpen(false);
    }
  };

  const list = (anchor) => (
    <Box
      sx={{ width: "100%" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {drawerContent.map((item) => (
          <ListItem
            key={item.id}
            disablePadding
            sx={{ bgcolor: selectedIcon?.id === item.id && "lightgray" }}
            onClick={() => handleClick(item)}
          >
            <ListItemButton
              onClick={() => item.name !== "profile" && navigate(item.link)}
            >
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
                  <IconButton onClick={() => navigate("/settings")}>
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
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <Hidden smUp>
        <IconButton
          onClick={toggleDrawer(true)}
          sx={{ bgcolor: "rgb(241,245,249)" }}
        >
          <Menu />
        </IconButton>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{ style: { width: "75%" } }}
        >
          <div>{list("left")}</div>
        </Drawer>
      </Hidden>
      <h2>{selectedFooter?.name}</h2>
    </Stack>
  );
};

export default SideBarItems;
