import { Box, Drawer, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Layout from "../components/Layout";
import { useState } from "react";
import {
  DarkMode,
  Logout,
  NotificationAdd,
  Settings,
} from "@mui/icons-material";
import ActiveStatus from "../components/preferences/ActiveStatus";
import Notification from "../components/preferences/Notification";
import Apperance from "../components/preferences/Apperance";
import ProfileInfo from "../components/preferences/Profile";

const Profile = () => {
  const [selectedSetting, setSelectedSetting] = useState(1);
  const [checkedActiveStatus, setCheckedActiveStatus] = useState(true);
  const [checkedNotification, setCheckedNotification] = useState(false);

  const currentTheme = useTheme();
  const storedTheme = localStorage.getItem("theme");
  const [theme, setTheme] = useState(storedTheme);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
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
    if (id === 5) {
      setOpen(true);
    }
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
      renderComponent = <ProfileInfo />;
      break;
  }

  return (
    <Layout>
      <div className="h-[100vh] w-[260px] lg:w-[260px] md:w-[260px] sm:w-[200px]  border-r border-gray-400">
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
      </div>
      <div className="w-[calc(100vw-340px)] lg:w-[calc(100vw-340px)] md:w-[calc(100vw-280px)] sm:w-[calc(100vw-140px)] h-full">
        {renderComponent}
        <Drawer open={open} onClose={handleClose} anchor="center">
          <Typography>Logout?</Typography>
        </Drawer>
      </div>
    </Layout>
  );
};

export default Profile;
