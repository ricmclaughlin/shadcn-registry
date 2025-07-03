# Client-Side File-Based Routing in SvelteKit

This guide covers SvelteKit's file-based routing system for static PWAs and single-page applications (SPAs).

## Overview

SvelteKit uses a file-based routing system where the structure of your `src/routes` directory determines your application's routes. For static PWAs, this system generates a client-side router that handles navigation without full page reloads.

## Static Site Configuration

### Basic Setup

Configure SvelteKit for static generation with client-side routing:

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      // Fallback page for client-side routing
      fallback: '200.html', // or '404.html' for GitHub Pages
      
      // Output directories
      pages: 'build',
      assets: 'build',
      
      // Precompress assets
      precompress: false,
      
      // Strict mode ensures all routes are discoverable
      strict: true
    })
  }
};
```

### GitHub Pages Configuration

For GitHub Pages deployment:

```javascript
// svelte.config.js
import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      fallback: '404.html'
    }),
    paths: {
      base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
    }
  }
};

export default config;
```

## File-Based Routing Structure

### Basic Routes

```
src/routes/
├── +page.svelte          # / (home page)
├── about/
│   └── +page.svelte      # /about
├── contact/
│   └── +page.svelte      # /contact
└── blog/
    ├── +page.svelte      # /blog
    └── [slug]/
        └── +page.svelte  # /blog/[slug] (dynamic route)
```

### Route Files

| File | Purpose |
|------|---------|
| `+page.svelte` | Page component |
| `+page.js` | Page data loading (universal) |
| `+page.server.js` | Server-only data loading |
| `+layout.svelte` | Layout component |
| `+layout.js` | Layout data loading |
| `+error.svelte` | Error page |
| `+server.js` | API endpoint |

## Dynamic Routes

### Parameter Routes

```
src/routes/
├── user/
│   └── [id]/
│       └── +page.svelte  # /user/123
├── blog/
│   └── [slug]/
│       └── +page.svelte  # /blog/my-post
└── shop/
    └── [category]/
        └── [product]/
            └── +page.svelte  # /shop/electronics/laptop
```

```svelte
<!-- src/routes/user/[id]/+page.svelte -->
<script>
  import { page } from '$app/state';
  
  // Access route parameters
  let userId = $derived(page.params.id);
</script>

<h1>User Profile: {userId}</h1>
```

### Optional Parameters

```
src/routes/
└── blog/
    └── [[page]]/
        └── +page.svelte  # /blog or /blog/2
```

```svelte
<!-- src/routes/blog/[[page]]/+page.svelte -->
<script>
  import { page } from '$app/state';
  
  let currentPage = $derived(parseInt(page.params.page) || 1);
</script>

<h1>Blog - Page {currentPage}</h1>
```

### Rest Parameters

```
src/routes/
└── files/
    └── [...path]/
        └── +page.svelte  # /files/docs/readme.md
```

```svelte
<!-- src/routes/files/[...path]/+page.svelte -->
<script>
  import { page } from '$app/state';
  
  let filePath = $derived(page.params.path);
</script>

<h1>File: {filePath}</h1>
```

## Data Loading

### Universal Load Functions

Load functions that run on both server and client:

```javascript
// src/routes/blog/[slug]/+page.js
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
  try {
    const response = await fetch(`/api/posts/${params.slug}`);
    
    if (!response.ok) {
      error(404, 'Post not found');
    }
    
    const post = await response.json();
    
    return {
      post,
      title: post.title
    };
  } catch (err) {
    error(500, 'Failed to load post');
  }
}
```

```svelte
<!-- src/routes/blog/[slug]/+page.svelte -->
<script>
  let { data } = $props();
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<article>
  <h1>{data.post.title}</h1>
  <div>{@html data.post.content}</div>
</article>
```

### Client-Only Loading

For static sites, you might need client-only data loading:

```javascript
// src/routes/dashboard/+page.js
import { browser } from '$app/environment';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
  if (!browser) {
    // Return minimal data for SSG
    return {
      user: null,
      stats: null
    };
  }
  
  // Client-side data loading
  try {
    const [userResponse, statsResponse] = await Promise.all([
      fetch('/api/user'),
      fetch('/api/stats')
    ]);
    
    return {
      user: await userResponse.json(),
      stats: await statsResponse.json()
    };
  } catch (error) {
    return {
      user: null,
      stats: null,
      error: error.message
    };
  }
}
```

## Layouts

### Root Layout

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import { page } from '$app/state';
  import Navigation from '$lib/components/Navigation.svelte';
  import Footer from '$lib/components/Footer.svelte';
  
  let { children } = $props();
</script>

<div class="app">
  <Navigation />
  
  <main>
    {@render children()}
  </main>
  
  <Footer />
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  main {
    flex: 1;
  }
</style>
```

### Nested Layouts

```
src/routes/
├── +layout.svelte        # Root layout
├── dashboard/
│   ├── +layout.svelte    # Dashboard layout
│   ├── +page.svelte      # /dashboard
│   ├── analytics/
│   │   └── +page.svelte  # /dashboard/analytics
│   └── settings/
│       └── +page.svelte  # /dashboard/settings
```

```svelte
<!-- src/routes/dashboard/+layout.svelte -->
<script>
  import Sidebar from './Sidebar.svelte';
  
  let { children } = $props();
</script>

<div class="dashboard-layout">
  <Sidebar />
  <div class="content">
    {@render children()}
  </div>
</div>

<style>
  .dashboard-layout {
    display: flex;
    height: 100vh;
  }
  
  .content {
    flex: 1;
    overflow: auto;
  }
</style>
```

## Navigation

### Programmatic Navigation

```svelte
<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/state';
  
  function navigateToProfile() {
    goto('/profile');
  }
  
  function navigateWithState() {
    goto('/dashboard', {
      state: { from: page.url.pathname }
    });
  }
  
  function navigateBack() {
    history.back();
  }
</script>

<button onclick={navigateToProfile}>Go to Profile</button>
<button onclick={navigateWithState}>Go to Dashboard</button>
<button onclick={navigateBack}>Go Back</button>
```

### Link Navigation

```svelte
<script>
  import { page } from '$app/state';
  
  // Check if current route is active
  function isActive(href) {
    return page.url.pathname === href;
  }
</script>

<nav>
  <a href="/" class:active={isActive('/')}>Home</a>
  <a href="/about" class:active={isActive('/about')}>About</a>
  <a href="/contact" class:active={isActive('/contact')}>Contact</a>
</nav>

<style>
  .active {
    font-weight: bold;
    color: var(--primary-color);
  }
</style>
```

### Navigation with State

```svelte
<script>
  import { pushState, replaceState } from '$app/navigation';
  import { page } from '$app/state';
  
  function openModal(itemId) {
    // Update URL without navigation
    pushState(`/items/${itemId}`, {
      showModal: true,
      itemId
    });
  }
  
  function closeModal() {
    history.back();
  }
  
  // React to state changes
  $effect(() => {
    if (page.state.showModal) {
      // Show modal
      console.log('Show modal for item:', page.state.itemId);
    }
  });
</script>
```

## Route Groups and Advanced Patterns

### Route Groups

Organize routes without affecting URLs:

```
src/routes/
├── (app)/
│   ├── +layout.svelte    # Layout for app routes
│   ├── dashboard/
│   │   └── +page.svelte  # /dashboard
│   └── profile/
│       └── +page.svelte  # /profile
├── (marketing)/
│   ├── +layout.svelte    # Layout for marketing routes
│   ├── +page.svelte      # /
│   └── about/
│       └── +page.svelte  # /about
```

### Breaking Layout Inheritance

```
src/routes/
├── (app)/
│   ├── +layout.svelte
│   ├── dashboard/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   └── embed/
│   │       └── +page@(app).svelte  # Inherits from (app) layout only
```

### Parameter Matchers

Create custom parameter validation:

```javascript
// src/params/uuid.js
/** @type {import('@sveltejs/kit').ParamMatcher} */
export function match(param) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(param);
}
```

```
src/routes/
└── user/
    └── [id=uuid]/
        └── +page.svelte  # Only matches valid UUIDs
```

## PWA-Specific Routing Patterns

### Tab Navigation

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import { page } from '$app/state';
  import { goto } from '$app/navigation';
  
  let { children } = $props();
  
  const tabs = [
    { id: 'home', label: 'Home', path: '/', icon: '🏠' },
    { id: 'search', label: 'Search', path: '/search', icon: '🔍' },
    { id: 'favorites', label: 'Favorites', path: '/favorites', icon: '❤️' },
    { id: 'profile', label: 'Profile', path: '/profile', icon: '👤' }
  ];
  
  let activeTab = $derived(() => {
    const path = page.url.pathname;
    return tabs.find(tab => tab.path === path)?.id || 'home';
  });
  
  function switchTab(tab) {
    goto(tab.path);
  }
</script>

<div class="app-shell">
  <main class="content">
    {@render children()}
  </main>
  
  <nav class="bottom-tabs">
    {#each tabs as tab}
      <button 
        class="tab"
        class:active={activeTab === tab.id}
        onclick={() => switchTab(tab)}
      >
        <span class="icon">{tab.icon}</span>
        <span class="label">{tab.label}</span>
      </button>
    {/each}
  </nav>
</div>

<style>
  .app-shell {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  
  .content {
    flex: 1;
    overflow: auto;
  }
  
  .bottom-tabs {
    display: flex;
    background: white;
    border-top: 1px solid #e0e0e0;
    padding: 0.5rem 0;
  }
  
  .tab {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;
    border: none;
    background: none;
    cursor: pointer;
  }
  
  .tab.active {
    color: #007bff;
  }
  
  .icon {
    font-size: 1.5rem;
  }
  
  .label {
    font-size: 0.75rem;
  }
</style>
```

### Modal Routes

```svelte
<!-- src/routes/photos/+page.svelte -->
<script>
  import { page } from '$app/state';
  import { preloadData, pushState, goto } from '$app/navigation';
  import Modal from '$lib/components/Modal.svelte';
  import PhotoDetail from './[id]/+page.svelte';
  
  let { data } = $props();
  
  async function openPhoto(photo) {
    // Preload photo data
    const result = await preloadData(`/photos/${photo.id}`);
    
    if (result.type === 'loaded' && result.status === 200) {
      // Show modal with preloaded data
      pushState(`/photos/${photo.id}`, { 
        showModal: true, 
        photoData: result.data 
      });
    } else {
      // Fallback to navigation
      goto(`/photos/${photo.id}`);
    }
  }
  
  function closeModal() {
    history.back();
  }
</script>

<div class="photo-grid">
  {#each data.photos as photo}
    <button 
      class="photo-thumbnail"
      onclick={() => openPhoto(photo)}
    >
      <img src={photo.thumbnail} alt={photo.title} />
    </button>
  {/each}
</div>

{#if page.state.showModal && page.state.photoData}
  <Modal onclose={closeModal}>
    <PhotoDetail data={page.state.photoData} />
  </Modal>
{/if}
```

## Error Handling

### Custom Error Pages

```svelte
<!-- src/routes/+error.svelte -->
<script>
  import { page } from '$app/state';
</script>

<div class="error-page">
  <h1>{page.status}</h1>
  <p>{page.error?.message || 'An error occurred'}</p>
  
  {#if page.status === 404}
    <p>The page you're looking for doesn't exist.</p>
    <a href="/">Go home</a>
  {:else}
    <p>Something went wrong. Please try again.</p>
    <button onclick={() => location.reload()}>Reload page</button>
  {/if}
</div>
```

### Route-Specific Error Handling

```javascript
// src/routes/api/+page.js
import { error } from '@sveltejs/kit';

export async function load({ fetch }) {
  try {
    const response = await fetch('/api/data');
    
    if (!response.ok) {
      if (response.status === 404) {
        error(404, 'Data not found');
      } else if (response.status === 403) {
        error(403, 'Access denied');
      } else {
        error(500, 'Server error');
      }
    }
    
    return {
      data: await response.json()
    };
  } catch (err) {
    error(500, 'Failed to load data');
  }
}
```

## Performance Optimization

### Preloading

```svelte
<script>
  import { preloadData } from '$app/navigation';
  
  async function handleMouseEnter(href) {
    // Preload on hover
    await preloadData(href);
  }
</script>

<!-- Preload on hover -->
<a 
  href="/slow-page" 
  onmouseenter={() => handleMouseEnter('/slow-page')}
>
  Slow Page
</a>

<!-- Preload immediately -->
<a href="/important-page" data-sveltekit-preload-data>
  Important Page
</a>
```

### Code Splitting

```javascript
// Dynamic imports for code splitting
const LazyComponent = lazy(() => import('$lib/components/LazyComponent.svelte'));
```

## Best Practices

### 1. Route Organization

```
src/routes/
├── (app)/                # Authenticated routes
│   ├── +layout.svelte
│   ├── dashboard/
│   ├── profile/
│   └── settings/
├── (auth)/               # Authentication routes
│   ├── +layout.svelte
│   ├── login/
│   └── register/
├── (public)/             # Public routes
│   ├── +layout.svelte
│   ├── +page.svelte      # Home
│   ├── about/
│   └── contact/
└── api/                  # API routes
    ├── auth/
    └── data/
```

### 2. Data Loading Strategy

```javascript
// Prefer client-side loading for static sites
export async function load({ fetch, url }) {
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // Client-side loading
    const data = await fetch('/api/data').then(r => r.json());
    return { data };
  }
  
  // Return empty state for SSG
  return { data: null };
}
```

### 3. Navigation State Management

```javascript
// stores/navigation.svelte.js
export const navigationState = $state({
  currentRoute: '/',
  previousRoute: null,
  isNavigating: false,
  breadcrumbs: []
});

export function updateNavigation(newRoute) {
  navigationState.previousRoute = navigationState.currentRoute;
  navigationState.currentRoute = newRoute;
  
  // Update breadcrumbs
  const segments = newRoute.split('/').filter(Boolean);
  navigationState.breadcrumbs = segments.map((segment, index) => ({
    label: segment,
    path: '/' + segments.slice(0, index + 1).join('/')
  }));
}
```

## Offline Considerations

### Service Worker Integration

```javascript
// src/app.html - Register service worker
<script>
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
</script>
```

### Offline Route Handling

```javascript
// src/routes/+layout.js
import { browser } from '$app/environment';

export async function load({ url, fetch }) {
  if (browser && !navigator.onLine) {
    // Handle offline state
    return {
      offline: true,
      cachedData: getCachedData(url.pathname)
    };
  }
  
  // Normal online loading
  return {
    offline: false
  };
}
```

### Cache-First Navigation

```svelte
<script>
  import { goto } from '$app/navigation';
  import { browser } from '$app/environment';
  
  async function navigateWithCache(href) {
    if (browser && !navigator.onLine) {
      // Check if route is cached
      const cached = await caches.match(href);
      if (cached) {
        goto(href);
      } else {
        // Show offline message
        showOfflineMessage();
      }
    } else {
      goto(href);
    }
  }
</script>
```

This file-based routing system provides a powerful foundation for building static PWAs with SvelteKit, offering both simplicity and flexibility for complex navigation patterns while maintaining excellent performance and offline capabilities.
