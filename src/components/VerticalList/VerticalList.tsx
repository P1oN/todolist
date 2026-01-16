import React from "react";
import { Item } from "./components/Item/Item";
import { cn } from "../../utils/cn";
import styles from "./styles.module.css";

interface Props
  extends React.HTMLAttributes<HTMLUListElement>, React.PropsWithChildren {}

const VerticalList = (props: Props) => {
  const { children, className, ...rest } = props;
  return (
    <ul className={cn(styles.listGroup, className)} {...rest}>
      {children}
    </ul>
  );
};

VerticalList.Item = Item;

export { VerticalList };
