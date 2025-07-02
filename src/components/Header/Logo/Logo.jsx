import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <span>
        <svg>
          <use href={"#"}></use>
        </svg>
      </span>
      Expense Tracker
    </Link>
  );
};

export default Logo;
