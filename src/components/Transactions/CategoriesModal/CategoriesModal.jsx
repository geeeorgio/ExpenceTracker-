import { useDispatch, useSelector } from "react-redux";
import {
  addCategories,
  deleteCategory,
  updateCategories,
} from "../../../redux/categories/operations";
import { selectCategoriesByType } from "../../../redux/categories/selectors";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import s from "./CategoriesModal.module.css";

const CategoriesModal = ({ type, closeModal, setSelectedCategory }) => {
  const dispatch = useDispatch();
  const categoriesList = useSelector(selectCategoriesByType(type));

  const [validationError, setValidationError] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [btnText, setBtnText] = useState("Add");
  const [editCategoryId, setEditCategoryId] = useState(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  const handleSelectClick = (category) => {
    setSelectedCategory(category);
    closeModal();
  };

  const handleEditClick = (cat) => {
    setNewCategoryName(cat.categoryName);
    setEditCategoryId(cat._id);
    setBtnText("Edit");
    setValidationError(false);
  };

  const handleAddCategoryDispatch = async () => {
    try {
      await dispatch(
        addCategories({
          type: type,
          categoryName: newCategoryName.trim(),
        })
      ).unwrap();
      toast.success("Category added");
    } catch {
      toast.error("Failed to add category");
    }
  };

  const handleEditCategoryDispatch = async () => {
    try {
      await dispatch(
        updateCategories({
          _id: editCategoryId,
          categoryName: newCategoryName.trim(),
        })
      ).unwrap();
      toast.success("Category updated");
    } catch {
      toast.error("Failed to update category");
    }
  };

  const handleDeleteCategoryDispatch = async (_id) => {
    console.log("delete-cat modal", _id);
    try {
      await dispatch(deleteCategory(_id)).unwrap();
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete category");
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();

    setValidationError(newCategoryName.length > 16);
    if (validationError) {
      toast.error(
        "Category length must be less than or equal to 16 characters long"
      );
      return;
    }

    if (btnText === "Add") {
      await handleAddCategoryDispatch();
    } else {
      await handleEditCategoryDispatch();
    }

    setNewCategoryName("");
    setBtnText("Add");
    setEditCategoryId(null);
  };

  return (
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <button className={s.closeBtn} onClick={closeModal}>
          &times;
        </button>
        <h2 className={s.title}>
          {type === "incomes" ? "Incomes" : "Expenses"}
        </h2>
        <p>All Categories</p>

        <ul className={s.categoryList}>
          {categoriesList.map((cat) => (
            <li key={cat._id} className={s.categoryItem}>
              <span>{cat.categoryName}</span>
              <div className={s.actions}>
                <button onClick={() => handleSelectClick(cat)}>Select</button>
                <button onClick={() => handleEditClick(cat)}>Edit</button>
                <button onClick={() => handleDeleteCategoryDispatch(cat._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className={s.form}>
          <input
            id="modalInput"
            name="modalInput"
            type="text"
            placeholder="Enter category name"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
          />
          <button type="button" onClick={handleModalSubmit}>
            {btnText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriesModal;
