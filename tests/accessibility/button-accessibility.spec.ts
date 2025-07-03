import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('Button Accessibility (WCAG 2.1 AA)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
  });

  test('Button component meets WCAG 2.1 AA standards', async ({ page }) => {
    // Inject axe-core for accessibility testing
    await injectAxe(page);
    
    // Test the button section specifically
    await checkA11y(page, '[data-testid="button-examples"]', {
      detailedReport: true,
      tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
      rules: {
        'color-contrast': { enabled: true },
        'keyboard-navigation': { enabled: true },
        'focus-visible': { enabled: true }
      }
    });
  });

  test('Button keyboard navigation works correctly', async ({ page }) => {
    // Find the first button
    const firstButton = page.locator('button').first();
    
    // Tab to the button
    await page.keyboard.press('Tab');
    await expect(firstButton).toBeFocused();
    
    // Press Enter to activate
    await page.keyboard.press('Enter');
    
    // Button should still be focusable after interaction
    await expect(firstButton).toBeFocused();
  });

  test('Button has proper ARIA attributes', async ({ page }) => {
    const buttons = page.locator('button');
    const count = await buttons.count();
    
    for (let i = 0; i < count; i++) {
      const button = buttons.nth(i);
      
      // Button should have accessible text (either text content or aria-label)
      const hasText = await button.textContent();
      const hasAriaLabel = await button.getAttribute('aria-label');
      
      expect(hasText || hasAriaLabel).toBeTruthy();
      
      // Disabled buttons should have aria-disabled
      const isDisabled = await button.getAttribute('disabled');
      if (isDisabled !== null) {
        await expect(button).toHaveAttribute('aria-disabled', 'true');
      }
    }
  });

  test('Button focus indicators are visible', async ({ page }) => {
    const button = page.locator('button').first();
    
    // Focus the button
    await button.focus();
    
    // Check that focus styles are applied
    const focusStyles = await button.evaluate(el => {
      const styles = getComputedStyle(el);
      return {
        outline: styles.outline,
        outlineWidth: styles.outlineWidth,
        boxShadow: styles.boxShadow
      };
    });
    
    // Should have some form of focus indicator
    const hasFocusIndicator = 
      focusStyles.outline !== 'none' || 
      focusStyles.outlineWidth !== '0px' || 
      focusStyles.boxShadow !== 'none';
    
    expect(hasFocusIndicator).toBeTruthy();
  });
});
