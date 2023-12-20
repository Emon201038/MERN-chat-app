import { AddCircle, Image, Mic } from "@mui/icons-material";
import { Hidden, IconButton, Stack } from "@mui/material";
import ConversationForm from "../forms/ConversationForm";
import { useTheme } from "@mui/material/styles";

/*eslint-disable react/prop-types */
const Footer = () => {
  const { palette } = useTheme();
  const iconButtonsData = [
    {
      icon: <AddCircle sx={{ color: "rgb(192,132,252)" }} />,
      hidden: "smDown",
      id: 1,
    },
    { icon: <AddCircle />, hidden: "smUp", id: 2 },
    { icon: <Image />, hidden: "smUp", id: 3 },
    { icon: <Mic />, hidden: "smUp", id: 4 },
  ];
  return (
    <div
      className={`form relative w-full h-[60px] flex justify-center items-center ${
        palette.mode === "dark" ? "bg-[#1e1e1e]" : ""
      }`}
    >
      <Stack
        direction="row"
        width="100%"
        height="40px"
        spacing={2}
        paddingX={1}
        alignItems="center"
      >
        {iconButtonsData.map((button) => (
          <Hidden key={button.id} {...{ [button.hidden]: true }}>
            <IconButton
              sx={{
                width: "30px",
                height: "30px",
                color: "#1974d2",
                fontSize: "25px",
              }}
            >
              {button.icon}
            </IconButton>
          </Hidden>
        ))}
        <ConversationForm />
      </Stack>
    </div>
  );
};

export default Footer;
