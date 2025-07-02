# Themes Documentation

This registry includes a collection of beautiful themes adapted from various sources, including TweakCN.

## Available Themes

### Original Themes
- **Material Theme** - Material Design inspired theme with rounded corners and vibrant colors
- **Minimal Theme** - Clean, minimal theme with subtle colors and sharp edges  
- **Corporate Theme** - Professional corporate theme with conservative colors

### TweakCN-Inspired Themes
- **Twitter Theme** - A theme inspired by Twitter's design with rounded corners and blue accents
- **Bubblegum Theme** - A playful theme with pink and pastel colors inspired by bubblegum
- **Catppuccin Theme** - A soothing pastel theme inspired by the popular Catppuccin color palette
- **Graphite Theme** - A sleek monochromatic theme with subtle grays and clean aesthetics

## Installation

Users can install any theme using the shadcn-svelte CLI:

```bash
npx shadcn-svelte@latest add https://your-registry.com/api/r/twitter-theme
npx shadcn-svelte@latest add https://your-registry.com/api/r/bubblegum-theme
npx shadcn-svelte@latest add https://your-registry.com/api/r/catppuccin-theme
npx shadcn-svelte@latest add https://your-registry.com/api/r/graphite-theme
```

## Adding New Themes

### From TweakCN

Use the import script to easily add themes from TweakCN:

```bash
node scripts/import-tweakcn-theme.js <theme-name>
```

For example:
```bash
node scripts/import-tweakcn-theme.js doom-64
node scripts/import-tweakcn-theme.js mocha-mousse
```

### Manual Theme Creation

1. Create a new theme file in `src/lib/registry/themes/[theme-name].json`
2. Follow the schema format:

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
  "name": "theme-name-theme",
  "type": "registry:theme",
  "title": "Theme Display Name",
  "description": "Theme description",
  "cssVars": {
    "theme": {
      "font-sans": "Font family",
      "font-mono": "Monospace font",
      "font-serif": "Serif font",
      "radius": "Border radius"
    },
    "light": {
      "background": "oklch(...)",
      "foreground": "oklch(...)",
      // ... other CSS variables
    },
    "dark": {
      "background": "oklch(...)",
      "foreground": "oklch(...)",
      // ... other CSS variables
    }
  }
}
```

3. Update `src/lib/registry.json` to include the new theme
4. Update `src/routes/api/r/[item]/+server.ts` to import and serve the theme
5. Add the theme to the homepage theme selector
6. Add CSS variables for live preview
7. Build the registry: `npm run registry:build`

## Theme Structure

Each theme includes:

- **Theme variables**: Font families, border radius, etc.
- **Light mode colors**: Complete color palette for light mode
- **Dark mode colors**: Complete color palette for dark mode

All colors use the OKLCH color space for better perceptual uniformity and accessibility.

## Color Variables

Standard shadcn-svelte color variables supported:

- `background` / `foreground`
- `card` / `card-foreground`
- `popover` / `popover-foreground`
- `primary` / `primary-foreground`
- `secondary` / `secondary-foreground`
- `muted` / `muted-foreground`
- `accent` / `accent-foreground`
- `destructive` / `destructive-foreground`
- `border`
- `input`
- `ring`

## Credits

- Original themes created for this registry
- TweakCN-inspired themes adapted from [TweakCN](https://tweakcn.com) by Sahaj Jain
- Catppuccin theme inspired by the [Catppuccin](https://catppuccin.com) color palette
