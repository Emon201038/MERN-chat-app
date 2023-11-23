import { useLocation } from "react-router-dom";
import logo from "../images/chat-app-icon-5.jpg";
import NotFound from "./NotFound";
import { MailOutline } from "@mui/icons-material";

const Verification = () => {
  const location = useLocation();
  const previousPath = location.state?.from || "/";
  if (previousPath !== "/register") {
    return <NotFound />;
  }
  return (
    <div className="w-[100vw] h-[100vh] bg-slate-100 flex justify-center items-center flex-col overflow-hidden">
      <div className="w-3/5 h-4/5 lg:h-3/5 rounded bg-white shadow-lg">
        <div className="logo w-full h-[60px] flex justify-center items-center ">
          <div className="logo w-[40px] h-[40px] border-2 border-teal-400 rounded-full flex justify-center items-center ">
            <img src={logo} className=" " alt="" />
          </div>
        </div>
        <div className="logo w-full h-[60px] bg-red-500 flex justify-center items-center ">
          <div className="logo bg-white w-[50px] h-[50px]  rounded-full flex justify-center items-center ">
            <div className="w-[30px] h-[30px] text-red-400 ">
              <MailOutline />
            </div>
          </div>
        </div>
        <div className="textConten flex flex-col w-full h-full">
          <h1 className="p-2 text-2xl mt-2 font-semibold w-full flex justify-center">
            Email verification
          </h1>
          <h3 className="px-5 py-3 ">
            You are almost set to start enjoying our app. <br />
            We have sent you an email to activate your account. Please go to
            your email to active your account. Verification will expires in 10
            minutes
            <br /> After activation you will automatically redirected to inbox
            page.
            <br />
            <br />
            Thank you for Sing up.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Verification;
