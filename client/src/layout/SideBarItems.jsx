import { Menu } from "@mui/icons-material";
import { Drawer, Hidden, IconButton, Stack } from "@mui/material";

/*eslint-disable react/prop-types*/
const SideBarItems = ({ toggleDrawer, drawerOpen, list }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      alignItems="center"
    >
      <Hidden smUp>
        <IconButton onClick={toggleDrawer(true)}>
          <Menu />
        </IconButton>
        <Drawer
          anchor="left"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{ style: { width: "75%" } }}
        >
          <div>{list("left")}</div>
        </Drawer>
      </Hidden>
      <h2>Chat</h2>
    </Stack>
  );
};

export default SideBarItems;
