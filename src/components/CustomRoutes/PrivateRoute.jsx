import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectAuthIsRefreshing,
  selectAuthUserIsLoggedIn,
} from "../../redux/auth/selectors";

import Loader from "../Loader/Loader";

const PrivateRoute = ({ to = "/", children }) => {
  const isLoggedIn = useSelector(selectAuthUserIsLoggedIn);
  const isRefreshing = useSelector(selectAuthIsRefreshing);

  if (isRefreshing) {
    return <Loader />;
  }

  return isLoggedIn ? children : <Navigate to={to} />;
};

export default PrivateRoute;
