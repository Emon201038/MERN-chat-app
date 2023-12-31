import {
  Avatar,
  Box,
  Button,
  FormControl,
  Hidden,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
} from "@mui/material";
import {
  ArrowBack,
  Call,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
  Search,
  Videocam,
} from "@mui/icons-material";
import { format } from "timeago.js";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { unSelectedConversation } from "../../features/conversations/conversationSlice";
import { unSelecteFriend } from "../../features/friends/friendSlice";
import { useTheme } from "@mui/material/styles";

/*eslint-disable react/prop-types */
const Head = () => {
  const [isBoxVissible, setIsBoxVissible] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const { selectedFriend } = useSelector((state) => state.friend);

  const dispatch = useDispatch();
  const theme = useTheme();

  const handleUnselectConversation = () => {
    dispatch(unSelectedConversation());
    dispatch(unSelecteFriend());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(searchValue);
  };

  return (
    <Stack
      width="100%"
      height={60}
      padding={1}
      className="root1"
      direction="row"
      gap={3}
      justifyContent="center"
      alignItems="center"
      borderBottom="2px"
      bgcolor={
        theme.palette.mode === "light" ? "rgba(148,163,184,0.2)" : "#121212"
      }
    >
      {isBoxVissible ? (
        <Box width="100%" height="100%" paddingX={4} className="head2">
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="100%"
          >
            <form onSubmit={handleSubmit}>
              <FormControl
                sx={{
                  width: "80%",
                }}
              >
                <OutlinedInput
                  size="small"
                  id="input-with-icon-adornment"
                  placeholder="Search in conversation"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton type="submit">
                        <Search color="primary" />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </form>

            <Box>
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
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          className="head1"
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={2}
            className="user-info"
          >
            <Hidden smUp>
              <IconButton
                onClick={handleUnselectConversation}
                color="secondary"
                sx={{ width: "40px", height: "40px" }}
              >
                <ArrowBack />
              </IconButton>
            </Hidden>
            <Box>
              <Avatar
                sx={{ width: "40px", height: "40px" }}
                src={selectedFriend?.image}
                alt={selectedFriend?.name}
              />
            </Box>
            <Box>
              <h1 className="name lg:font-bold lg:text-lg max-sm:text-sm">
                {selectedFriend?.name}
              </h1>
              <p className="name text-xs">
                Active {format(selectedFriend.updatedAt)}
              </p>
            </Box>
          </Stack>
          <Stack direction="row" spacing={2}>
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
          </Stack>
        </Box>
      )}
    </Stack>
  );
};

export default Head;
