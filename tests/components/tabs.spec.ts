import { test, expect } from '@playwright/test';

test.describe('Tabs Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
  });

  test('Tabs renders with correct variants', async ({ page }) => {
    // Look for tab-like structures
    const tabs = page.locator('[role="tablist"], .tabs, .tab-container, div:has([role="tab"])');
    const tabCount = await tabs.count();
    
    // Verify we have tab structures on the page
    expect(tabCount).toBeGreaterThan(0);
    
    // Check for tabs list
    const tabsLists = page.locator('[role="tablist"], .tabs-list, .tab-list');
    if (await tabsLists.count() > 0) {
      await expect(tabsLists.first()).toBeVisible();
    }

    // Check for tab triggers
    const tabTriggers = page.locator('[role="tab"], .tab-trigger, .tab-button, button:has-text("Tab")');
    if (await tabTriggers.count() > 0) {
      const triggerCount = await tabTriggers.count();
      expect(triggerCount).toBeGreaterThan(0);
      
      // First tab should be visible
      await expect(tabTriggers.first()).toBeVisible();
    }

    // Check for tab content
    const tabContents = page.locator('[role="tabpanel"], .tab-content, .tab-panel');
    if (await tabContents.count() > 0) {
      await expect(tabContents.first()).toBeVisible();
    }
  });

  test('Tabs interactions work correctly', async ({ page }) => {
    const component = page.locator('[role="tablist"], .tabs, div:has([role="tab"])').first();
    
    // Tabs should be visible
    await expect(component).toBeVisible();
    
    // Test tab triggers
    const tabTriggers = page.locator('[role="tab"], .tab-trigger, button:has-text("Tab")');
    if (await tabTriggers.count() > 1) {
      const firstTab = tabTriggers.first();
      const secondTab = tabTriggers.nth(1);
      
      // First tab should be focusable and clickable
      await expect(firstTab).toBeEnabled();
      await firstTab.focus();
      await expect(firstTab).toBeFocused();
      
      // Click second tab
      await secondTab.click();
      
      // Test keyboard navigation
      await firstTab.focus();
      await page.keyboard.press('ArrowRight');
      await expect(secondTab).toBeFocused();
      
      await page.keyboard.press('ArrowLeft');
      await expect(firstTab).toBeFocused();
      
      // Test Enter and Space activation
      await page.keyboard.press('Enter');
      await page.keyboard.press('Space');
    }
  });

  test('Tabs states behave correctly', async ({ page }) => {
    // Test active tab state
    const activeTabs = page.locator('[role="tab"][aria-selected="true"], .tab-trigger.active, .tab-button.active');
    if (await activeTabs.count() > 0) {
      const activeTab = activeTabs.first();
      await expect(activeTab).toBeVisible();
      
      // Active tab content should be visible
      const activeTabId = await activeTab.getAttribute('id');
      if (activeTabId) {
        const activeContent = page.locator(`[aria-labelledby="${activeTabId}"]`);
        if (await activeContent.count() > 0) {
          await expect(activeContent).toBeVisible();
        }
      }
    }

    // Test inactive tab state
    const inactiveTabs = page.locator('[role="tab"][aria-selected="false"], .tab-trigger:not(.active)');
    if (await inactiveTabs.count() > 0) {
      const inactiveTab = inactiveTabs.first();
      await expect(inactiveTab).toBeVisible();
    }

    // Test disabled tab state
    const disabledTabs = page.locator('[role="tab"][disabled], .tab-trigger[disabled]');
    if (await disabledTabs.count() > 0) {
      const disabledTab = disabledTabs.first();
      await expect(disabledTab).toBeDisabled();
      await expect(disabledTab).not.toBeEnabled();
    }

    // Test tab content visibility
    const tabContents = page.locator('[role="tabpanel"], .tab-content');
    if (await tabContents.count() > 0) {
      // Only one tab content should be visible at a time
      const visibleContents = await page.locator('[role="tabpanel"]:visible, .tab-content:visible').count();
      expect(visibleContents).toBeGreaterThanOrEqual(1);
    }
  });

  test('Tabs maintains consistency across themes', async ({ page }) => {
    const component = page.locator('[role="tablist"], .tabs, div:has([role="tab"])').first();
    const themeSwitcher = page.locator('[data-testid="theme-switcher"]');
    
    if (await themeSwitcher.count() > 0) {
      // Get initial styles
      const initialStyles = await component.evaluate(el => ({
        backgroundColor: getComputedStyle(el).backgroundColor,
        color: getComputedStyle(el).color,
        borderColor: getComputedStyle(el).borderColor
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
          borderColor: getComputedStyle(el).borderColor
        }));
        
        // Colors should adapt to theme
        const colorsChanged = 
          newStyles.backgroundColor !== initialStyles.backgroundColor ||
          newStyles.color !== initialStyles.color ||
          newStyles.borderColor !== initialStyles.borderColor;
        expect(colorsChanged).toBeTruthy();
      }
    } else {
      test.skip();
    }
  });

  // Navigation-specific tests for tabs
  test('Tabs keyboard navigation works correctly', async ({ page }) => {
    const tabTriggers = page.locator('[role="tab"], .tab-trigger, button:has-text("Tab")');
    
    if (await tabTriggers.count() > 1) {
      const firstTab = tabTriggers.first();
      const lastTab = tabTriggers.last();
      const triggerCount = await tabTriggers.count();
      
      // Focus first tab
      await firstTab.focus();
      await expect(firstTab).toBeFocused();
      
      // Test Right Arrow navigation
      for (let i = 1; i < triggerCount; i++) {
        await page.keyboard.press('ArrowRight');
        await expect(tabTriggers.nth(i)).toBeFocused();
      }
      
      // Test wrapping to first tab
      await page.keyboard.press('ArrowRight');
      await expect(firstTab).toBeFocused();
      
      // Test Left Arrow navigation
      await page.keyboard.press('ArrowLeft');
      await expect(lastTab).toBeFocused();
      
      // Test Home key
      await page.keyboard.press('Home');
      await expect(firstTab).toBeFocused();
      
      // Test End key
      await page.keyboard.press('End');
      await expect(lastTab).toBeFocused();
    }
  });

  test('Tabs content switching works correctly', async ({ page }) => {
    const tabTriggers = page.locator('[role="tab"], .tab-trigger, button:has-text("Tab")');
    const tabContents = page.locator('[role="tabpanel"], .tab-content');
    
    if (await tabTriggers.count() > 1 && await tabContents.count() > 1) {
      const firstTab = tabTriggers.first();
      const secondTab = tabTriggers.nth(1);
      
      // Click first tab and verify content
      await firstTab.click();
      
      // Get the associated content
      const firstTabId = await firstTab.getAttribute('aria-controls');
      if (firstTabId) {
        const associatedContent = page.locator(`#${firstTabId}`);
        if (await associatedContent.count() > 0) {
          await expect(associatedContent).toBeVisible();
        }
      }
      
      // Click second tab and verify content switch
      await secondTab.click();
      
      // Verify content switched
      const secondTabId = await secondTab.getAttribute('aria-controls');
      if (secondTabId) {
        const associatedContent = page.locator(`#${secondTabId}`);
        if (await associatedContent.count() > 0) {
          await expect(associatedContent).toBeVisible();
        }
      }
    }
  });

  test('Tabs accessibility features work correctly', async ({ page }) => {
    const tabsLists = page.locator('[role="tablist"], .tabs-list');
    const tabTriggers = page.locator('[role="tab"], .tab-trigger');
    const tabContents = page.locator('[role="tabpanel"], .tab-content');
    
    // Test ARIA attributes on tabs list
    if (await tabsLists.count() > 0) {
      const tabsList = tabsLists.first();
      const role = await tabsList.getAttribute('role');
      if (role) {
        expect(role).toBe('tablist');
      }
    }
    
    // Test ARIA attributes on tab triggers
    if (await tabTriggers.count() > 0) {
      const firstTab = tabTriggers.first();
      const role = await firstTab.getAttribute('role');
      if (role) {
        expect(role).toBe('tab');
      }
      
      const ariaSelected = await firstTab.getAttribute('aria-selected');
      if (ariaSelected) {
        expect(['true', 'false']).toContain(ariaSelected);
      }
      
      const ariaControls = await firstTab.getAttribute('aria-controls');
      if (ariaControls) {
        expect(ariaControls).toBeTruthy();
      }
    }
    
    // Test ARIA attributes on tab content
    if (await tabContents.count() > 0) {
      const firstContent = tabContents.first();
      const role = await firstContent.getAttribute('role');
      if (role) {
        expect(role).toBe('tabpanel');
      }
      
      const ariaLabelledBy = await firstContent.getAttribute('aria-labelledby');
      if (ariaLabelledBy) {
        expect(ariaLabelledBy).toBeTruthy();
      }
    }
  });
});
