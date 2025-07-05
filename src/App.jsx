import { lazy, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SharedLayout from "./components/Shared/SharedLayout/SharedLayout";
import { useDispatch, useSelector } from "react-redux";
import PublicRoute from "./components/CustomRoutes/PublicRoute";
import PrivateRoute from "./components/CustomRoutes/PrivateRoute";
import { getCurrentUser } from "./redux/user/operations";
import { selectAuthAccessToken } from "./redux/auth/selectors";

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
  const checkAuth = useSelector(selectAuthAccessToken);

  useEffect(() => {
    if (checkAuth) dispatch(getCurrentUser());
  }, [dispatch, checkAuth]);

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
          path="/transactions/:transactionsType"
          element={
            <PrivateRoute to="/">
              <MainTransactionsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/transactions/history/:transactionsType"
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
