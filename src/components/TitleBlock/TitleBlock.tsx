import React from "react";
import { cn } from "../../utils/cn";
import { Counter } from "./components/Counter";
import styles from "./styles.module.css";

interface Props
  extends React.HTMLAttributes<HTMLHeadingElement>, React.PropsWithChildren {}

const TitleBlock = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <div className={cn(styles.appHeader, className)} {...rest}>
      <h3>Hey, don`t give up!</h3>
      <desc>You just have to do a couple of things.</desc>
      {children}
    </div>
  );
};

TitleBlock.Counter = Counter;

export { TitleBlock };
