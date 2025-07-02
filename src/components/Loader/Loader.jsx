import { BeatLoader } from "react-spinners";
import s from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={s.backdrop}>
      <BeatLoader color="#ffffff" size={33} />
    </div>
  );
};

export default Loader;
