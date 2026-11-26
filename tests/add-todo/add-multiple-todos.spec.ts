// spec: specs/smoke-add-todo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('할 일 추가 스모크', () => {
  test('Add multiple todos keeps insertion order and updates plural counter', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    const count = page.getByTestId('todo-count');

    await page.goto('/todomvc/');
    await expect(input).toBeVisible();

    // 1. 시작 상태: 빈 목록. 'buy milk' 를 입력하고 Enter를 누른다.
    await input.fill('buy milk');
    await input.press('Enter');
    await expect(count).toHaveText('1 item left');

    // 2. 'walk dog' 입력 후 Enter, 이어서 'read' 입력 후 Enter를 누른다.
    await expect(input).toHaveValue('');
    await input.fill('walk dog');
    await input.press('Enter');
    await expect(input).toHaveValue('');
    await input.fill('read');
    await input.press('Enter');
    await expect(input).toHaveValue('');

    await expect(page.getByTestId('todo-title')).toHaveText(['buy milk', 'walk dog', 'read']);
    await expect(count).toHaveText('3 items left');
  });
});
