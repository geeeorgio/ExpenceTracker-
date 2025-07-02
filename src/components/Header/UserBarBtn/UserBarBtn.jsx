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

  return (
    <div>
      <img src={user.avatarUrl} alt={user.name} />
      <p>{user.name}</p>
      <button className={s.userBarBtn} onClick={toggleUserPanelMode}>
        UserBarBtn
      </button>
      {userPanelIsOpen && <UserPanel />}
    </div>
  );
};

export default UserBarBtn;
