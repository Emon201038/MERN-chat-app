import { Box, FormControl, IconButton, Input } from "@mui/material";
import { Call, MoreHoriz, Search, Videocam } from "@mui/icons-material";
import { format } from "timeago.js";
import { useState } from "react";

/*eslint-disable react/prop-types */
const Head = ({ selectedFriend }) => {
  const [isBoxVissible, setIsBoxVissible] = useState(false);
  return (
    <Box
      width="100%"
      padding={1}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderBottom="2px"
      className="header w-full  bg-white p-1 flex justify-center items-center border-b-2 flex-col"
      bgcolor="rgba(148,163,184,0.2)"
    >
      <Box
        width="100%"
        padding={1}
        paddingX={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" gap={3} className="user-info">
          <Box>
            <img
              src={selectedFriend?.image}
              alt={selectedFriend?.name}
              className="w-[40px] h-[40px] rounded-full"
            />
          </Box>
          <div>
            <h1 className="name font-bold text-lg">{selectedFriend?.name}</h1>
            <p className="name text-sm">
              Active {format(selectedFriend.updatedAt)}
            </p>
          </div>
        </Box>
        <Box display="flex" gap={3}>
          <IconButton title="audio call">
            <Call color="secondary" />
          </IconButton>
          <IconButton title="video call">
            <Videocam color="secondary" />
          </IconButton>
          <IconButton
            title="search in conversation"
            onClick={() => setIsBoxVissible(!isBoxVissible)}
          >
            <Search color="secondary" />
          </IconButton>
          <IconButton title="more">
            <MoreHoriz color="secondary" />
          </IconButton>
        </Box>
      </Box>
      {isBoxVissible && (
        <Box width="100%" textAlign="center" bgcolor="white">
          <FormControl
            sx={{ width: "100%" }}
            variant="standard"
            bgcolor="white"
          >
            <Input
              // sx={{ width: "100%" }}
              size="100%"
              sx={{ paddingX: "10px" }}
              id="input-with-icon-adornment"
              endAdornment={
                <IconButton position="start">
                  <Search color="primary" />
                </IconButton>
              }
            />
          </FormControl>
        </Box>
      )}
    </Box>
  );
};

export default Head;
