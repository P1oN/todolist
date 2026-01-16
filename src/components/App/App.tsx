import React from "react";
import { TitleBlock } from "../TitleBlock/TitleBlock";
import { TasksList } from "../TasksList/TasksList";
import { SearchPanel } from "../SearchPanel/SearchPanel";
import { ItemStatusFilter } from "../ItemStatusFilter/ItemStatusFilter";
import { ItemAddForm } from "../ItemAddForm/ItemAddForm";
import { Providers } from "../../providers/Providers";
import styles from "./styles.module.css";

const App = () => {
  return (
    <Providers>
      <article className={styles.app}>
        <header>
          <SearchPanel />
          <ItemStatusFilter />
        </header>
        <TitleBlock>
          <TitleBlock.Counter />
        </TitleBlock>
        <TasksList />
        <ItemAddForm />
      </article>
    </Providers>
  );
};

export { App };
