import { Link } from "react-router-dom";
import logoLight from "../../../assets/favicon-light.svg";
import logoDark from "../../../assets/favicon-dark.svg";

import s from "./Logo.module.css";

const Logo = ({ userThemeMode }) => {
  const logoTitle = "ExpenseTracker".toUpperCase();

  return (
    <Link to={"/"} className={s.logo}>
      <img
        className={s.logoImg}
        src={userThemeMode === "light" ? logoDark : logoLight}
        alt="Expense Tracker App Logo"
      />
      {logoTitle}
    </Link>
  );
};

export default Logo;
