const fs = require('fs');
const path = require('path');
function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      const original = content;
      content = content.replace(/font-family:\s*["']Plus Jakarta Sans["'],\s*sans-serif;/g, 'font-family: inherit;');
      content = content.replace(/font-family:\s*['"]Be Vietnam Pro['"],\s*system-ui,\s*sans-serif;/g, 'font-family: inherit;');
      content = content.replace(/font-family:\s*['"]Inter['"],\s*system-ui,\s*sans-serif;/g, 'font-family: inherit;');
      if (content !== original) {
        fs.writeFileSync(fullPath, content);
        console.log('Updated: ' + fullPath);
      }
    }
  }
}
walk('apps/teacher/src');
