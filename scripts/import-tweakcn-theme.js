#!/usr/bin/env node

/**
 * Script to import themes from TweakCN registry
 * Usage: node scripts/import-tweakcn-theme.js <theme-name>
 * Example: node scripts/import-tweakcn-theme.js doom-64
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TWEAKCN_REGISTRY_URL = 'https://tweakcn.com/r/registry.json';

async function fetchTweakCNRegistry() {
  try {
    const response = await fetch(TWEAKCN_REGISTRY_URL);
    if (!response.ok) {
      throw new Error(`Failed to fetch TweakCN registry: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('❌ Failed to fetch TweakCN registry:', error.message);
    process.exit(1);
  }
}

function convertTweakCNTheme(tweakCNTheme, themeName) {
  // Convert TweakCN theme format to our registry format
  const theme = {
    "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
    "name": `${themeName}-theme`,
    "type": "registry:theme",
    "title": tweakCNTheme.title,
    "description": tweakCNTheme.description,
    "cssVars": {
      "theme": {
        "font-sans": tweakCNTheme.cssVars.theme['font-sans'] || "system-ui, sans-serif",
        "font-mono": tweakCNTheme.cssVars.theme['font-mono'] || "ui-monospace, monospace",
        "font-serif": tweakCNTheme.cssVars.theme['font-serif'] || "ui-serif, serif",
        "radius": tweakCNTheme.cssVars.theme.radius || "0.5rem"
      },
      "light": {
        "background": tweakCNTheme.cssVars.light.background,
        "foreground": tweakCNTheme.cssVars.light.foreground,
        "card": tweakCNTheme.cssVars.light.card,
        "card-foreground": tweakCNTheme.cssVars.light['card-foreground'],
        "popover": tweakCNTheme.cssVars.light.popover,
        "popover-foreground": tweakCNTheme.cssVars.light['popover-foreground'],
        "primary": tweakCNTheme.cssVars.light.primary,
        "primary-foreground": tweakCNTheme.cssVars.light['primary-foreground'],
        "secondary": tweakCNTheme.cssVars.light.secondary,
        "secondary-foreground": tweakCNTheme.cssVars.light['secondary-foreground'],
        "muted": tweakCNTheme.cssVars.light.muted,
        "muted-foreground": tweakCNTheme.cssVars.light['muted-foreground'],
        "accent": tweakCNTheme.cssVars.light.accent,
        "accent-foreground": tweakCNTheme.cssVars.light['accent-foreground'],
        "destructive": tweakCNTheme.cssVars.light.destructive,
        "destructive-foreground": tweakCNTheme.cssVars.light['destructive-foreground'],
        "border": tweakCNTheme.cssVars.light.border,
        "input": tweakCNTheme.cssVars.light.input,
        "ring": tweakCNTheme.cssVars.light.ring
      },
      "dark": {
        "background": tweakCNTheme.cssVars.dark.background,
        "foreground": tweakCNTheme.cssVars.dark.foreground,
        "card": tweakCNTheme.cssVars.dark.card,
        "card-foreground": tweakCNTheme.cssVars.dark['card-foreground'],
        "popover": tweakCNTheme.cssVars.dark.popover,
        "popover-foreground": tweakCNTheme.cssVars.dark['popover-foreground'],
        "primary": tweakCNTheme.cssVars.dark.primary,
        "primary-foreground": tweakCNTheme.cssVars.dark['primary-foreground'],
        "secondary": tweakCNTheme.cssVars.dark.secondary,
        "secondary-foreground": tweakCNTheme.cssVars.dark['secondary-foreground'],
        "muted": tweakCNTheme.cssVars.dark.muted,
        "muted-foreground": tweakCNTheme.cssVars.dark['muted-foreground'],
        "accent": tweakCNTheme.cssVars.dark.accent,
        "accent-foreground": tweakCNTheme.cssVars.dark['accent-foreground'],
        "destructive": tweakCNTheme.cssVars.dark.destructive,
        "destructive-foreground": tweakCNTheme.cssVars.dark['destructive-foreground'],
        "border": tweakCNTheme.cssVars.dark.border,
        "input": tweakCNTheme.cssVars.dark.input,
        "ring": tweakCNTheme.cssVars.dark.ring
      }
    }
  };

  return theme;
}

async function importTheme(themeName) {
  console.log(`🔍 Importing theme: ${themeName}`);
  
  // Fetch TweakCN registry
  const registry = await fetchTweakCNRegistry();
  
  // Find the theme
  const tweakCNTheme = registry.items.find(item => item.name === themeName);
  if (!tweakCNTheme) {
    console.error(`❌ Theme "${themeName}" not found in TweakCN registry`);
    console.log('Available themes:');
    registry.items.forEach(item => {
      console.log(`  - ${item.name}: ${item.title}`);
    });
    process.exit(1);
  }
  
  // Convert theme
  const convertedTheme = convertTweakCNTheme(tweakCNTheme, themeName);
  
  // Write theme file
  const themeFilePath = path.join(__dirname, '../src/lib/registry/themes', `${themeName}.json`);
  await fs.writeFile(themeFilePath, JSON.stringify(convertedTheme, null, 2));
  
  console.log(`✅ Theme saved to: ${themeFilePath}`);
  console.log(`📝 Next steps:`);
  console.log(`   1. Add the theme to src/lib/registry.json`);
  console.log(`   2. Update src/routes/api/r/[item]/+server.ts`);
  console.log(`   3. Add theme to src/routes/+page.svelte themes array`);
  console.log(`   4. Add CSS variables to the style section`);
  console.log(`   5. Run: npm run registry:build`);
}

// Get theme name from command line arguments
const themeName = process.argv[2];
if (!themeName) {
  console.error('❌ Please provide a theme name');
  console.log('Usage: node scripts/import-tweakcn-theme.js <theme-name>');
  console.log('Example: node scripts/import-tweakcn-theme.js doom-64');
  process.exit(1);
}

importTheme(themeName);
