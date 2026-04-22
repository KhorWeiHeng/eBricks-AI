import { componentsData } from './src/data.js';
import fs from 'fs';
import path from 'path';

const docsDir = path.resolve('docs/products');

if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

componentsData.forEach(comp => {
  let content = '---\n';
  Object.entries(comp).forEach(([key, value]) => {
    if (key === 'quickStart' && value.code) {
      content += `quickStart:\n  connection:\n`;
      value.connection.forEach(conn => {
        content += `    - ${conn}\n`;
      });
      content += `  code: |\n`;
      value.code.split('\n').forEach(line => {
        content += `    ${line}\n`;
      });
    } else if (key === 'detailedSpecs') {
      content += `detailedSpecs:\n`;
      value.forEach(spec => {
        content += `  - title: ${spec.title}\n    items:\n`;
        Object.entries(spec.items).forEach(([k, v]) => {
          content += `      ${k}: "${v}"\n`;
        });
      });
    } else if (typeof value === 'object' && value !== null) {
      content += `${key}:\n`;
      Object.entries(value).forEach(([k, v]) => {
        content += `  ${k}: "${v}"\n`;
      });
    } else {
      content += `${key}: "${value}"\n`;
    }
  });
  content += '---\n';
  
  fs.writeFileSync(path.join(docsDir, `${comp.id}.md`), content);
});

console.log('Successfully converted data.js to markdown files.');
