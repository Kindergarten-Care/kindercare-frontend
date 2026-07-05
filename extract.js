const fs = require('fs');
const html = fs.readFileSync('KinderCare Schedule v2 (1).html', 'utf8');
const match = html.match(/<script type="__bundler\/template">\s*(.*?)\s*<\/script>/);
if (match) {
    const template = JSON.parse(match[1]);
    fs.writeFileSync('extracted_template.html', template);
    console.log('Template extracted successfully.');
} else {
    console.log('Template not found.');
}
