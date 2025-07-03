import { test, expect } from '@playwright/test';

test.describe('Input Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
  });

  test('Input renders with correct variants', async ({ page }) => {
    // Use input selectors
    const inputs = page.locator('input');
    const inputCount = await inputs.count();
    
    // Verify we have inputs on the page
    expect(inputCount).toBeGreaterThan(0);
    
    // Test different input types
    const inputTypes = ['text', 'email', 'password', 'number'];
    for (const type of inputTypes) {
      const typeElement = page.locator(`input[type="${type}"]`);
      if (await typeElement.count() > 0) {
        await expect(typeElement.first()).toBeVisible();
      }
    }

    // Check for input with label
    const inputLabels = page.locator('label');
    if (await inputLabels.count() > 0) {
      await expect(inputLabels.first()).toBeVisible();
    }
  });

  test('Input interactions work correctly', async ({ page }) => {
    const component = page.locator('input').first();
    
    // Input should be visible and enabled
    await expect(component).toBeVisible();
    await expect(component).toBeEnabled();
    
    // Test focus
    await component.focus();
    await expect(component).toBeFocused();
    
    // Test typing
    await component.fill('test input');
    await expect(component).toHaveValue('test input');
    
    // Test clearing
    await component.fill('');
    await expect(component).toHaveValue('');
    
    // Test keyboard interactions
    await component.fill('test');
    await page.keyboard.press('Backspace');
    await expect(component).toHaveValue('tes');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    await expect(component).not.toBeFocused();
  });

  test('Input states behave correctly', async ({ page }) => {
    // Test disabled state
    const disabledInputs = page.locator('input[disabled]');
    if (await disabledInputs.count() > 0) {
      const disabledInput = disabledInputs.first();
      await expect(disabledInput).toBeDisabled();
      await expect(disabledInput).not.toBeEnabled();
      
      // Disabled input should not accept input
      await disabledInput.click({ force: true });
      await expect(disabledInput).not.toBeFocused();
    }
    
    // Test readonly state
    const readonlyInputs = page.locator('input[readonly]');
    if (await readonlyInputs.count() > 0) {
      const readonlyInput = readonlyInputs.first();
      await expect(readonlyInput).toBeVisible();
      await readonlyInput.focus();
      await expect(readonlyInput).toBeFocused();
    }

    // Test required state
    const requiredInputs = page.locator('input[required]');
    if (await requiredInputs.count() > 0) {
      await expect(requiredInputs.first()).toHaveAttribute('required');
    }

    // Test placeholder
    const placeholderInputs = page.locator('input[placeholder]');
    if (await placeholderInputs.count() > 0) {
      const placeholder = await placeholderInputs.first().getAttribute('placeholder');
      expect(placeholder).toBeTruthy();
    }
  });

  test('Input maintains consistency across themes', async ({ page }) => {
    const component = page.locator('input').first();
    const themeSwitcher = page.locator('[data-testid="theme-switcher"]');
    
    if (await themeSwitcher.count() > 0) {
      // Get initial styles
      const initialStyles = await component.evaluate(el => ({
        backgroundColor: getComputedStyle(el).backgroundColor,
        borderColor: getComputedStyle(el).borderColor,
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
          borderColor: getComputedStyle(el).borderColor,
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
          newStyles.borderColor !== initialStyles.borderColor ||
          newStyles.color !== initialStyles.color;
        expect(colorsChanged).toBeTruthy();
      }
    } else {
      test.skip();
    }
  });

  // Form-specific tests
  test('Input value binding works correctly', async ({ page }) => {
    const component = page.locator('input').first();
    
    // Test initial value
    const initialValue = await component.inputValue();
    expect(typeof initialValue).toBe('string');
    
    // Test setting value
    await component.fill('new value');
    await expect(component).toHaveValue('new value');
    
    // Test value persistence
    await component.blur();
    await component.focus();
    await expect(component).toHaveValue('new value');
    
    // Test different input types
    const emailInputs = page.locator('input[type="email"]');
    if (await emailInputs.count() > 0) {
      const emailInput = emailInputs.first();
      await emailInput.fill('test@example.com');
      await expect(emailInput).toHaveValue('test@example.com');
    }
    
    const numberInputs = page.locator('input[type="number"]');
    if (await numberInputs.count() > 0) {
      const numberInput = numberInputs.first();
      await numberInput.fill('123');
      await expect(numberInput).toHaveValue('123');
    }
  });

  test('Input validation states display properly', async ({ page }) => {
    // Test inputs with validation classes or attributes
    const errorInputs = page.locator('input.error, input[aria-invalid="true"], .error input');
    if (await errorInputs.count() > 0) {
      await expect(errorInputs.first()).toBeVisible();
      
      // Check for error message nearby
      const errorMessages = page.locator('.error-message, .invalid-feedback, [role="alert"]');
      if (await errorMessages.count() > 0) {
        await expect(errorMessages.first()).toBeVisible();
        const errorText = await errorMessages.first().textContent();
        expect(errorText).toBeTruthy();
      }
    }
    
    // Test success state
    const successInputs = page.locator('input.success, input.valid, .success input');
    if (await successInputs.count() > 0) {
      await expect(successInputs.first()).toBeVisible();
    }
    
    // Test warning state
    const warningInputs = page.locator('input.warning, .warning input');
    if (await warningInputs.count() > 0) {
      await expect(warningInputs.first()).toBeVisible();
    }
  });

  test('Input accessibility features work', async ({ page }) => {
    const component = page.locator('input').first();
    
    // Test label association
    const inputLabels = page.locator('label');
    if (await inputLabels.count() > 0) {
      const label = inputLabels.first();
      const labelFor = await label.getAttribute('for');
      const inputId = await component.getAttribute('id');
      
      if (labelFor && inputId) {
        expect(labelFor).toBe(inputId);
      }
    }
    
    // Test placeholder
    const placeholder = await component.getAttribute('placeholder');
    if (placeholder) {
      expect(placeholder.length).toBeGreaterThan(0);
    }
    
    // Test aria attributes
    const ariaLabel = await component.getAttribute('aria-label');
    const ariaLabelledBy = await component.getAttribute('aria-labelledby');
    const ariaDescribedBy = await component.getAttribute('aria-describedby');
    
    // At least one accessibility attribute should be present
    const hasAccessibility = ariaLabel || ariaLabelledBy || ariaDescribedBy || placeholder;
    expect(hasAccessibility).toBeTruthy();
  });
});
