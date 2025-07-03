# Documentation

This directory contains comprehensive documentation for the SvelteKit PWA component registry project.

## Structure

### Architecture (`/architecture`)
Architecture Decision Records (ADRs) documenting key technical decisions:
- [ADR-001: State Management with Svelte 5 Runes](./architecture/adr-001-state-management.md)
- [ADR-002: Client-Side File-Based Routing](./architecture/adr-002-routing-approach.md)

### Implementation Guides (`/guides`)
Detailed implementation guides for core patterns:
- [State Management with Runes](./guides/state-management-runes.md) - Complete guide to using Svelte 5 runes for state management
- [Client-Side Routing](./guides/client-side-routing.md) - SvelteKit file-based routing for static PWAs

### Component Documentation (`/components`)
Documentation for specific component patterns and APIs:
- Coming soon: App Shell, Bottom Tabs, Layout Patterns

### Examples (`/examples`)
Practical examples and common patterns:
- Coming soon: PWA patterns, Common layouts

## Quick Reference

### Key Decisions Made
1. **State Management**: Svelte 5 runes for reactive state
2. **Routing**: SvelteKit file-based routing with adapter-static
3. **Architecture**: Static PWA with client-side hydration
4. **Component Patterns**: Tailwind CSS + shadcn/ui inspired components

### Getting Started
1. Read the [State Management Guide](./guides/state-management-runes.md) to understand reactive patterns
2. Review the [Routing Guide](./guides/client-side-routing.md) for navigation patterns
3. Check the [Architecture Decisions](./architecture/) to understand why these choices were made

### For AI Assistant Reference
This documentation is structured to be easily referenced during implementation:
- ADRs provide context for architectural decisions
- Guides provide detailed implementation patterns
- Component docs will provide specific APIs and usage examples

The documentation follows our established patterns and can be used to ensure consistency across implementations.
