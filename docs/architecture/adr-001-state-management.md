# ADR-001: State Management with Svelte 5 Runes

## Status
Accepted

## Date
2025-07-03

## Context
We need a state management solution for our static PWA that:
- Works well with SvelteKit's static generation
- Provides reactive state across components
- Supports complex UI patterns like app shells and bottom tabs
- Is performant and maintainable
- Works entirely client-side

## Decision
We will use **Svelte 5 Runes** as our primary state management solution.

### Approach:
1. **Global State**: Module-level `$state` in `.svelte.js` files
2. **Component Tree State**: Context API with `$state` 
3. **Computed Values**: `$derived` for calculations
4. **Side Effects**: `$effect` for DOM updates, persistence, etc.
5. **Persistence**: Combine `$state` with `$effect` and localStorage

## Rationale

### Advantages:
- **Native to Svelte 5**: No external dependencies
- **Fine-grained reactivity**: Only updates what actually changed
- **Universal**: Works in components, modules, and outside Svelte
- **Performance**: No proxy overhead for primitives
- **Type-safe**: Full TypeScript support
- **Simple**: Less boilerplate than traditional stores

### Compared to Alternatives:
- **Svelte 4 Stores**: Runes provide better performance and simpler API
- **External libraries (Redux, Zustand)**: Adds complexity and bundle size
- **Context only**: Limited to component trees, no global state

## Implementation Pattern

```javascript
// stores/app-state.svelte.js
export const appState = $state({
  activeTab: 'home',
  user: null,
  theme: 'light'
});

export function setActiveTab(tab) {
  appState.activeTab = tab;
}
```

```svelte
<!-- Component usage -->
<script>
  import { appState, setActiveTab } from '$lib/stores/app-state.svelte.js';
</script>

<button onclick={() => setActiveTab('profile')}>
  Current: {appState.activeTab}
</button>
```

## Consequences

### Positive:
- Consistent state management across the application
- Easy to test and debug
- Excellent performance characteristics
- Future-proof with Svelte's direction

### Negative:
- Requires Svelte 5 (cutting edge at time of decision)
- Team needs to learn runes syntax
- Migration path needed if moving from Svelte 4 stores

## Compliance
This decision aligns with our project rules:
- ✅ Uses modern Svelte patterns
- ✅ Supports static generation
- ✅ Maintains performance requirements
- ✅ Enables PWA patterns
