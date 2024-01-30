import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { selecteConversation } from "../features/conversations/conversationSlice";
import { useDispatch, useSelector } from "react-redux";
import { selecteFriend } from "../features/friends/friendSlice";
import { Avatar, Badge, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CheckCircle } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { socket } from "../socket";
const SingleContact = ({ conversation, currentUser, setRequest }) => {
  const [friends, setFriends] = useState(null);
  const dispatch = useDispatch();
  const theme = useTheme();

  useEffect(() => {
    const friend = conversation.participients.find(
      (u) => u._id !== currentUser._id
    );
    setFriends(friend);
  }, [conversation, currentUser]);

  const { selectedConversation } = useSelector((state) => state.conversation);
  const { selectedFriend } = useSelector((state) => state.friend);

  const handleClick = (id, friend) => {
    dispatch(selecteConversation(id));
    dispatch(selecteFriend(friend));

    setRequest(true);

    if (selectedConversation) {
      socket?.emit("leaveRoom", selectedConversation);
    }
    socket?.emit("joinRoom", id);
  };

  const formatDate = (createdAt) => {
    const currentDate = moment();
    const createdDate = moment(createdAt);

    if (createdDate.isAfter(currentDate.startOf("day"))) {
      // After 12:00 am
      return " •" + createdDate.format("hh:mm A");
    } else if (currentDate.diff(createdDate, "days") > 6) {
      // More than 6 days ago
      return "• " + createdDate.format("MMM DD");
    } else {
      // Before 12:00 am
      return " •" + createdDate.format("ddd");
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength - 3) + "...";
    }
  };
  const truncateName = (firstName, lastName, maxLength) => {
    const fullName = firstName + " " + lastName;
    if (fullName.length <= maxLength) {
      return fullName;
    } else {
      return firstName;
    }
  };

  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));

  return (
    <div
      className={`single-contact ${
        selectedFriend?._id === friends?._id
          ? theme.palette.mode === "dark"
            ? "bg-[#3c3c3c]"
            : "bg-slate-200"
          : ""
      }  w-full h-[70px]  flex items-center justify-between p-1 `}
      onClick={() =>
        handleClick(conversation?._id, {
          _id: friends._id,
          name: friends.firstName + " " + friends.lastName,
          image: friends.image,
          status: friends.status,
          updatedAt: friends.updatedAt,
        })
      }
    >
      <div className="flex gap-3">
        <div className="avatar w-[40px] h-[40px]  rounded-full flex-shrink-0 relative">
          {friends?.status == "online" ? (
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar alt={friends?.firstName} src={friends?.image} />
            </StyledBadge>
          ) : (
            <Avatar alt={friends?.firstName} src={friends?.image} />
          )}
        </div>
        <div className="name flex flex-col gap-0 cursor-default">
          <Typography variant="subtitle2">
            {truncateName(friends?.firstName, friends?.lastName, 13)}
          </Typography>
          <Typography variant="caption" className="overflow-hidden ">
            {conversation?.lastMessage?.sender === currentUser._id && "you:"}{" "}
            <span className="">
              {truncateText(conversation?.lastMessage?.text, 14)}
            </span>
            <span className="mt-[25px] mr-[20px]">
              {formatDate(conversation?.lastMessage?.createdAt)}
            </span>
          </Typography>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="w-[20px] h-[20px]">
          <CheckCircle width={15} sx={{ height: "15px" }} />
        </div>
      </div>
    </div>
  );
};

export default SingleContact;
