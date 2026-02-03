import React from "react";

type ThemeOption = "dark" | "light";

interface SettingsState {
  hideLeftSide: boolean;
  hideTitleBlock: boolean;
  theme: ThemeOption;
}

interface SettingsContextType {
  settings: SettingsState;
  updateSettings: (updates: Partial<SettingsState>) => void;
}

const SettingsContext = React.createContext<SettingsContextType | undefined>(
  undefined,
);

interface Props extends React.PropsWithChildren {}

const STORAGE_KEY = "todolist.settings";

const defaultSettings: SettingsState = {
  hideLeftSide: false,
  hideTitleBlock: false,
  theme: "dark",
};

const loadSettings = (): SettingsState => {
  if (typeof window === "undefined") return defaultSettings;

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultSettings;

  try {
    const parsed = JSON.parse(stored) as Partial<SettingsState> | null;
    if (!parsed || typeof parsed !== "object") return defaultSettings;

    const theme = parsed.theme === "light" ? "light" : "dark";

    return {
      hideLeftSide: Boolean(parsed.hideLeftSide),
      hideTitleBlock: Boolean(parsed.hideTitleBlock),
      theme,
    };
  } catch (error) {
    return defaultSettings;
  }
};

const SettingsContextProvider = ({ children }: Props) => {
  const [settings, setSettings] = React.useState(loadSettings);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const updateSettings = React.useCallback(
    (updates: Partial<SettingsState>) => {
      setSettings((current) => ({ ...current, ...updates }));
    },
    [],
  );

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

const useSettingsContext = () => {
  const context = React.useContext(SettingsContext);
  if (!context) {
    throw new Error(
      "useSettingsContext must be used within a SettingsContextProvider",
    );
  }

  return context;
};

export { SettingsContextProvider, useSettingsContext };
