// @ts-check
const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test("input OK test", async ({ page }) => {
  const testItem = page.locator("#stock_name");
  await page.locator("input[name=stock_id]").click();
  await page.locator("input[name=stock_id]").fill("3470");
  await page.locator("input[name=stock_id]").press("Enter");
  await expect(testItem).toHaveText(
    /銘柄コード　銘柄名：マリモ地方創生リート投資法人/
  );
});

test("input NG test", async ({ page }) => {
  const testItem = page.locator("#stock_name");
  await page.locator("input[name=stock_id]").click();
  await page.locator("input[name=stock_id]").fill("1234");
  await page.locator("input[name=stock_id]").press("Enter");
  await expect(testItem).toHaveText(
    /銘柄コード　銘柄名が取得できませんでした。/
  );
});

test("transition test", async ({ page }) => {
  const testItem = page.locator("h3");
  await page.locator("input[name=stock_id]").click();
  await page.locator("input[name=stock_id]").fill("3470");
  await page.locator("input[name=stock_id]").press("Enter");
  await page.locator("button[name=get_stock_button]").click();
  await expect(testItem).toHaveText(/銘柄名：マリモ地方創生リート投資法人/);
});

test("return test", async ({ page }) => {
  const testItem = page.locator("h2");
  await page.locator("input[name=stock_id]").click();
  await page.locator("input[name=stock_id]").fill("3470");
  await page.locator("input[name=stock_id]").press("Enter");
  await page.locator("button[name=get_stock_button]").click();
  await page.locator("a[name=return]").click();
  await expect(testItem).toHaveText(/React & Python 勉強/);
});
