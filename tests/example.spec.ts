import { test, expect } from "@playwright/test";
import { allure } from "allure-playwright";

export const TODO_ITEMS = ["buy some cheese", "feed the cat", "book a doctors appointment"];

test.describe(() => {
  test.beforeEach(async () => {
    allure.owner('lunin');
    allure.suite('Habr');
    allure.layer('UI Tests');
    allure.labels(
      { name: 'jira', value: 'ONB2B-1135' }
    );
  });
  test("basic test", async ({ page }) => {
    await allure.step("Visit todolist page", async () => {
      await page.goto("https://demo.playwright.dev/todomvc");
    });

    await allure.step("Create 1st todo.", async () => {
      await page.locator(".new-todo").fill(TODO_ITEMS[0]);
      await page.locator(".new-todo").press("Enter");
    });

    await expect(
      page.locator(".view label"),
      "Make sure the list only has one todo item.",
    ).toHaveText([TODO_ITEMS[0]]);
  });
});