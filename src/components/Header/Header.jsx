import { useSelector } from "react-redux";
import { selectAuthUserIsLoggedIn } from "../../redux/auth/selectors";
import { useTheme } from "../../hooks/userTheme";
import Logo from "./Logo/Logo";
import TransactionsHistoryNav from "./TransactionsHistoryNav/TransactionsHistoryNav";
import UserBarBtn from "./UserBarBtn/UserBarBtn";

import s from "./Header.module.css";

const Header = () => {
  const isLoggedIn = useSelector(selectAuthUserIsLoggedIn);
  const [currentTheme, _] = useTheme();

  return (
    <header className={s.header}>
      <Logo userThemeMode={currentTheme} />
      {isLoggedIn && (
        <>
          <TransactionsHistoryNav />
          <UserBarBtn />
        </>
      )}
    </header>
  );
};

export default Header;
