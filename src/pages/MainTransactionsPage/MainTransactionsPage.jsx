import TransactionForm from "../../components/Transactions/TransactionForm/TransactionForm";
import TransactionsChart from "../../components/Transactions/TransactionsChart/TransactionsChart";
import TransactionsTotalAmount from "../../components/Transactions/TransactionsTotalAmount/TransactionsTotalAmount";
import styles from "./MainTransactionsPage.module.css";

const MainTransactionsPage = () => {
  return (
    <div className={styles.mainTransactions}>
      <h1>Expense Log</h1>
      <p>
        Capture and organize every penny spent with ease! A clear view of your
        financial habits at your fingertips.
      </p>
      <TransactionsTotalAmount />
      <TransactionsChart />
      <TransactionForm />
    </div>
  );
};

export default MainTransactionsPage;
