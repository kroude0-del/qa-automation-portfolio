// spec: specs/smoke-add-todo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('할 일 추가 스모크', () => {
  test('Leading and trailing whitespace is trimmed', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');

    await page.goto('/todomvc/');
    await expect(input).toBeVisible();

    // 1. 시작 상태: 빈 목록. 입력창에 '  buy milk  ' 을 입력하고 Enter를 누른다.
    await input.fill('  buy milk  ');
    await input.press('Enter');

    await expect(page.getByTestId('todo-item')).toHaveCount(1);
    await expect(page.getByTestId('todo-title')).toHaveText('buy milk');
    await expect(page.getByTestId('todo-count')).toHaveText('1 item left');
  });
});
