import { lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SharedLayout from "./components/Shared/SharedLayout/SharedLayout";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAuthSid,
  selectAuthUserIsLoggedIn,
} from "./redux/auth/selectors";
import PublicRoute from "./components/CustomRoutes/PublicRoute";
import PrivateRoute from "./components/CustomRoutes/PrivateRoute";
import { userRefresh } from "./redux/auth/operations";

const WelcomePage = lazy(() => import("./pages/WelcomePage/WelcomePage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const MainTransactionsPage = lazy(() =>
  import("./pages/MainTransactionsPage/MainTransactionsPage")
);
const TransactionsHistoryPage = lazy(() =>
  import("./pages/TransactionsHistoryPage/TransactionsHistoryPage")
);

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectAuthUserIsLoggedIn);
  const sid = useSelector(selectAuthSid);

  useEffect(() => {
    if (!isLoggedIn && sid) {
      dispatch(userRefresh());
    }
  }, [dispatch, sid, isLoggedIn]);

  return (
    <SharedLayout>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute to="/transactions/expenses">
              <WelcomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute to="/transactions/expenses">
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute to="/transactions/expenses">
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/transactions/:type"
          element={
            <PrivateRoute to="/">
              <MainTransactionsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions/history/:type"
          element={
            <PrivateRoute to="/">
              <TransactionsHistoryPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </SharedLayout>
  );
}

export default App;
