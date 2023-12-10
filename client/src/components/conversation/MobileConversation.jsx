import { Stack } from "@mui/material";
import Messages from "./Messages";
import Head from "./Head";
import Footer from "./Footer";
import { useSelector } from "react-redux";
const MobileConversation = () => {
  const { selectedConversation } = useSelector((state) => state.conversation);
  console.log(selectedConversation);
  return (
    <Stack width="100vw" height="100vh">
      <Head />
      {selectedConversation !== null && <Messages />}

      <Footer />
    </Stack>
  );
};

export default MobileConversation;
