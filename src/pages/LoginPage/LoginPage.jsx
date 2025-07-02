import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin } from "../../redux/auth/operations";
import toast from "react-hot-toast";
import { useCallback } from "react";
import AuthForm from "../../components/Auth/AuthForm/AuthForm";
import { loginSchema, loginValues } from "../../helpers/yupValidationSchemas";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleUserLogin = useCallback(
    async (values, actions) => {
      console.log("mount");
      try {
        await dispatch(userLogin(values)).unwrap();
        toast.success("Welcome back! We've missed you!");
        actions.resetForm();
      } catch {
        toast.error("Something went wrong! Please try again one more time");
      }
    },
    [dispatch]
  );

  return (
    <div className={styles.login}>
      <h1>Sign In</h1>
      <p>
        Welcome back to effortless expense tracking! Your financial dashboard
        awaits.
      </p>
      <AuthForm
        onSubmit={handleUserLogin}
        initialValues={loginValues}
        validationSchema={loginSchema}
        btnValue="Sign In"
        fieldsList={Object.keys(loginValues)}
        linkToAuthPage={
          <p>
            Don't have an account?<Link to="/register">Sign Up</Link>
          </p>
        }
      />
    </div>
  );
};

export default LoginPage;
