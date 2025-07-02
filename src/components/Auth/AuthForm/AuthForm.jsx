import { Form, Formik, Field, ErrorMessage } from "formik";

import s from "./AuthForm.module.css";

const AuthForm = ({
  onSubmit,
  initialValues,
  validationSchema,
  btnValue,
  fieldsList,
  linkToAuthPage,
}) => {
  return (
    <div className={s.wrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        <Form className={s.form}>
          {fieldsList.map((name) => (
            <div key={name}>
              <label htmlFor={name} className={s.label}>
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </label>
              <Field
                id={name}
                name={name}
                placeholder={`your ${name}`}
                type={name === "password" ? "password" : "text"}
                className={s.input}
              />
              <ErrorMessage className={s.error} name={name} component="div" />
            </div>
          ))}
          <button type="submit" className={s.button}>
            {btnValue}
          </button>
          {linkToAuthPage}
        </Form>
      </Formik>
    </div>
  );
};

export default AuthForm;
