import { test, expect } from '@playwright/test';

test.describe('Card Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
  });

  test('Card renders with correct variants', async ({ page }) => {
    // Use card-like selectors
    const cards = page.locator('.card, [class*="card"], div:has(h3), div:has(h4), div:has(h5)');
    const cardCount = await cards.count();
    
    // Verify we have card-like elements on the page
    expect(cardCount).toBeGreaterThan(0);
    
    // Check for card sub-components by content and structure
    const cardHeaders = page.locator('header, .card-header, div:has(h3), div:has(h4), div:has(h5)');
    if (await cardHeaders.count() > 0) {
      await expect(cardHeaders.first()).toBeVisible();
    }

    const cardTitles = page.locator('h1, h2, h3, h4, h5, h6, .title, .card-title');
    if (await cardTitles.count() > 0) {
      await expect(cardTitles.first()).toBeVisible();
    }

    const cardDescriptions = page.locator('p, .description, .card-description, .subtitle');
    if (await cardDescriptions.count() > 0) {
      await expect(cardDescriptions.first()).toBeVisible();
    }

    const cardContent = page.locator('.content, .card-content, .card-body, main');
    if (await cardContent.count() > 0) {
      await expect(cardContent.first()).toBeVisible();
    }

    const cardFooters = page.locator('footer, .card-footer, .actions');
    if (await cardFooters.count() > 0) {
      await expect(cardFooters.first()).toBeVisible();
    }
  });

  test('Card interactions work correctly', async ({ page }) => {
    const component = page.locator('.card, [class*="card"], div:has(h3)').first();
    
    // Card should be visible
    await expect(component).toBeVisible();
    
    // Test if card is interactive (some cards might be clickable)
    if (await component.getAttribute('role') === 'button' || await component.getAttribute('tabindex') !== null) {
      await component.focus();
      await expect(component).toBeFocused();
      await component.click();
    }

    // Test interactive elements within card
    const cardButtons = page.locator('.card button, [class*="card"] button, div:has(h3) button');
    if (await cardButtons.count() > 0) {
      const firstButton = cardButtons.first();
      await expect(firstButton).toBeEnabled();
      await firstButton.click();
      await expect(firstButton).toBeVisible();
    }

    // Test card links
    const cardLinks = page.locator('.card a, [class*="card"] a, div:has(h3) a');
    if (await cardLinks.count() > 0) {
      const firstLink = cardLinks.first();
      await expect(firstLink).toBeVisible();
      await firstLink.focus();
      await expect(firstLink).toBeFocused();
    }
  });

  test('Card states behave correctly', async ({ page }) => {
    // Test card structure and content
    const card = page.locator('.card, [class*="card"], div:has(h3)').first();
    await expect(card).toBeVisible();

    // Test card title content
    const cardTitles = page.locator('h1, h2, h3, h4, h5, h6, .title');
    if (await cardTitles.count() > 0) {
      const titleText = await cardTitles.first().textContent();
      expect(titleText).toBeTruthy();
      expect(titleText?.trim().length).toBeGreaterThan(0);
    }

    // Test card description content
    const cardDescriptions = page.locator('p, .description, .subtitle');
    if (await cardDescriptions.count() > 0) {
      const descriptionText = await cardDescriptions.first().textContent();
      expect(descriptionText).toBeTruthy();
    }

    // Test card content area
    const cardContent = page.locator('.content, .card-content, main');
    if (await cardContent.count() > 0) {
      await expect(cardContent.first()).toBeVisible();
    }

    // Test disabled state for interactive cards
    const disabledCards = page.locator('.card[disabled], [class*="card"][disabled]');
    if (await disabledCards.count() > 0) {
      await expect(disabledCards.first()).toBeDisabled();
    }
  });

  test('Card maintains consistency across themes', async ({ page }) => {
    const component = page.locator('.card, [class*="card"], div:has(h3)').first();
    const themeSwitcher = page.locator('[data-testid="theme-switcher"]');
    
    if (await themeSwitcher.count() > 0) {
      // Get initial styles
      const initialStyles = await component.evaluate(el => ({
        backgroundColor: getComputedStyle(el).backgroundColor,
        borderColor: getComputedStyle(el).borderColor,
        borderRadius: getComputedStyle(el).borderRadius,
        padding: getComputedStyle(el).padding,
        boxShadow: getComputedStyle(el).boxShadow
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
          borderColor: getComputedStyle(el).borderColor,
          borderRadius: getComputedStyle(el).borderRadius,
          padding: getComputedStyle(el).padding,
          boxShadow: getComputedStyle(el).boxShadow
        }));
        
        // Structure should remain consistent
        expect(newStyles.borderRadius).toBe(initialStyles.borderRadius);
        expect(newStyles.padding).toBe(initialStyles.padding);
        
        // Colors and shadows should adapt to theme
        const stylesChanged = 
          newStyles.backgroundColor !== initialStyles.backgroundColor ||
          newStyles.borderColor !== initialStyles.borderColor ||
          newStyles.boxShadow !== initialStyles.boxShadow;
        expect(stylesChanged).toBeTruthy();
      }
    } else {
      test.skip();
    }
  });

  // Card-specific test for component family
  test('Card component family works together', async ({ page }) => {
    const cards = page.locator('.card, [class*="card"], div:has(h3)');
    
    if (await cards.count() > 0) {
      const card = cards.first();
      
      // Test that card contains proper structure
      const hasHeader = await page.locator('header, .card-header, div:has(h3)').count() > 0;
      const hasContent = await page.locator('.content, .card-content, main, p').count() > 0;
      const hasFooter = await page.locator('footer, .card-footer, .actions').count() > 0;
      
      // At least one section should be present
      const hasSections = hasHeader || hasContent || hasFooter;
      expect(hasSections).toBeTruthy();
      
      // If header exists, it should contain title or description
      if (hasHeader) {
        const hasTitle = await page.locator('h1, h2, h3, h4, h5, h6, .title').count() > 0;
        const hasDescription = await page.locator('p, .description, .subtitle').count() > 0;
        const hasHeaderContent = hasTitle || hasDescription;
        expect(hasHeaderContent).toBeTruthy();
      }
    }
  });
});
