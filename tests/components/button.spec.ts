import { test, expect } from '@playwright/test';

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
  });

  test('Button renders with correct variants', async ({ page }) => {
    // Use more specific selectors or check that buttons exist
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    
    // Verify we have buttons on the page
    expect(buttonCount).toBeGreaterThan(0);
    
    // Check for specific button variants by looking for the first occurrence
    const defaultButton = page.locator('button:has-text("Default")').first();
    const secondaryButton = page.locator('button:has-text("Secondary")').first();
    const destructiveButton = page.locator('button:has-text("Destructive")').first();
    
    await expect(defaultButton).toBeVisible();
    await expect(secondaryButton).toBeVisible();
    await expect(destructiveButton).toBeVisible();
  });

  test('Button click interactions work', async ({ page }) => {
    const button = page.locator('button').first();
    
    // Button should be clickable
    await expect(button).toBeEnabled();
    
    // Click should work
    await button.click();
    
    // Button should still be present after click
    await expect(button).toBeVisible();
  });

  test('Disabled button behaves correctly', async ({ page }) => {
    // Look for disabled button (if present on the page)
    const disabledButton = page.locator('button[disabled]').first();
    
    if (await disabledButton.count() > 0) {
      await expect(disabledButton).toBeDisabled();
      
      // Disabled button should not be clickable
      await expect(disabledButton).not.toBeEnabled();
    } else {
      // Skip test if no disabled buttons found
      test.skip();
    }
  });

  test('Button maintains consistent styling across themes', async ({ page }) => {
    // Test with different themes if theme switcher is available
    const themeSwitcher = page.locator('[data-testid="theme-switcher"]');
    
    if (await themeSwitcher.count() > 0) {
      const button = page.locator('button').first();
      
      // Get initial button styles
      const initialStyles = await button.evaluate(el => ({
        backgroundColor: getComputedStyle(el).backgroundColor,
        color: getComputedStyle(el).color,
        borderRadius: getComputedStyle(el).borderRadius
      }));
      
      // Switch theme
      await themeSwitcher.click();
      const themeOption = page.locator('[data-testid*="theme-"]').first();
      if (await themeOption.count() > 0) {
        await themeOption.click();
        
        // Wait for theme change
        await page.waitForTimeout(100);
        
        // Get new button styles
        const newStyles = await button.evaluate(el => ({
          backgroundColor: getComputedStyle(el).backgroundColor,
          color: getComputedStyle(el).color,
          borderRadius: getComputedStyle(el).borderRadius
        }));
        
        // Colors should change with theme, but structure should remain
        expect(newStyles.borderRadius).toBe(initialStyles.borderRadius);
        // Background or text color should be different
        const colorsChanged = 
          newStyles.backgroundColor !== initialStyles.backgroundColor ||
          newStyles.color !== initialStyles.color;
        expect(colorsChanged).toBeTruthy();
      }
    } else {
      // Skip test if no theme switcher found
      test.skip();
    }
  });
});
