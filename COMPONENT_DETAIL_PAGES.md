# Component Detail Page Guidelines

This document outlines the standard structure and requirements for creating component detail pages in the UI Registry.

## 📋 Page Structure Template

Every component detail page should follow this exact structure:

### 1. **File Location**
```
/src/routes/components/[component-name]/+page.svelte
```

### 2. **Required Imports**
```typescript
import { onMount } from 'svelte';
import { base } from '$app/paths';
import { themeStore, themes } from '$lib/stores/theme';
import { [ComponentName] } from '$lib/components/ui/[component-name]';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '$lib/components/ui/card';
import { Badge } from '$lib/components/ui/badge';
import * as Tabs from '$lib/components/ui/tabs';
import * as Breadcrumb from '$lib/components/ui/breadcrumb';

// Icon imports (as needed for examples)
import [IconName] from '@lucide/svelte/icons/[icon-name]';
import CopyIcon from '@lucide/svelte/icons/copy';
```

### 3. **Required Script Variables**
```typescript
let currentTheme = 'default';
let copied = false;

// Subscribe to theme store
$: currentTheme = $themeStore;

// Get the registry base URL
$: registryBaseUrl = typeof window !== 'undefined' ? window.location.origin + base : '';

function switchTheme(themeId: string) {
    themeStore.setTheme(themeId);
}

// Load saved theme on mount
onMount(() => {
    themeStore.loadTheme();
});

// Copy to clipboard functionality
async function copyToClipboard(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        copied = true;
        setTimeout(() => copied = false, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }
}

const installCommand = `npx shadcn-svelte@latest add ${registryBaseUrl}/r/[component-name].json`;
const usageExample = `<script lang="ts">
  import { [ComponentName] } from "$lib/components/ui/[component-name]";
</script>

<[ComponentName]>Example</[ComponentName]>`;
```

## 🎯 Page Layout Structure

### 1. **SEO Head**
```svelte
<svelte:head>
    <title>[ComponentName] Component - UI Registry</title>
    <meta name="description" content="[Brief component description]" />
</svelte:head>
```

### 2. **Page Container**
```svelte
<div class="min-h-screen bg-background">
```

### 3. **Header Section**
Standard header with:
- UI Registry branding
- Navigation (Home, Components, Themes)
- Theme selector dropdown

### 4. **Breadcrumb Navigation**
```svelte
<div class="container mx-auto px-4 py-4">
    <Breadcrumb.Root>
        <Breadcrumb.List>
            <Breadcrumb.Item>
                <Breadcrumb.Link href="{base}/">Home</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
                <Breadcrumb.Link href="{base}/components">Components</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
                <Breadcrumb.Page>[ComponentName]</Breadcrumb.Page>
            </Breadcrumb.Item>
        </Breadcrumb.List>
    </Breadcrumb.Root>
</div>
```

### 5. **Hero Section**
```svelte
<section class="py-12 px-4">
    <div class="container mx-auto">
        <div class="max-w-4xl mx-auto text-center">
            <div class="flex items-center justify-center space-x-2 mb-4">
                <h1 class="text-4xl md:text-5xl font-bold text-foreground">[ComponentName]</h1>
                <Badge variant="secondary">Component</Badge>
            </div>
            <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                [Brief, focused description of the component]
            </p>
        </div>
    </div>
</section>
```

### 6. **Tabbed Content Section**
```svelte
<section class="py-8 px-4">
    <div class="container mx-auto max-w-4xl">
        <Tabs.Root value="examples" class="w-full">
            <Tabs.List class="grid w-full grid-cols-3">
                <Tabs.Trigger value="examples">Examples</Tabs.Trigger>
                <Tabs.Trigger value="usage">Usage</Tabs.Trigger>
                <Tabs.Trigger value="api">API</Tabs.Trigger>
            </Tabs.List>
            
            <!-- Tab content here -->
        </Tabs.Root>
    </div>
</section>
```

### 7. **Footer**
Standard footer with attribution

## 📑 Tab Content Requirements

### **Examples Tab**
Must include sections for:

#### **Variants Section** (if applicable)
- Card with title "Variants"
- Description of available variants
- Grid layout (md:grid-cols-2) for multiple variants
- Each variant should have:
  - Subtitle with variant name
  - Live component examples
  - Code snippet with copy functionality

#### **Sizes Section** (if applicable)
- Card with title "Sizes"
- Description of available sizes
- Horizontal layout showing size progression
- Code snippets for each size

#### **States Section** (if applicable)
- Card with title "States"
- Grid layout for different states
- Examples: disabled, loading, active, etc.
- Code snippets for each state

### **Usage Tab**
Must include:

#### **Installation Section**
- Card with CLI installation command
- Copy-to-clipboard functionality
- Clear instructions

#### **Basic Usage Section**
- Card with import and basic usage example
- Copy-to-clipboard functionality
- Simple, practical example

### **API Tab**
Must include:

#### **Props Table**
- Card with complete props documentation
- Table format with columns:
  - Prop (monospace font)
  - Type
  - Default
  - Description
- All available props documented
- TypeScript types included

## 🎨 Styling Guidelines

### **Consistent Classes**
- Container: `container mx-auto max-w-4xl`
- Section spacing: `py-8 px-4` or `py-12 px-4`
- Card spacing: `space-y-8` for tab content
- Code blocks: `bg-muted p-2 rounded text-xs overflow-x-auto`
- Button examples: `flex flex-wrap gap-2 mb-4`

### **Copy Button Pattern**
```svelte
<div class="relative">
    <pre class="bg-muted p-4 rounded-md border text-sm overflow-x-auto"><code>{codeExample}</code></pre>
    <Button 
        size="icon" 
        variant="outline" 
        class="absolute top-2 right-2"
        on:click={() => copyToClipboard(codeExample)}
        aria-label="Copy code"
    >
        {#if copied}
            <span class="text-green-500">✓</span>
        {:else}
            <CopyIcon class="h-4 w-4" />
        {/if}
    </Button>
</div>
```

## 🔗 Navigation Integration

### **Components Page Link**
Update the components page to link to the detail page:
```svelte
<a href="{base}/components/[component-name]" class="block hover:opacity-80 transition-opacity">
    <CardTitle class="text-primary hover:underline">[ComponentName] Component</CardTitle>
</a>
```

## ✅ Quality Checklist

Before considering a component detail page complete, verify:

- [ ] All required imports are present (including Breadcrumb component)
- [ ] SEO head tags are configured
- [ ] Breadcrumb navigation uses the Breadcrumb component
- [ ] Hero section follows template
- [ ] All three tabs are implemented
- [ ] Examples tab has relevant sections
- [ ] Usage tab has installation and basic usage
- [ ] API tab has complete props documentation
- [ ] Copy-to-clipboard works on all code examples
- [ ] Theme switching works properly
- [ ] Responsive design works on mobile
- [ ] Component is linked from main components page
- [ ] No console errors or warnings

## 📝 Content Guidelines

### **Descriptions**
- Keep hero descriptions concise and focused
- Avoid marketing language
- Focus on functionality and use cases

### **Code Examples**
- Use realistic, practical examples
- Include proper imports
- Show common use patterns
- Keep examples simple but useful

### **API Documentation**
- Document ALL available props
- Include TypeScript types
- Provide clear descriptions
- Show default values

## 🚀 Implementation Process

1. **Create the page file** at correct location
2. **Copy the template structure** from this guide
3. **Customize for the specific component**
4. **Add component-specific examples**
5. **Document all props in API tab**
6. **Test all functionality**
7. **Link from components page**
8. **Verify quality checklist**

## 📚 Reference Implementation

The **Button component detail page** (`/src/routes/components/button/+page.svelte`) and **Breadcrumb component detail page** (`/src/routes/components/breadcrumb/+page.svelte`) serve as reference implementations of this template and should be consulted when creating new component detail pages.

**Key differences:**
- **Button page**: Shows complex component with variants, sizes, and states
- **Breadcrumb page**: Shows component family with multiple sub-components and API documentation

Both pages demonstrate proper use of the Breadcrumb component for navigation.

---

*This document should be updated whenever the component detail page template changes to ensure consistency across all component documentation.*
