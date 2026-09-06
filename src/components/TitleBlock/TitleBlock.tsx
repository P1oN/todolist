import React from "react";
import { Counter } from "./components/Counter";
import styles from "./styles.module.css";
const TitleBlock = ({ children }: React.PropsWithChildren) => (
  <div className={styles.appHeader}>
    <p className={styles.eyebrow}>A LITTLE FOCUS, EVERY DAY</p>
    <h3>One thing at a time.</h3>
    <p>Make a little space for what’s next.</p>
    {children}
  </div>
);
TitleBlock.Counter = Counter;
export { TitleBlock };
