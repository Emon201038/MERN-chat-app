import logo from "../images/chat-app-icon-5.jpg";
import { useSelector } from "react-redux";
import { IconButton, Stack } from "@mui/material";
import {
  ArchiveRounded,
  Chat,
  MessageOutlined,
  Storefront,
} from "@mui/icons-material";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import Preference from "../Modals/Preference";

/*eslint-disable react/prop-types */
const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const iconList = [
    {
      icon: <Chat />,
      id: 1,
    },
    {
      icon: <Storefront />,
      id: 2,
    },
    {
      icon: <MessageOutlined />,
      id: 3,
    },
    {
      icon: <ArchiveRounded />,
      id: 4,
    },
  ];

  return (
    <>
      <div
        className={`side-bar max-sm:hidden h-full flex flex-col justify-between w-[80px] ${
          theme.palette.mode === "dark" ? "bg-[#3c3c3c]" : "bg-slate-200"
        }`}
      >
        <Stack
          direction={"column"}
          spacing={"20px"}
          alignItems={"center"}
          marginTop={"8px"}
        >
          <IconButton
            sx={{
              width: "45px",
              height: "45px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              bgcolor: "rgb(203 213 225)",
              borderRadius: "6px",
            }}
          >
            <img src={logo} alt="" className="[20px] h-[20px]" />
          </IconButton>
          {iconList.map((item) => (
            <IconButton key={item.id} sx={{ width: "45px", height: "45px" }}>
              {item.icon}
            </IconButton>
          ))}
        </Stack>
        <Preference open={open} setOpen={setOpen} />
        <div
          className="boreder-[1px] border-gray-400 mb-2 w-full h-[45px] flex justify-center items-center cursor-pointer"
          title={user?.name}
          onClick={() => setOpen(true)}
        >
          <img
            src={user?.image}
            alt=""
            className="w-[30px] h-[30px] rounded-full"
          />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
