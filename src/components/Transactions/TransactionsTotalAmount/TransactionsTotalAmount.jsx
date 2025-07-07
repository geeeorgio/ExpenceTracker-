import { useSelector } from "react-redux";
import {
  selectTotalExpense,
  selectTotalIncome,
} from "../../../redux/transactions/selectors";

import s from "./TransactionsTotalAmount.module.css";

const TransactionsTotalAmount = () => {
  const totalIncome = useSelector(selectTotalIncome);
  const totalExpense = useSelector(selectTotalExpense);

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
