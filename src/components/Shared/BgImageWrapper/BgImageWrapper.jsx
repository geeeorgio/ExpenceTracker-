import styles from "./BgImageWrapper.module.css";

const BgImageWrapper = ({ children }) => {
  return <div className={styles.bg}>{children}</div>;
};

export default BgImageWrapper;
