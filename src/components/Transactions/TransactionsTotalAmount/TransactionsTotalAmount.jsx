import { useSelector } from "react-redux";
import {
  selectAllExpenses,
  selectAllIncome,
} from "../../../redux/transactions/selectors";

import s from "./TransactionsTotalAmount.module.css";

const TransactionsTotalAmount = () => {
  const totalIncome = useSelector(selectAllIncome);
  const totalExpense = useSelector(selectAllExpenses);

  return (
    <div className={s.totalAmount}>
      <div>
        <p>Total Income</p>
        <p>{totalIncome}</p>
      </div>
      <div>
        <p>Total Expense</p>
        <p>{totalExpense}</p>
      </div>
    </div>
  );
};

export default TransactionsTotalAmount;
