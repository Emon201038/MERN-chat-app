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
import { Paper } from "@mui/material";
import ThemeProvider from "./context/ThemeProvider";
import EditUser from "./pages/EditUser";
import Profile from "./layout/Profile";
import MessageRequests from "./components/MessageRequests";
import Layout from "./components/Layout";
import Store from "./components/Store";
import ArchivedMessage from "./components/ArchivedMessage";
import Calls from "./components/contact/footer contact/Calls";
import People from "./components/contact/footer contact/People";
import Stories from "./components/contact/footer contact/Stories";

function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authentication.....</div>
  ) : (
    <ThemeProvider>
      <Paper>
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
            />
            <Route
              path="/settings"
              exact
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile/edit/:id"
              exact
              element={
                <PrivateRoute>
                  <EditUser />
                </PrivateRoute>
              }
            />
            <Route
              path="/message-requests"
              exact
              element={
                <PrivateRoute>
                  <Layout>
                    <MessageRequests />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/store"
              exact
              element={
                <PrivateRoute>
                  <Layout>
                    <Store />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/archived-messages"
              exact
              element={
                <PrivateRoute>
                  <Layout>
                    <ArchivedMessage />
                  </Layout>
                </PrivateRoute>
              }
            />
            <Route
              path="/calls"
              exact
              element={
                <PrivateRoute>
                  <Calls />
                </PrivateRoute>
              }
            />
            <Route
              path="/people"
              exact
              element={
                <PrivateRoute>
                  <People />
                </PrivateRoute>
              }
            />
            <Route
              path="/stories"
              exact
              element={
                <PrivateRoute>
                  <Stories />
                </PrivateRoute>
              }
            />
            <Route
              path="/registration"
              element={
                <PublicRoute>
                  <RegistrationForm />
                </PublicRoute>
              }
            />
            <Route
              path="/registration/activate/:token"
              element={<Activate />}
            />
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
      </Paper>
    </ThemeProvider>
  );
}

export default App;
