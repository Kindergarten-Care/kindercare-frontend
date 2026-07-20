const fs = require('fs');
const path = require('path');

const srcFile = path.join(process.cwd(), 'apps', 'teacher', 'src', 'hooks', 'useTeacherQueries.ts');
const queriesDir = path.join(process.cwd(), 'apps', 'teacher', 'src', 'hooks', 'queries');

if (!fs.existsSync(queriesDir)) {
  fs.mkdirSync(queriesDir, { recursive: true });
}

const content = fs.readFileSync(srcFile, 'utf8');
const lines = content.split('\n');

const imports = [];
let currentSection = 'default';
const sections = { 'default': [] };

for (const line of lines) {
  if (line.startsWith('import ')) {
    imports.push(line);
    continue;
  }
  
  if (line.startsWith('// ─── ')) {
    const sectionMatch = line.match(/\/\/ ─── (.*?) ──/);
    if (sectionMatch) {
      currentSection = sectionMatch[1].trim();
      sections[currentSection] = [];
      continue;
    }
  }
  
  if (!sections[currentSection]) sections[currentSection] = [];
  sections[currentSection].push(line);
}

const commonImports = imports.join('\n') + '\n\n';

for (const [sectionName, sectionLines] of Object.entries(sections)) {
  if (sectionName === 'default' && sectionLines.join('').trim() === '') continue;
  
  let fileName = 'use' + sectionName.replace(/\s+/g, '') + 'Queries.ts';
  if (sectionName === 'default') fileName = 'useMiscQueries.ts';
  
  const fileContent = commonImports + sectionLines.join('\n');
  fs.writeFileSync(path.join(queriesDir, fileName), fileContent, 'utf8');
  console.log('Created ' + fileName);
}
