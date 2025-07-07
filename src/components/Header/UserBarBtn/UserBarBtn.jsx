import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { selectAuthUser } from "../../../redux/auth/selectors";
import UserPanel from "../UserPanel/UserPanel";

import s from "./UserBarBtn.module.css";

const UserBarBtn = () => {
  const [userPanelIsOpen, setUserPanelIsOpen] = useState(false);
  const user = useSelector(selectAuthUser);

  const toggleUserPanelMode = useCallback(
    () =>
      userPanelIsOpen ? setUserPanelIsOpen(false) : setUserPanelIsOpen(true),
    [userPanelIsOpen]
  );

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  return (
    <div className={s.userBarContainer}>
      <button className={s.userBarBtn} onClick={toggleUserPanelMode}>
        <div className={s.userInfo}>
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className={s.userAvatar}
            />
          ) : (
            <div className={s.userInitials}>{getInitials(user.name)}</div>
          )}
          <span className={s.userName}>{user.name}</span>
        </div>
        <svg
          className={`${s.arrowIcon} ${
            userPanelIsOpen ? s.arrowUp : s.arrowDown
          }`}
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="currentColor"
        >
          <path d="M8 11L3 6h10l-5 5z" />
        </svg>
      </button>
      {userPanelIsOpen && (
        <UserPanel onClose={() => setUserPanelIsOpen(false)} />
      )}
    </div>
  );
};

export default UserBarBtn;
