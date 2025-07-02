import styles from "./UserPanel.module.css";

const UserPanel = () => {
  return (
    <div className={styles.userPanel}>
      <ul>
        <li>
          <button>Profile settings</button>
        </li>
        <li>
          <button>Log out</button>
        </li>
      </ul>
    </div>
  );
};

export default UserPanel;
