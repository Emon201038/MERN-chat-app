import { useNavigate, useParams } from "react-router-dom";
import logo from "../images/chat-app-icon-5.jpg";
import { useVerifyUerMutation } from "../features/auth/authApi";
import { useEffect } from "react";
import { DraftsOutlined, Replay } from "@mui/icons-material";

const Activate = () => {
  const [verify, { data, isLoading, isError, error }] = useVerifyUerMutation();
  const { token } = useParams();
  const navigate = useNavigate();
  const mainToken = token.split("@").join(".");
  const isValidJwt = /^[\w-]+@[\w-]+@[\w-]+$/.test(token);
  if (!isValidJwt) {
    console.log("Invalid JWT token format");
  }
  const handleClick = async () => {
    await verify({ token: mainToken });
  };

  useEffect(() => {}, [data, navigate]);

  return (
    <div className="w-[100vw] h-[100vh] bg-slate-100 flex justify-center items-center flex-col overflow-hidden">
      <div className="w-3/5 h-4/5 lg:h-3/5 bg-white shadow-lg overflow-y-scroll rounded">
        <div className="logo w-full h-[60px] flex justify-center items-center ">
          <div className="logo w-[40px] h-[40px] border-2 border-teal-400 rounded-full flex justify-center items-center ">
            <img src={logo} className=" " alt="" />
          </div>
        </div>
        <div className="logo w-full h-[60px] bg-gradient-to-r from-green-400 to-blue-300 flex justify-center items-center ">
          <div className="logo bg-white w-[50px] h-[50px]  rounded-full flex justify-center items-center ">
            <div className="w-[30px] h-[30px] text-red-400 ">
              <DraftsOutlined />
            </div>
          </div>
        </div>
        <div className="textConten flex flex-col w-full h-[50.75vh] lg:h-[30vh]">
          <h1 className="p-2 text-2xl font-semibold w-full flex justify-center">
            Email verification completed
          </h1>
          <h3 className="px-5 py-3 ">
            Now you can start enjoying our app. For this you have to click
            verify button below <br /> <br />
            Our chat privacy is stronger. No one can know what you chat with
            some except you and someone even though our admin is unable to
            access your conversation.
            <br />
          </h3>
          <div className="button w-full flex justify-center">
            <button
              className="w-2/3 lg:w-1/3 h-9 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold text-md rounded-md tracking-widest mb-2 lg:mt-2"
              onClick={handleClick}
            >
              {isLoading && (
                <div className="animate-spin   h-5 w-5 mr-3  text-white ">
                  <Replay />
                </div>
              )}

              {isLoading ? "" : "Verify"}
            </button>
          </div>
          {isError && <div className="text-red-500">{error.data.message}</div>}
        </div>
      </div>
    </div>
  );
};

export default Activate;
