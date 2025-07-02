import Header from "../../Header/Header";
import Loader from "../../Loader/Loader";
import BgImageWrapper from "../BgImageWrapper/BgImageWrapper";
import { Suspense } from "react";

import styles from "./SharedLayout.module.css";

const SharedLayout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <BgImageWrapper />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
};

export default SharedLayout;
