import { test, expect } from '@playwright/test';

const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 }
};

test.describe('Button Responsive Design', () => {
  Object.entries(viewports).forEach(([device, viewport]) => {
    test(`Button displays correctly on ${device}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('/components');
      
      const buttons = page.locator('button');
      const count = await buttons.count();
      
      for (let i = 0; i < count; i++) {
        const button = buttons.nth(i);
        const box = await button.boundingBox();
        
        if (box) {
          // Button should be visible
          expect(box.width).toBeGreaterThan(0);
          expect(box.height).toBeGreaterThan(0);
          
          // On mobile, touch targets should be at least 44px
          if (device === 'mobile') {
            expect(box.height).toBeGreaterThanOrEqual(44);
            // Width can be smaller for text buttons, but clickable area should be adequate
            expect(box.width).toBeGreaterThanOrEqual(44);
          }
          
          // Button text should not overflow
          const hasOverflow = await button.evaluate(el => {
            return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight;
          });
          expect(hasOverflow).toBeFalsy();
        }
      }
    });
  });

  test('Button text scales appropriately across devices', async ({ page }) => {
    const measurements = {};
    
    for (const [device, viewport] of Object.entries(viewports)) {
      await page.setViewportSize(viewport);
      await page.goto('/components');
      
      const button = page.locator('button').first();
      const fontSize = await button.evaluate(el => {
        return getComputedStyle(el).fontSize;
      });
      
      measurements[device] = parseFloat(fontSize);
    }
    
    // Font sizes should be reasonable across devices
    expect(measurements.mobile).toBeGreaterThanOrEqual(14); // Minimum readable size
    expect(measurements.tablet).toBeGreaterThanOrEqual(14);
    expect(measurements.desktop).toBeGreaterThanOrEqual(14);
    
    // Desktop shouldn't be dramatically larger than mobile
    expect(measurements.desktop / measurements.mobile).toBeLessThanOrEqual(1.5);
  });

  test('Button spacing adapts to screen size', async ({ page }) => {
    for (const [device, viewport] of Object.entries(viewports)) {
      await page.setViewportSize(viewport);
      await page.goto('/components');
      
      // Check button padding
      const button = page.locator('button').first();
      const padding = await button.evaluate(el => {
        const styles = getComputedStyle(el);
        return {
          top: parseFloat(styles.paddingTop),
          right: parseFloat(styles.paddingRight),
          bottom: parseFloat(styles.paddingBottom),
          left: parseFloat(styles.paddingLeft)
        };
      });
      
      // Padding should be reasonable for touch interaction
      if (device === 'mobile') {
        expect(padding.top + padding.bottom).toBeGreaterThanOrEqual(16);
        expect(padding.left + padding.right).toBeGreaterThanOrEqual(16);
      }
    }
  });
});
