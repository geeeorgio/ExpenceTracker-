import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {selectAuthLoading,
  selectIsLoggedIn,
} from "../../redux/auth/selectors";

import Loader from "../Loader/Loader";

const PrivateRoute = ({ to = "/", children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectAuthLoading);

  if (isRefreshing) {
    return <Loader />;
  }

  return isLoggedIn ? children : <Navigate to={to} />;
};

export default PrivateRoute;
