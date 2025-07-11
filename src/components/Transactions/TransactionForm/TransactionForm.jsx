import { useDispatch } from "react-redux";
import { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Formik, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import CategoriesModal from "../CategoriesModal/CategoriesModal";
import DatePickerField from "./DatePickerField/DatePickerField";
import {
  transactionFormSchema,
  transactionValues,
} from "../../../helpers/yupValidationSchemas";
import { addTransaction } from "../../../redux/transactions/operations";

import s from "./TransactionForm.module.css";

const TransactionForm = ({ transactionsType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryInput = useRef();

  const [selectedCategory, setSelectedCategory] = useState({
    _id: "",
    type: "",
    categoryName: "",
  });
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const handleModalOpen = (e) => {
    if (e.target === categoryInput.current) setIsFormModalOpen(true);
  };

  const handleSubmit = useCallback(
    async (values, actions) => {
      console.log("submit", values);
      const transaction = {
        ...values,
        sum: Number(values.sum),
        type: values.type,
      };
      try {
        await dispatch(addTransaction(transaction)).unwrap();
        toast.success("Transaction saved!");
        actions.resetForm();
      } catch {
        toast.error("Something went wrong! Please try again one more time");
      }
    },
    [dispatch]
  );

  return (
    <div className={s.formContainer}>
      <Formik
        initialValues={{ ...transactionValues, type: transactionsType }}
        validationSchema={transactionFormSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ setFieldValue }) => (
          <Form className={s.form}>
            <div
              className={s.radioWrapper}
              role="group"
              aria-labelledby="transactionTypeGroup"
            >
              <label htmlFor="expenses" className={s.radioLabel}>
                <Field
                  id="expenses"
                  type="radio"
                  name="type"
                  value="expenses"
                  className={s.radioInput}
                  onChange={(e) => navigate(`/transactions/${e.target.value}`)}
                />
                Expense
              </label>

              <label htmlFor="incomes" className={s.radioLabel}>
                <Field
                  id="incomes"
                  type="radio"
                  name="type"
                  value="incomes"
                  className={s.radioInput}
                  onChange={(e) => navigate(`/transactions/${e.target.value}`)}
                />
                Income
              </label>
            </div>

            <div className={s.dateWrapper}>
              <DatePickerField
                label="Date"
                name="date"
                id="date"
                wrapperClassName={s.dateFieldWrapper}
                labelClassName={s.label}
                inputClassName={s.dateInput}
                errorClassName={s.error}
              />

              <label htmlFor="time" className={s.label}>
                Time
                <Field id="time" type="time" name="time" className={s.time} />
              </label>
              <ErrorMessage className={s.error} name="time" component="div" />
            </div>

            <div className={s.textInputsWrapper}>
              <label htmlFor="categoryInput" className={s.label}>
                Category
              </label>
              <input
                readOnly
                ref={categoryInput}
                id="categoryInput"
                name="categoryInput"
                placeholder="Select category"
                type="text"
                value={selectedCategory.categoryName}
                className={s.input}
                onFocus={handleModalOpen}
                onClick={handleModalOpen}
              />

              <Field
                type="hidden"
                name="category"
                id="category"
                aria-label="Selected Category ID"
              />

              <ErrorMessage
                className={s.error}
                name="category"
                component="div"
              />

              <label htmlFor="sum" className={s.label}>
                Sum
              </label>
              <Field
                id="sum"
                name="sum"
                placeholder="Enter the sum"
                type="number"
                className={s.input}
              />
              <ErrorMessage className={s.error} name="sum" component="div" />
            </div>

            <label htmlFor="comment" className={s.label}>
              Comment
            </label>
            <Field
              as="textarea"
              id="comment"
              name="comment"
              placeholder="Enter the text"
              className={s.textArea}
            />
            <ErrorMessage className={s.error} name="comment" component="div" />
            <button type="submit" className={s.submitButton}>
              Submit
            </button>
            {isFormModalOpen && (
              <CategoriesModal
                type={transactionsType}
                closeModal={() => setIsFormModalOpen(false)}
                setSelectedCategory={(category) => {
                  console.log(category);
                  setSelectedCategory(category);
                  setFieldValue("category", category._id);
                }}
              />
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default TransactionForm;
