# Testing Strategy: App Shell & Component Library

## Overview

This document outlines our comprehensive testing strategy for the enhanced sidebar app shell and component library, focusing on accessibility, responsive design, cross-browser compatibility, and integration testing using Playwright.

## Core Testing Categories

### **1. Accessibility Testing (WCAG 2.1 AA)**

#### **Requirements**
- **Keyboard Navigation**: Tab order, focus management, skip links, keyboard shortcuts
- **Screen Reader Compatibility**: ARIA labels, live regions, semantic markup, route announcements
- **Color Contrast**: Text/background ratios meet AA standards across all themes
- **Focus Indicators**: Visible focus states on all interactive elements
- **Alternative Text**: Icons and images have proper alt text and descriptions
- **Form Labels**: All inputs properly labeled and associated

#### **Test Implementation**
```typescript
// tests/accessibility/wcag-compliance.spec.ts
import { test, expect } from '@playwright/test';
import { injectAxe, checkA11y } from 'axe-playwright';

test.describe('WCAG 2.1 AA Compliance', () => {
  test('App Shell meets accessibility standards', async ({ page }) => {
    await page.goto('/');
    await injectAxe(page);
    
    await checkA11y(page, null, {
      detailedReport: true,
      tags: ['wcag2a', 'wcag2aa', 'wcag21aa'],
      rules: {
        'color-contrast': { enabled: true },
        'keyboard-navigation': { enabled: true },
        'focus-management': { enabled: true }
      }
    });
  });

  test('Keyboard navigation works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test tab order
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="skip-link"]')).toBeFocused();
    
    // Test sidebar navigation
    await page.keyboard.press('Tab');
    await expect(page.locator('[data-testid="sidebar-trigger"]')).toBeFocused();
    
    // Test command palette shortcut
    await page.keyboard.press('Meta+k');
    await expect(page.locator('[data-testid="command-palette"]')).toBeVisible();
  });
});
```

### **2. Responsive Design Testing**

#### **Requirements**
- **Breakpoint Behavior**: Mobile (320-768px), Tablet (768-1024px), Desktop (1024px+)
- **Layout Adaptation**: Sidebar collapse/expand, navigation changes, content reflow
- **Touch Targets**: Minimum 44px on mobile devices
- **Content Reflow**: Text and images adapt properly without horizontal scrolling
- **Orientation Changes**: Portrait/landscape handling on mobile devices

#### **Test Implementation**
```typescript
// tests/responsive/breakpoint-behavior.spec.ts
import { test, expect, devices } from '@playwright/test';

const viewports = {
  mobile: { width: 375, height: 667 },
  tablet: { width: 768, height: 1024 },
  desktop: { width: 1440, height: 900 }
};

test.describe('Responsive Design', () => {
  Object.entries(viewports).forEach(([device, viewport]) => {
    test(`App Shell adapts correctly on ${device}`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.goto('/');
      
      const sidebar = page.locator('[data-testid="app-sidebar"]');
      const mainContent = page.locator('[data-testid="main-content"]');
      
      if (device === 'mobile') {
        // Mobile: sidebar should be collapsed/offcanvas
        await expect(sidebar).toHaveAttribute('data-state', 'collapsed');
        await expect(mainContent).toHaveCSS('margin-left', '0px');
      } else if (device === 'tablet') {
        // Tablet: sidebar should be inset
        await expect(sidebar).toHaveAttribute('data-variant', 'inset');
      } else {
        // Desktop: sidebar should be expanded
        await expect(sidebar).toHaveAttribute('data-state', 'expanded');
        await expect(mainContent).not.toHaveCSS('margin-left', '0px');
      }
    });
  });

  test('Touch targets meet minimum size requirements', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    const touchTargets = page.locator('[data-testid*="nav-item"], [data-testid*="button"]');
    const count = await touchTargets.count();
    
    for (let i = 0; i < count; i++) {
      const target = touchTargets.nth(i);
      const box = await target.boundingBox();
      
      expect(box?.width).toBeGreaterThanOrEqual(44);
      expect(box?.height).toBeGreaterThanOrEqual(44);
    }
  });
});
```

### **3. Cross-Browser Compatibility**

#### **Requirements**
- **Major Browsers**: Chrome, Firefox, Safari, Edge on desktop
- **Mobile Browsers**: Mobile Safari, Chrome Mobile
- **JavaScript Features**: Svelte 5 runes, modern ES features compatibility
- **CSS Features**: CSS Grid, Flexbox, CSS variables, custom properties
- **PWA Features**: Service worker support, offline functionality

#### **Playwright Configuration**
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  
  use: {
    baseURL: 'http://localhost:4173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'] },
    },
    
    // Mobile devices
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
    
    // Tablets
    {
      name: 'iPad',
      use: { ...devices['iPad Pro'] },
    },
  ],

  webServer: {
    command: 'npm run preview',
    port: 4173,
  },
});
```

## End-to-End Testing

### **App Shell Integration Tests**

#### **Navigation Flow Testing**
```typescript
// tests/e2e/navigation-flow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('App Shell Navigation', () => {
  test('Complete navigation flow works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test initial state
    await expect(page.locator('[data-testid="app-shell"]')).toBeVisible();
    await expect(page.locator('[data-testid="sidebar"]')).toBeVisible();
    
    // Test navigation item click
    await page.click('[data-testid="nav-item-profile"]');
    await expect(page).toHaveURL('/profile');
    await expect(page.locator('[data-testid="nav-item-profile"]')).toHaveClass(/active/);
    
    // Test breadcrumb generation
    await expect(page.locator('[data-testid="breadcrumb"]')).toContainText('Profile');
    
    // Test back navigation
    await page.goBack();
    await expect(page).toHaveURL('/');
    await expect(page.locator('[data-testid="nav-item-home"]')).toHaveClass(/active/);
  });

  test('Sidebar state persistence works', async ({ page }) => {
    await page.goto('/');
    
    // Collapse sidebar
    await page.click('[data-testid="sidebar-trigger"]');
    await expect(page.locator('[data-testid="sidebar"]')).toHaveAttribute('data-state', 'collapsed');
    
    // Navigate to another page
    await page.click('[data-testid="nav-item-settings"]');
    await expect(page).toHaveURL('/settings');
    
    // Sidebar should remain collapsed
    await expect(page.locator('[data-testid="sidebar"]')).toHaveAttribute('data-state', 'collapsed');
    
    // Refresh page - state should persist
    await page.reload();
    await expect(page.locator('[data-testid="sidebar"]')).toHaveAttribute('data-state', 'collapsed');
  });
});
```

#### **Theme Integration Testing**
```typescript
// tests/e2e/theme-integration.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Theme Integration', () => {
  test('Theme switching works across all components', async ({ page }) => {
    await page.goto('/');
    
    // Test initial theme
    await expect(page.locator('html')).toHaveClass(/theme-zinc/);
    
    // Open theme switcher
    await page.click('[data-testid="theme-switcher"]');
    await expect(page.locator('[data-testid="theme-menu"]')).toBeVisible();
    
    // Switch to different theme
    await page.click('[data-testid="theme-bubblegum"]');
    await expect(page.locator('html')).toHaveClass(/theme-bubblegum/);
    
    // Verify components reflect new theme
    const button = page.locator('[data-testid="primary-button"]');
    const buttonColor = await button.evaluate(el => 
      getComputedStyle(el).backgroundColor
    );
    
    // Should match bubblegum theme primary color
    expect(buttonColor).toBe('rgb(236, 72, 153)'); // Bubblegum pink
  });

  test('Dark mode works with all themes', async ({ page }) => {
    await page.goto('/');
    
    // Switch to dark mode
    await page.click('[data-testid="mode-toggle"]');
    await expect(page.locator('html')).toHaveClass(/dark/);
    
    // Test theme switching in dark mode
    await page.click('[data-testid="theme-switcher"]');
    await page.click('[data-testid="theme-emerald"]');
    
    await expect(page.locator('html')).toHaveClass(/dark/);
    await expect(page.locator('html')).toHaveClass(/theme-emerald/);
    
    // Verify dark theme colors are applied
    const sidebar = page.locator('[data-testid="sidebar"]');
    const sidebarBg = await sidebar.evaluate(el => 
      getComputedStyle(el).backgroundColor
    );
    
    // Should be dark emerald background
    expect(sidebarBg).not.toBe('rgb(255, 255, 255)');
  });
});
```

### **User Interaction Testing**
```typescript
// tests/e2e/user-interactions.spec.ts
import { test, expect } from '@playwright/test';

test.describe('User Interactions', () => {
  test('Command palette functionality', async ({ page }) => {
    await page.goto('/');
    
    // Open command palette with keyboard shortcut
    await page.keyboard.press('Meta+k');
    await expect(page.locator('[data-testid="command-palette"]')).toBeVisible();
    
    // Search for navigation item
    await page.fill('[data-testid="command-input"]', 'profile');
    await expect(page.locator('[data-testid="command-item-profile"]')).toBeVisible();
    
    // Select item and navigate
    await page.click('[data-testid="command-item-profile"]');
    await expect(page).toHaveURL('/profile');
    await expect(page.locator('[data-testid="command-palette"]')).not.toBeVisible();
  });

  test('User profile menu interactions', async ({ page }) => {
    await page.goto('/');
    
    // Open user profile menu
    await page.click('[data-testid="user-profile-trigger"]');
    await expect(page.locator('[data-testid="user-profile-menu"]')).toBeVisible();
    
    // Test menu items
    await expect(page.locator('[data-testid="profile-link"]')).toBeVisible();
    await expect(page.locator('[data-testid="settings-link"]')).toBeVisible();
    await expect(page.locator('[data-testid="logout-button"]')).toBeVisible();
    
    // Click outside to close
    await page.click('body');
    await expect(page.locator('[data-testid="user-profile-menu"]')).not.toBeVisible();
  });
});
```

## Integration Testing

### **State Management Integration**
```typescript
// tests/integration/state-management.spec.ts
import { test, expect } from '@playwright/test';

test.describe('State Management Integration', () => {
  test('Svelte 5 runes reactivity works correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test reactive navigation state
    await page.click('[data-testid="nav-item-settings"]');
    
    // Verify multiple UI elements react to state change
    await expect(page.locator('[data-testid="nav-item-settings"]')).toHaveClass(/active/);
    await expect(page.locator('[data-testid="breadcrumb"]')).toContainText('Settings');
    await expect(page.locator('[data-testid="page-title"]')).toContainText('Settings');
  });

  test('State persistence across page reloads', async ({ page }) => {
    await page.goto('/');
    
    // Change multiple state values
    await page.click('[data-testid="sidebar-trigger"]'); // Collapse sidebar
    await page.click('[data-testid="theme-switcher"]');
    await page.click('[data-testid="theme-rose"]'); // Change theme
    
    // Reload page
    await page.reload();
    
    // Verify state persisted
    await expect(page.locator('[data-testid="sidebar"]')).toHaveAttribute('data-state', 'collapsed');
    await expect(page.locator('html')).toHaveClass(/theme-rose/);
  });
});
```

### **Component Integration Testing**
```typescript
// tests/integration/component-integration.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Component Integration', () => {
  test('App shell components work together correctly', async ({ page }) => {
    await page.goto('/');
    
    // Test connection status integration
    await page.route('**/*', route => route.abort()); // Simulate offline
    await page.reload();
    await expect(page.locator('[data-testid="connection-status"]')).toContainText('Offline');
    
    // Test notification badge integration
    await page.unroute('**/*');
    await page.reload();
    
    // Simulate notification
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent('notification', { 
        detail: { count: 3 } 
      }));
    });
    
    await expect(page.locator('[data-testid="notification-badge"]')).toContainText('3');
  });
});
```

## Test Organization Structure

```
tests/
├── accessibility/
│   ├── wcag-compliance.spec.ts
│   ├── keyboard-navigation.spec.ts
│   ├── screen-reader.spec.ts
│   └── color-contrast.spec.ts
├── responsive/
│   ├── breakpoint-behavior.spec.ts
│   ├── touch-targets.spec.ts
│   └── orientation-changes.spec.ts
├── cross-browser/
│   ├── feature-compatibility.spec.ts
│   └── css-support.spec.ts
├── e2e/
│   ├── navigation-flow.spec.ts
│   ├── theme-integration.spec.ts
│   └── user-interactions.spec.ts
├── integration/
│   ├── state-management.spec.ts
│   ├── component-integration.spec.ts
│   └── routing-integration.spec.ts
├── components/
│   ├── app-shell.spec.ts
│   ├── sidebar.spec.ts
│   ├── command-palette.spec.ts
│   └── theme-switcher.spec.ts
└── fixtures/
    ├── test-data.ts
    ├── mock-responses.ts
    └── test-helpers.ts
```

## Success Criteria

### **Accessibility Requirements**
- ✅ WCAG 2.1 AA compliance verified across all browsers and devices
- ✅ Keyboard navigation works for all interactive elements
- ✅ Screen reader compatibility tested and verified
- ✅ Color contrast meets AA standards across all themes
- ✅ Focus management works correctly in all interaction flows

### **Responsive Design Requirements**
- ✅ Layout adapts correctly on mobile (320-768px), tablet (768-1024px), desktop (1024px+)
- ✅ Touch targets meet minimum 44px requirement on mobile
- ✅ Content reflows properly without horizontal scrolling
- ✅ Orientation changes handled gracefully

### **Cross-Browser Compatibility Requirements**
- ✅ Functionality verified on Chrome, Firefox, Safari, Edge
- ✅ Mobile browsers (Safari, Chrome) work correctly
- ✅ CSS features degrade gracefully where not supported
- ✅ JavaScript features work or have appropriate fallbacks

### **Integration Requirements**
- ✅ End-to-end user flows work correctly
- ✅ State management integration verified
- ✅ Component interactions work as expected
- ✅ Theme switching works across all components
- ✅ Navigation state persists correctly

## CI/CD Integration

### **Automated Testing Pipeline**
```yaml
# .github/workflows/test.yml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      
      - name: Install dependencies
        run: npm ci
      
      - name: Install Playwright
        run: npx playwright install --with-deps
      
      - name: Run accessibility tests
        run: npx playwright test tests/accessibility/
      
      - name: Run responsive tests
        run: npx playwright test tests/responsive/
      
      - name: Run cross-browser tests
        run: npx playwright test tests/cross-browser/
      
      - name: Run e2e tests
        run: npx playwright test tests/e2e/
      
      - name: Run integration tests
        run: npx playwright test tests/integration/
      
      - name: Upload test results
        uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Appendix: Application-Level Testing Areas

### **Performance Testing**
- **Core Web Vitals**: LCP, FID, CLS measurements
- **Bundle Size**: Component lazy loading effectiveness
- **Memory Usage**: No memory leaks in long-running sessions
- **Network**: Offline functionality, service worker caching

### **PWA-Specific Testing**
- **Install Prompt**: App installation flow
- **Offline Functionality**: Navigation and core features work offline
- **Update Notifications**: Service worker update handling
- **Push Notifications**: If implemented

### **Security Testing**
- **XSS Prevention**: User input sanitization
- **CSRF Protection**: Form submission security
- **Content Security Policy**: CSP headers working correctly

### **Application-Specific Component Testing**
- **State Management**: Svelte 5 runes reactivity in complex scenarios
- **Theme Switching**: All 12 themes render correctly in real applications
- **Navigation**: Route changes, active states, breadcrumbs in full app context
- **User Interactions**: Clicks, hovers, form submissions in complete workflows
- **Loading States**: Skeleton components, async data in real data scenarios

*Note: These application-level tests should be implemented once the app shell and core components are integrated into a complete application.*
