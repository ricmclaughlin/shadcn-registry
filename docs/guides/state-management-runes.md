# Client-Side State Management with Svelte 5 Runes

This guide covers modern state management patterns using Svelte 5 runes for static PWAs and client-side applications.

## Overview

Svelte 5 introduces **runes** - a new reactive system that provides explicit, fine-grained reactivity. Unlike Svelte 4's implicit reactivity, runes work consistently across components, modules, and even outside of Svelte components.

## Core Runes for State Management

### `$state` - Reactive State

The foundation of reactive state management in Svelte 5.

```javascript
// Basic reactive state
let count = $state(0);
let user = $state({ name: 'John', email: 'john@example.com' });

// Deep reactivity for objects and arrays
let todos = $state([
  { id: 1, text: 'Learn Svelte 5', done: false },
  { id: 2, text: 'Build PWA', done: false }
]);

// Modifying nested properties triggers reactivity
todos[0].done = true; // ✅ UI updates automatically
todos.push({ id: 3, text: 'Deploy app', done: false }); // ✅ UI updates
```

### `$derived` - Computed Values

Create values that automatically update when their dependencies change.

```javascript
let firstName = $state('John');
let lastName = $state('Doe');

// Automatically updates when firstName or lastName changes
let fullName = $derived(firstName + ' ' + lastName);

// Complex derived state
let todos = $state([...]);
let completedCount = $derived(todos.filter(t => t.done).length);
let progress = $derived(Math.round((completedCount / todos.length) * 100));
```

### `$effect` - Side Effects

Handle side effects that should run when reactive state changes.

```javascript
let theme = $state('light');

// Persist theme to localStorage
$effect(() => {
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme);
});

// Cleanup effects
$effect(() => {
  const interval = setInterval(() => {
    console.log('Current count:', count);
  }, 1000);

  return () => clearInterval(interval);
});
```

## Global State Management Patterns

### 1. Module-Level State (Recommended)

Create shared reactive state in `.svelte.js` files:

```javascript
// stores/app-state.svelte.js
export const appState = $state({
  user: null,
  theme: 'light',
  activeTab: 'home',
  notifications: [],
  isOnline: navigator.onLine
});

export const userState = $state({
  preferences: {
    language: 'en',
    notifications: true
  },
  profile: null
});

// Actions/mutations
export function setUser(user) {
  appState.user = user;
  userState.profile = user.profile;
}

export function addNotification(notification) {
  appState.notifications.push({
    id: Date.now(),
    timestamp: new Date(),
    ...notification
  });
}

export function removeNotification(id) {
  const index = appState.notifications.findIndex(n => n.id === id);
  if (index > -1) {
    appState.notifications.splice(index, 1);
  }
}

export function setTheme(newTheme) {
  appState.theme = newTheme;
}
```

### 2. Using Global State in Components

```svelte
<!-- App.svelte -->
<script>
  import { appState, setTheme, addNotification } from './stores/app-state.svelte.js';
  import { onMount } from 'svelte';

  // Reactive to global state changes
  $effect(() => {
    console.log('Current user:', appState.user);
    console.log('Theme changed to:', appState.theme);
  });

  onMount(() => {
    // Initialize app state
    addNotification({
      type: 'info',
      message: 'Welcome to the app!'
    });
  });
</script>

<div class="app" data-theme={appState.theme}>
  <header>
    <h1>My PWA</h1>
    <button onclick={() => setTheme(appState.theme === 'light' ? 'dark' : 'light')}>
      Toggle Theme
    </button>
  </header>

  <main>
    {#if appState.user}
      <p>Welcome, {appState.user.name}!</p>
    {:else}
      <p>Please log in</p>
    {/if}

    <!-- Notifications -->
    {#each appState.notifications as notification (notification.id)}
      <div class="notification notification--{notification.type}">
        {notification.message}
      </div>
    {/each}
  </main>
</div>
```

### 3. Context API for Component Trees

Use context for state that should be shared within a component subtree:

```svelte
<!-- TabContainer.svelte -->
<script>
  import { setContext } from 'svelte';

  let tabState = $state({
    activeTab: 'home',
    tabs: [
      { id: 'home', label: 'Home', component: null },
      { id: 'profile', label: 'Profile', component: null },
      { id: 'settings', label: 'Settings', component: null }
    ],
    history: []
  });

  function switchTab(tabId) {
    if (tabState.activeTab !== tabId) {
      tabState.history.push(tabState.activeTab);
      tabState.activeTab = tabId;
    }
  }

  function goBack() {
    if (tabState.history.length > 0) {
      tabState.activeTab = tabState.history.pop();
    }
  }

  // Provide context to child components
  setContext('tabs', {
    state: tabState,
    switchTab,
    goBack
  });
</script>

<div class="tab-container">
  <slot />
</div>
```

```svelte
<!-- TabButton.svelte -->
<script>
  import { getContext } from 'svelte';

  let { tabId, children } = $props();
  
  const { state, switchTab } = getContext('tabs');
  
  let isActive = $derived(state.activeTab === tabId);
</script>

<button 
  class="tab-button"
  class:active={isActive}
  onclick={() => switchTab(tabId)}
>
  {@render children()}
</button>
```

## Advanced State Patterns

### 1. State with Validation

```javascript
// stores/form-state.svelte.js
export const formState = $state({
  values: {
    email: '',
    password: '',
    confirmPassword: ''
  },
  errors: {},
  isValid: false,
  isSubmitting: false
});

// Derived validation
export const validationState = $derived.by(() => {
  const errors = {};
  
  if (!formState.values.email.includes('@')) {
    errors.email = 'Invalid email address';
  }
  
  if (formState.values.password.length < 8) {
    errors.password = 'Password must be at least 8 characters';
  }
  
  if (formState.values.password !== formState.values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  formState.errors = errors;
  formState.isValid = Object.keys(errors).length === 0;
  
  return { errors, isValid: formState.isValid };
});

export function updateField(field, value) {
  formState.values[field] = value;
}

export async function submitForm() {
  if (!formState.isValid) return;
  
  formState.isSubmitting = true;
  
  try {
    // API call
    await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify(formState.values)
    });
    
    // Reset form on success
    formState.values = { email: '', password: '', confirmPassword: '' };
  } catch (error) {
    formState.errors.submit = error.message;
  } finally {
    formState.isSubmitting = false;
  }
}
```

### 2. Persistent State

```javascript
// stores/persistent-state.svelte.js
import { browser } from '$app/environment';

// Initialize from localStorage if available
function createPersistedState(key, defaultValue) {
  let initialValue = defaultValue;
  
  if (browser) {
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        initialValue = JSON.parse(stored);
      } catch (e) {
        console.warn(`Failed to parse stored value for ${key}:`, e);
      }
    }
  }
  
  const state = $state(initialValue);
  
  // Persist changes to localStorage
  if (browser) {
    $effect(() => {
      localStorage.setItem(key, JSON.stringify(state));
    });
  }
  
  return state;
}

export const userPreferences = createPersistedState('userPreferences', {
  theme: 'light',
  language: 'en',
  notifications: true,
  autoSave: true
});

export const appSettings = createPersistedState('appSettings', {
  sidebarCollapsed: false,
  defaultView: 'grid',
  itemsPerPage: 20
});
```

### 3. Async State Management

```javascript
// stores/async-state.svelte.js
export const apiState = $state({
  users: {
    data: [],
    loading: false,
    error: null,
    lastFetch: null
  },
  posts: {
    data: [],
    loading: false,
    error: null,
    lastFetch: null
  }
});

export async function fetchUsers() {
  apiState.users.loading = true;
  apiState.users.error = null;
  
  try {
    const response = await fetch('/api/users');
    if (!response.ok) throw new Error('Failed to fetch users');
    
    const users = await response.json();
    apiState.users.data = users;
    apiState.users.lastFetch = new Date();
  } catch (error) {
    apiState.users.error = error.message;
  } finally {
    apiState.users.loading = false;
  }
}

export async function createUser(userData) {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) throw new Error('Failed to create user');
    
    const newUser = await response.json();
    apiState.users.data.push(newUser);
    
    return newUser;
  } catch (error) {
    apiState.users.error = error.message;
    throw error;
  }
}
```

## Best Practices

### 1. State Organization

```javascript
// Good: Organize related state together
export const todoState = $state({
  items: [],
  filter: 'all', // 'all', 'active', 'completed'
  editingId: null
});

// Good: Separate concerns
export const uiState = $state({
  sidebarOpen: false,
  modalOpen: false,
  loading: false
});

// Avoid: Mixing unrelated state
// export const mixedState = $state({
//   todos: [],
//   userProfile: {},
//   apiKeys: [],
//   theme: 'light'
// });
```

### 2. Mutation Patterns

```javascript
// Good: Clear mutation functions
export function addTodo(text) {
  todoState.items.push({
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date()
  });
}

export function toggleTodo(id) {
  const todo = todoState.items.find(t => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
}

// Good: Batch updates
export function clearCompleted() {
  todoState.items = todoState.items.filter(t => !t.completed);
}
```

### 3. Derived State

```javascript
// Good: Use derived for computed values
export const todoStats = $derived.by(() => {
  const total = todoState.items.length;
  const completed = todoState.items.filter(t => t.completed).length;
  const active = total - completed;
  
  return { total, completed, active };
});

export const filteredTodos = $derived.by(() => {
  switch (todoState.filter) {
    case 'active':
      return todoState.items.filter(t => !t.completed);
    case 'completed':
      return todoState.items.filter(t => t.completed);
    default:
      return todoState.items;
  }
});
```

### 4. Error Handling

```javascript
export const errorState = $state({
  global: null,
  field: {}
});

export function setError(error, field = null) {
  if (field) {
    errorState.field[field] = error;
  } else {
    errorState.global = error;
  }
}

export function clearError(field = null) {
  if (field) {
    delete errorState.field[field];
  } else {
    errorState.global = null;
    errorState.field = {};
  }
}
```

## Migration from Svelte 4 Stores

If migrating from Svelte 4 stores:

```javascript
// Svelte 4 (stores)
import { writable, derived } from 'svelte/store';

export const count = writable(0);
export const doubled = derived(count, $count => $count * 2);

// Svelte 5 (runes)
export const count = $state(0);
export const doubled = $derived(count * 2);
```

```svelte
<!-- Svelte 4 usage -->
<script>
  import { count } from './stores.js';
</script>

<p>Count: {$count}</p>
<button onclick={() => $count++}>Increment</button>

<!-- Svelte 5 usage -->
<script>
  import { count } from './stores.svelte.js';
</script>

<p>Count: {count}</p>
<button onclick={() => count++}>Increment</button>
```

## Performance Considerations

1. **Fine-grained reactivity**: Runes only update what actually changed
2. **No proxy overhead for primitives**: Simple values remain simple
3. **Lazy evaluation**: Derived values only compute when accessed
4. **Automatic cleanup**: Effects are automatically cleaned up

## Common Patterns Summary

- **Global app state**: Use module-level `$state` in `.svelte.js` files
- **Component tree state**: Use Context API with `$state`
- **Computed values**: Use `$derived` for calculations
- **Side effects**: Use `$effect` for DOM updates, API calls, etc.
- **Persistence**: Combine `$state` with `$effect` and localStorage
- **Validation**: Use `$derived` for form validation logic
- **Async operations**: Manage loading/error states with `$state`

This approach provides a modern, performant, and maintainable state management solution for static PWAs built with SvelteKit.
