import { Box, Grid } from "@mui/material";
import ContactLayout from "../ContactLayout";
import { useSelector } from "react-redux";
import { Add } from "@mui/icons-material";

const Stories = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <ContactLayout>
      <Box
        sx={{
          width: "100%",
          height: "calc(100vh - 120px)",
          overflowY: "auto",
        }}
      >
        <Grid container>
          <Grid item sm={6} xs={6} height="210px" padding="8px 5px 5px 10px">
            <Box
              width="100%"
              height="100%"
              className="rounded-md bg-slate-300 relative "
            >
              <div className="absolute bg-white w-7 h-7 rounded-full flex justify-center items-center top-3 left-3">
                <Add />
              </div>
              <div className="absolute  text-white text-sm  h-3 rounded-sm flex justify-center items-center bottom-3 left-3">
                Add to story
              </div>
              <img
                src={user?.image}
                width="100%"
                className="rounded-md h-full object-cover"
              />
            </Box>
          </Grid>
          <Grid item sm={6} xs={6} height="210px" padding="8px 10px 5px 5px">
            <Box
              width="100%"
              height="100%"
              className="rounded-md bg-slate-300 relative animate-pulse"
            >
              <div className="absolute bg-white w-7 h-7 rounded-full flex justify-center items-center top-3 left-3 animate-pulse"></div>
              <div className="absolute bg-white w-16 h-3 rounded-sm flex justify-center items-center bottom-3 left-3 animate-pulse"></div>
            </Box>
          </Grid>
          <Grid item sm={6} xs={6} height="210px" padding="5px 5px 5px 10px">
            <Box
              width="100%"
              height="100%"
              className="rounded-md bg-slate-300 relative animate-pulse"
            >
              <div className="absolute bg-white w-7 h-7 rounded-full flex justify-center items-center top-3 left-3 animate-pulse"></div>
              <div className="absolute bg-white w-16 h-3 rounded-sm flex justify-center items-center bottom-3 left-3 animate-pulse"></div>
            </Box>
          </Grid>
          <Grid item sm={6} xs={6} height="210px" padding="5px 10px 5px 5px">
            <Box
              width="100%"
              height="100%"
              className="rounded-md bg-slate-300 relative animate-pulse"
            >
              <div className="absolute bg-white w-7 h-7 rounded-full flex justify-center items-center top-3 left-3 animate-pulse"></div>
              <div className="absolute bg-white w-16 h-3 rounded-sm flex justify-center items-center bottom-3 left-3 animate-pulse"></div>
            </Box>
          </Grid>
          <Grid item sm={6} xs={6} height="210px" padding="5px 5px 10px 10px">
            <Box
              width="100%"
              height="100%"
              className="rounded-md bg-slate-300 relative animate-pulse"
            >
              <div className="absolute bg-white w-7 h-7 rounded-full flex justify-center items-center top-3 left-3 animate-pulse"></div>
              <div className="absolute bg-white w-16 h-3 rounded-sm flex justify-center items-center bottom-3 left-3 animate-pulse"></div>
            </Box>
          </Grid>
          <Grid item sm={6} xs={6} height="210px" padding="5px 10px 10px 5px">
            <Box
              width="100%"
              height="100%"
              className="rounded-md bg-slate-300 relative animate-pulse"
            >
              <div className="absolute bg-white w-7 h-7 rounded-full flex justify-center items-center top-3 left-3 animate-pulse"></div>
              <div className="absolute bg-white w-16 h-3 rounded-sm flex justify-center items-center bottom-3 left-3 animate-pulse"></div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ContactLayout>
  );
};

export default Stories;
