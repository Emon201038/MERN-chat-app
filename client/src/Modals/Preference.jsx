import {
  DarkMode,
  Logout,
  NotificationAdd,
  Settings,
} from "@mui/icons-material";
import { Box, Grid, Modal, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

import ActiveStatus from "../components/preferences/ActiveStatus";
import Notification from "../components/preferences/Notification";
import Apperance from "../components/preferences/Apperance";
import Profile from "../components/preferences/Profile";
import LogoutPage from "../components/preferences/Logout";

const profileStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 0,
  cursor: "default",
  outline: "none",
};

/*eslint-disable react/prop-types */
const Preference = ({ open, setOpen }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedSetting, setSelectedSetting] = useState(1);
  const [checkedActiveStatus, setCheckedActiveStatus] = useState(true);
  const [checkedNotification, setCheckedNotification] = useState(false);
  const storedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(storedTheme);
  const currentTheme = useTheme();

  const style = {
    position: "absolute",
    top: "85%",
    left: "12%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor:
      currentTheme.palette.mode === "dark" ? "#3c3c3c" : "background.paper",
    boxShadow: 24,
    p: 1.5,
    cursor: "default",
    outline: "none",
    "&:hover": {
      bgcolor: currentTheme.palette.mode === "dark" ? "#606060" : "lightgray",
    },
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSetting(1);
  };

  const combinedListener = () => {
    handleClose();
    setProfileOpen(true);
  };

  const iconData = [
    {
      id: 1,
      icon: (
        <Box
          width={20}
          height={20}
          borderRadius="50%"
          bgcolor="white"
          position="relative"
        >
          <Box
            width={10}
            height={10}
            borderRadius="50%"
            border="2px solid green"
            position="absolute"
            bottom={-1}
            right={-1}
            bgcolor="white"
          ></Box>
        </Box>
      ),
      title: "Active status",
      subTitle: checkedActiveStatus ? "on" : "off",
      bgColor: "green",
    },
    {
      id: 2,
      icon: <NotificationAdd />,
      title: "Notifications",
      subTitle: !checkedNotification ? "on" : "off",
      bgColor: "purple",
    },
    {
      id: 3,
      icon: <DarkMode />,
      title: "Appearance",
      subTitle: "Theme:" + theme,
      bgColor: currentTheme.palette.mode === "dark" ? "white" : "black",
      color: currentTheme.palette.mode === "dark" ? "black" : "white",
    },
    {
      id: 4,
      icon: <Settings color="white" />,
      title: "Profile",
      subTitle: "",
      bgColor: currentTheme.palette.mode === "dark" ? "white" : "black",
      color: currentTheme.palette.mode === "dark" ? "black" : "white",
    },
    {
      id: 5,
      icon: <Logout color="white" />,
      title: "Logout",
      subTitle: "",
      bgColor: currentTheme.palette.mode === "dark" ? "white" : "black",
      color: currentTheme.palette.mode === "dark" ? "black" : "white",
    },
  ];

  const handleSelect = (id) => {
    setSelectedSetting(id);
  };

  let renderComponent = null;
  switch (selectedSetting) {
    case 1:
      renderComponent = (
        <ActiveStatus
          checked={checkedActiveStatus}
          setChecked={setCheckedActiveStatus}
        />
      );
      break;
    case 2:
      renderComponent = (
        <Notification
          checked={checkedNotification}
          setChecked={setCheckedNotification}
        />
      );
      break;
    case 3:
      renderComponent = <Apperance theme={theme} setTheme={setTheme} />;
      break;
    case 4:
      renderComponent = <Profile />;
      break;
    case 5:
      renderComponent = <LogoutPage />;
      break;

    default:
      renderComponent = <ActiveStatus />;
      break;
  }

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box
          bgcolor={currentTheme.palette.mode === "dark" && "#3c3c3c"}
          sx={style}
          onClick={combinedListener}
        >
          <Stack direction="row" spacing={2} border="none">
            <Settings />
            <Typography variant="body1" fontWeight="bold">
              Preferences
            </Typography>
          </Stack>
        </Box>
      </Modal>

      <Modal open={profileOpen} onClose={() => setProfileOpen(false)}>
        <Box sx={profileStyle}>
          <Stack direction="row" spacing={2}>
            <Grid container spacing={1}>
              <Grid item lg={6} md={6} borderRight="1px solid lightgray">
                <Stack spacing={1}>
                  {iconData.map((data) => (
                    <Stack
                      key={data.id}
                      direction="row"
                      spacing={2}
                      alignItems="center"
                      padding={1}
                      onClick={() => handleSelect(data.id)}
                      sx={{
                        bgcolor:
                          selectedSetting === data.id
                            ? currentTheme.palette.mode === "dark"
                              ? "#3c3c3c"
                              : "lightgray"
                            : "",
                      }}
                    >
                      <Stack
                        width={35}
                        height={35}
                        justifyContent="center"
                        alignItems="center"
                        borderRadius="50%"
                        bgcolor={data.bgColor}
                        color={data?.color ? data.color : "white"}
                      >
                        {data.icon}
                      </Stack>
                      <Stack direction="column" spacing={0}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {data.title}
                        </Typography>
                        {data.subTitle && (
                          <Typography variant="subtitle2" sx={{ opacity: 0.5 }}>
                            {data.subTitle}
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Grid>
              <Grid item height="100%" lg={6} md={6}>
                {renderComponent}
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default Preference;
