import Logo from "./Logo/Logo";
import TransactionsHistoryNav from "./TransactionsHistoryNav/TransactionsHistoryNav";
import UserBarBtn from "./UserBarBtn/UserBarBtn";
import { useSelector } from "react-redux";
import { selectAuthUserIsLoggedIn } from "../../redux/auth/selectors";

import s from "./Header.module.css";

const Header = () => {
  const isLoggedIn = useSelector(selectAuthUserIsLoggedIn);

  return (
    <header className={s.header}>
      <Logo />
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
