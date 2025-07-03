# Minimum Component Test Specification

Based on the successful button component tests, this specification defines the minimum required testing for all components in the shadcn-registry.

## Core Test Structure

Every component test should follow this 4-test pattern:

```typescript
test.describe('[Component] Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components');
  });

  // Test 1: Rendering & Variants
  test('[Component] renders with correct variants', async ({ page }) => {
    // Verify component exists and variants are visible
    const component = page.locator('[data-testid="[component-name]"]').first();
    await expect(component).toBeVisible();
    
    // Test common variants
    const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost'];
    for (const variant of variants) {
      const variantElement = page.locator(`[data-variant="${variant}"]`);
      if (await variantElement.count() > 0) {
        await expect(variantElement).toBeVisible();
      }
    }
  });

  // Test 2: Basic Interactions  
  test('[Component] interactions work correctly', async ({ page }) => {
    const component = page.locator('[data-testid="[component-name]"]').first();
    
    // Test basic interactions
    await expect(component).toBeEnabled();
    await component.click();
    await expect(component).toBeVisible();
    
    // Test keyboard focus
    await component.focus();
    if (await component.count() > 0) {
      await expect(component).toBeFocused();
    }
  });

  // Test 3: State Management
  test('[Component] states behave correctly', async ({ page }) => {
    // Test disabled state
    const disabledComponent = page.locator('[data-testid="[component-name]"][disabled]');
    if (await disabledComponent.count() > 0) {
      await expect(disabledComponent).toBeDisabled();
      await expect(disabledComponent).not.toBeEnabled();
    }
    
    // Test loading state
    const loadingComponent = page.locator('[data-testid="[component-name]"][data-loading="true"]');
    if (await loadingComponent.count() > 0) {
      await expect(loadingComponent).toBeVisible();
    }
  });

  // Test 4: Theme Consistency
  test('[Component] maintains consistency across themes', async ({ page }) => {
    const component = page.locator('[data-testid="[component-name]"]').first();
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
```

## Required Test Data Attributes

Components must include these attributes for testing:

```html
<div 
  data-testid="[component-name]"
  data-variant="[variant-name]" 
  data-state="[current-state]"
  data-loading="[loading-state]"
>
```

### Example Implementation
```svelte
<button 
  class={cn(buttonVariants({ variant, size }), className)}
  data-testid="button"
  data-variant={variant}
  data-state={disabled ? 'disabled' : 'enabled'}
  data-loading={loading}
  {...$$restProps}
>
  <slot />
</button>
```

## Test Execution

### Framework & Environment
- **Framework**: Playwright
- **Browsers**: Chromium, Firefox, WebKit, Mobile Chrome, Mobile Safari, iPad
- **Command**: `npm run test:components`

### File Location
```
tests/components/[component-name].spec.ts
```

### Running Tests
```bash
# Run all component tests
npm run test:components

# Run specific component test
npm run test:components -- --grep "[Component]"

# Run with UI mode for debugging
npm run test:ui
```

## Success Criteria

### Minimum Requirements
- ✅ All 4 core tests pass across all 6 browser/device combinations
- ✅ Tests verify functionality without breaking on theme changes  
- ✅ Components remain accessible and interactive across all tested environments
- ✅ No test timeouts or flaky behavior

### Expected Results
Based on the button component test results:
- **12 tests passed** (4 tests × 6 browsers/devices × 2 test runs)
- **12 tests skipped** (conditional tests that don't meet prerequisites)
- **Execution time**: Under 15 seconds for a single component

## Implementation Checklist

For each new component:

1. **Add Test Attributes**
   - [ ] `data-testid` with component name
   - [ ] `data-variant` for each variant
   - [ ] `data-state` for component states

2. **Create Test File**
   - [ ] Copy the 4-test template
   - [ ] Replace `[Component]` and `[component-name]` placeholders
   - [ ] Adjust variant names to match component

3. **Run Tests**
   - [ ] Execute `npm run test:components -- --grep "[Component]"`
   - [ ] Verify all tests pass across browsers
   - [ ] Fix any failing tests

4. **Validate Coverage**
   - [ ] All variants tested and visible
   - [ ] Interactions work correctly
   - [ ] States behave as expected
   - [ ] Theme switching maintains consistency

This specification ensures consistent, comprehensive testing while being simple enough to apply to any component in the registry.
