const fs = require('fs');
const html = fs.readFileSync('d:/DATN/Frontend/kindercare-frontend/KinderCare Dashboard v4.html', 'utf8');
const start = html.indexOf('<script type="__bundler/template">') + '<script type="__bundler/template">'.length;
const end = html.indexOf('</script>', start);
if (start > -1 && end > -1) {
  const jsonStr = html.substring(start, end).trim();
  fs.writeFileSync('d:/DATN/Frontend/kindercare-frontend/Extracted.json', jsonStr);
  console.log('Successfully saved ' + jsonStr.length + ' bytes to Extracted.json');
} else {
  console.log('Template not found');
}
