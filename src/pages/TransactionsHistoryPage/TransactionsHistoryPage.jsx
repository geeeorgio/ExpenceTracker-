import { useParams } from "react-router-dom";
import TransactionsList from "../../components/Transactions/TransactionsList/TransactionsList";
import TransactionsSearchTools from "../../components/Transactions/TransactionsSearchTools/TransactionsSearchTools";
import TransactionsTotalAmount from "../../components/Transactions/TransactionsTotalAmount/TransactionsTotalAmount";
import styles from "./TransactionsHistoryPage.module.css";

const TransactionsHistoryPage = () => {
  const { type } = useParams();
  console.log(type);

  return (
    <div className={styles.historyPage}>
      TransactionsHistoryPage
      <h1>All {() => type.charAt(0).toUpperCase + type.slice(1)}</h1>
      {type === "expences" ? (
        <p>
          View and manage every transaction seamlessly! Your entire financial
          landscape, all in one place.
        </p>
      ) : (
        <p>
          Track and celebrate every bit of earnings effortlessly! Gain insights
          into your total revenue in a snap.
        </p>
      )}
      <TransactionsTotalAmount />
      <TransactionsSearchTools type={type} />
      <TransactionsList type={type} />
    </div>
  );
};

export default TransactionsHistoryPage;
