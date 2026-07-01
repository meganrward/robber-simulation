import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("run simulation shows logs and chart", async () => {
  render(<App />);

  expect(
    screen.getByText(/press the button to run a simulation/i)
  ).toBeInTheDocument();

  await userEvent.click(
    screen.getByRole("button", { name: /run simulation/i })
  );

  expect(screen.getByRole("heading", { name: /logs/i })).toBeInTheDocument();
  expect(
    screen.getByText(/the robber moves at speed/i)
  ).toBeInTheDocument();

  const exploded = screen.queryByRole("alert");
  const survived = screen.queryByText(/no collision in 100 steps/i);
  expect(exploded ?? survived).toBeTruthy();
  expect(
    screen.getByRole("heading", { name: /positions over time/i })
  ).toBeInTheDocument();
});
