# Create New Component Process

This document outlines the step-by-step process for adding a new component to the UI Registry. Follow these steps to ensure consistency and completeness.

## 📋 **Prerequisites**

- [ ] Component name decided (e.g., "breadcrumb", "dialog", "dropdown")
- [ ] shadcn-svelte documentation available for reference
- [ ] Development server running (`npm run dev`)

## 🔧 **Step 1: Research & Planning**

### **1.1 Get Component Documentation**
```bash
# Use Context7 to get shadcn-svelte component docs
# Search for: "[component-name] component"
# Analyze structure and identify sub-components needed
```

### **1.2 Plan Component Structure**
- [ ] Identify main component and sub-components
- [ ] Note required dependencies (e.g., `bits-ui`, `@lucide/svelte`)
- [ ] Plan component variants, sizes, or states
- [ ] Determine props and API surface

## 🏗️ **Step 2: Component Implementation**

### **2.1 Create Component Directory**
```bash
mkdir -p src/lib/components/ui/[component-name]
```

### **2.2 Create Component Files**
For each sub-component, create a `.svelte` file:

**Template for each component file:**
```svelte
<script lang="ts">
	import { cn } from "$lib/utils.js";
	// Import dependencies as needed (e.g., icons, bits-ui)

	type $$Props = {
		class?: string;
		// Add component-specific props
		children?: any;
	};

	let {
		class: className,
		// Destructure component-specific props
		children,
		...restProps
	}: $$Props = $props();
</script>

<!-- Component HTML with proper styling -->
<element
	class={cn("base-styles", className)}
	{...restProps}
>
	{@render children?.()}
</element>
```

**Key Requirements:**
- [ ] Use Svelte 5 runes syntax (`$props()` not `export let`)
- [ ] Include `cn()` utility for class merging
- [ ] Proper TypeScript types
- [ ] Semantic HTML elements
- [ ] Accessibility attributes (ARIA labels, roles)
- [ ] Consistent styling with shadcn-svelte patterns

### **2.3 Create Index File**
Create `src/lib/components/ui/[component-name]/index.ts`:

```typescript
import Root from "./[ComponentName]Root.svelte";
import SubComponent from "./[ComponentName]SubComponent.svelte";
// Import all sub-components

export {
	Root,
	SubComponent,
	// Export all sub-components
	//
	Root as [ComponentName],
	SubComponent as [ComponentName]SubComponent,
	// Export with prefixed names
};
```

## 📦 **Step 3: Registry Integration**

### **3.1 Create Registry JSON**
Create `src/lib/registry/components/[component-name].json`:

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
  "name": "[component-name]",
  "type": "registry:ui",
  "title": "[ComponentName]",
  "description": "[Brief description of the component]",
  "dependencies": ["@lucide/svelte"], // Add actual dependencies
  "registryDependencies": [],
  "files": [
    {
      "path": "ui/[component-name]/[ComponentName]Root.svelte",
      "content": "[Escaped component content]",
      "type": "registry:ui"
    }
    // Add all component files
  ]
}
```

### **3.2 Add to Main Registry**
Edit `src/lib/registry.json` and add:

```json
{
  "name": "[component-name]",
  "type": "registry:ui",
  "title": "[ComponentName]",
  "description": "[Brief description]",
  "files": [
    {
      "path": "src/lib/registry/components/[component-name].json",
      "type": "registry:ui"
    }
  ]
}
```

### **3.3 Build Registry**
```bash
npm run registry:build
```

## 📄 **Step 4: Detail Page Creation**

### **4.1 Create Detail Page**
Create `src/routes/components/[component-name]/+page.svelte`

**Use the Component Detail Page Guidelines template:**
- [ ] Copy template from `COMPONENT_DETAIL_PAGES.md`
- [ ] Replace `[ComponentName]` placeholders
- [ ] Update imports for your specific component
- [ ] Customize examples for your component

### **4.2 Required Sections**

**Examples Tab:**
- [ ] Basic usage example
- [ ] Variants (if applicable)
- [ ] Sizes (if applicable)
- [ ] States (if applicable)
- [ ] Advanced examples (with icons, custom styling, etc.)

**Usage Tab:**
- [ ] Installation section with CLI command
- [ ] Basic usage section with import example
- [ ] Both with copy-to-clipboard functionality

**API Tab:**
- [ ] Complete props documentation for all sub-components
- [ ] Table format with Prop, Type, Default, Description columns
- [ ] Clear descriptions for each component's purpose

### **4.3 Content Guidelines**
- [ ] Use realistic, practical examples
- [ ] Include proper imports in code snippets
- [ ] Show common use patterns
- [ ] Keep examples simple but useful
- [ ] Document ALL available props
- [ ] Include TypeScript types
- [ ] Provide clear descriptions

## 🎨 **Step 5: Components Page Integration**

### **5.1 Add Import**
In `src/routes/components/+page.svelte`, add:
```typescript
import * as [ComponentName] from '$lib/components/ui/[component-name]';
```

### **5.2 Add Showcase Section**
Add after existing component sections:

```svelte
<!-- [ComponentName] Component Showcase -->
<section>
    <Card>
        <CardHeader>
            <a href="{base}/components/[component-name]" class="block hover:opacity-80 transition-opacity">
                <CardTitle class="text-primary hover:underline">[ComponentName] Component</CardTitle>
            </a>
            <CardDescription>
                [Brief description of the component]
            </CardDescription>
        </CardHeader>
        <CardContent class="space-y-6">
            <!-- Add 2-3 live examples showing key functionality -->
            <div>
                <h3 class="text-lg font-medium mb-3">[Example Name]</h3>
                <!-- Live component example -->
            </div>
        </CardContent>
    </Card>
</section>
```

## ✅ **Step 6: Testing & Validation**

### **6.1 Component Test Implementation** (using COMPONENT_TEST_SPEC.md)

**Add Test Attributes to Component:**
```svelte
<button 
  class={cn(buttonVariants({ variant, size }), className)}
  data-testid="[component-name]"
  data-variant={variant}
  data-state={disabled ? 'disabled' : 'enabled'}
  data-loading={loading}
  {...$$restProps}
>
```

**Create Component Test File:**
- [ ] Create `tests/components/[component-name].spec.ts`
- [ ] Copy the 4-test template from COMPONENT_TEST_SPEC.md
- [ ] Replace `[Component]` and `[component-name]` placeholders
- [ ] Adjust variant names to match your component

**Run Component Tests:**
```bash
# Run your component tests
npm run test:components -- --grep "[Component]"

# Expected results: 12 tests passed, 12 tests skipped
# Execution time: Under 15 seconds
```

**Test Validation Checklist:**
- [ ] All 4 core tests pass across 6 browsers/devices
- [ ] Component renders with correct variants
- [ ] Interactions work correctly (click, focus, keyboard)
- [ ] States behave correctly (disabled, loading)
- [ ] Theme consistency maintained across theme changes
- [ ] No test timeouts or flaky behavior

### **6.2 Manual Testing Checklist**
- [ ] Component renders without errors
- [ ] All variants/sizes work correctly
- [ ] Theme switching works properly
- [ ] Responsive design works on mobile
- [ ] Copy-to-clipboard functions work
- [ ] Navigation links work correctly
- [ ] No console errors or warnings

### **6.3 Documentation Checklist**
- [ ] All required imports are present
- [ ] SEO head tags are configured
- [ ] Breadcrumb navigation uses Breadcrumb component
- [ ] Hero section follows template
- [ ] All three tabs are implemented
- [ ] Examples tab has relevant sections
- [ ] Usage tab has installation and basic usage
- [ ] API tab has complete props documentation
- [ ] Component is linked from main components page

### **6.4 Code Quality Checklist**
- [ ] Uses Svelte 5 runes syntax throughout
- [ ] Proper TypeScript types
- [ ] Consistent styling with existing components
- [ ] Accessibility attributes included
- [ ] Semantic HTML structure
- [ ] Error handling where appropriate
- [ ] Required test attributes added for testing

## 🚀 **Step 7: Final Steps**

### **7.1 Test Installation**
```bash
# Test the CLI installation works
npx shadcn-svelte@latest add http://localhost:5173/r/[component-name].json
```

### **7.2 Documentation Update**
- [ ] Update any relevant documentation
- [ ] Add component to any component lists
- [ ] Update README if necessary

### **7.3 Verification**
- [ ] Visit `/components` page - component appears and works
- [ ] Visit `/components/[component-name]` - detail page works
- [ ] Test all examples and functionality
- [ ] Verify theme compatibility

## 📚 **Reference Files**

### **Templates to Copy From:**
- **Simple Component**: Button component (`/src/routes/components/button/+page.svelte`)
- **Component Family**: Breadcrumb component (`/src/routes/components/breadcrumb/+page.svelte`)
- **Guidelines**: `COMPONENT_DETAIL_PAGES.md`

### **Key Files to Update:**
1. `src/lib/components/ui/[component-name]/` - Component files
2. `src/lib/registry/components/[component-name].json` - Registry definition
3. `src/lib/registry.json` - Main registry
4. `src/routes/components/[component-name]/+page.svelte` - Detail page
5. `src/routes/components/+page.svelte` - Components showcase

## 🎯 **Success Criteria**

A component is considered complete when:
- [ ] ✅ Component works in isolation
- [ ] ✅ **Component tests pass** (12 passed, 12 skipped across 6 browsers)
- [ ] ✅ **Test attributes added** (data-testid, data-variant, data-state)
- [ ] ✅ Registry installation works via CLI
- [ ] ✅ Detail page follows guidelines exactly
- [ ] ✅ Components page integration works
- [ ] ✅ All documentation is complete
- [ ] ✅ No errors or warnings in console
- [ ] ✅ Theme compatibility verified
- [ ] ✅ Mobile responsiveness confirmed

## ⚡ **Quick Reference Commands**

```bash
# Start development server
npm run dev

# Build registry after changes
npm run registry:build

# Test component installation
npx shadcn-svelte@latest add http://localhost:5173/r/[component-name].json

# Run component tests
npm run test:components -- --grep "[Component]"

# Run all component tests
npm run test:components

# Run tests with UI mode for debugging
npm run test:ui
```

---

**💡 Pro Tip:** Follow this process step-by-step and use the existing Button and Breadcrumb components as reference implementations. Each step builds on the previous one, so don't skip ahead!

**🔄 Process Improvement:** If you find ways to improve this process while creating components, update this document to help future component creation.
