import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function buildRegistry() {
  console.log('Building registry files...');
  
  try {
    // Read the main registry file
    const registryPath = path.join(__dirname, '../src/lib/registry.json');
    const registryContent = await fs.readFile(registryPath, 'utf-8');
    const registry = JSON.parse(registryContent);
    
    // Ensure output directory exists
    const outputDir = path.join(__dirname, '../static/r');
    await fs.mkdir(outputDir, { recursive: true });
    
    // Copy main registry.json to static
    await fs.writeFile(
      path.join(__dirname, '../static/registry.json'),
      JSON.stringify(registry, null, 2)
    );
    
    // Process each registry item
    for (const item of registry.items) {
      console.log(`Processing ${item.name}...`);
      
      let sourcePath;
      
      if (item.type === 'registry:theme') {
        // Handle theme files
        let sourceFileName;
        if (item.name.endsWith('-theme')) {
          sourceFileName = item.name.replace('-theme', '');
        } else {
          sourceFileName = item.name;
        }
        sourcePath = path.join(__dirname, '../src/lib/registry/themes', `${sourceFileName}.json`);
      } else if (item.type === 'registry:ui') {
        // Handle UI component files
        sourcePath = path.join(__dirname, '../src/lib/registry/components', `${item.name}.json`);
      } else {
        console.warn(`⚠️  Unknown item type: ${item.type} for ${item.name}`);
        continue;
      }
      
      try {
        const sourceContent = await fs.readFile(sourcePath, 'utf-8');
        
        // Write to static directory
        const outputPath = path.join(outputDir, `${item.name}.json`);
        await fs.writeFile(outputPath, sourceContent);
        
        console.log(`✓ Built ${item.name}.json`);
      } catch (error) {
        console.error(`❌ Failed to process ${item.name}:`, error.message);
      }
    }
    
    console.log('✅ Registry build complete!');
    console.log(`📁 Files available at:`);
    console.log(`   - /static/registry.json`);
    console.log(`   - /static/r/[item-name].json`);
    
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

buildRegistry();
