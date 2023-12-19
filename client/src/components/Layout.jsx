import { Hidden, Stack } from "@mui/material";
import Sidebar from "../pages/Sidebar";

const Layout = ({ children }) => {
  return (
    <Stack direction="row" width="100vw" height="100vh" overflow="hidden">
      <Hidden smDown>
        <Sidebar />
      </Hidden>
      {children}
    </Stack>
  );
};

export default Layout;
