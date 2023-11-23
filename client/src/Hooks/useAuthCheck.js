import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const isAuthenticated = document.cookie.includes("accessToken=");
    const auth = localStorage.getItem("auth");

    const authInfo = JSON.parse(auth);

    if (isAuthenticated) {
      dispatch(userLoggedIn({ user: authInfo.user }));
    }

    setAuthChecked(true);
  }, [dispatch]);
  return authChecked;
};

export default useAuthCheck;
