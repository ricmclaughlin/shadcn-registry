# ADR-002: Client-Side File-Based Routing

## Status
Accepted

## Date
2025-07-03

## Context
We need a routing solution for our static PWA that:
- Works with static site generation
- Provides client-side navigation without page reloads
- Supports complex PWA patterns (tabs, modals, deep linking)
- Maintains SEO benefits where possible
- Handles offline scenarios gracefully

## Decision
We will use **SvelteKit's file-based routing** with **adapter-static** for client-side routing.

### Configuration:
```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      fallback: '200.html', // Single fallback for all routes
      strict: true
    })
  }
};
```

## Rationale

### Advantages:
- **File-based**: Routes defined by directory structure
- **Client-side navigation**: Fast transitions without page reloads
- **Static generation**: SEO-friendly initial HTML
- **Flexible**: Supports dynamic routes, layouts, error handling
- **PWA-ready**: Works offline with proper caching

### Compared to Alternatives:
- **Hash routing**: Poor SEO, ugly URLs
- **Manual routing**: More complex, error-prone
- **Server-side routing**: Doesn't work for static hosting

## Implementation Patterns

### Route Structure:
```
src/routes/
├── +layout.svelte          # Root layout (app shell)
├── +page.svelte           # Home page
├── search/
│   └── +page.svelte       # Search page
├── profile/
│   └── +page.svelte       # Profile page
└── settings/
    ├── +layout.svelte     # Settings layout
    └── +page.svelte       # Settings page
```

### Navigation:
```svelte
<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  
  function navigateToTab(path) {
    goto(path);
  }
</script>
```

### Modal Routes:
```svelte
<script>
  import { pushState, preloadData } from '$app/navigation';
  
  async function openModal(itemId) {
    const result = await preloadData(`/items/${itemId}`);
    pushState(`/items/${itemId}`, { showModal: true, data: result.data });
  }
</script>
```

## Consequences

### Positive:
- Familiar file-based routing pattern
- Excellent performance with preloading
- SEO benefits from static generation
- Supports complex PWA navigation patterns
- Works offline once cached

### Negative:
- Requires understanding of SvelteKit routing concepts
- Static generation means no server-side dynamic routes
- Fallback handling needed for deep links

## PWA-Specific Considerations

### Tab Navigation:
- Use layout components to maintain tab state
- Leverage `page` store for active tab detection
- Implement proper back button handling

### Modal Routes:
- Use `pushState` for modal URLs without navigation
- Preload modal content for performance
- Handle browser back button for modal dismissal

### Offline Handling:
- Static files cached by service worker
- Client-side routing works offline
- Graceful degradation for API calls

## Compliance
This decision aligns with our project rules:
- ✅ Supports static generation and deployment
- ✅ Enables PWA patterns and offline functionality
- ✅ Maintains performance requirements
- ✅ Provides good developer experience
