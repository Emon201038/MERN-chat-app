import { Group, Videocam, WebStories } from "@mui/icons-material";
import { Hidden, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectFooter } from "../features/side nav/sideNavSllice";

const ContactFooter = () => {
  const { selectedFooter } = useSelector((state) => state.sideNav);

  const footerIcon = [
    {
      id: 1,
      icon: (
        <div className="">
          <i className="fa-solid fa-comment"></i>
        </div>
      ),
      name: "Chat",
      link: "/inbox",
    },
    {
      id: 2,
      icon: <Videocam sx={{ width: "30px", height: "30px" }} />,
      name: "Calls",
      link: "/calls",
    },
    {
      id: 3,
      icon: <Group sx={{ width: "30px", height: "30px" }} />,
      name: "People",
      link: "/people",
    },
    {
      id: 4,
      icon: <WebStories />,
      name: "Stories",
      link: "/stories",
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (icon) => {
    dispatch(selectFooter({ id: icon.id, name: icon.name }));
    navigate(icon.link);
  };

  return (
    <Hidden smUp>
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{
          width: "100vw",
          height: "60px",
          boxShadow: "1px 1px 2px black",
        }}
        className="footer"
      >
        {footerIcon.map((icon) => (
          <Stack
            key={icon.id}
            width="60px"
            height="100%"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              sx={{
                width: "40px",
                height: "40px",
                color: selectedFooter?.id === icon.id ? "#1972d2" : "",
              }}
              onClick={() => handleClick(icon)}
            >
              {icon.icon}
            </IconButton>
            <Typography
              variant="caption"
              color={selectedFooter === icon.id ? "#1972d2" : ""}
            >
              {icon.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Hidden>
  );
};

export default ContactFooter;
