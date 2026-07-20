# [BUG REPORT/PRODUCTION]

KINDERCARE - TEACHER

Note: Những cái nào làm xong → Đánh dấu ghi chữ “Done” để nhận biết

![  **1. Trang login: “Điểm danh QR chỉ trong 1 giây” → *Xóa bỏ hoặc thay bằng chức năng nào khác hợp lý***](4ae88e24-fffe-4caa-b8b3-9528b8e9b935.png)

  **1. Trang login: “Điểm danh QR chỉ trong 1 giây” → *Xóa bỏ hoặc thay bằng chức năng nào khác hợp lý***

![**2. Popup hiển thị chi tiết đơn dặn thuốc → Làm to ra, khi nhấn vào ảnh có thể zoom to ảnh để giáo viên có thể nhìn kỹ hỉnh ảnh thuốc do phụ huynh chụp. Ngoài ra, trên bảng MedicationRequest có cột TeacherNote, nên tạo thêm 1 ô textbox để nhập Note của giáo viên, chỉnh sửa API Update trạng thái Đơn thuốc nhập thêm được Note của giáo viên để hiển thị cho phụ huynh**](image.png)

**2. Popup hiển thị chi tiết đơn dặn thuốc → Làm to ra, khi nhấn vào ảnh có thể zoom to ảnh để giáo viên có thể nhìn kỹ hỉnh ảnh thuốc do phụ huynh chụp. Ngoài ra, trên bảng MedicationRequest có cột TeacherNote, nên tạo thêm 1 ô textbox để nhập Note của giáo viên, chỉnh sửa API Update trạng thái Đơn thuốc nhập thêm được Note của giáo viên để hiển thị cho phụ huynh**

![3. Trang đánh giá định kỳ: Hiện tại k phân biệt được trong tháng, bé nào đã được đánh giá, vẫn có thể đánh giá lại bé đã được đánh giá ở tháng này → ***Expect: Bé nào đã được đánh giá ở tháng này thì hiện badge “Đã đánh giá” ở trong danh sách lớp, khi chọn thì chỉ xem được lịch sử đánh giá và không thể đánh giá lại, và hiển thị stats ở ngay đầu danh sách như “x/y bé đã đánh giá ở tháng z”, có filter danh sách đã đánh giá/chưa đánh giá.***](image%201.png)

3. Trang đánh giá định kỳ: Hiện tại k phân biệt được trong tháng, bé nào đã được đánh giá, vẫn có thể đánh giá lại bé đã được đánh giá ở tháng này → ***Expect: Bé nào đã được đánh giá ở tháng này thì hiện badge “Đã đánh giá” ở trong danh sách lớp, khi chọn thì chỉ xem được lịch sử đánh giá và không thể đánh giá lại, và hiển thị stats ở ngay đầu danh sách như “x/y bé đã đánh giá ở tháng z”, có filter danh sách đã đánh giá/chưa đánh giá.***

![4. Trang y tế - sức khỏe: Bỏ phần nhập nhanh chỉ số cân nặng, chiều cao cho những học sinh chưa nhập. Tương tự như trang đánh giá định kỳ, phân biệt được tháng này, bé nào đã nhập chỉ số sức khỏe, bé nào chưa. Tránh tình trạng 1 tháng có thể cập nhật nhiều lần số đo sức khỏe cho Bé. Mỗi tháng chỉ được nhập 1 lần, nếu có sai sót, tạo thêm API Patch để chỉnh sửa đúng chính xác số đo đó, không phát sinh số đo mới của bé trong tháng. Nêm có thêm 1 date picker sử dụng từ UI kit để select tháng đánh giá chính xác.](image%202.png)

4. Trang y tế - sức khỏe: Bỏ phần nhập nhanh chỉ số cân nặng, chiều cao cho những học sinh chưa nhập. Tương tự như trang đánh giá định kỳ, phân biệt được tháng này, bé nào đã nhập chỉ số sức khỏe, bé nào chưa. Tránh tình trạng 1 tháng có thể cập nhật nhiều lần số đo sức khỏe cho Bé. Mỗi tháng chỉ được nhập 1 lần, nếu có sai sót, tạo thêm API Patch để chỉnh sửa đúng chính xác số đo đó, không phát sinh số đo mới của bé trong tháng. Nêm có thêm 1 date picker sử dụng từ UI kit để select tháng đánh giá chính xác.

![5. Trang tạo/soạn thời khóa biểu tháng: Nếu tháng này đã tạo TKB, và đã được hiệu trưởng duyệt [Trên db bảng MonthlySchedule có Approved status = 1 && IsActive = 1], ẩn các ô textbox chỉnh sửa thông tin TKB cùng với các tuần → Chỉ hiện Card có badge “Đã được duyệt”, tên Chủ đề tháng, có dropdown hoặc arrow để chuyển qua lại xem các thông tin TKB của tuần trong tháng đã được duyệt như Số tuần | Tên chủ đề tuần,…. Còn những tháng chưa tạo, chưa được duyệt thì hiện chỉnh sửa như bình thường. Update lại màu card Tháng x/năm y (màu xanh biển) về màu xanh lá của Kindercare cho đồng nhất UI](image%203.png)

5. Trang tạo/soạn thời khóa biểu tháng: Nếu tháng này đã tạo TKB, và đã được hiệu trưởng duyệt [Trên db bảng MonthlySchedule có Approved status = 1 && IsActive = 1], ẩn các ô textbox chỉnh sửa thông tin TKB cùng với các tuần → Chỉ hiện Card có badge “Đã được duyệt”, tên Chủ đề tháng, có dropdown hoặc arrow để chuyển qua lại xem các thông tin TKB của tuần trong tháng đã được duyệt như Số tuần | Tên chủ đề tuần,…. Còn những tháng chưa tạo, chưa được duyệt thì hiện chỉnh sửa như bình thường. Update lại màu card Tháng x/năm y (màu xanh biển) về màu xanh lá của Kindercare cho đồng nhất UI

![6. UI điểm danh làm các card chỉ số tổng quan gọn lại. Focus chủ yếu vào danh sách điểm danh ngày hôm nay: Danh sách điểm danh ở chỗ trạng thái → Nếu bé có status điểm danh là đã điểm danh/vắng không phép/Nghỉ học có phép, không cho chuyển status nữa, chỉ có thể chuyển status những bé có trạng thái chưa điểm danh. Các trạng thái điểm danh được highlight màu theo từng status cho dễ nhận biết. **Ở phần lọc trạng thái điểm danh hiện tại chưa lọc được, trả về danh sách rỗng khi lọc**](image%204.png)

6. UI điểm danh làm các card chỉ số tổng quan gọn lại. Focus chủ yếu vào danh sách điểm danh ngày hôm nay: Danh sách điểm danh ở chỗ trạng thái → Nếu bé có status điểm danh là đã điểm danh/vắng không phép/Nghỉ học có phép, không cho chuyển status nữa, chỉ có thể chuyển status những bé có trạng thái chưa điểm danh. Các trạng thái điểm danh được highlight màu theo từng status cho dễ nhận biết. **Ở phần lọc trạng thái điểm danh hiện tại chưa lọc được, trả về danh sách rỗng khi lọc**

![7. Hiện tại không hỗ trợ đặt tên biệt danh, điều chỉnh tổ, nhóm → Bỏ đi ](image%205.png)

7. Hiện tại không hỗ trợ đặt tên biệt danh, điều chỉnh tổ, nhóm → Bỏ đi 

![8. Không có chức năng tạo thực đơn ở giáo viên. Giáo viên chỉ get danh sách thực đơn. Tạo thực đơn là chức năng đã có ở hiệu trưởng. Ngoài ra, chỉ hiển thị UI card thực đơn từ T2→T6, không hiển thị T7,CN](image%206.png)

8. Không có chức năng tạo thực đơn ở giáo viên. Giáo viên chỉ get danh sách thực đơn. Tạo thực đơn là chức năng đã có ở hiệu trưởng. Ngoài ra, chỉ hiển thị UI card thực đơn từ T2→T6, không hiển thị T7,CN

![9. Không có chức năng “Bài học hôm nay”. Chức năng ghi nhận điểm danh và sinh hoạt hiện tại chưa sử dụng được.](image%207.png)

9. Không có chức năng “Bài học hôm nay”. Chức năng ghi nhận điểm danh và sinh hoạt hiện tại chưa sử dụng được.

![10. Biểu đồ radar 5 tiêu chí chưa hoạt động](image%208.png)

10. Biểu đồ radar 5 tiêu chí chưa hoạt động

→ Summary: Rà soát lại tất cả các UI, còn những chỗ chưa hiển thị OK ở những text box. Danh sách xem TKB tương phản hiển thị chưa được tốt