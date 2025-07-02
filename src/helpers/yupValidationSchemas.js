import * as Yup from "yup";

// Registration Form

export const registrationValues = {
  name: "",
  email: "",
  password: "",
};

export const registrationSchema = Yup.object({
  name: Yup.string()
    .required("Required")
    .min(3, "Too short. Min 3 chars")
    .max(50, "Max 50 chars"),

  email: Yup.string()
    .required("Required")
    .min(3, "Too short. Min 3 chars")
    .max(50, "Max 50 chars"),

  password: Yup.string()
    .required("Required")
    .min(8, "Too short. Min 8 chars")
    .max(50, "Max 50 chars")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
});

// Login Form
export const loginValues = {
  email: "",
  password: "",
};

export const loginSchema = Yup.object({
  email: Yup.string()
    .required("Required")
    .min(3, "Too short. Min 3 chars")
    .max(50, "Max 50 chars"),

  password: Yup.string()
    .required("Required")
    .min(8, "Too short. Min 8 chars")
    .max(50, "Max 50 chars")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
      "Password must contain uppercase, lowercase, number, and special character"
    ),
});
