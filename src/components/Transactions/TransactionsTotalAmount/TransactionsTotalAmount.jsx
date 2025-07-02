import styles from "./TransactionsTotalAmount.module.css";

const TransactionsTotalAmount = () => {
  return (
    <div className={styles.totalAmount}>
      <div>
        <p>Total Income</p>
        <p>summ</p>
      </div>
      <div>
        <p>Total Expense</p>
        <p>summ</p>
      </div>
    </div>
  );
};

export default TransactionsTotalAmount;
