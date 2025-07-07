import { useParams } from "react-router-dom";
import TransactionsList from "../../components/Transactions/TransactionsList/TransactionsList";
import TransactionsSearchTools from "../../components/Transactions/TransactionsSearchTools/TransactionsSearchTools";
import TransactionsTotalAmount from "../../components/Transactions/TransactionsTotalAmount/TransactionsTotalAmount";
import styles from "./TransactionsHistoryPage.module.css";

const TransactionsHistoryPage = () => {
  const { transactionsType } = useParams();

  return (
    <div className={styles.historyPage}>
      TransactionsHistoryPage
      <h1>
        All
        {transactionsType.charAt(0).toUpperCase + transactionsType.slice(1)}
      </h1>
      {transactionsType === "expences" ? (
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
      <TransactionsSearchTools type={transactionsType} />
      <TransactionsList type={transactionsType} />
    </div>
  );
};

export default TransactionsHistoryPage;
