import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuthUserIsLoggedIn } from "../../redux/auth/selectors";

const PublicRoute = ({ to = "/", children }) => {
  const isLoggedIn = useSelector(selectAuthUserIsLoggedIn);
  return !isLoggedIn ? children : <Navigate to={to} />;
};

export default PublicRoute;
