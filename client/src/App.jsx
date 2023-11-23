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
          element={
            <PrivateRoute>
              <Inbox />
            </PrivateRoute>
          }
        ></Route>
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
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
