import { Navigate } from "react-router-dom";

/*eslint-disable react/prop-types*/
export default function PublicRoute({ children }) {
  const accessToken = document.cookie.includes("accessToken=");

  return !accessToken ? children : <Navigate to="/inbox" />;
}
