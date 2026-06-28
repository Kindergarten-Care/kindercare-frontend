const fs = require('fs');
const path = require('path');

const targetFile = 'd:\\DATN\\Frontend\\kindercare-frontend\\kindercare_db_test (4).sql';

// Helper to create date timestamp at 00:00:00 UTC
function getUtcStartOfDay(year, month, day) {
  return Math.floor(Date.UTC(year, month - 1, day) / 1000);
}

// Helper to get exact timestamp for an hour and minute on a given date (assuming UTC for simplicity in DB)
function getExactTime(baseTimestamp, hour, minute) {
  return baseTimestamp + (hour * 3600) + (minute * 60);
}

// Dates
const dates = [
  { name: 'Monday (This Week)', ts: getUtcStartOfDay(2026, 6, 29) },
  { name: 'Tuesday (This Week)', ts: getUtcStartOfDay(2026, 6, 30) },
  { name: 'Wednesday (This Week)', ts: getUtcStartOfDay(2026, 7, 1) },
  { name: 'Monday (Next Week)', ts: getUtcStartOfDay(2026, 7, 6) }
];

let sql = '\n\n-- --- APPENDED BY AI AGENT --- \n\n';

// 1. LeaveRequests
sql += '-- LeaveRequests (Đơn xin nghỉ mới)\n';
const lr1From = getUtcStartOfDay(2026, 6, 29) + 7*3600;
const lr1To = getUtcStartOfDay(2026, 6, 29) + 17*3600;
const lr2From = getUtcStartOfDay(2026, 6, 30) + 7*3600;
const lr2To = getUtcStartOfDay(2026, 7, 2) + 17*3600;
const lr3From = getUtcStartOfDay(2026, 7, 6) + 7*3600;
const lr3To = getUtcStartOfDay(2026, 7, 6) + 17*3600;

sql += `INSERT INTO \`LeaveRequests\` (\`RequestID\`, \`StudentID\`, \`ParentID\`, \`FromDate\`, \`ToDate\`, \`Reason\`, \`Status\`, \`ApproverID\`, \`ParentNotes\`, \`CreatedAt\`, \`UpdatedTime\`) VALUES 
(100, 19, 6, ${lr1From}, ${lr1To}, 'Bé bị ốm sốt nhẹ', 'Pending', NULL, 'Gia đình xin phép cho bé nghỉ hôm nay để theo dõi sức khỏe.', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(101, 105, 4, ${lr2From}, ${lr2To}, 'Việc gia đình', 'Approved', 5, 'Gia đình có chuyến đi xa nên xin phép cho bé nghỉ 3 ngày.', UNIX_TIMESTAMP(), UNIX_TIMESTAMP()),
(102, 108, 6, ${lr3From}, ${lr3To}, 'Khám bệnh định kỳ', 'Pending', NULL, 'Xin phép cô cho bé nghỉ thứ 2 tuần tới để đi khám răng.', UNIX_TIMESTAMP(), UNIX_TIMESTAMP());\n\n`;

// 2. DailySchedules
sql += '-- DailySchedules (Lịch trình tuần này và tuần sau)\n';
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

let idCounter = 200;
let scheduleVals = [];

dates.forEach((d) => {
  // Determine status based on date (fake logic: past days are Xong, today is Đang diễn ra, future is Chưa diễn ra)
  let status = 'Chưa diễn ra';
  if (d.name.includes('Monday (This')) status = 'Xong';
  if (d.name.includes('Tuesday (This')) status = 'Đang diễn ra';

  scheduleItems.forEach((item, idx) => {
    const st = getExactTime(d.ts, item.startH, item.startM);
    const et = getExactTime(d.ts, item.endH, item.endM);
    
    // For 'Đang diễn ra', set first 4 items to Xong, 5th to Đang diễn ra, rest Chưa diễn ra
    let itemStatus = status;
    if (status === 'Đang diễn ra') {
      if (idx < 4) itemStatus = 'Xong';
      else if (idx === 4) itemStatus = 'Đang diễn ra';
      else itemStatus = 'Chưa diễn ra';
    }

    scheduleVals.push(`(${idCounter++}, 1, ${d.ts}, ${st}, ${et}, '${item.name}', '${item.details}', '${item.loc}', '${item.type}', '${itemStatus}', UNIX_TIMESTAMP(), UNIX_TIMESTAMP())`);
  });
});

sql += scheduleVals.join(',\n') + ';\n\n';

fs.appendFileSync(targetFile, sql, 'utf8');
console.log('Appended SQL mock data to the file successfully!');
