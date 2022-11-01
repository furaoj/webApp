import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import { checkNum } from "./component/Utility";

test("title test", () => {
  render(<App />);
  const linkElement = screen.getByText(/React & Python 勉強/i);
  expect(linkElement).toBeInTheDocument();
});

test("check stockId input NG", () => {
  const testStockId = "テスト";
  expect(checkNum(testStockId)).toBe(false);
});

test("check stockId input OK", () => {
  const testStockId = "1234";
  expect(checkNum(testStockId)).toBe(true);
});

test("transition test NG", () => {
  render(<App />);
  userEvent.click(screen.getByRole("button"));
  const titleElement = screen.getByText("銘柄コード");
  expect(titleElement).toBeInTheDocument();
});

test("transition test OK", async () => {
  render(<App />);
  userEvent.type(screen.getByRole("textbox"), "2121");
  userEvent.click(screen.getByRole("button"));
  await screen.findByText("株価表示");
  const titleElement = screen.getByText("株価表示");
  expect(titleElement).toBeInTheDocument();
});

test("transition test return", () => {
  render(<App />);
  userEvent.click(screen.getByRole("link"));
  const titleElement = screen.getByText("銘柄コード");
  expect(titleElement).toBeInTheDocument();
});
