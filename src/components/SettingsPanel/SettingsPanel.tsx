import React from "react";
import { cn } from "../../utils/cn";
import { useSettingsContext } from "../../contexts/SettingsContext";
import styles from "./styles.module.css";

interface Props {
  state?: "open" | "closing";
}

const SettingsPanel = React.forwardRef<HTMLElement, Props>(
  ({ state = "open" }, ref) => {
  const { settings, updateSettings } = useSettingsContext();
  const [isFullscreen, setIsFullscreen] = React.useState(
    typeof document !== "undefined" && Boolean(document.fullscreenElement),
  );

  React.useEffect(() => {
    if (typeof document === "undefined") return;

    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const onToggleFullscreen = async () => {
    if (typeof document === "undefined") return;

    if (document.fullscreenElement) {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
      }
      return;
    }

    const target =
      (document.querySelector(".app-container") as HTMLElement | null) ??
      document.documentElement;

    if (target?.requestFullscreen) {
      await target.requestFullscreen();
    }
  };

  const isFullscreenAvailable =
    typeof document !== "undefined" &&
    (document.fullscreenEnabled || Boolean(document.documentElement?.requestFullscreen));

    return (
      <section
        ref={ref}
        className={cn(styles.settingsPanel, {
          [styles.isClosing]: state === "closing",
        })}
        aria-label="User settings"
      >
      <div className={styles.settingsHeader}>Settings</div>
      <div className={styles.settingsGrid}>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={settings.hideLeftSide}
            onChange={(event) =>
              updateSettings({ hideLeftSide: event.target.checked })
            }
          />
          <span>Hide left side</span>
        </label>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={settings.hideTitleBlock}
            onChange={(event) =>
              updateSettings({ hideTitleBlock: event.target.checked })
            }
          />
          <span>Hide title block</span>
        </label>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={settings.theme === "light"}
            onChange={(event) =>
              updateSettings({ theme: event.target.checked ? "light" : "dark" })
            }
          />
          <span>Light theme</span>
        </label>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={isFullscreen}
            onChange={onToggleFullscreen}
            disabled={!isFullscreenAvailable}
          />
          <span>Fullscreen mode</span>
        </label>
      </div>
    </section>
    );
  },
);

SettingsPanel.displayName = "SettingsPanel";

export { SettingsPanel };
