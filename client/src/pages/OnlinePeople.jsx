import { useSelector } from "react-redux";
import {
  useGetFriendByIdQuery,
  useGetUserByIdQuery,
} from "../features/friends/friendsApi";
import { useEffect, useState } from "react";
import { Avatar, Badge, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { socket } from "../socket";

/* eslint-disable react/prop-types */
const OnlinePeople = () => {
  const { user: thisUser } = useSelector((state) => state.auth);
  const { data: loggedInUser } = useGetUserByIdQuery(thisUser?._id);
  const [friendsArray, setFriendsId] = useState([]);
  const [onlineUser, setOnlineUser] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("getUsers", (user) => setOnlineUser(user));
    }
  }, [loggedInUser]);
  useEffect(() => {
    const friendArray = loggedInUser?.payload?.user?.friends.filter((f) =>
      onlineUser.some((u) => u.userId === f)
    );
    setFriendsId(friendArray);
  }, [onlineUser, loggedInUser]);

  const skip = () => {
    if (friendsArray !== undefined) {
      if (friendsArray.length > 0) {
        return true;
      }
      return false;
    }
    return false;
  };

  const { data: onlineFriends } = useGetFriendByIdQuery(
    friendsArray?.join(","),
    {
      skip: !skip(friendsArray),
    }
  );

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
  return (
    <>
      <div className="online-people px-5 py-2 w-full h-[80px] flex snap-x gap-5 mx-auto overflow-x-auto overflow-y-hidden scroll-smooth mb-3">
        {onlineFriends?.payload?.user?.map((user) => (
          <div
            key={user?._id}
            title={user?.firstName + " " + user?.lastName}
            className="text-center"
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Avatar
                alt={user?.firstName}
                src={user?.image}
                sx={{ width: "50px", height: "50px" }}
              />
            </StyledBadge>
            <Typography
              variant="inherit"
              align="center"
              sx={{ fontSize: "12px" }}
            >
              {truncateName(user?.firstName, user?.lastName, 12)}
            </Typography>
          </div>
        ))}
      </div>
    </>
  );
};

export default OnlinePeople;
