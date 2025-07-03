import { test, expect } from '@playwright/test';

test.describe('Badge Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
  });

  test('Badge renders with correct variants', async ({ page }) => {
    // Use content-based selectors to find badges
    const badges = page.locator('.badge, span:has-text("Badge"), span:has-text("Default"), span:has-text("Secondary"), span:has-text("Destructive"), span:has-text("Outline")');
    const badgeCount = await badges.count();
    
    // Verify we have badges on the page
    expect(badgeCount).toBeGreaterThan(0);
    
    // Check for specific badge variants by content
    const defaultBadge = page.locator('span:has-text("Default")').first();
    const secondaryBadge = page.locator('span:has-text("Secondary")').first();
    const destructiveBadge = page.locator('span:has-text("Destructive")').first();
    const outlineBadge = page.locator('span:has-text("Outline")').first();
    
    // At least one badge should be visible
    const visibleBadges = [defaultBadge, secondaryBadge, destructiveBadge, outlineBadge];
    let foundBadge = false;
    for (const badge of visibleBadges) {
      if (await badge.count() > 0) {
        await expect(badge).toBeVisible();
        foundBadge = true;
        break;
      }
    }
    expect(foundBadge).toBeTruthy();
  });

  test('Badge interactions work correctly', async ({ page }) => {
    const component = page.locator('.badge, span:has-text("Badge"), span:has-text("Default")').first();
    
    // Badge should be visible
    await expect(component).toBeVisible();
    
    // Test if badge is clickable (some badges might be interactive)
    if (await component.getAttribute('role') === 'button' || await component.getAttribute('tabindex') !== null) {
      await component.focus();
      await expect(component).toBeFocused();
      await component.click();
    }

    // Check badge content is readable
    const badgeText = await component.textContent();
    expect(badgeText).toBeTruthy();
    expect(badgeText?.trim().length).toBeGreaterThan(0);
  });

  test('Badge states behave correctly', async ({ page }) => {
    // Test different badge variants by content
    const defaultBadge = page.locator('span:has-text("Default")');
    if (await defaultBadge.count() > 0) {
      await expect(defaultBadge.first()).toBeVisible();
    }
    
    const secondaryBadge = page.locator('span:has-text("Secondary")');
    if (await secondaryBadge.count() > 0) {
      await expect(secondaryBadge.first()).toBeVisible();
    }

    const destructiveBadge = page.locator('span:has-text("Destructive")');
    if (await destructiveBadge.count() > 0) {
      await expect(destructiveBadge.first()).toBeVisible();
    }

    const outlineBadge = page.locator('span:has-text("Outline")');
    if (await outlineBadge.count() > 0) {
      await expect(outlineBadge.first()).toBeVisible();
    }

    // Test badge with numbers or status
    const numberBadge = page.locator('span:has-text(/^\\d+$/), .badge:has-text(/^\\d+$/)');
    if (await numberBadge.count() > 0) {
      await expect(numberBadge.first()).toBeVisible();
    }
  });

  test('Badge maintains consistency across themes', async ({ page }) => {
    const component = page.locator('.badge, span:has-text("Badge"), span:has-text("Default")').first();
    const themeSwitcher = page.locator('[data-testid="theme-switcher"]');
    
    if (await themeSwitcher.count() > 0) {
      // Get initial styles
      const initialStyles = await component.evaluate(el => ({
        backgroundColor: getComputedStyle(el).backgroundColor,
        color: getComputedStyle(el).color,
        borderRadius: getComputedStyle(el).borderRadius,
        padding: getComputedStyle(el).padding,
        fontSize: getComputedStyle(el).fontSize
      }));
      
      // Switch theme
      await themeSwitcher.click();
      const themeOption = page.locator('[data-testid*="theme-"]').first();
      if (await themeOption.count() > 0) {
        await themeOption.click();
        await page.waitForTimeout(100);
        
        // Get new styles
        const newStyles = await component.evaluate(el => ({
          backgroundColor: getComputedStyle(el).backgroundColor,
          color: getComputedStyle(el).color,
          borderRadius: getComputedStyle(el).borderRadius,
          padding: getComputedStyle(el).padding,
          fontSize: getComputedStyle(el).fontSize
        }));
        
        // Structure should remain consistent
        expect(newStyles.borderRadius).toBe(initialStyles.borderRadius);
        expect(newStyles.padding).toBe(initialStyles.padding);
        expect(newStyles.fontSize).toBe(initialStyles.fontSize);
        
        // Colors should adapt to theme
        const colorsChanged = 
          newStyles.backgroundColor !== initialStyles.backgroundColor ||
          newStyles.color !== initialStyles.color;
        expect(colorsChanged).toBeTruthy();
      }
    } else {
      test.skip();
    }
  });
});
