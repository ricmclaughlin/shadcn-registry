# 🏗️ shadcn-registry Project Rules & Architecture

## 📋 Project Architecture Rules

### **Registry Compatibility Standards** 🔗
**Goal**: Maintain 100% compatibility with shadcn-svelte registry format for seamless CLI integration and component portability.

#### **Schema Requirements**
- **Main Registry**: `"$schema": "https://shadcn-svelte.com/schema/registry.json"`
- **Component Items**: `"$schema": "https://shadcn-svelte.com/schema/registry-item.json"`
- **CLI Compatibility**: Use `npx shadcn-svelte@latest add [url]`

#### **Component Sync Workflow**
1. **Monitor shadcn-svelte updates** via Context7 MCP server
2. **Compare changes** to our implementations
3. **Port updates** while maintaining theme compatibility
4. **Test CLI installation** after changes
5. **Update attribution links** if component URLs change

#### **Compatibility Checklist** ✅
- [ ] Schema references match shadcn-svelte exactly
- [ ] Component API matches their patterns (props, variants, events)
- [ ] File structure follows their conventions
- [ ] Dependencies align with their requirements
- [ ] CLI installation works with `shadcn-svelte@latest`
- [ ] Attribution links point to current component docs

### **Component Creation Pattern** (Always Follow)
1. **Registry Entry**: Create `/src/lib/registry/components/[name].json` first
2. **UI Components**: Create `/src/lib/components/ui/[name]/` directory structure
3. **Registry Update**: Add component to `src/lib/registry.json` items array
4. **Build**: Run `npm run registry:build` to generate static files
5. **Showcase**: Update components page with examples

### **File Structure Standards**
```
src/lib/components/ui/[component]/
├── [Component].svelte     # Main component file
├── [SubComponent].svelte  # Any sub-components (optional)
├── index.ts              # Exports with proper TypeScript
```

### **Component Implementation Standards**
- **Use tailwind-variants** for variant management
- **CSS variables** for theme integration (hsl(var(--primary)))
- **TypeScript support** with proper VariantProps exports
- **Event forwarding** with on:click, on:change, etc.
- **Accessibility** with proper ARIA attributes
- **Slot support** for flexible content

### **Registry JSON Format**
```json
{
  "name": "component-name",
  "type": "registry:ui",
  "description": "Brief description",
  "dependencies": ["tailwind-variants", "clsx"],
  "files": [
    {
      "name": "component.svelte",
      "content": "..."
    }
  ],
  "tailwind": {
    "config": {
      "theme": {
        "extend": {
          "colors": {
            // Required CSS variables
          }
        }
      }
    }
  }
}
```

## 🎯 Development Strategies

### **Priority Order** (Stick to This)
1. **Tier 1 Foundation**: Button, Card, Input ✅ COMPLETE
2. **Tier 2 Visual Impact**: Badge, Alert, Avatar 🎯 CURRENT FOCUS
3. **Tier 3 Interactive**: Select, Checkbox, Radio
4. **Documentation**: Individual component pages
5. **Examples**: Real-world combinations

### **Theme Integration Strategy**
- **Always test across multiple themes** (modern-minimal, twitter, bubblegum, graphite)
- **Use CSS variables exclusively** - never hardcode colors
- **Maintain consistency** with existing component patterns
- **Verify installation commands** work after each component

### **Component Showcase Strategy**
- **Add to main components page** immediately after creation
- **Show all variants and states** in examples
- **Include installation instructions** with each component
- **Demonstrate theme switching** impact

## 🚀 Workflow Shortcuts

### **Implementation Control Rule** 🛑
**CRITICAL**: Do not create, modify, or implement any files, components, or code unless the user explicitly uses the exact word string "IMPLEMENT" in their request. This includes:
- Creating new files
- Modifying existing files  
- Writing code examples that would be saved
- Running build scripts
- Making any changes to the project structure

**Exception**: Reading files, analyzing code, and providing guidance/suggestions is always allowed.

### **Quick Component Creation**
When I say "create [component]" AND use "IMPLEMENT", automatically:
1. Create registry JSON with proper structure
2. Create UI component files with TypeScript
3. Add to main registry.json
4. Build registry files
5. Show example usage

### **Testing Pattern**
After each component:
1. Build registry (`npm run registry:build`)
2. Check installation command works
3. Verify theme switching works
4. Update components page with examples

### **Communication Shortcuts**
- **"Next component"** = Follow priority order (Badge → Alert → Avatar)
- **"Full implementation"** = Complete registry + UI + showcase
- **"Quick test"** = Build registry and verify installation
- **"Theme check"** = Test across 4-5 different themes

## 🎨 Design Principles

### **Component Variants**
- **Default**: Primary theme colors
- **Secondary**: Muted theme colors  
- **Destructive**: Error/warning colors
- **Outline**: Border-only styling
- **Ghost**: Minimal styling, hover effects

### **Size Standards**
- **sm**: Small/compact version
- **default**: Standard size (no size prop needed)
- **lg**: Large/prominent version
- **icon**: Square, icon-only version (when applicable)

### **State Management**
- **Normal**: Default interactive state
- **Disabled**: Non-interactive, reduced opacity
- **Loading**: Show loading spinner, maintain size
- **Active/Selected**: Highlighted state for selections

## 🔧 Technical Standards

### **Dependencies**
- **Required**: `clsx` for className merging
- **Variants**: `tailwind-variants` for complex components
- **Icons**: Use inline SVG, not icon libraries
- **TypeScript**: Full type safety with proper exports

### **CSS Variable Usage**
```css
/* Always use these patterns */
bg-primary text-primary-foreground
bg-secondary text-secondary-foreground  
bg-destructive text-destructive-foreground
border-border bg-background text-foreground
text-muted-foreground bg-muted
```

### **Event Handling**
```svelte
<!-- Always forward events -->
on:click
on:change
on:focus
on:blur
{...$$restProps}
```

## 📝 Documentation Standards

### **Component Page Structure**
1. **Title & Description**
2. **Installation Command**
3. **Basic Examples** (all variants)
4. **Advanced Examples** (real-world usage)
5. **API Reference** (props, events, slots)
6. **Theme Examples** (show 3-4 themes)

### **Code Example Format**
```svelte
<!-- Always show import -->
import { Component } from '$lib/components/ui/component';

<!-- Show actual usage -->
<Component variant="default">Content</Component>
```

## 🎪 Success Criteria

### **Component Complete When**
- ✅ Registry JSON created and built
- ✅ UI components implemented with TypeScript
- ✅ Installation command works
- ✅ Examples added to components page
- ✅ Works across all 38 themes
- ✅ Follows all architecture patterns

### **Session Success When**
- ✅ 1-3 new components implemented
- ✅ Components page updated with examples
- ✅ Registry rebuilt and tested
- ✅ Theme compatibility verified
- ✅ Installation commands working

---

## 🎨 Icon Integration Standards

### **Icon Library: @lucide/svelte**
Following shadcn-svelte's standard, we use `@lucide/svelte` as our primary icon library.

#### **Deep Import Pattern** (Performance Critical)
```svelte
// ✅ CORRECT - Deep imports for performance
import InfoIcon from '@lucide/svelte/icons/info';
import AlertTriangleIcon from '@lucide/svelte/icons/alert-triangle';
import DownloadIcon from '@lucide/svelte/icons/download';

// ❌ AVOID - Named imports hurt dev server performance
import { Info, AlertTriangle, Download } from '@lucide/svelte';
```

#### **Component Icon Integration**
```svelte
<!-- Button with icons -->
<Button icon={DownloadIcon}>Download</Button>
<Button size="icon" icon={PlusIcon} />
<Button icon={SettingsIcon} iconPlacement="right">Settings</Button>

<!-- Alert with icons -->
<Alert variant="default" icon={InfoIcon}>
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>Message content</AlertDescription>
</Alert>
```

### **Icon Component Standards**

#### **Icon Props Pattern**
```typescript
// Standard icon prop
export let icon: ComponentType | undefined = undefined;

// Icon placement for buttons
export let iconPlacement: 'left' | 'right' = 'left';
```

#### **Icon Rendering Pattern**
```svelte
{#if icon}
  <svelte:component this={icon} class="h-4 w-4" />
{/if}
```

#### **Icon Sizing Standards**
- **Default**: `h-4 w-4` (16px)
- **Small**: `h-3 w-3` (12px) 
- **Large**: `h-5 w-5` (20px)
- **Icon buttons**: `h-4 w-4` with proper spacing

### **Registry Dependencies**
Components using icons must include `@lucide/svelte` in dependencies:
```json
{
  "dependencies": [
    "tailwind-variants",
    "clsx",
    "@lucide/svelte"
  ]
}
```

### **Icon Selection Guidelines**

#### **Alert Icons**
- **Info**: `info` - General information
- **Warning**: `alert-triangle` - Warnings and cautions
- **Success**: `check-circle` - Success states
- **Error**: `x-circle` - Error states

#### **Button Icons**
- **Actions**: `download`, `upload`, `plus`, `minus`
- **Navigation**: `arrow-left`, `arrow-right`, `chevron-down`
- **Interface**: `settings`, `search`, `menu`, `x`

#### **Common Icons**
- **User**: `user`, `users`, `user-plus`
- **Files**: `file`, `folder`, `image`, `download`
- **Interface**: `home`, `settings`, `search`, `menu`

### **Performance Best Practices**
1. **Always use deep imports** from `@lucide/svelte/icons/[icon-name]`
2. **Import only needed icons** - avoid importing entire icon sets
3. **Consistent sizing** - use standard size classes
4. **Proper spacing** - follow component spacing patterns

### **Theme Integration**
Icons automatically inherit theme colors through:
- `text-foreground` - Default text color
- `text-destructive` - Error/warning states  
- `text-muted-foreground` - Secondary text
- Component-specific color classes

---

## 🔄 Component Sync Protocol

### **Monitoring shadcn-svelte Updates**
```bash
# Use Context7 to check for component changes
context_7___getlibrarydocs /huntabyte/shadcn-svelte [component] 
```

### **Update Detection Workflow**
1. **Quarterly Check**: Query Context7 for component updates
2. **Compare Implementation**: Check our component vs their current version
3. **Identify Changes**: API changes, new variants, styling updates
4. **Impact Assessment**: Will changes break our theme system?
5. **Port Changes**: Update while maintaining 38-theme compatibility

### **Sync Checklist Per Component**
- [ ] API compatibility (props, variants, events)
- [ ] Styling patterns match current shadcn-svelte
- [ ] Dependencies align with their requirements  
- [ ] Attribution links point to current docs
- [ ] Theme integration still works across all 38 themes
- [ ] CLI installation tested and working

### **Breaking Change Protocol**
If shadcn-svelte makes breaking changes:
1. **Document the change** in component comments
2. **Maintain backward compatibility** where possible
3. **Update examples** in components page
4. **Test theme compatibility** thoroughly
5. **Update installation instructions** if needed

---

## 🎯 Current Status Reminders

### **Completed Components**
- ✅ Alert (2 variants, icon support, perfect theme integration)
- ✅ Badge (4 variants, perfect theme integration, badgeVariants helper)
- ✅ Button (6 variants, 4 sizes, loading states, icon support with placement)
- ✅ Card (complete family with sub-components)
- ✅ Input (with Label, all input types and states)

### **Icon Integration Status**
- ✅ Deep import pattern established (@lucide/svelte/icons/[name])
- ✅ Button component: icon prop, iconPlacement, icon-only support
- ✅ Alert component: icon prop with proper positioning
- ✅ Performance optimized: No named imports, only deep imports
- ✅ Theme integration: Icons inherit component colors
- ✅ Registry dependencies: @lucide/svelte added to icon components

### **Registry Compatibility Status**
- ✅ Schema references match shadcn-svelte exactly
- ✅ CLI integration with `npx shadcn-svelte@latest add`
- ✅ Component APIs match shadcn-svelte patterns
- ✅ Attribution links to official components
- ✅ File structure follows their conventions
- ✅ Icon patterns match their performance optimizations

### **Next Priorities**
1. 🎯 Badge Component (quick win, high visual impact)
2. 🎯 Alert Component (essential user feedback)
3. 🎯 Avatar Component (visual polish)

### **Key Files**
- **Registry**: `/src/lib/registry.json`
- **Build Script**: `/scripts/build-registry.js`
- **Components Page**: `/src/routes/components/+page.svelte`
- **Theme Store**: `/src/lib/stores/theme.ts`

---

*Use this document to streamline our conversations and maintain consistency*
