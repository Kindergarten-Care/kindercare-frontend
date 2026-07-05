const fs = require('fs');
const content = fs.readFileSync('KinderCare Schedule.html', 'utf8');
const parts = content.split('<script type="__bundler/template">');

if (parts.length > 1) {
  const jsonStr = parts[1].split('</script>')[0].trim();
  try {
    const templateContent = JSON.parse(jsonStr);
    fs.writeFileSync('extracted_template.html', templateContent);
    console.log('Successfully extracted HTML template.');
  } catch (e) {
    console.error('Error parsing JSON:', e);
  }
} else {
  console.log('Could not find template block.');
}
