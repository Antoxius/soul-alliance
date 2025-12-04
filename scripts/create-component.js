import fs from 'fs';
import path from 'path';

const componentName = process.argv[2];

if (!componentName) {
  console.error('❌ Please provide a component name!');
  console.log('Usage: npm run create:component ComponentName');
  process.exit(1);
}

const componentDir = path.join('src', 'Components', componentName);
const componentFile = path.join(componentDir, `${componentName}.jsx`);
const styleFile = path.join(componentDir, `${componentName}.scss`);

// Component template
const componentTemplate = `import './${componentName}.scss';

function ${componentName}() {
  return (
    <div className="${componentName.toLowerCase()}">
      <h1>${componentName}</h1>
    </div>
  );
}

export default ${componentName};
`;

// Style template
const styleTemplate = `.${componentName.toLowerCase()} {
  // Add your styles here
}
`;

// Create directory if it doesn't exist
if (!fs.existsSync(componentDir)) {
  fs.mkdirSync(componentDir, { recursive: true });
  console.log(`✓ Created directory: ${componentDir}`);
} else {
  console.log(`⚠️  Directory already exists: ${componentDir}`);
}

// Create component file
if (!fs.existsSync(componentFile)) {
  fs.writeFileSync(componentFile, componentTemplate);
  console.log(`✓ Created component: ${componentFile}`);
} else {
  console.log(`⚠️  Component already exists: ${componentFile}`);
}

// Create style file
if (!fs.existsSync(styleFile)) {
  fs.writeFileSync(styleFile, styleTemplate);
  console.log(`✓ Created styles: ${styleFile}`);
} else {
  console.log(`⚠️  Style file already exists: ${styleFile}`);
}

console.log(`\n✨ Component "${componentName}" is ready!`);
