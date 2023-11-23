import { EmojiEmotions, MoreVert } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
// import { socket } from "../../layout/Inbox";
/*eslint-disable react/prop-types */
const Message = ({ msg }) => {
  const [iconShow, setIconShow] = useState(false);
  const scrollRef = useRef();
  const { selectedFriend } = useSelector((state) => state.friend);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msg]);

  return (
    <li
      key={msg?.createdAt}
      ref={scrollRef}
      className={`m-2 flex  ${
        msg?.sender === user._id
          ? "justify-end"
          : msg?.receiver === user._id
          ? "justify-start"
          : ""
      }`}
    >
      <div
        className={`w-auto h-auto flex gap-2 justify-center items-center relative `}
        onMouseOver={() => setIconShow(true)}
        onMouseOut={() => setIconShow(false)}
      >
        {msg?.receiver === user._id && (
          <div className="px-1 py-2 mb-5">
            <img
              src={selectedFriend.image}
              className="w-[20px] h-[20px] rounded-full"
              alt=""
            />
          </div>
        )}
        {msg?.sender === user._id && iconShow && (
          <div className="flex gap-5">
            <div
              className="w-5 h-5 mb-5 rounded-full hover:bg-gray-400 flex justify-center items-center"
              title="more"
            >
              <div className="w-3 h-3 flex justify-center items-center">
                <MoreVert sx={{ width: "12px", height: "12px" }} />
              </div>
            </div>

            <div
              className="w-5 h-5 text-gray-500 flex justify-center items-center"
              title="open reaction"
            >
              <EmojiEmotions sx={{ width: "20px", height: "20px" }} />
            </div>
          </div>
        )}

        <div
          className={`w-auto px-3 cursor-default py-1 text-sm rounded-lg mb-5 min-w-[50px] max-w-[300px] text-center ${
            msg?.sender === user._id
              ? "bg-purple-500 text-white mr-5"
              : "bg-slate-300 text-black"
          }`}
        >
          {msg?.text}
        </div>
        {msg?.receiver === user._id && iconShow && (
          <div className="w-5 h-5 mb-5 rounded-full hover:bg-gray-400 flex justify-center items-center">
            <div className="w-3 h-3">
              <MoreVert />
            </div>
          </div>
        )}
        <span
          className={`absolute bottom-[5px]  ${
            msg?.receiver === user._id ? "left-2" : "right-6"
          } text-xs text-gray-600 min-w-[90px]`}
        >
          {format(msg?.createdAt)}
        </span>
      </div>
    </li>
  );
};

export default Message;
