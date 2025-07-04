import { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import styles from "./RegisterPage.module.css";
import { useDispatch } from "react-redux";
import { userRegister } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import {
  registrationSchema,
  registrationValues,
} from "../../helpers/yupValidationSchemas";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUserRegister = useCallback(
    async (values, actions) => {
      try {
        await dispatch(userRegister(values)).unwrap();
        toast.success(`Hello, ${values.name}! You registered successfully!`);
        actions.resetForm();
        navigate("/transactions/expenses");
      } catch {
        toast.error("Something went wrong! Please try again one more time");
      }
    },
    [dispatch, navigate]
  );

  return (
    <div className={styles.register}>
      <h1>Sign Up</h1>
      <p>
        Step into a world of hassle-free expense management! Your journey
        towards financial mastery begins here.
      </p>
      <AuthForm
        onSubmit={handleUserRegister}
        initialValues={registrationValues}
        validationSchema={registrationSchema}
        btnValue="Sign Up"
        fieldsList={Object.keys(registrationValues)}
        linkToAuthPage={
          <p>
            Already have account?<Link to="/login">Sign In</Link>
          </p>
        }
      />
    </div>
  );
};

export default RegisterPage;
