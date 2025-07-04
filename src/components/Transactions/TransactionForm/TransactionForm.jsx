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

const TransactionForm = ({ transactionType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState({
    _id: "",
    type: "",
    categoryName: "",
  });
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const categoryInput = useRef();

  const handleModalOpen = (e) => {
    if (e.target === categoryInput.current) setIsFormModalOpen(true);
  };

  const handleSubmit = useCallback(
    async (values, actions) => {
      const transaction = {
        ...values,
        category: selectedCategory._id,
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
    [dispatch, selectedCategory._id]
  );

  return (
    <div className={s.formContainer}>
      <Formik
        initialValues={{ ...transactionValues, type: transactionType }}
        validationSchema={transactionFormSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
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
            <label htmlFor="category" className={s.label}>
              Category
            </label>
            <Field
              readOnly
              ref={categoryInput}
              id="category"
              name="category"
              placeholder="Select category"
              type="text"
              value={selectedCategory.categoryName}
              className={s.input}
              onFocus={handleModalOpen}
              onClick={handleModalOpen}
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
        </Form>
      </Formik>
      {isFormModalOpen && (
        <CategoriesModal
          type={transactionType}
          closeModal={() => setIsFormModalOpen(false)}
          setSelectedCategory={(category) => {
            setSelectedCategory(category);
          }}
        />
      )}
    </div>
  );
};

export default TransactionForm;
