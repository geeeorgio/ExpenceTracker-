import * as Yup from "yup";
import { parseISO, isValid, isFuture, startOfDay } from "date-fns";

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

// Transaction Form
export const transactionValues = {
  type: "",
  date: "",
  time: "00:00:00",
  category: "",
  sum: "",
  comment: "",
};

export const transactionFormSchema = Yup.object().shape({
  type: Yup.string()
    .required("Transaction type is required")
    .oneOf(["incomes", "expenses"]),

  date: Yup.string()
    .required("Date is required")
    .test("is-valid-date", "Invalid date", function (value) {
      if (!value) return true;
      const parsedDate = parseISO(value);
      return (
        isValid(parsedDate) || this.createError({ message: "Invalid date" })
      );
    })
    .test(
      "is-not-future-date",
      "Date cannot be in the future",
      function (value) {
        if (!value) return true;
        const parsedDate = parseISO(value);
        return (
          !isFuture(startOfDay(parsedDate)) ||
          this.createError({ message: "Date cannot be in the future" })
        );
      }
    ),

  time: Yup.string()
    .required("Time is required")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid time format (HH:MM)"),

  category: Yup.string()
    .required("Category is required")
    .min(1, "Category cannot be empty")
    .max(
      16,
      "Category length must be less than or equal to 16 characters long"
    ),

  sum: Yup.number()
    .required("Amount is required")
    .typeError("Amount must be a number")
    .positive("Amount must be positive")
    .max(1_000_000_000, "Amount is too large")
    .test(
      "two-decimal-places",
      "Amount can have up to two decimal places",
      (value) => {
        if (value === null || value === undefined) return true;
        return /^\d+(\.\d{1,2})?$/.test(value.toString());
      }
    ),

  comment: Yup.string().max(255, "Comment cannot exceed 255 characters"),
});
