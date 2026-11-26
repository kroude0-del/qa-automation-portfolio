import { test, expect } from '@playwright/test';

test('seed', async ({ page }) => {
  await page.goto('/todomvc/');
  await expect(page.getByPlaceholder('What needs to be done?')).toBeVisible();
});