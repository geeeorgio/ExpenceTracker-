import { useEffect } from "react";
import TransactionsHistoryNav from "../../TransactionsHistoryNav/TransactionsHistoryNav";
import UserBarBtn from "../../UserBarBtn/UserBarBtn";
import s from "./BurgerMenu.module.css";

const BurgerMenu = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleNavClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={s.burgerMenuOverlay} onClick={handleBackdropClick}>
      <nav className={s.burgerMenu}>
        <div className={s.burgerMenuContent}>
          <div className={s.navSection}>
            <TransactionsHistoryNav onNavClick={handleNavClick} />
          </div>
          <div className={s.userSection}>
            <UserBarBtn />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default BurgerMenu;
