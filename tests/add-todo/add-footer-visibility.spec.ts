// spec: specs/smoke-add-todo.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('할 일 추가 스모크', () => {
  test('Footer, filters and toggle-all appear only after first todo', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    const toggleAll = page.getByLabel('Mark all as complete');
    const count = page.getByTestId('todo-count');
    const linkAll = page.getByRole('link', { name: 'All' });
    const linkActive = page.getByRole('link', { name: 'Active' });
    const linkCompleted = page.getByRole('link', { name: 'Completed' });

    await page.goto('/todomvc/');
    await expect(input).toBeVisible();

    // 1. 시작 상태: 빈 목록. 페이지 상태를 확인한다.
    await expect(toggleAll).toHaveCount(0);
    await expect(count).toHaveCount(0);
    await expect(linkAll).toHaveCount(0);
    await expect(linkActive).toHaveCount(0);
    await expect(linkCompleted).toHaveCount(0);

    // 2. 'buy milk' 를 추가한다.
    await input.fill('buy milk');
    await input.press('Enter');

    await expect(toggleAll).toBeVisible();
    await expect(count).toHaveText('1 item left');
    await expect(linkAll).toBeVisible();
    await expect(linkActive).toBeVisible();
    await expect(linkCompleted).toBeVisible();
    await expect(page.getByRole('button', { name: 'Clear completed' })).toHaveCount(0);
  });
});
