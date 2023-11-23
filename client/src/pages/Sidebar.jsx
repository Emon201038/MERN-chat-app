import logo from "../images/chat-app-icon-5.jpg";
import { useSelector } from "react-redux";
import { IconButton, Stack } from "@mui/material";
import {
  ArchiveRounded,
  Chat,
  MessageOutlined,
  Storefront,
} from "@mui/icons-material";

/*eslint-disable react/prop-types */
const Sidebar = ({ setIsModalOpen }) => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <div className="side-bar h-full flex flex-col justify-between w-[80px] bg-slate-200">
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
          <IconButton sx={{ width: "45px", height: "45px" }}>
            <Chat sx={{ width: "20px", height: "20px" }} />
          </IconButton>
          <IconButton sx={{ width: "45px", height: "45px" }}>
            <Storefront sx={{ width: "20px", height: "20px" }} />
          </IconButton>
          <IconButton sx={{ width: "45px", height: "45px" }}>
            <MessageOutlined sx={{ width: "20px", height: "20px" }} />
          </IconButton>
          <IconButton sx={{ width: "45px", height: "45px" }}>
            <ArchiveRounded sx={{ width: "20px", height: "20px" }} />
          </IconButton>
        </Stack>
        <div
          className="boreder-[1px] border-gray-400 mb-2 w-full h-[45px] flex justify-center items-center cursor-pointer"
          title={user?.name}
          onClick={() => setIsModalOpen(true)}
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
