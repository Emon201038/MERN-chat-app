import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";
import {
  Call,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
  Search,
  Videocam,
} from "@mui/icons-material";
import { format } from "timeago.js";
import { useState } from "react";

/*eslint-disable react/prop-types */
const Head = ({ selectedFriend }) => {
  const [isBoxVissible, setIsBoxVissible] = useState(false);
  return (
    <Stack
      width="100%"
      height={60}
      padding={1}
      direction="row"
      gap={3}
      justifyContent="center"
      alignItems="center"
      borderBottom="2px"
      bgcolor="rgba(148,163,184,0.2)"
    >
      {isBoxVissible ? (
        <Box
          width="100%"
          height="100%"
          padding={1}
          paddingX={4}
          className="head2"
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            <FormControl
              sx={{
                width: "80%",
              }}
            >
              <OutlinedInput
                size="small"
                id="input-with-icon-adornment"
                placeholder="Search in conversation"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton>
                      <Search color="primary" />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box width="20%" height="100%">
              <Stack
                direction="row"
                justifyContent="space-around"
                alignItems="center"
                width="100%"
                height="100%"
              >
                <IconButton>
                  <KeyboardArrowUp />
                </IconButton>
                <IconButton>
                  <KeyboardArrowDown />
                </IconButton>
                <Button onClick={() => setIsBoxVissible(!isBoxVissible)}>
                  Cancel
                </Button>
              </Stack>
            </Box>
          </Stack>
        </Box>
      ) : (
        <Box
          width="100%"
          padding={1}
          paddingX={4}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          className="head1"
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
      )}
    </Stack>
  );
};

export default Head;
