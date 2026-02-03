import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ItemAddForm } from "./ItemAddForm";
import { TasksList } from "../TasksList/TasksList";
import { Providers } from "../../providers/Providers";

describe("ItemAddForm", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("adds a task to the list", async () => {
    const user = userEvent.setup();
    render(
      <Providers>
        <TasksList />
        <ItemAddForm />
      </Providers>,
    );

    const input = screen.getByLabelText("Task");
    await user.type(input, "New Task");
    await user.click(screen.getByRole("button", { name: /add item/i }));

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });
});
