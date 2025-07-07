import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuthUser } from "../../../redux/auth/selectors";
import { updateUser, deleteUserAvatar } from "../../../redux/user/operations";
import s from "./UserSetsModal.module.css";

const UserSetsModal = ({ onClose }) => {
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    currency: "USD",
    avatarUrl: "",
  });

  const [previewUrl, setPreviewUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        currency: user.currency || "USD",
        avatarUrl: user.avatarUrl || "",
      });
      setPreviewUrl(user.avatarUrl || "");
    }
  }, [user]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = async () => {
    if (!formData.avatarUrl) return;
    setIsLoading(true);
    setError("");

    try {
      await dispatch(deleteUserAvatar()).unwrap();
      setFormData((prev) => ({ ...prev, avatarUrl: "" }));
      setPreviewUrl("");
    } catch {
      setError("Failed to remove photo");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.avatarUrl) return;
    setIsLoading(true);
    setError("");

    try {
      await dispatch(updateUser(formData)).unwrap();
      onClose();
    } catch {
      setError("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.modalOverlay} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <div className={s.modalHeader}>
          <h2>Profile Settings</h2>
          <button className={s.closeBtn} onClick={onClose}>
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className={s.form}>
          <div className={s.avatarSection}>
            <h3>Avatar</h3>
            <div className={s.avatarContainer}>
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="User avatar"
                  className={s.avatarPreview}
                />
              ) : (
                <div className={s.avatarPlaceholder}>
                  {formData.name ? formData.name.charAt(0).toUpperCase() : "U"}
                </div>
              )}
            </div>
            <div className={s.avatarControls}>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                id="avatar-input"
                className={s.fileInput}
              />
              <label htmlFor="avatar-input" className={s.uploadBtn}>
                Upload new photo
              </label>
              {previewUrl && (
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  className={s.removeBtn}
                  disabled={isLoading}
                >
                  Remove
                </button>
              )}
            </div>
          </div>

          <div className={s.formGroup}>
            <label htmlFor="currency">Currency</label>
            <select
              id="currency"
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              className={s.select}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="UAH">UAH</option>
              <option value="GBP">GBP</option>
            </select>
          </div>

          <div className={s.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={s.input}
              required
            />
          </div>

          {error && <div className={s.error}>{error}</div>}

          <div className={s.formActions}>
            <button type="button" onClick={onClose} className={s.cancelBtn}>
              Cancel
            </button>
            <button type="submit" className={s.saveBtn} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserSetsModal;
