import { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import SharedLayout from "./components/Shared/SharedLayout/SharedLayout";

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
  return (
    <SharedLayout>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/transactions/:type" element={<MainTransactionsPage />} />
        <Route
          path="/transactions/history/:type"
          element={<TransactionsHistoryPage />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </SharedLayout>
  );
}

export default App;
