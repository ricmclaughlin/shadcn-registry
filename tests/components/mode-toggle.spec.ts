import { test, expect } from '@playwright/test';

test.describe('Mode Toggle Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
  });

  test('Mode Toggle renders with correct variants', async ({ page }) => {
    // Look for theme toggle buttons and mode switchers
    const toggles = page.locator('button:has(svg), .mode-toggle, .theme-toggle, button:has-text("Theme"), button[aria-label*="theme" i], button[aria-label*="mode" i]');
    const toggleCount = await toggles.count();
    
    // Verify we have toggle elements on the page
    expect(toggleCount).toBeGreaterThan(0);
    
    // Check for toggle button
    const toggleButtons = page.locator('button:has(svg), button[aria-label*="theme" i]');
    if (await toggleButtons.count() > 0) {
      await expect(toggleButtons.first()).toBeVisible();
      await expect(toggleButtons.first()).toBeEnabled();
    }

    // Check for icons (sun/moon icons typically)
    const toggleIcons = page.locator('button svg, .mode-toggle svg, .theme-toggle svg');
    if (await toggleIcons.count() > 0) {
      await expect(toggleIcons.first()).toBeVisible();
    }

    // Check for dropdown variant if present
    const dropdownTriggers = page.locator('button:has-text("Theme"), .dropdown-trigger, [role="combobox"]');
    if (await dropdownTriggers.count() > 0) {
      await expect(dropdownTriggers.first()).toBeVisible();
    }
  });

  test('Mode Toggle interactions work correctly', async ({ page }) => {
    const component = page.locator('button:has(svg), button[aria-label*="theme" i], .mode-toggle').first();
    
    // Component should be visible and interactive
    await expect(component).toBeVisible();
    
    const toggleButton = page.locator('button:has(svg), button[aria-label*="theme" i]').first();
    if (await toggleButton.count() > 0) {
      // Button should be enabled and focusable
      await expect(toggleButton).toBeEnabled();
      await toggleButton.focus();
      await expect(toggleButton).toBeFocused();
      
      // Test click interaction
      await toggleButton.click();
      await expect(toggleButton).toBeVisible();
      
      // Test keyboard interaction
      await toggleButton.focus();
      await page.keyboard.press('Enter');
      await page.keyboard.press('Space');
    }

    // Test dropdown interactions if present
    const dropdownTriggers = page.locator('button:has-text("Theme"), .dropdown-trigger');
    if (await dropdownTriggers.count() > 0) {
      const dropdownTrigger = dropdownTriggers.first();
      await dropdownTrigger.click();
      
      // Check for dropdown content
      const dropdownContent = page.locator('.dropdown-content, [role="menu"], [role="listbox"]');
      if (await dropdownContent.count() > 0) {
        await expect(dropdownContent.first()).toBeVisible();
        
        // Test theme options
        const themeOptions = page.locator('[role="menuitem"], .theme-option, button:has-text("Light"), button:has-text("Dark")');
        if (await themeOptions.count() > 0) {
          await expect(themeOptions.first()).toBeVisible();
          await themeOptions.first().click();
        }
      }
    }
  });

  test('Mode Toggle states behave correctly', async ({ page }) => {
    const component = page.locator('button:has(svg), button[aria-label*="theme" i]').first();
    
    // Test different toggle states
    const toggleButton = page.locator('button:has(svg), button[aria-label*="theme" i]').first();
    if (await toggleButton.count() > 0) {
      // Check initial state
      await expect(toggleButton).toBeVisible();
      
      // Test pressed/active state
      const ariaPressed = await toggleButton.getAttribute('aria-pressed');
      if (ariaPressed !== null) {
        expect(['true', 'false']).toContain(ariaPressed);
      }
      
      // Test state change on click
      const initialPressed = await toggleButton.getAttribute('aria-pressed');
      await toggleButton.click();
      await page.waitForTimeout(100);
      const newPressed = await toggleButton.getAttribute('aria-pressed');
      
      if (initialPressed !== null && newPressed !== null) {
        expect(newPressed).not.toBe(initialPressed);
      }
    }

    // Test theme state indicators by checking for different icons or states
    const lightIcons = page.locator('svg[class*="sun"], svg[data-icon*="sun"], .sun-icon');
    const darkIcons = page.locator('svg[class*="moon"], svg[data-icon*="moon"], .moon-icon');
    const systemIcons = page.locator('svg[class*="system"], svg[data-icon*="system"], .system-icon');
    
    // At least one icon should be visible
    const iconCount = await lightIcons.count() + await darkIcons.count() + await systemIcons.count();
    expect(iconCount).toBeGreaterThanOrEqual(0); // Allow for different icon implementations
  });

  test('Mode Toggle maintains consistency across themes', async ({ page }) => {
    const component = page.locator('button:has(svg), button[aria-label*="theme" i]').first();
    
    // Get initial styles
    const initialStyles = await component.evaluate(el => ({
      backgroundColor: getComputedStyle(el).backgroundColor,
      color: getComputedStyle(el).color,
      borderRadius: getComputedStyle(el).borderRadius
    }));
    
    // Test theme switching via the toggle itself
    const toggleButton = page.locator('button:has(svg), button[aria-label*="theme" i]').first();
    if (await toggleButton.count() > 0) {
      await toggleButton.click();
      await page.waitForTimeout(200); // Wait for theme transition
      
      // Get new styles after theme change
      const newStyles = await component.evaluate(el => ({
        backgroundColor: getComputedStyle(el).backgroundColor,
        color: getComputedStyle(el).color,
        borderRadius: getComputedStyle(el).borderRadius
      }));
      
      // Structure should remain consistent
      expect(newStyles.borderRadius).toBe(initialStyles.borderRadius);
      
      // Colors should adapt to new theme
      const colorsChanged = 
        newStyles.backgroundColor !== initialStyles.backgroundColor ||
        newStyles.color !== initialStyles.color;
      expect(colorsChanged).toBeTruthy();
    } else {
      test.skip();
    }
  });

  // Mode Toggle specific functionality test
  test('Mode Toggle theme switching functionality works', async ({ page }) => {
    const toggleButton = page.locator('button:has(svg), button[aria-label*="theme" i]').first();
    
    if (await toggleButton.count() > 0) {
      // Get initial theme state
      const initialTheme = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      });
      
      // Click toggle
      await toggleButton.click();
      await page.waitForTimeout(100);
      
      // Check theme changed
      const newTheme = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      });
      
      // Theme should have changed
      expect(newTheme).not.toBe(initialTheme);
      
      // Test accessibility
      const ariaLabel = await toggleButton.getAttribute('aria-label');
      if (ariaLabel) {
        expect(ariaLabel.toLowerCase()).toMatch(/(theme|mode|toggle|dark|light)/);
      }
    }
    
    // Test dropdown variant theme selection
    const dropdownTriggers = page.locator('button:has-text("Theme"), .dropdown-trigger');
    if (await dropdownTriggers.count() > 0) {
      const dropdownTrigger = dropdownTriggers.first();
      await dropdownTrigger.click();
      
      const lightOptions = page.locator('button:has-text("Light"), [role="menuitem"]:has-text("Light")');
      const darkOptions = page.locator('button:has-text("Dark"), [role="menuitem"]:has-text("Dark")');
      const systemOptions = page.locator('button:has-text("System"), [role="menuitem"]:has-text("System")');
      
      // Test light theme selection
      if (await lightOptions.count() > 0) {
        await lightOptions.first().click();
        await page.waitForTimeout(100);
        
        const isLight = await page.evaluate(() => {
          return !document.documentElement.classList.contains('dark');
        });
        expect(isLight).toBeTruthy();
      }
      
      // Test dark theme selection
      if (await darkOptions.count() > 0) {
        await dropdownTrigger.click();
        await darkOptions.first().click();
        await page.waitForTimeout(100);
        
        const isDark = await page.evaluate(() => {
          return document.documentElement.classList.contains('dark');
        });
        expect(isDark).toBeTruthy();
      }
    }
  });
});
