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
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

/*eslint-disable react/prop-types*/
const SideBarItems = ({ toggleDrawer, drawerOpen, setDrawerOpen }) => {
  const [selectedItem, setSelectedItem] = useState(1);

  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { selectedFooter } = useSelector((state) => state.sideNav);

  const drawerContent = [
    {
      name: "profile",
    },
    {
      name: "Chats",
      icon: <Mail />,
      link: "/inbox",
    },
    {
      name: "Market place",
      icon: <Storefront />,
      link: "/store",
    },
    {
      name: "Message Requests",
      icon: <SmsOutlined />,
      link: "/message-requests",
    },
    {
      name: "Archived",
      icon: <Archive />,
      link: "/archived-messages",
    },
  ];

  const handleClick = (index) => {
    setSelectedItem((prev) => (index !== 0 ? index : prev));
    if (index !== 0) {
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
        {drawerContent.map((item, index) => (
          <ListItem
            key={item.name}
            disablePadding
            sx={{ bgcolor: selectedItem === index && "lightgray" }}
            onClick={() => handleClick(index)}
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
                  <IconButton onClick={() => navigate("/profile")}>
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
