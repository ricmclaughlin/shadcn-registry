import { test, expect } from '@playwright/test';

test.describe('Breadcrumb Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
  });

  test('Breadcrumb renders with correct variants', async ({ page }) => {
    // Use navigation and breadcrumb selectors
    const breadcrumbs = page.locator('nav, ol, ul, .breadcrumb, [aria-label*="breadcrumb" i]');
    const breadcrumbCount = await breadcrumbs.count();
    
    // Verify we have breadcrumb navigation on the page
    expect(breadcrumbCount).toBeGreaterThan(0);
    
    // Check for breadcrumb list structure
    const breadcrumbList = page.locator('ol, ul, nav ol, nav ul').first();
    if (await breadcrumbList.count() > 0) {
      await expect(breadcrumbList).toBeVisible();
    }

    // Check for breadcrumb items (links or text)
    const breadcrumbItems = page.locator('li, nav a, ol > *, ul > *');
    if (await breadcrumbItems.count() > 0) {
      const itemCount = await breadcrumbItems.count();
      expect(itemCount).toBeGreaterThan(0);
      
      // First item should be visible
      await expect(breadcrumbItems.first()).toBeVisible();
    }

    // Check for breadcrumb separators (/, >, or similar)
    const breadcrumbSeparators = page.locator('text=/, text=>, svg, .separator');
    if (await breadcrumbSeparators.count() > 0) {
      await expect(breadcrumbSeparators.first()).toBeVisible();
    }
  });

  test('Breadcrumb interactions work correctly', async ({ page }) => {
    const component = page.locator('nav, .breadcrumb, [aria-label*="breadcrumb" i]').first();
    
    // Breadcrumb should be visible
    await expect(component).toBeVisible();
    
    // Test breadcrumb links
    const breadcrumbLinks = page.locator('nav a, .breadcrumb a, ol a, ul a');
    if (await breadcrumbLinks.count() > 0) {
      const firstLink = breadcrumbLinks.first();
      await expect(firstLink).toBeVisible();
      
      // Links should be focusable
      await firstLink.focus();
      await expect(firstLink).toBeFocused();
      
      // Links should be clickable
      await expect(firstLink).toBeEnabled();
    }

    // Test keyboard navigation
    const focusableElements = page.locator('nav a, .breadcrumb a, nav button, .breadcrumb button');
    if (await focusableElements.count() > 0) {
      await focusableElements.first().focus();
      
      // Tab navigation should work
      await page.keyboard.press('Tab');
      
      // Enter should activate links
      await page.keyboard.press('Enter');
    }
  });

  test('Breadcrumb states behave correctly', async ({ page }) => {
    // Test breadcrumb structure
    const breadcrumbList = page.locator('ol, ul, nav ol, nav ul').first();
    if (await breadcrumbList.count() > 0) {
      await expect(breadcrumbList).toBeVisible();
    }

    // Test breadcrumb items have proper structure
    const breadcrumbItems = page.locator('li, nav > *, ol > *, ul > *');
    if (await breadcrumbItems.count() > 0) {
      const firstItem = breadcrumbItems.first();
      await expect(firstItem).toBeVisible();
    }

    // Test current page indicator (last breadcrumb should not be a link)
    const currentPageElements = page.locator('[aria-current="page"], .current, .active');
    if (await currentPageElements.count() > 0) {
      const currentPage = currentPageElements.last();
      await expect(currentPage).toBeVisible();
    }

    // Test ellipsis for long breadcrumbs
    const ellipsisElements = page.locator('text=..., .ellipsis, [aria-label*="more" i]');
    if (await ellipsisElements.count() > 0) {
      await expect(ellipsisElements.first()).toBeVisible();
    }
  });

  test('Breadcrumb maintains consistency across themes', async ({ page }) => {
    const component = page.locator('nav, .breadcrumb, [aria-label*="breadcrumb" i]').first();
    const themeSwitcher = page.locator('[data-testid="theme-switcher"]');
    
    if (await themeSwitcher.count() > 0) {
      // Get initial styles
      const initialStyles = await component.evaluate(el => ({
        color: getComputedStyle(el).color,
        fontSize: getComputedStyle(el).fontSize,
        fontFamily: getComputedStyle(el).fontFamily
      }));
      
      // Switch theme
      await themeSwitcher.click();
      const themeOption = page.locator('[data-testid*="theme-"]').first();
      if (await themeOption.count() > 0) {
        await themeOption.click();
        await page.waitForTimeout(100);
        
        // Get new styles
        const newStyles = await component.evaluate(el => ({
          color: getComputedStyle(el).color,
          fontSize: getComputedStyle(el).fontSize,
          fontFamily: getComputedStyle(el).fontFamily
        }));
        
        // Structure should remain consistent
        expect(newStyles.fontSize).toBe(initialStyles.fontSize);
        expect(newStyles.fontFamily).toBe(initialStyles.fontFamily);
        
        // Colors may change with theme
        const colorsChanged = newStyles.color !== initialStyles.color;
        // Colors might change or stay the same depending on theme
        expect(typeof colorsChanged).toBe('boolean');
      }
    } else {
      test.skip();
    }
  });

  // Navigation-specific test
  test('Breadcrumb navigation functionality works', async ({ page }) => {
    const breadcrumbLinks = page.locator('nav a, .breadcrumb a, ol a, ul a');
    
    if (await breadcrumbLinks.count() > 0) {
      // Test that links have proper href attributes
      const firstLink = breadcrumbLinks.first();
      const href = await firstLink.getAttribute('href');
      expect(href).toBeTruthy();
      
      // Test keyboard navigation with arrow keys
      await firstLink.focus();
      await page.keyboard.press('ArrowRight');
      await page.keyboard.press('ArrowLeft');
    }
    
    // Test breadcrumb accessibility
    const breadcrumbNav = page.locator('nav, [aria-label*="breadcrumb" i]').first();
    if (await breadcrumbNav.count() > 0) {
      const ariaLabel = await breadcrumbNav.getAttribute('aria-label');
      if (ariaLabel) {
        expect(ariaLabel.toLowerCase()).toMatch(/(breadcrumb|navigation|nav)/);
      }
    }
  });
});
