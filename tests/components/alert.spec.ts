import { test, expect } from '@playwright/test';

test.describe('Alert Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
  });

  test('Alert renders with correct variants', async ({ page }) => {
    // Use content-based selectors to find alerts
    const alerts = page.locator('[role="alert"], .alert, div:has-text("Information"), div:has-text("Warning"), div:has-text("Success"), div:has-text("Error")');
    const alertCount = await alerts.count();
    
    // Verify we have alerts on the page
    expect(alertCount).toBeGreaterThan(0);
    
    // Check for specific alert variants by content or styling
    const infoAlert = page.locator('div:has-text("Information")').first();
    const warningAlert = page.locator('div:has-text("Warning")').first();
    const successAlert = page.locator('div:has-text("Success")').first();
    const errorAlert = page.locator('div:has-text("Error")').first();
    
    // At least one alert should be visible
    const visibleAlerts = [infoAlert, warningAlert, successAlert, errorAlert];
    let foundAlert = false;
    for (const alert of visibleAlerts) {
      if (await alert.count() > 0) {
        await expect(alert).toBeVisible();
        foundAlert = true;
        break;
      }
    }
    expect(foundAlert).toBeTruthy();

    // Check for alert with icon
    const alertWithIcon = page.locator('div:has(svg):has-text("Information"), div:has(svg):has-text("Warning"), div:has(svg):has-text("Success"), div:has(svg):has-text("Error")').first();
    if (await alertWithIcon.count() > 0) {
      await expect(alertWithIcon).toBeVisible();
    }
  });

  test('Alert interactions work correctly', async ({ page }) => {
    const component = page.locator('[role="alert"], .alert, div:has-text("Information"), div:has-text("Warning")').first();
    
    // Alert should be visible and accessible
    await expect(component).toBeVisible();
    
    // Test keyboard focus if alert is focusable
    if (await component.getAttribute('tabindex') !== null) {
      await component.focus();
      await expect(component).toBeFocused();
    }

    // Check for dismissible alerts
    const dismissButton = page.locator('div:has-text("Information") button, div:has-text("Warning") button').first();
    if (await dismissButton.count() > 0) {
      await expect(dismissButton).toBeEnabled();
      await dismissButton.click();
    }
  });

  test('Alert states behave correctly', async ({ page }) => {
    // Test different alert content
    const infoAlert = page.locator('div:has-text("Information")');
    if (await infoAlert.count() > 0) {
      await expect(infoAlert.first()).toBeVisible();
    }
    
    const warningAlert = page.locator('div:has-text("Warning")');
    if (await warningAlert.count() > 0) {
      await expect(warningAlert.first()).toBeVisible();
    }

    const successAlert = page.locator('div:has-text("Success")');
    if (await successAlert.count() > 0) {
      await expect(successAlert.first()).toBeVisible();
    }

    const errorAlert = page.locator('div:has-text("Error")');
    if (await errorAlert.count() > 0) {
      await expect(errorAlert.first()).toBeVisible();
    }

    // Check alert content structure
    const alertTitle = page.locator('h5, .alert-title, [class*="title"]').first();
    if (await alertTitle.count() > 0) {
      await expect(alertTitle).toBeVisible();
    }

    const alertDescription = page.locator('p, .alert-description, [class*="description"]').first();
    if (await alertDescription.count() > 0) {
      await expect(alertDescription).toBeVisible();
    }
  });

  test('Alert maintains consistency across themes', async ({ page }) => {
    const component = page.locator('[role="alert"], .alert, div:has-text("Information")').first();
    const themeSwitcher = page.locator('[data-testid="theme-switcher"]');
    
    if (await themeSwitcher.count() > 0) {
      // Get initial styles
      const initialStyles = await component.evaluate(el => ({
        backgroundColor: getComputedStyle(el).backgroundColor,
        color: getComputedStyle(el).color,
        borderRadius: getComputedStyle(el).borderRadius,
        padding: getComputedStyle(el).padding
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
          padding: getComputedStyle(el).padding
        }));
        
        // Structure should remain consistent
        expect(newStyles.borderRadius).toBe(initialStyles.borderRadius);
        expect(newStyles.padding).toBe(initialStyles.padding);
        
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
