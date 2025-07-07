import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserSetsModal from "../UserSetsModal/UserSetsModal";
import { userLogout } from "../../../redux/auth/operations";

import s from "./UserPanel.module.css";

const UserPanel = ({ onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleProfileSettings = () => {
    setIsModalOpen(true);
    if (onClose) onClose();
  };

  const handleLogout = async () => {
    try {
      await dispatch(userLogout()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={s.userPanel}>
        <ul className={s.userPanelList}>
          <li>
            <button className={s.userPanelBtn} onClick={handleProfileSettings}>
              Profile settings
            </button>
          </li>
          <li>
            <button className={s.userPanelBtn} onClick={handleLogout}>
              Log out
            </button>
          </li>
        </ul>
      </div>

      {isModalOpen && <UserSetsModal onClose={handleCloseModal} />}
    </>
  );
};

export default UserPanel;
