import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginForm from "./components/forms/LoginForm";
import RegistrationForm from "./components/forms/RegistrationForm";
import Activate from "./layout/Activate";
import useAuthCheck from "./Hooks/useAuthCheck";
import PrivateRoute from "./components/Protected Routes/PrivateRoute";
import PublicRoute from "./components/Protected Routes/PublicRoute";
import Verification from "./layout/Verification";
import Inbox from "./layout/Inbox";
import NotFound from "./layout/NotFound";
import Otp from "./pages/Otp";
import ForgetPassword from "./components/forget password/ForgetPassword";
import Confirmation from "./components/forget password/Confirmation";
import Login from "./components/forget password/LoginForm";
import CodeVerification from "./components/forget password/CodeVerification";
import MobileConversation from "./components/conversation/MobileConversation";
import Conversation from "./pages/Conversation";
import { Hidden } from "@mui/material";
import { Contacts } from "@mui/icons-material";

function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authentication.....</div>
  ) : (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <PublicRoute>
              <LoginForm />
            </PublicRoute>
          }
        />
        <Route
          path="/inbox"
          exact
          element={
            <PrivateRoute>
              <Inbox />
            </PrivateRoute>
          }
        ></Route>
        {/* <Route
          path="/inbox/:conversationId"
          element={
            <PrivateRoute>
              <Hidden smDown>
                <Inbox />
              </Hidden>
              <Hidden smUp>
                <MobileConversation />
              </Hidden>
            </PrivateRoute>
          }
        ></Route> */}
        <Route
          path="/registration"
          element={
            <PublicRoute>
              <RegistrationForm />
            </PublicRoute>
          }
        />
        <Route path="/registration/activate/:token" element={<Activate />} />
        <Route path="/verify" element={<Verification />} />
        <Route path="/forget-password" exact element={<ForgetPassword />} />
        <Route
          path="/forget-password/confirmation/:id"
          element={<Confirmation />}
        />
        <Route
          path="/forget-password/confirmation/:id/login"
          element={<Login />}
        />
        <Route
          path="/forget-password/confirmation/:id/reset-password"
          element={<CodeVerification />}
        />
        <Route path="/otp" element={<Otp />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
