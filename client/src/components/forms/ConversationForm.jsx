import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Lottie from "lottie-react";
import animationdData from "../../animation/animation.json";
import { AddCircle, Send } from "@mui/icons-material";

/*eslint-disable react/prop-types */
const ConversationForm = ({
  inputValue,
  setInputValue,
  isLoading,
  handleSentMessage,
  socket,
}) => {
  const { selectedFriend } = useSelector((state) => state.friend);
  const { user } = useSelector((state) => state.auth);

  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const handleChange = (e) => {
    setInputValue(e.target.value);

    if (!typing) {
      setTyping(true);
      socket.current?.emit("typing", {
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
        socket.current?.emit("stopTyping", {
          sender: user?._id,
          receiver: selectedFriend?._id,
        });
        setTyping(false);
      }
    }, timerLength);
  };

  useEffect(() => {
    socket.current?.on("typing", () => {
      setIsTyping(true);
    });

    socket.current?.on("stopTyping", () => {
      setIsTyping(false);
    });
  }, [socket]);

  return (
    <div className="form relative h-[60px] flex ">
      {isTyping && (
        <div className="w-[60px] h-[20px] absolute top-[-40px] bg-white">
          <Lottie
            animationData={animationdData}
            loop
            autoplay
            marginHeight={0}
            marginWidth={0}
          />
        </div>
      )}
      <form className="w-full h-[40px] pt-2 flex justify-center gap-3">
        <div className="icon w-[3vw] h-full  flex justify-center items-center">
          <div className="plus-icon w-[30px] h-[30px] text-purple-400">
            <AddCircle />
          </div>
        </div>
        <input
          type="text"
          className="w-[880px] h-full bg-slate-300 outline-none px-5 text-sm rounded-full"
          onChange={handleChange}
          value={inputValue}
        />
        <div className="icon w-[3vw] h-full  flex justify-center items-center">
          <button
            onClick={handleSentMessage}
            disabled={isLoading}
            className="plus-icon w-[30px] h-[30px] text-purple-400 disabled:text-purple-200"
          >
            <Send />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ConversationForm;
