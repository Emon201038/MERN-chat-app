import { CameraAlt } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";

const EditUser = () => {
  const { user } = useSelector((state) => state.auth);
  const [name, setName] = useState(user.firstName);

  return (
    <div className="w-[100vw] h-[100vh] flex justify-center items-center bg-slate-400">
      <div className="container w-1/2 h-2/3 bg-white rounded-md shadow-md p-5 flex items-center flex-col gap-5">
        <div className="relative">
          <img
            src={user.image}
            alt=""
            className="relative w-[80px] h-[80px] rounded-full"
          />
          <div className="absolute h-4 w-4  bottom-[17px] right-[17px]">
            <IconButton>
              <CameraAlt />
            </IconButton>
          </div>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"
            value={name}
            className="bg-slate-300 p-1 px-3 rounded-md"
          />
          <input
            type="text"
            name="firstName"
            value={user.lastName}
            className="bg-slate-300 px-3 p-1 rounded-md"
          />
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            name="firstName"
            value={user.email}
            className="bg-slate-300 p-1 px-3 rounded-md"
          />
          <input
            type="text"
            name="firstName"
            value={user.phone}
            className="bg-slate-300 px-3 p-1 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
