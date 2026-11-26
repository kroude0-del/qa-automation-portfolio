// spec: specs/smoke-add-todo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('할 일 추가 스모크', () => {
  test('Empty and whitespace-only input does not create a todo', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    const items = page.getByTestId('todo-item');
    const toggleAll = page.getByLabel('Mark all as complete');
    const footer = page.locator('.todoapp footer');

    await page.goto('/todomvc/');
    await expect(input).toBeVisible();

    // 1. 시작 상태: 빈 목록. 입력창을 비워 둔 채 Enter를 누른다.
    await input.press('Enter');
    await expect(items).toHaveCount(0);
    await expect(footer).toHaveCount(0);
    await expect(toggleAll).toHaveCount(0);

    // 2. 입력창에 공백 3개를 입력하고 Enter를 누른다.
    await input.fill('   ');
    await input.press('Enter');
    await expect(items).toHaveCount(0);
    await expect(footer).toHaveCount(0);
    await expect(toggleAll).toHaveCount(0);
  });
});
