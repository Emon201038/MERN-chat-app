import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, IconButton, Stack } from "@mui/material";
import {
  ArchiveRounded,
  Chat,
  MessageOutlined,
  Storefront,
} from "@mui/icons-material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Preference from "../Modals/Preference";
import { useNavigate } from "react-router-dom";
import { selecteNav } from "../features/side nav/sideNavSllice";

/*eslint-disable react/prop-types */
const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const { selectedIcon: selectedNav } = useSelector((state) => state.sideNav);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const iconList = [
    {
      id: 1,
      icon: <Chat />,
      name: "Chat",
      link: "/inbox",
    },
    {
      id: 2,
      icon: <Storefront />,
      name: "Market place",
      link: "/store",
    },
    {
      id: 3,
      icon: <MessageOutlined />,
      name: "Message requests",
      link: "/message-requests",
    },
    {
      id: 4,
      icon: <ArchiveRounded />,
      name: "Archived messages",
      link: "/archived-messages",
    },
    {
      id: 5,
      icon: (
        <Avatar
          sx={{
            width: "30px",
            height: "30px",
            textAlign: "center",
            margin: "auto",
            mb: "10px",
          }}
          src={user.image}
          title={user?.name}
          onClick={() => handleSelectIcon(5)}
        />
      ),
      name: "Profile",
      link: "/settings",
    },
  ];

  const handleSelectIcon = (icon) => {
    dispatch(selecteNav({ id: icon.id, name: icon.name, link: icon.link }));
    navigate(icon.link);
  };

  const handleSelectProfile = (id, link) => {
    dispatch(selecteNav(id));
    navigate(link);
  };

  return (
    <div
      className={`side-bar max-sm:hidden h-full w-[60px] ${
        theme.palette.mode === "dark" ? "bg-[#3c3c3c]" : "bg-slate-200"
      }`}
    >
      <Stack
        width="100%"
        height="100%"
        marginTop={"8px"}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="column" spacing={2}>
          {iconList.slice(0, 4).map((item) => (
            <Box key={item.id} onClick={() => navigate(item.link)}>
              <IconButton
                sx={{
                  width: "45px",
                  height: "45px",
                  bgcolor:
                    selectedNav?.id === item.id
                      ? theme.palette.mode === "light"
                        ? "rgb(203 213 225)"
                        : "rgba(0,0,0,0.3)"
                      : "",
                }}
                onClick={() => handleSelectIcon(item)}
              >
                {item.icon}
              </IconButton>
            </Box>
          ))}
        </Stack>
        <IconButton
          onClick={() => handleSelectProfile(iconList[4].id, iconList[4].link)}
          sx={{
            width: "45px",
            height: "45px",
            mb: "10px",
            bgcolor:
              selectedNav === iconList[4].id
                ? theme.palette.mode === "light"
                  ? "rgb(203 213 225)"
                  : "rgba(0,0,0,0.3)"
                : "",
          }}
        >
          {iconList[4].icon}
        </IconButton>
      </Stack>
      <Preference open={open} setOpen={setOpen} />
    </div>
  );
};

export default Sidebar;
