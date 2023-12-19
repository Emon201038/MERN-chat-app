import { useState } from "react";
import SideBarItems from "../../layout/SideBarItems";
import { Hidden, IconButton, Stack } from "@mui/material";
import {
  Call,
  ModeEditRounded,
  People,
  PermContactCalendar,
  Videocam,
} from "@mui/icons-material";
import ContactFooter from "../ContactFooter";
import { useSelector } from "react-redux";

const ContactLayout = ({ children }) => {
  const { selectedFooter } = useSelector((state) => state.sideNav);

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
  return (
    <>
      <div className="head flex justify-between w-full h-[60px]  max-sm:pl-0 px-3  mt-[20px] max-sm:mt-0 font-bold text-lg">
        <SideBarItems
          toggleDrawer={toggleDrawer}
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
        <div className="icon flex justify-center items-center w-[60px] h-[60px]">
          <Hidden smDown>
            <IconButton sx={{ width: "45px", height: "45px" }}>
              <People />
            </IconButton>
          </Hidden>
          <Hidden smUp>
            {selectedFooter.name === "Chat" && (
              <IconButton sx={{ bgcolor: "rgb(241,245,249)" }}>
                <ModeEditRounded />
              </IconButton>
            )}
            {selectedFooter.name === "Calls" && (
              <Stack direction="row" spacing={1} paddingRight={2}>
                <IconButton sx={{ bgcolor: "rgb(241,245,249)" }}>
                  <Call />
                </IconButton>
                <IconButton sx={{ bgcolor: "rgb(241,245,249)" }}>
                  <Videocam />
                </IconButton>
              </Stack>
            )}
            {selectedFooter.name === "People" && (
              <IconButton sx={{ bgcolor: "rgb(241,245,249)" }}>
                <PermContactCalendar />
              </IconButton>
            )}
          </Hidden>
        </div>
      </div>
      {children}
      <ContactFooter />
    </>
  );
};

export default ContactLayout;
