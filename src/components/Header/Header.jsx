import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuthUserIsLoggedIn } from "../../redux/auth/selectors";
import { useTheme } from "../../hooks/userTheme";
import Logo from "./Logo/Logo";
import TransactionsHistoryNav from "./TransactionsHistoryNav/TransactionsHistoryNav";
import UserBarBtn from "./UserBarBtn/UserBarBtn";
import BurgerMenuBtn from "./Mobile/BurgerMenuBtn/BurgerMenuBtn";
import BurgerMenu from "./Mobile/BurgerMenu/BurgerMenu";

import s from "./Header.module.css";

const Header = () => {
  const isLoggedIn = useSelector(selectAuthUserIsLoggedIn);
  const [currentTheme, _] = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleBurgerToggle = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  };

  const handleBurgerClose = () => {
    setIsBurgerMenuOpen(false);
  };

  return (
    <header className={s.header}>
      <Logo userThemeMode={currentTheme} />

      {isLoggedIn && (
        <>
          {!isMobile ? (
            <>
              <TransactionsHistoryNav />
              <UserBarBtn />
            </>
          ) : (
            <>
              <BurgerMenuBtn
                onToggle={handleBurgerToggle}
                isOpen={isBurgerMenuOpen}
              />
              <BurgerMenu
                isOpen={isBurgerMenuOpen}
                onClose={handleBurgerClose}
              />
            </>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
