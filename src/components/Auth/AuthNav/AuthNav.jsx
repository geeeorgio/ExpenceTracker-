import { NavLink } from "react-router-dom";
import styles from "./AuthNav.module.css";

const AuthNav = () => {
  return (
    <nav className={styles.authNav}>
      <ul>
        <li>
          <NavLink to="/register">Sign up</NavLink>
        </li>
        <li>
          <NavLink to="/login">Sign in</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AuthNav;
