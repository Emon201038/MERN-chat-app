import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Avatar, Badge, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { socket } from "../socket";
import { useGetSingleConversationQuery } from "../features/conversations/conversationsApi";
import { selecteConversation } from "../features/conversations/conversationSlice";
import { selecteFriend } from "../features/friends/friendSlice";

/* eslint-disable react/prop-types */
const OnlinePeople = () => {
  const { user: thisUser } = useSelector((state) => state.auth);

  const [onlineUsers, setOnlineUsers] = useState([]);
  const [skipSearche, setSkipSearche] = useState(true);
  const [userId, setUserId] = useState(null);

  const dispatch = useDispatch();

  useEffect(
    () => {
      if (socket) {
        socket?.on("test_online_users", (user) => {
          const newUsers = user?.filter((u) => u?.user?._id !== thisUser?._id);
          setOnlineUsers(newUsers);
        });
      }
    }, //eslint-disable-next-line react-hooks/exhaustive-deps
    [socket]
  );
  console.log(onlineUsers);

  const { data } = useGetSingleConversationQuery(userId, {
    skip: skipSearche,
  });

  if (data) {
    console.log(data);
    dispatch(selecteConversation(data?.payload?.conversation?._id));
  }

  const handleClick = (user) => {
    setUserId(user._id);
    setSkipSearche(false);
    dispatch(
      selecteFriend({
        ...user,
        name: user?.firstName + " " + user?.lastName,
      })
    );
    // console.log(user);
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

  const truncateName = (firstName, lastName, maxLength) => {
    const fullName = firstName + " " + lastName;
    if (fullName.length <= maxLength) {
      return fullName;
    } else {
      return firstName;
    }
  };

  //decide what to render

  let users = null;
  if (onlineUsers.length === 0) {
    users = <div>No online people </div>;
  }
  if (onlineUsers.length > 0) {
    users = (
      <>
        {onlineUsers?.map((user) => (
          <div
            key={user?.user?._id}
            title={user?.user?.firstName + " " + user?.user?.lastName}
            className="text-center"
            onClick={() => handleClick(user)}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt={user?.user?.firstName}
                src={user?.user?.image}
                sx={{ width: "50px", height: "50px" }}
              />
            </StyledBadge>
            <Typography
              variant="inherit"
              align="center"
              sx={{ fontSize: "10px" }}
            >
              {truncateName(user?.user?.firstName, user?.user?.lastName, 12)}
            </Typography>
          </div>
        ))}
      </>
    );
  }
  return (
    <div className="online-people px-2 py-2 w-full h-[92px] flex items-center snap-x gap-3 mx-auto overflow-x-auto overflow-y-hidden scroll-smooth ">
      {users}
    </div>
  );
};

export default OnlinePeople;
