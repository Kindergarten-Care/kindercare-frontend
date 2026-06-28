const fs = require('fs');
const path = require('path');

const targetFile = 'd:\\DATN\\Frontend\\kindercare-frontend\\kindercare_db_test (4).sql';

// Helper to create date timestamp at 00:00:00 UTC
function getUtcStartOfDay(year, month, day) {
  return Math.floor(Date.UTC(year, month - 1, day) / 1000);
}

// Helper to get exact timestamp for an hour and minute on a given date
function getExactTime(baseTimestamp, hour, minute) {
  return baseTimestamp + (hour * 3600) + (minute * 60);
}

let sql = '\n\n-- --- APPENDED FOR TODAY (SUNDAY) --- \n\n';

const todayTs = getUtcStartOfDay(2026, 6, 28); // June 28, 2026

sql += `INSERT INTO \`DailySchedules\` (\`DailyScheduleID\`, \`ClassID\`, \`ScheduleDate\`, \`StartTime\`, \`EndTime\`, \`ActivityName\`, \`Details\`, \`Location\`, \`ActivityType\`, \`Status\`, \`CreatedAt\`, \`UpdatedAt\`) VALUES \n`;

const scheduleItems = [
  { startH: 7, startM: 15, endH: 8, endM: 0, name: 'Đón bé & Kiểm tra vệ sinh sáng', details: 'Đón tại cổng', loc: 'Cổng A', type: 'pickup' },
  { startH: 8, startM: 0, endH: 8, endM: 30, name: 'Thể dục buổi sáng ngoài sân', details: 'Tập bài dân vũ', loc: 'Sân trường', type: 'study' },
  { startH: 8, startM: 30, endH: 9, endM: 0, name: 'Ăn sáng & Vệ sinh cá nhân', details: 'Súp cua', loc: 'Phòng ăn', type: 'meal' },
  { startH: 9, startM: 0, endH: 10, endM: 15, name: 'Học tập chuyên đề', details: 'Khám phá thiên nhiên', loc: 'Lớp học', type: 'study' },
  { startH: 10, startM: 15, endH: 11, endM: 15, name: 'Vui chơi tự do ở góc học tập', details: 'Xếp hình lego', loc: 'Lớp học', type: 'play' },
  { startH: 11, startM: 15, endH: 12, endM: 0, name: 'Ăn trưa & chuẩn bị giờ ngủ trưa', details: 'Cơm thịt xào', loc: 'Phòng ăn', type: 'meal' },
  { startH: 12, startM: 0, endH: 14, endM: 0, name: 'Giấc ngủ trưa của trẻ', details: 'Ngủ sâu', loc: 'Phòng ngủ', type: 'nap' },
  { startH: 14, startM: 0, endH: 14, endM: 30, name: 'Ăn xế chiều', details: 'Bánh flan', loc: 'Phòng ăn', type: 'meal' },
  { startH: 14, startM: 30, endH: 16, endM: 0, name: 'Hoạt động kể chuyện cổ tích', details: 'Cô kể bé nghe', loc: 'Lớp học', type: 'study' },
  { startH: 16, startM: 0, endH: 17, endM: 0, name: 'Vệ sinh & Trả trẻ cho phụ huynh', details: 'Vệ sinh sạch sẽ', loc: 'Cổng A', type: 'dropoff' }
];

let idCounter = 300;
let scheduleVals = [];

// For 'Đang diễn ra', set first 4 items to Xong, 5th to Đang diễn ra, rest Chưa diễn ra
scheduleItems.forEach((item, idx) => {
  const st = getExactTime(todayTs, item.startH, item.startM);
  const et = getExactTime(todayTs, item.endH, item.endM);
  
  let itemStatus = 'Chưa diễn ra';
  if (idx < 4) itemStatus = 'Xong';
  else if (idx === 4) itemStatus = 'Đang diễn ra';

  scheduleVals.push(`(${idCounter++}, 1, ${todayTs}, ${st}, ${et}, '${item.name}', '${item.details}', '${item.loc}', '${item.type}', '${itemStatus}', UNIX_TIMESTAMP(), UNIX_TIMESTAMP())`);
});

sql += scheduleVals.join(',\n') + ';\n\n';

fs.appendFileSync(targetFile, sql, 'utf8');
console.log('Appended TODAY schedule data successfully!');
