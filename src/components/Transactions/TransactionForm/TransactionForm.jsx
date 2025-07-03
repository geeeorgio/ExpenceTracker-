import { Form, Formik, Field, ErrorMessage } from "formik";
import CategoriesModal from "../CategoriesModal/CategoriesModal";
import DatePickerField from "./DatePickerField/DatePickerField";
import {
  transactionFormSchema,
  transactionValues,
} from "../../../helpers/yupValidationSchemas";

import s from "./TransactionForm.module.css";

const TransactionForm = () => {
  const handleSubmit = (values, actions) => {
    console.log(values);

    actions.setSubmitting(false);
    actions.resetForm();
  };

  return (
    <div className={s.formContainer}>
      <Formik
        initialValues={transactionValues}
        validationSchema={transactionFormSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
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
                  name="transactionType"
                  value="expenses"
                  checked={values.transactionType === "expenses"}
                  className={s.radioInput}
                />
                Expense
              </label>

              <label htmlFor="incomes" className={s.radioLabel}>
                <Field
                  id="incomes"
                  type="radio"
                  name="transactionType"
                  value="incomes"
                  checked={values.transactionType === "incomes"}
                  className={s.radioInput}
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
                <Field
                  id="time"
                  type="time"
                  name="time"
                  placeholder="00:00"
                  className={s.time}
                />
              </label>
              <ErrorMessage className={s.error} name="time" component="div" />
            </div>

            <div className={s.textInputsWrapper}>
              <label htmlFor="category" className={s.label}>
                Category
              </label>
              <Field
                id="category"
                name="category"
                placeholder="Select category"
                type="text"
                className={s.input}
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
                type="text"
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
        )}
      </Formik>
      <CategoriesModal />
    </div>
  );
};

export default TransactionForm;
