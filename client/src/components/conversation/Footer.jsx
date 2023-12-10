import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import animationdData from "../../animation/animation.json";
import { AddCircle, Image, Mic, Send, ThumbUp } from "@mui/icons-material";
import { Hidden, IconButton, Stack } from "@mui/material";
import ConversationForm from "../forms/ConversationForm";
import { socket } from "../../socket";

/*eslint-disable react/prop-types */
const Footer = ({
  inputValue,
  setInputValue,
  isLoading,
  handleSentMessage,
}) => {
  const { selectedFriend } = useSelector((state) => state.friend);
  const { user } = useSelector((state) => state.auth);

  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);

    if (!typing) {
      setTyping(true);
      socket?.emit("typing", {
        sender: user?._id,
        receiver: selectedFriend?._id,
      });
    }

    let lastTypingTime = Date.now();
    const timerLength = 3000;

    setTimeout(() => {
      const timeNow = Date.now();
      const timeDiff = timeNow - lastTypingTime;

      if (timeDiff >= timerLength && typing) {
        socket?.emit("stopTyping", {
          sender: user?._id,
          receiver: selectedFriend?._id,
        });
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    socket?.on("typing", () => {
      setIsTyping(true);
    });

    socket?.on("stopTyping", () => {
      setIsTyping(false);
    });
  }, []);

  return (
    <div className="form relative w-full h-[60px] flex justify-center items-center">
      {isTyping && (
        <div className="w-[60px] h-[20px] absolute top-[-40px] left-9 bg-white">
          <Lottie
            animationData={animationdData}
            loop
            autoplay
            marginHeight={0}
            marginWidth={0}
          />
        </div>
      )}
      <Stack
        direction="row"
        width="100%"
        height="40px"
        spacing={2}
        paddingX={1}
        // justifyContent="space-around"
        alignItems="center"
      >
        <Hidden smDown>
          <IconButton size="35px">
            <AddCircle sx={{ color: "rgb(192,132,252)" }} />
          </IconButton>
        </Hidden>
        <Hidden smUp>
          <IconButton
            sx={{
              width: "30px",
              height: "30px",
              color: "#1974d2",
              fontSize: "25px",
            }}
          >
            <AddCircle />
          </IconButton>
          <IconButton
            sx={{
              width: "30px",
              height: "30px",
              color: "#1974d2",
              fontSize: "25px",
            }}
          >
            <Image />
          </IconButton>
          <IconButton
            sx={{
              width: "30px",
              height: "30px",
              color: "#1974d2",
              fontSize: "25px",
            }}
          >
            <Mic />
          </IconButton>
        </Hidden>
        <ConversationForm
          handleChange={handleChange}
          inputValue={inputValue}
          handleSentMessage={handleSentMessage}
        />
        <div className="icon w-[3vw] h-full  flex justify-center items-center">
          {inputValue?.length === 0 ? (
            <IconButton
              sx={{
                width: "30px",
                height: "30px",
                color: "#1974d2",
                fontSize: "25px",
              }}
            >
              <ThumbUp />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleSentMessage}
              disabled={isLoading}
              sx={{
                width: "30px",
                height: "30px",
                color: "#1974d2",
                fontSize: "25px",
              }}
            >
              <Send />
            </IconButton>
          )}
        </div>
      </Stack>
    </div>
  );
};

export default Footer;
