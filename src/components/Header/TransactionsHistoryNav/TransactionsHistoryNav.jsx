import { NavLink } from "react-router-dom";
import styles from "./TransactionsHistoryNav.module.css";

const TransactionsHistoryNav = () => {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="/transactions/expenses">All Expense</NavLink>
        </li>
        <li>
          <NavLink to="/transactions/incomes">All Income</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default TransactionsHistoryNav;
