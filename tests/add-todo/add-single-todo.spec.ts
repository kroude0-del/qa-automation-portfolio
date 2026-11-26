// spec: specs/smoke-add-todo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('할 일 추가 스모크', () => {
  test('Add a single todo with Enter', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');

    // 1. 시작 상태: 새 브라우저 컨텍스트, 빈 목록. /todomvc/ 로 이동한다.
    await page.goto('/todomvc/');
    await expect(input).toBeVisible();
    await expect(page.getByTestId('todo-item')).toHaveCount(0);

    // 2. 입력창에 'buy milk' 를 입력하고 Enter를 누른다.
    await input.fill('buy milk');
    await input.press('Enter');

    await expect(page.getByTestId('todo-item')).toHaveCount(1);
    await expect(page.getByTestId('todo-title')).toHaveText(['buy milk']);
    await expect(input).toHaveValue('');
    await expect(page.getByTestId('todo-count')).toHaveText('1 item left');
    await expect(page.getByTestId('todo-item').getByRole('checkbox')).not.toBeChecked();
  });
});
