import { NavLink } from "react-router-dom";
import s from "./TransactionsHistoryNav.module.css";

const TransactionsHistoryNav = ({ onNavClick }) => {
  const handleNavClick = () => {
    if (onNavClick) onNavClick();
  };

  return (
    <nav className={s.nav}>
      <ul>
        <li>
          <NavLink
            to="/transactions/history/expenses"
            onClick={handleNavClick}
            className={({ isActive }) => (isActive ? s.active : "")}
          >
            All Expense
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/transactions/history/incomes"
            onClick={handleNavClick}
            className={({ isActive }) => (isActive ? s.active : "")}
          >
            All Income
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default TransactionsHistoryNav;
