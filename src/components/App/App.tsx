import React from "react";
import { TitleBlock } from "../TitleBlock/TitleBlock";
import { TasksList } from "../TasksList/TasksList";
import { SearchPanel } from "../SearchPanel/SearchPanel";
import { ItemStatusFilter } from "../ItemStatusFilter/ItemStatusFilter";
import { ItemAddForm } from "../ItemAddForm/ItemAddForm";
import { SettingsPanel } from "../SettingsPanel/SettingsPanel";
import { Providers } from "../../providers/Providers";
import { useSettingsContext } from "../../contexts/SettingsContext";
import styles from "./styles.module.css";

const AppContent = () => {
  const { settings } = useSettingsContext();
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = React.useState(false);
  const settingsRef = React.useRef<HTMLElement | null>(null);
  const settingsToggleRef = React.useRef<HTMLButtonElement | null>(null);

  React.useEffect(() => {
    if (isSettingsOpen) {
      setIsSettingsVisible(true);
      return;
    }

    if (!isSettingsVisible) return;

    const timeout = window.setTimeout(() => {
      setIsSettingsVisible(false);
    }, 200);

    return () => window.clearTimeout(timeout);
  }, [isSettingsOpen, isSettingsVisible]);

  React.useEffect(() => {
    if (!isSettingsOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;

      if (settingsRef.current?.contains(target)) return;
      if (settingsToggleRef.current?.contains(target)) return;

      setIsSettingsOpen(false);
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [isSettingsOpen]);

  React.useEffect(() => {
    if (typeof document === "undefined") return;

    const appContainer = document.querySelector(".app-container");
    if (appContainer instanceof HTMLElement) {
      appContainer.dataset.leftHidden = settings.hideLeftSide ? "true" : "false";
    }

    document.body.dataset.leftHidden = settings.hideLeftSide ? "true" : "false";
    document.body.dataset.theme = settings.theme;
    document.documentElement.dataset.theme = settings.theme;
    document.body.dataset.booting = "false";
    document.documentElement.dataset.booting = "false";
  }, [settings.hideLeftSide, settings.theme]);

  return (
    <article className={styles.app}>
      <button
        type="button"
        className={styles.settingsToggle}
        onClick={() => setIsSettingsOpen((open) => !open)}
        aria-expanded={isSettingsOpen}
        ref={settingsToggleRef}
      >
        {isSettingsOpen ? "Hide settings" : "Settings"}
      </button>
      <header>
        <SearchPanel />
        <ItemStatusFilter />
      </header>
      {isSettingsVisible && (
        <SettingsPanel
          ref={settingsRef}
          state={isSettingsOpen ? "open" : "closing"}
        />
      )}
      {!settings.hideTitleBlock && (
        <TitleBlock>
          <TitleBlock.Counter />
        </TitleBlock>
      )}
      <TasksList />
      <ItemAddForm />
    </article>
  );
};

const App = () => {
  return (
    <Providers>
      <AppContent />
    </Providers>
  );
};

export { App };
