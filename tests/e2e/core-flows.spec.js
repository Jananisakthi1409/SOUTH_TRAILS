import { expect, test } from "@playwright/test";

test("browse package details and reach booking form", async ({ page }) => {
  await page.goto("/tamil-nadu-package/ooty-family-escape");

  await expect(page.getByRole("heading", { name: /ooty/i })).toBeVisible();
  await expect(page.getByLabel(/number of travelers/i)).toBeVisible();

  await page.getByLabel(/number of travelers/i).fill("3");
  await expect(page.getByText(/rs\./i).last()).toBeVisible();
});

test("admin workspace pages load", async ({ page }) => {
  await page.goto("/admin/login");

  await expect(page.getByRole("heading", { name: /south trails admin/i })).toBeVisible();
  await page.getByLabel(/corporate email address/i).fill("admin@southtrails.com");
  await page.getByLabel(/secure access password/i).fill("admin123");
  await page.getByRole("button", { name: /sign into admin workspace/i }).click();

  await expect(page).toHaveURL(/\/admin\/dashboard/);
  await page.goto("/admin/ecosystem");
  await expect(page.getByRole("heading", { name: /ecosystem management/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /guides/i })).toBeVisible();
});

test("admin workspace redirects unauthenticated visitors", async ({ page }) => {
  await page.goto("/admin/dashboard");
  await expect(page).toHaveURL(/\/admin\/login/);

  await page.goto("/admin/bookings");
  await expect(page).toHaveURL(/\/admin\/login/);

  await page.goto("/admin/analytics");
  await expect(page).toHaveURL(/\/admin\/login/);
});

test("browse package, submit booking after signup, and view admin bookings", async ({ page }) => {
  const unique = Date.now();
  const email = `traveler${unique}@example.com`;

  await page.goto("/tamil-nadu-package/ooty-family-escape");
  await expect(page.getByRole("heading", { name: /ooty/i })).toBeVisible();

  await page.getByLabel(/number of travelers/i).fill("2");
  await page.getByLabel(/travel date/i).fill("2026-12-20");
  await page.getByLabel(/full name/i).fill("Flow Traveler");
  await page.getByLabel(/^email$/i).fill(email);
  await page.getByLabel(/phone/i).fill("+91 9876543210");
  await page.getByRole("button", { name: /proceed to booking/i }).click();

  await expect(page).toHaveURL(/\/signup/);
  await page.locator("#fullName").fill("Flow Traveler");
  await page.locator("#phone").fill("+91 9876543210");
  await page.locator("#email").fill(email);
  await page.locator("#address").fill("Chennai");
  await page.locator("#password").fill("secret1");
  await page.locator("#confirmPassword").fill("secret1");
  await page.getByLabel(/terms/i).check();
  await page.getByRole("button", { name: /get my travel pass/i }).click();

  await expect(page).toHaveURL(/\/booking-success\/BK-/, { timeout: 8_000 });
  await expect(page.getByRole("heading", { name: /journey is reserved/i })).toBeVisible();
  await expect(page.getByText(/ooty family escape/i).first()).toBeVisible();

  await page.getByRole("link", { name: /view my bookings/i }).click();
  await expect(page).toHaveURL(/\/profile\/bookings/);
  await expect(page.getByRole("heading", { name: /my bookings/i })).toBeVisible();

  await page.goto("/admin/login");
  await page.getByLabel(/corporate email address/i).fill("admin@southtrails.com");
  await page.getByLabel(/secure access password/i).fill("admin123");
  await page.getByRole("button", { name: /sign into admin workspace/i }).click();

  await expect(page).toHaveURL(/\/admin\/dashboard/);
  await page.goto("/admin/bookings");
  await expect(page.getByText(/flow traveler/i).first()).toBeVisible();
  await expect(page.getByText(/ooty family escape/i).first()).toBeVisible();
});
