const fs = require('fs');
const path = require('path');

const srcDir = path.join(process.cwd(), 'apps', 'teacher', 'src');

const replacements = [
  { from: /@\/services\/attendance/g, to: '@/services/Attendance/AttendanceService' },
  { from: /@\/services\/activities/g, to: '@/services/Activities/ActivitiesService' },
  { from: /@\/services\/leave-requests/g, to: '@/services/LeaveRequest/LeaveRequestService' },
  { from: /@\/services\/medical-requests/g, to: '@/services/MedicalRequest/MedicalRequestService' },
  { from: /@\/services\/newsfeed/g, to: '@/services/Newsfeed/NewsfeedService' },
  { from: /@\/services\/schedule(\"|\')/g, to: '@/services/schedule/ScheduleService$1' }
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;
      for (const r of replacements) {
        if (r.from.test(content)) {
          content = content.replace(r.from, r.to);
          changed = true;
        }
      }
      if (changed) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated: ' + fullPath);
      }
    }
  }
}

processDirectory(srcDir);
