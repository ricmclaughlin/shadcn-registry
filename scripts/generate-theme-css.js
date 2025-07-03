import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateThemeCSS() {
  console.log('Generating theme CSS with dark mode support...');
  
  try {
    // Read all theme files
    const themesDir = path.join(__dirname, '../src/lib/registry/themes');
    const themeFiles = await fs.readdir(themesDir);
    
    let generatedCSS = `/* Generated Theme CSS with Dark Mode Support */\n/* This file is auto-generated. Do not edit manually. */\n\n`;
    
    for (const themeFile of themeFiles) {
      if (!themeFile.endsWith('.json')) continue;
      
      const themeName = themeFile.replace('.json', '');
      const themeContent = await fs.readFile(path.join(themesDir, themeFile), 'utf-8');
      const theme = JSON.parse(themeContent);
      
      console.log(`Processing theme: ${themeName}`);
      
      // Generate light mode CSS
      if (theme.cssVars?.light) {
        generatedCSS += `.theme-${themeName} {\n`;
        
        // Add theme-specific variables (fonts, radius, etc.)
        if (theme.cssVars.theme) {
          for (const [key, value] of Object.entries(theme.cssVars.theme)) {
            generatedCSS += `  --${key}: ${value};\n`;
          }
        }
        
        // Add light mode colors
        for (const [key, value] of Object.entries(theme.cssVars.light)) {
          generatedCSS += `  --${key}: ${value};\n`;
        }
        
        generatedCSS += `}\n\n`;
      }
      
      // Generate dark mode CSS
      if (theme.cssVars?.dark) {
        generatedCSS += `.dark .theme-${themeName} {\n`;
        
        // Add dark mode colors
        for (const [key, value] of Object.entries(theme.cssVars.dark)) {
          generatedCSS += `  --${key}: ${value};\n`;
        }
        
        generatedCSS += `}\n\n`;
      }
    }
    
    // Write the generated CSS to a file
    const outputPath = path.join(__dirname, '../src/lib/generated-themes.css');
    await fs.writeFile(outputPath, generatedCSS);
    
    console.log(`✅ Generated theme CSS with dark mode support!`);
    console.log(`📁 Output: src/lib/generated-themes.css`);
    console.log(`📊 Processed ${themeFiles.filter(f => f.endsWith('.json')).length} themes`);
    
  } catch (error) {
    console.error('❌ Theme CSS generation failed:', error);
    process.exit(1);
  }
}

generateThemeCSS();
