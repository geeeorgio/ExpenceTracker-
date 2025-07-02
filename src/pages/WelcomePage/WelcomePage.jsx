import AllUsersTab from "../../components/Auth/AllUsersTab/AllUsersTab";
import AuthNav from "../../components/Auth/AuthNav/AuthNav";
import BgImageWrapper from "../../components/Shared/BgImageWrapper/BgImageWrapper";

const WelcomePage = () => {
  return (
    <div>
      <p>Expense log</p>
      <h1>Manage Your Finances Masterfully!</h1>
      <p>
        ExpenseTracker effortlessly empowers you to take control of your
        finances! With intuitive features, it simplifies the process of tracking
        and managing expenses, allowing for a stress-free mastery over your
        financial world.
      </p>
      <AuthNav />
      <AllUsersTab />
    </div>
  );
};

export default WelcomePage;
