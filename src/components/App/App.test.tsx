import { beforeEach, afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";

beforeEach(() => window.localStorage.clear());
afterEach(cleanup);

describe("daily notebook", () => {
  it("completes tasks with the keyboard and keeps overall progress when filtering", async () => {
    const user = userEvent.setup();
    render(<App />);
    const task = screen.getByRole("checkbox", { name: "Take a walk outside" });
    task.focus();
    await user.keyboard(" ");
    expect(task).toBeChecked();
    await user.click(screen.getByRole("button", { name: "Done" }));
    expect(screen.getByText("1 of 3 completed")).toBeInTheDocument();
    expect(
      screen.queryByText("Make a little plan for today"),
    ).not.toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("todolist.tasks")!)[1].done).toBe(
      true,
    );
  });

  it("shows search guidance and makes a newly added task visible from a filtered view", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.type(
      screen.getByRole("textbox", { name: "Search tasks" }),
      "no-matching-task",
    );
    expect(await screen.findByText("No matching tasks")).toBeInTheDocument();
    await user.type(
      screen.getByRole("textbox", { name: "Task" }),
      "Read a chapter{Enter}",
    );
    expect(screen.getByText("Read a chapter")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Search tasks" })).toHaveValue(
      "",
    );
    expect(screen.getByText("0 of 4 completed")).toBeInTheDocument();
  });

  it("shows an empty notebook after deletion and persists the empty state", async () => {
    localStorage.setItem(
      "todolist.tasks",
      JSON.stringify([{ id: 1, label: "Only task", done: false }]),
    );
    const user = userEvent.setup();
    const view = render(<App />);
    await user.click(
      screen.getByRole("button", { name: "Delete task: Only task" }),
    );
    expect(screen.getByText("A little room to begin.")).toBeInTheDocument();
    view.unmount();
    render(<App />);
    expect(screen.getByText("A little room to begin.")).toBeInTheDocument();
  });

  it("saves theme and closes settings with Escape, restoring focus", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole("button", { name: "Settings" }));
    await user.click(screen.getByRole("checkbox", { name: "Light theme" }));
    expect(document.documentElement.dataset.theme).toBe("light");
    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: "Settings" })).toHaveFocus();
    expect(JSON.parse(localStorage.getItem("todolist.settings")!).theme).toBe(
      "light",
    );
  });
});
