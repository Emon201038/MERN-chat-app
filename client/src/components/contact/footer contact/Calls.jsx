import { Box } from "@mui/material";
import ContactLayout from "../ContactLayout";

const Calls = () => {
  return (
    <div className="w-[100vw] h-[100vh] overflow-hidden">
      <ContactLayout>
        <Box
          sx={{ width: "100%", height: "calc(100vh - 120px)" }}
          className=""
        ></Box>
      </ContactLayout>
    </div>
  );
};

export default Calls;
