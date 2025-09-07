import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to update JSON files with production paths
async function updateJsonPaths(resourcesDir) {
  const dataDir = path.join(resourcesDir, 'data');
  
  // Get all JSON files in the data directory
  const jsonFiles = await fs.readdir(dataDir);
  
  for (const file of jsonFiles) {
    if (file.endsWith('.json')) {
      const filePath = path.join(dataDir, file);
      try {
        const content = await fs.readFile(filePath, 'utf-8');
        let updatedContent = content;
        
        // Update image paths from ./Assets/ to ./resources/assets/
        updatedContent = updatedContent.replace(/\.\/Assets\//g, './resources/assets/');
        updatedContent = updatedContent.replace(/\/Assets\//g, '/resources/assets/');
        
        // Write back the updated content
        await fs.writeFile(filePath, updatedContent);
        console.log(`✅ Updated paths in ${file}`);
      } catch (error) {
        console.warn(`⚠️ Could not update paths in ${file}:`, error.message);
      }
    }
  }
}

// Define paths
const cosmosPortfolioRoot = path.resolve(__dirname, '..');
const portfolioRoot = path.resolve(cosmosPortfolioRoot, '..');
const distDir = path.resolve(portfolioRoot, 'dist');
const resourcesDir = path.resolve(portfolioRoot, 'resources');

async function copyResources() {
  try {
    console.log('🚀 Starting resource copying process...');

    // Create resources directory structure
    await fs.ensureDir(path.join(resourcesDir, 'assets'));
    await fs.ensureDir(path.join(resourcesDir, 'data'));

    // Copy assets from public/Assets to resources/assets
    const publicAssetsDir = path.join(cosmosPortfolioRoot, 'public', 'Assets');
    if (await fs.pathExists(publicAssetsDir)) {
      await fs.copy(publicAssetsDir, path.join(resourcesDir, 'assets'));
      console.log('✅ Copied public assets to resources/assets');
    }

    // Copy assets from src/assets to resources/assets (if exists)
    const srcAssetsDir = path.join(cosmosPortfolioRoot, 'src', 'assets');
    if (await fs.pathExists(srcAssetsDir)) {
      await fs.copy(srcAssetsDir, path.join(resourcesDir, 'assets'), {
        overwrite: false // Don't overwrite existing files
      });
      console.log('✅ Copied src assets to resources/assets');
    }

    // Copy data from public/Data to resources/data
    const publicDataDir = path.join(cosmosPortfolioRoot, 'public', 'Data');
    if (await fs.pathExists(publicDataDir)) {
      await fs.copy(publicDataDir, path.join(resourcesDir, 'data'));
      console.log('✅ Copied public data to resources/data');
    }

    // Copy data from src/data to resources/data (if exists)
    const srcDataDir = path.join(cosmosPortfolioRoot, 'src', 'data');
    if (await fs.pathExists(srcDataDir)) {
      await fs.copy(srcDataDir, path.join(resourcesDir, 'data'), {
        overwrite: false // Don't overwrite existing files
      });
      console.log('✅ Copied src data to resources/data');
    }

    // Copy the built index.html from dist to portfolio root
    const distIndexPath = path.join(distDir, 'index.html');
    const rootIndexPath = path.join(portfolioRoot, 'index.html');
    
    if (await fs.pathExists(distIndexPath)) {
      // Read the index.html file
      let indexContent = await fs.readFile(distIndexPath, 'utf-8');
      
      // Update asset paths to point to resources/
      indexContent = indexContent.replace(/href="\.\/assets\//g, 'href="./resources/assets/');
      indexContent = indexContent.replace(/src="\.\/assets\//g, 'src="./resources/assets/');
      indexContent = indexContent.replace(/url\(\.\/assets\//g, 'url(./resources/assets/');
      
      // Update favicon and other asset references
      indexContent = indexContent.replace(/href="\.\/Assets\//g, 'href="./resources/assets/');
      indexContent = indexContent.replace(/src="\.\/Assets\//g, 'src="./resources/assets/');
      
      // Write the updated index.html to root
      await fs.writeFile(rootIndexPath, indexContent);
      console.log('✅ Copied and updated index.html to portfolio root');
    }

    // Update JSON files to use production paths
    await updateJsonPaths(resourcesDir);

    // Copy any additional assets from dist to resources/assets
    const distAssetsDir = path.join(distDir, 'assets');
    if (await fs.pathExists(distAssetsDir)) {
      await fs.copy(distAssetsDir, path.join(resourcesDir, 'assets'));
      console.log('✅ Copied dist assets to resources/assets');
    }

    console.log('🎉 Resource copying completed successfully!');
    console.log(`📁 Resources directory: ${resourcesDir}`);
    console.log(`📄 Index file: ${rootIndexPath}`);

  } catch (error) {
    console.error('❌ Error during resource copying:', error);
    process.exit(1);
  }
}

copyResources();
