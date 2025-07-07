import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectAuthLoading,
} from "../../redux/auth/selectors";

const PublicRoute = ({ to = "/", children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectAuthLoading);

  if (isRefreshing) {
    return <Loader />;
  }

  return !isLoggedIn ? children : <Navigate to={to} />;
};

export default PublicRoute;
