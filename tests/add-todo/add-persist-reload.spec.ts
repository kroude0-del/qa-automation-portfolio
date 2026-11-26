// spec: specs/smoke-add-todo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('할 일 추가 스모크', () => {
  test('Added todos persist after page reload', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    const titles = page.getByTestId('todo-title');
    const count = page.getByTestId('todo-count');

    await page.goto('/todomvc/');
    await expect(input).toBeVisible();

    // 1. 시작 상태: 빈 목록. 'buy milk', 'walk dog', 'read' 를 순서대로 추가한다.
    for (const text of ['buy milk', 'walk dog', 'read']) {
      await input.fill(text);
      await input.press('Enter');
    }
    await expect(page.getByTestId('todo-item')).toHaveCount(3);
    await expect(titles).toHaveText(['buy milk', 'walk dog', 'read']);
    await expect(count).toHaveText('3 items left');

    // 2. 페이지를 새로고침(reload)한다.
    await page.reload();

    await expect(page.getByTestId('todo-item')).toHaveCount(3);
    await expect(titles).toHaveText(['buy milk', 'walk dog', 'read']);
    await expect(count).toHaveText('3 items left');
    await expect(page.getByLabel('Mark all as complete')).toBeVisible();
    await expect(page.locator('.todoapp footer')).toBeVisible();
    await expect(input).toHaveValue('');
  });
});
