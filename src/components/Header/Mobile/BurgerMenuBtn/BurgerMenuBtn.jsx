import s from "./BurgerMenuBtn.module.css";

const BurgerMenuBtn = ({ onToggle, isOpen }) => {
  return (
    <button
      className={`${s.burgerBtn} ${isOpen ? s.active : ""}`}
      onClick={onToggle}
      aria-label="Toggle menu"
    >
      <span className={s.burgerLine}></span>
      <span className={s.burgerLine}></span>
      <span className={s.burgerLine}></span>
    </button>
  );
};

export default BurgerMenuBtn;
