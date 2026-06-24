-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: kindercare-mysql:3306
-- Generation Time: Jun 24, 2026 at 06:12 AM
-- Server version: 8.0.45
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kindercare_db_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `AcademicYears`
--

CREATE TABLE `AcademicYears` (
  `YearID` int NOT NULL,
  `YearName` varchar(50) NOT NULL,
  `StartDate` bigint NOT NULL,
  `EndDate` bigint NOT NULL,
  `IsActive` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `AcademicYears`
--

INSERT INTO `AcademicYears` (`YearID`, `YearName`, `StartDate`, `EndDate`, `IsActive`) VALUES
(1, 'Niên khóa 2026-2027', 1788566400, 1811721600, 1);

-- --------------------------------------------------------

--
-- Table structure for table `Admins`
--

CREATE TABLE `Admins` (
  `AdminID` int NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Admins`
--

INSERT INTO `Admins` (`AdminID`, `FullName`, `PhoneNumber`, `Email`) VALUES
(1, 'Hệ thống Admin IT', '0988888888', 'admin@kindercare.edu.vn');

-- --------------------------------------------------------

--
-- Table structure for table `Attendances`
--

CREATE TABLE `Attendances` (
  `AttendanceID` int NOT NULL,
  `StudentID` int DEFAULT NULL,
  `AttendanceDate` bigint NOT NULL,
  `Status` varchar(50) NOT NULL,
  `CheckInTime` bigint DEFAULT NULL,
  `CheckOutTime` bigint DEFAULT NULL,
  `PickedUpBy` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Attendances`
--

INSERT INTO `Attendances` (`AttendanceID`, `StudentID`, `AttendanceDate`, `Status`, `CheckInTime`, `CheckOutTime`, `PickedUpBy`) VALUES
(1, 20, 1778803200, 'Present', 1778830200, 1778862600, 'Bà nội'),
(2, 21, 1778803200, 'Present', 1778831100, 1778863500, 'Mẹ'),
(3, 22, 1778803200, 'Absent', NULL, NULL, NULL),
(4, 23, 1778803200, 'Present', 1778229600, 1778864400, 'Ba'),
(5, 105, 1781740800, 'Present', 1781767800, NULL, NULL),
(7, 107, 1781740800, 'Absent', NULL, NULL, NULL),
(8, 108, 1781740800, 'Excused', NULL, NULL, NULL),
(9, 109, 1781740800, 'Present', 1781774100, NULL, NULL),
(11, 19, 1781740800, 'Present', 1781767500, NULL, NULL),
(16, 114, 1781740800, 'Absent', NULL, NULL, NULL),
(17, 115, 1781740800, 'Excused', NULL, NULL, NULL),
(25, 110, 1781740800, 'Absent', NULL, NULL, NULL),
(26, 111, 1781740800, 'Absent', NULL, NULL, NULL),
(27, 112, 1781740800, 'Excused', NULL, NULL, NULL),
(28, 116, 1781740800, 'Excused', NULL, NULL, NULL),
(30, 118, 1781740800, 'Absent', NULL, NULL, NULL),
(31, 119, 1781740800, 'Absent', NULL, NULL, NULL),
(32, 120, 1781740800, 'Absent', NULL, NULL, NULL),
(33, 121, 1781740800, 'Absent', NULL, NULL, NULL),
(34, 122, 1781740800, 'Absent', NULL, NULL, NULL),
(35, 1, 1781740800, 'Absent', NULL, NULL, NULL),
(36, 123, 1781740800, 'Present', 1781768700, NULL, NULL),
(37, 124, 1781740800, 'Present', 1781768700, NULL, NULL),
(38, 125, 1781740800, 'Present', 1781768700, NULL, NULL),
(39, 126, 1781740800, 'Present', 1781768700, NULL, NULL),
(40, 127, 1781740800, 'Present', 1781768700, NULL, NULL),
(41, 128, 1781740800, 'Present', 1781768700, NULL, NULL),
(42, 129, 1781740800, 'Present', 1781768700, NULL, NULL),
(43, 130, 1781740800, 'Present', 1781768700, NULL, NULL),
(44, 131, 1781740800, 'Present', 1781768700, NULL, NULL),
(45, 132, 1781740800, 'Present', 1781768700, NULL, NULL),
(46, 133, 1781740800, 'Present', 1781768700, NULL, NULL),
(47, 134, 1781740800, 'Present', 1781768700, NULL, NULL),
(48, 135, 1781740800, 'Present', 1781768700, NULL, NULL),
(49, 136, 1781740800, 'Present', 1781768700, NULL, NULL),
(50, 137, 1781740800, 'Present', 1781768700, NULL, NULL),
(51, 138, 1781740800, 'Present', 1781768700, NULL, NULL),
(52, 139, 1781740800, 'Present', 1781768700, NULL, NULL),
(53, 140, 1781740800, 'Present', 1781768700, NULL, NULL),
(54, 141, 1781740800, 'Present', 1781768700, NULL, NULL),
(55, 142, 1781740800, 'Present', 1781768700, NULL, NULL),
(67, 143, 1781740800, 'Excused', NULL, NULL, NULL),
(68, 144, 1781740800, 'Excused', NULL, NULL, NULL),
(69, 110, 1781827200, 'Present', 1781854200, NULL, NULL),
(70, 138, 1781827200, 'Present', 1781854200, NULL, NULL),
(71, 117, 1781827200, 'Present', 1781854200, NULL, NULL),
(72, 109, 1781827200, 'Present', 1781855820, NULL, NULL),
(73, 131, 1781827200, 'Present', 1781854200, NULL, NULL),
(74, 142, 1781827200, 'Present', 1781854200, NULL, NULL),
(75, 108, 1781827200, 'Absent', NULL, NULL, NULL),
(76, 19, 1782000000, 'Absent', NULL, NULL, NULL),
(77, 110, 1782000000, 'Present', 1782010080, NULL, NULL),
(78, 106, 1782086400, 'Excused', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `BaseFees`
--

CREATE TABLE `BaseFees` (
  `FeeID` int NOT NULL,
  `YearID` int DEFAULT NULL,
  `MonthlyTuition` decimal(15,2) NOT NULL,
  `DailyMealFee` decimal(15,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Buildings`
--

CREATE TABLE `Buildings` (
  `BuildingID` int NOT NULL,
  `BuildingName` varchar(100) NOT NULL,
  `CampusID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Buildings`
--

INSERT INTO `Buildings` (`BuildingID`, `BuildingName`, `CampusID`) VALUES
(1, 'Tòa A (Khối Mầm)', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Campuses`
--

CREATE TABLE `Campuses` (
  `CampusID` int NOT NULL,
  `CampusName` varchar(100) NOT NULL,
  `Address` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Campuses`
--

INSERT INTO `Campuses` (`CampusID`, `CampusName`, `Address`) VALUES
(1, 'Cơ sở 1 - Quận 1', '65 Huỳnh Thúc Kháng, Bến Nghé, Q1');

-- --------------------------------------------------------

--
-- Table structure for table `Classes`
--

CREATE TABLE `Classes` (
  `ClassID` int NOT NULL,
  `ClassName` varchar(50) NOT NULL,
  `GradeID` int DEFAULT NULL,
  `BuildingID` int DEFAULT NULL,
  `YearID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Classes`
--

INSERT INTO `Classes` (`ClassID`, `ClassName`, `GradeID`, `BuildingID`, `YearID`) VALUES
(1, 'Mầm 1', 1, 1, 1),
(2, 'Mầm 2', 1, 1, 1),
(3, 'Chồi 1', 2, 1, 1),
(4, 'Chồi 2', 2, 1, 1),
(5, 'Lá 1', 3, 1, 1),
(6, 'Lá 2', 3, 1, 1),
(7, 'Lá 3', 3, 1, 1),
(9, 'Chồi 4', 2, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `ClassTeachers`
--

CREATE TABLE `ClassTeachers` (
  `ClassID` int NOT NULL,
  `TeacherID` int NOT NULL,
  `RoleInClass` varchar(50) DEFAULT NULL,
  `AssignedDate` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ClassTeachers`
--

INSERT INTO `ClassTeachers` (`ClassID`, `TeacherID`, `RoleInClass`, `AssignedDate`) VALUES
(1, 5, 'Giáo viên trưởng', 1781082000),
(7, 7, 'Giáo viên chính', 1755216000),
(7, 8, 'Giáo viên phụ', 1755216000),
(9, 5, 'Giáo viên chính', 1755216000);

-- --------------------------------------------------------

--
-- Table structure for table `Conversations`
--

CREATE TABLE `Conversations` (
  `ConversationID` int NOT NULL,
  `TeacherID` int NOT NULL,
  `ParentID` int NOT NULL,
  `LastMessage` text,
  `UpdatedAt` bigint DEFAULT (unix_timestamp())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `DailyActivities`
--

CREATE TABLE `DailyActivities` (
  `ActivityID` int NOT NULL,
  `StudentID` int DEFAULT NULL,
  `ActivityDate` bigint NOT NULL,
  `EatingStatus` varchar(50) DEFAULT NULL,
  `SleepingStatus` varchar(50) DEFAULT NULL,
  `HygieneStatus` varchar(50) DEFAULT NULL,
  `TeacherNote` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `DailyActivities`
--

INSERT INTO `DailyActivities` (`ActivityID`, `StudentID`, `ActivityDate`, `EatingStatus`, `SleepingStatus`, `HygieneStatus`, `TeacherNote`) VALUES
(1, 20, 1778803200, 'Ăn hết suất', 'Ngủ ngoan', 'Tốt', 'Bảo hôm nay tự xúc cơm rất giỏi.'),
(2, 21, 1778803200, 'Ăn chậm', 'Khó ngủ', 'Bình thường', 'Bé trưa trằn trọc, cô phải vỗ về 30 phút mới ngủ.'),
(3, 23, 1778803200, 'Ăn hết suất', 'Ngủ ngoan', 'Tốt', 'Diệp nay ngoan, giúp cô cất đồ chơi.');

-- --------------------------------------------------------

--
-- Table structure for table `DailySchedules`
--

CREATE TABLE `DailySchedules` (
  `DailyScheduleID` int NOT NULL,
  `ClassID` int NOT NULL,
  `ScheduleDate` bigint NOT NULL,
  `StartTime` bigint NOT NULL,
  `EndTime` bigint NOT NULL,
  `ActivityName` varchar(150) NOT NULL,
  `Details` text,
  `Location` varchar(100) DEFAULT NULL,
  `ActivityType` enum('pickup','meal','study','nap','play','dropoff','other') DEFAULT 'study',
  `Status` enum('Chưa diễn ra','Đang diễn ra','Xong') DEFAULT 'Chưa diễn ra',
  `CreatedAt` bigint DEFAULT (unix_timestamp()),
  `UpdatedAt` bigint DEFAULT (unix_timestamp())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `DailySchedules`
--

INSERT INTO `DailySchedules` (`DailyScheduleID`, `ClassID`, `ScheduleDate`, `StartTime`, `EndTime`, `ActivityName`, `Details`, `Location`, `ActivityType`, `Status`, `CreatedAt`, `UpdatedAt`) VALUES
(1, 1, 1784160000, 1784187000, 1784188800, 'Đón bé & Chào hỏi', NULL, 'Cổng A', 'pickup', 'Xong', 1781359832, 1781359832),
(2, 1, 1784160000, 1784188800, 1784190600, 'Ăn sáng', 'Cháo yến mạch + sữa', NULL, 'meal', 'Xong', 1781359832, 1781359832),
(3, 1, 1784160000, 1784190600, 1784196000, 'Hoạt động sáng tạo', 'Vẽ tranh & tô màu', NULL, 'study', 'Xong', 1781359832, 1781359832),
(4, 1, 1784160000, 1784196000, 1784199600, 'Vận động ngoài trời', 'Sân vườn - Chơi tự do', 'Sân vườn', 'play', 'Xong', 1781359832, 1781359832),
(5, 1, 1784160000, 1784199600, 1784201400, 'Ăn trưa', 'Cơm + canh + thịt', NULL, 'meal', 'Xong', 1781359832, 1781359832),
(6, 1, 1784160000, 1784201400, 1784206800, 'Ngủ trưa', 'Phòng ngủ - 25°C', 'Phòng ngủ', 'nap', 'Xong', 1781359832, 1781359832),
(7, 1, 1784160000, 1784206800, 1784210400, 'Giờ chơi nhóm', 'Xếp hình & kể chuyện', NULL, 'play', 'Xong', 1781359832, 1781359832),
(8, 1, 1784160000, 1784210400, 1784212200, 'Học tiếng Anh', 'Từ vựng chủ đề con vật', NULL, 'study', 'Xong', 1781359832, 1781359832),
(9, 1, 1784160000, 1784212200, 1784214000, 'Ăn xế', 'Bánh mì + sữa chua', NULL, 'meal', 'Xong', 1781359832, 1781359832),
(10, 1, 1784160000, 1784221200, 1784223000, 'Giờ tan học', NULL, 'Cổng chính', 'dropoff', 'Xong', 1781359832, 1781359832),
(11, 1, 1782172800, 1782199800, 1782201600, 'Đón trẻ & Thể dục sáng', 'Cô đón bé tại cửa lớp, tập thể dục nhẹ nhàng.', NULL, 'dropoff', 'Chưa diễn ra', 1782215794, 1782215794),
(12, 1, 1782172800, 1782201600, 1782204300, 'Ăn sáng', 'Cháo lươn đồng.', NULL, 'meal', 'Chưa diễn ra', 1782215794, 1782215794),
(13, 1, 1782172800, 1782204300, 1782207000, 'Hoạt động học', 'Khám phá khoa học: Tại sao trời mưa?', NULL, 'study', 'Chưa diễn ra', 1782215794, 1782215794),
(14, 1, 1782172800, 1782207000, 1782210600, 'Hoạt động ngoài trời', 'Vận động với vòng và cầu trượt.', NULL, 'play', 'Chưa diễn ra', 1782215794, 1782215794),
(15, 1, 1782172800, 1782212400, 1782216000, 'Ăn trưa', 'Ăn cơm cùng các bạn.', NULL, 'meal', 'Chưa diễn ra', 1782215794, 1782215794),
(16, 1, 1782172800, 1782216000, 1782225000, 'Ngủ trưa', 'Ngủ trưa tại lớp.', NULL, 'nap', 'Chưa diễn ra', 1782215794, 1782215794),
(17, 1, 1782172800, 1782225000, 1782228600, 'Ăn xế & Sinh hoạt', 'Sữa chua và Bánh quy. Chơi tự do.', NULL, 'meal', 'Chưa diễn ra', 1782215794, 1782215794),
(18, 1, 1782172800, 1782228600, 1782234000, 'Trả trẻ', 'Chuẩn bị đồ dùng và đợi ba mẹ đến đón.', NULL, 'pickup', 'Chưa diễn ra', 1782215794, 1782215794);

-- --------------------------------------------------------

--
-- Table structure for table `DailyStudentLessons`
--

CREATE TABLE `DailyStudentLessons` (
  `LessonLogID` int NOT NULL,
  `StudentID` int NOT NULL,
  `LessonDate` bigint NOT NULL,
  `SubjectName` varchar(50) NOT NULL,
  `LessonTitle` varchar(150) NOT NULL,
  `Details` text NOT NULL,
  `IconType` varchar(50) DEFAULT 'default',
  `CreatedAt` bigint DEFAULT (unix_timestamp()),
  `UpdatedAt` bigint DEFAULT (unix_timestamp())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `DailyStudentLessons`
--

INSERT INTO `DailyStudentLessons` (`LessonLogID`, `StudentID`, `LessonDate`, `SubjectName`, `LessonTitle`, `Details`, `IconType`, `CreatedAt`, `UpdatedAt`) VALUES
(1, 1, 1783987200, 'TẠO HÌNH', 'Học vẽ hình tròn', 'Bé vẽ mặt trời, bánh xe và bóng bay.', 'draw', 1781359832, 1781359832),
(2, 1, 1783987200, 'TIẾNG ANH', 'Từ vựng về con vật', 'cat, dog, bird, fish — kèm hình minh họa.', 'english', 1781359832, 1781359832),
(3, 1, 1783987200, 'ÂM NHẠC', 'Hát “Cả nhà thương nhau”', 'Bé hát và vỗ tay theo nhịp rất tốt.', 'music', 1781359832, 1781359832);

-- --------------------------------------------------------

--
-- Table structure for table `EventClasses`
--

CREATE TABLE `EventClasses` (
  `EventID` int NOT NULL,
  `ClassID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Events`
--

CREATE TABLE `Events` (
  `EventID` int NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Description` text,
  `StartTime` bigint NOT NULL,
  `EndTime` bigint NOT NULL,
  `Location` varchar(255) DEFAULT NULL,
  `Status` varchar(50) DEFAULT 'Upcoming',
  `CreatedBy` int DEFAULT NULL,
  `CreatedAt` bigint DEFAULT (unix_timestamp())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Extracurriculars`
--

CREATE TABLE `Extracurriculars` (
  `ActivityID` int NOT NULL,
  `ActivityName` varchar(100) NOT NULL,
  `MonthlyFee` decimal(15,2) NOT NULL,
  `Description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Feedbacks`
--

CREATE TABLE `Feedbacks` (
  `FeedbackID` int NOT NULL,
  `ParentID` int DEFAULT NULL,
  `Type` varchar(20) NOT NULL,
  `Content` text NOT NULL,
  `Rating` int DEFAULT NULL,
  `Status` varchar(50) DEFAULT 'Pending',
  `ResponseContent` text,
  `RespondedByID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Grades`
--

CREATE TABLE `Grades` (
  `GradeID` int NOT NULL,
  `GradeName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Grades`
--

INSERT INTO `Grades` (`GradeID`, `GradeName`) VALUES
(1, 'Mầm'),
(2, 'Chồi'),
(3, 'Lá');

-- --------------------------------------------------------

--
-- Table structure for table `HealthRecords`
--

CREATE TABLE `HealthRecords` (
  `RecordID` int NOT NULL,
  `StudentID` int DEFAULT NULL,
  `TermPeriod` varchar(50) NOT NULL,
  `Height` decimal(5,2) DEFAULT NULL,
  `Weight` decimal(5,2) DEFAULT NULL,
  `BMI` decimal(5,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `HealthRecords`
--

INSERT INTO `HealthRecords` (`RecordID`, `StudentID`, `TermPeriod`, `Height`, `Weight`, `BMI`) VALUES
(1, 19, '2026-04', 130.00, 28.00, 16.60),
(2, 19, '2026-05', 131.00, 29.00, 16.90),
(3, 19, '2026-06', 132.00, 30.00, 17.20),
(4, 19, '2026-01', 127.00, 26.00, 16.10),
(5, 19, '2026-02', 128.00, 27.00, 16.50),
(6, 19, '2026-03', 129.00, 28.00, 16.80);

-- --------------------------------------------------------

--
-- Table structure for table `Invoices`
--

CREATE TABLE `Invoices` (
  `InvoiceID` int NOT NULL,
  `StudentID` int DEFAULT NULL,
  `PackageID` int DEFAULT NULL,
  `PeriodRange` varchar(100) DEFAULT NULL,
  `BillingMonth` varchar(10) NOT NULL,
  `TuitionFee` decimal(15,2) DEFAULT '0.00',
  `ExpectedMealFee` decimal(15,2) DEFAULT '0.00',
  `ExtracurricularFee` decimal(15,2) DEFAULT '0.00',
  `Surcharge` decimal(15,2) DEFAULT '0.00',
  `RefundAmount` decimal(15,2) DEFAULT '0.00',
  `DiscountAmount` decimal(15,2) DEFAULT '0.00',
  `TotalAmount` decimal(15,2) GENERATED ALWAYS AS ((((((coalesce(`TuitionFee`,0) + coalesce(`ExpectedMealFee`,0)) + coalesce(`ExtracurricularFee`,0)) + coalesce(`Surcharge`,0)) - coalesce(`RefundAmount`,0)) - coalesce(`DiscountAmount`,0))) STORED,
  `PaymentStatus` varchar(50) DEFAULT 'Unpaid',
  `CreatedAt` bigint DEFAULT (unix_timestamp())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Invoices`
--

INSERT INTO `Invoices` (`InvoiceID`, `StudentID`, `PackageID`, `PeriodRange`, `BillingMonth`, `TuitionFee`, `ExpectedMealFee`, `ExtracurricularFee`, `Surcharge`, `RefundAmount`, `DiscountAmount`, `PaymentStatus`, `CreatedAt`) VALUES
(1, 1, 3, NULL, '05-2026', 4500000.00, 1430000.00, 0.00, 0.00, 0.00, 150000.00, 'Unpaid', 1781083042);

-- --------------------------------------------------------

--
-- Table structure for table `LeaveRequests`
--

CREATE TABLE `LeaveRequests` (
  `RequestID` int NOT NULL,
  `StudentID` int DEFAULT NULL,
  `ParentID` int DEFAULT NULL,
  `FromDate` bigint NOT NULL,
  `ToDate` bigint NOT NULL,
  `Reason` text,
  `EvidenceURL` text,
  `Status` varchar(50) DEFAULT 'Pending',
  `ApproverID` int DEFAULT NULL,
  `IsMealFeeDeducted` tinyint(1) DEFAULT '0',
  `ParentNotes` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `CreatedAt` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `LeaveRequests`
--

INSERT INTO `LeaveRequests` (`RequestID`, `StudentID`, `ParentID`, `FromDate`, `ToDate`, `Reason`, `EvidenceURL`, `Status`, `ApproverID`, `IsMealFeeDeducted`, `ParentNotes`, `CreatedAt`) VALUES
(15, 106, 6, 1782320400, 1782579599, 'Bé bị ốm', NULL, 'Approved', 5, 0, 'Phụ huynh báo nghỉ với lý do: Bé bị ốm', 1782051157),
(16, 105, 4, 1782172800, 1782345599, 'Bệnh/Ốm', 'https://minhcaumart.vn/san-pham/do-uong-nuoc-giai-khat/ruou/thuoc-la-sai-gon-bac.html?srsltid=AfmBOorNvNTvLAGvz5JvFOTQuJicCjWm0ZKja6mZUsvin9him8ys6DnM', 'Pending', NULL, 1, 'Bé Giang bị sốt siêu vi, bác sĩ chỉ định nghỉ ngơi 2 ngày. Ba có đính kèm ảnh chụp giấy khám bệnh của phòng khám ạ.', 1782117000),
(17, 108, 6, 1782345600, 1782518399, 'Đi du lịch', 'https://media.kindercare.app/parents/student-leave-evidences/flight-ticket-booking.webp', 'Approved', 5, 1, 'Gia đình cháu Phương đi du lịch Phú Quốc. Xin phép thầy cho bé nghỉ T5, T6. Gia đình gửi kèm booking vé máy bay để nhà trường nắm thông tin.', 1782119700),
(18, 113, 6, 1782086400, 1782172799, 'Bệnh/Ốm', 'https://media.kindercare.app/parents/student-leave-evidences/prescription-sample.webp', 'Pending', NULL, 1, 'Sáng nay ngủ dậy bé Diệp bị nổi mẩn đỏ dị ứng, ba xin cho bé nghỉ hôm nay để bôi thuốc theo đơn. Ba gửi kèm ảnh thuốc ạ.', 1782111600),
(19, 19, 6, 1782086400, 1782518399, 'Lý do khác', 'https://media.kindercare.app/parents/student-leave-evidences/1782137335281-625577567.webp', 'Pending', NULL, 0, 'Thèm thuốc nên nghỉ', 1782137335);

-- --------------------------------------------------------

--
-- Table structure for table `MedicationRequests`
--

CREATE TABLE `MedicationRequests` (
  `MedRequestID` int NOT NULL,
  `StudentID` int DEFAULT NULL,
  `ParentID` int DEFAULT NULL,
  `RequestDate` bigint NOT NULL,
  `MedicineDetails` text NOT NULL,
  `Dosage` text NOT NULL,
  `Frequency` varchar(100) DEFAULT NULL,
  `TimeToTake` varchar(100) DEFAULT NULL,
  `ParentNote` text,
  `MedicineImageURL` varchar(500) DEFAULT NULL,
  `Status` varchar(50) DEFAULT 'Pending',
  `TeacherNote` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `MedicationRequests`
--

INSERT INTO `MedicationRequests` (`MedRequestID`, `StudentID`, `ParentID`, `RequestDate`, `MedicineDetails`, `Dosage`, `Frequency`, `TimeToTake`, `ParentNote`, `MedicineImageURL`, `Status`, `TeacherNote`) VALUES
(1, 105, 4, 1782172800, 'Bé bị dị ứng hải sản', 'Theo dõi', '1 lần/ngày', 'Cả ngày', 'Nhờ cô để ý bé không ăn tôm cua.', NULL, 'Pending', NULL),
(2, 106, 6, 1782172800, 'Thuốc hạ sốt Hapacol', '1 gói', 'Khi sốt > 38.5', 'Bất kỳ', 'Cô pha với nước ấm cho bé uống.', NULL, 'Pending', NULL),
(3, 108, 6, 1782172800, 'Siro ho Prospan', '5ml', '2 lần/ngày', '11:00 và 15:00', 'Bé đang ho đờm.', NULL, 'Administered', 'Đã cho uống cữ sáng');

-- --------------------------------------------------------

--
-- Table structure for table `Menus`
--

CREATE TABLE `Menus` (
  `MenuID` int NOT NULL,
  `ClassID` int DEFAULT NULL,
  `MenuDate` bigint NOT NULL,
  `MealType` varchar(50) NOT NULL,
  `DishName` text NOT NULL,
  `Calories` int DEFAULT NULL,
  `NutritionalDetails` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Menus`
--

INSERT INTO `Menus` (`MenuID`, `ClassID`, `MenuDate`, `MealType`, `DishName`, `Calories`, `NutritionalDetails`) VALUES
(1, 1, 1782172800, 'Breakfast', 'Cháo lươn đồng hạt sen', NULL, 'Protein, Canxi'),
(2, 1, 1782172800, 'Lunch', 'Cơm tẻ, canh sườn non bí đỏ, thịt viên sốt cà chua', NULL, 'Protein, Vitamin A'),
(3, 1, 1782172800, 'Snack', 'Sữa chua nha đam + Bánh quy', NULL, 'Probiotic, Canxi');

-- --------------------------------------------------------

--
-- Table structure for table `Messages`
--

CREATE TABLE `Messages` (
  `MessageID` bigint NOT NULL,
  `ConversationID` int NOT NULL,
  `SenderID` int NOT NULL,
  `Content` text NOT NULL,
  `MessageType` enum('text','image','file','call_log') DEFAULT 'text',
  `IsRead` tinyint(1) DEFAULT '0',
  `CreatedAt` bigint DEFAULT (unix_timestamp())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Newsfeeds`
--

CREATE TABLE `Newsfeeds` (
  `PostID` int NOT NULL,
  `ClassID` int DEFAULT NULL,
  `TeacherID` int DEFAULT NULL,
  `Content` text,
  `MediaURL` text,
  `PostedAt` bigint DEFAULT (unix_timestamp())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `NewsfeedTags`
--

CREATE TABLE `NewsfeedTags` (
  `PostID` int NOT NULL,
  `StudentID` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Notifications`
--

CREATE TABLE `Notifications` (
  `NotifID` int NOT NULL,
  `UserID` int DEFAULT NULL,
  `Title` varchar(255) NOT NULL,
  `Message` text NOT NULL,
  `Type` varchar(50) DEFAULT NULL,
  `ActionLink` text,
  `IsRead` tinyint(1) DEFAULT '0',
  `IsCritical` tinyint(1) NOT NULL DEFAULT '0',
  `CreatedAt` bigint DEFAULT (unix_timestamp())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Parents`
--

CREATE TABLE `Parents` (
  `ParentID` int NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `PhoneNumber` varchar(20) NOT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `IDCard` varchar(20) DEFAULT NULL,
  `Job` varchar(100) DEFAULT NULL,
  `Address` text,
  `AvatarURL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Parents`
--

INSERT INTO `Parents` (`ParentID`, `FullName`, `PhoneNumber`, `Email`, `IDCard`, `Job`, `Address`, `AvatarURL`) VALUES
(4, 'Nguyễn Anh Tuấn', '0911111111', 'tuan.nguyen@gmail.com', NULL, 'Kỹ sư', '65 Huỳnh Thúc Kháng, Q1', NULL),
(6, 'Hồ Công Danh', '086655189', 'hocong.danh16@gmail.com', '07020002832', 'IT', 'Bình Tân, HCM', 'https://media.kindercare.app/parents/parents-profile-avatar/534926184_1951092382389301_2242079378559548722_n.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `PaymentPackages`
--

CREATE TABLE `PaymentPackages` (
  `PackageID` int NOT NULL,
  `PackageName` varchar(50) NOT NULL,
  `DurationInMonths` int NOT NULL,
  `DiscountPercentage` decimal(5,2) DEFAULT '0.00'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `PaymentPackages`
--

INSERT INTO `PaymentPackages` (`PackageID`, `PackageName`, `DurationInMonths`, `DiscountPercentage`) VALUES
(1, 'Tháng', 1, 0.00),
(2, 'Quý', 3, 0.00),
(3, 'Nửa năm', 6, 5.00),
(4, 'Năm', 12, 10.00);

-- --------------------------------------------------------

--
-- Table structure for table `Principals`
--

CREATE TABLE `Principals` (
  `PrincipalID` int NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Principals`
--

INSERT INTO `Principals` (`PrincipalID`, `FullName`, `PhoneNumber`, `Email`) VALUES
(2, 'Trần Thị Mai', '0999999999', 'mai.tran@kindercare.edu.vn');

-- --------------------------------------------------------

--
-- Table structure for table `QuickReplies`
--

CREATE TABLE `QuickReplies` (
  `ReplyID` int NOT NULL,
  `TeacherID` int DEFAULT NULL,
  `Shortcut` varchar(50) DEFAULT NULL,
  `Content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `RewardBadges`
--

CREATE TABLE `RewardBadges` (
  `BadgeID` int NOT NULL,
  `BadgeName` varchar(100) NOT NULL,
  `BadgeImageURL` varchar(255) DEFAULT NULL,
  `CriteriaType` enum('WEEKLY','MONTHLY','SPECIAL') NOT NULL DEFAULT 'WEEKLY'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `RewardBadges`
--

INSERT INTO `RewardBadges` (`BadgeID`, `BadgeName`, `BadgeImageURL`, `CriteriaType`) VALUES
(1, 'Bé Ngoan Cuối Tuần', 'https://cdn-icons-png.flaticon.com/512/3237/3237155.png', 'WEEKLY'),
(2, 'Bé Ăn Ngoan', 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', 'WEEKLY'),
(3, 'Bé Ngủ Ngoan', 'https://cdn-icons-png.flaticon.com/512/3094/3094836.png', 'WEEKLY');

-- --------------------------------------------------------

--
-- Table structure for table `Roles`
--

CREATE TABLE `Roles` (
  `RoleID` int NOT NULL,
  `RoleName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Roles`
--

INSERT INTO `Roles` (`RoleID`, `RoleName`) VALUES
(1, 'IT Admin'),
(2, 'Principal'),
(3, 'Teacher'),
(4, 'Parent'),
(5, 'Guest');

-- --------------------------------------------------------

--
-- Table structure for table `StudentAssessments`
--

CREATE TABLE `StudentAssessments` (
  `AssessmentID` int NOT NULL,
  `StudentID` int DEFAULT NULL,
  `AssessmentMonth` varchar(10) NOT NULL,
  `PhysicalScore` int DEFAULT NULL,
  `CognitiveScore` int DEFAULT NULL,
  `LanguageScore` int DEFAULT NULL,
  `SocioEmotionalScore` int DEFAULT NULL,
  `AestheticScore` int DEFAULT NULL,
  `TeacherComment` text,
  `CreatedAt` bigint DEFAULT (unix_timestamp())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `StudentBadges`
--

CREATE TABLE `StudentBadges` (
  `StudentBadgeID` int NOT NULL,
  `StudentID` int NOT NULL,
  `BadgeID` int NOT NULL,
  `DateEarned` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `StudentExtracurriculars`
--

CREATE TABLE `StudentExtracurriculars` (
  `EnrollmentID` int NOT NULL,
  `StudentID` int DEFAULT NULL,
  `ActivityID` int DEFAULT NULL,
  `RegisteredMonth` varchar(10) NOT NULL,
  `Status` varchar(20) DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `StudentParents`
--

CREATE TABLE `StudentParents` (
  `StudentID` int NOT NULL,
  `ParentID` int NOT NULL,
  `Relationship` varchar(50) NOT NULL,
  `IsPrimary` tinyint(1) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `StudentParents`
--

INSERT INTO `StudentParents` (`StudentID`, `ParentID`, `Relationship`, `IsPrimary`) VALUES
(1, 4, 'Ba', 1),
(19, 6, 'Ba', 1),
(105, 4, 'Ba', 1),
(106, 6, 'Ba', 1),
(107, 4, 'Ba', 1),
(108, 6, 'Ba', 1),
(109, 4, 'Ba', 1),
(110, 4, 'Ba', 1),
(111, 6, 'Mẹ', 1),
(112, 4, 'Ba', 1),
(113, 6, 'Mẹ', 1),
(114, 4, 'Ba', 1),
(115, 6, 'Mẹ', 1),
(116, 4, 'Ba', 1),
(117, 6, 'Mẹ', 1),
(118, 4, 'Ba', 1),
(119, 6, 'Mẹ', 1),
(120, 4, 'Ba', 1),
(121, 6, 'Mẹ', 1),
(122, 4, 'Ba', 1),
(123, 4, 'Ba', 1),
(124, 4, 'Ba', 1),
(125, 4, 'Ba', 1),
(126, 4, 'Ba', 1),
(127, 4, 'Ba', 1),
(128, 4, 'Ba', 1),
(129, 4, 'Ba', 1),
(130, 4, 'Ba', 1),
(131, 4, 'Ba', 1),
(132, 4, 'Ba', 1),
(133, 4, 'Ba', 1),
(134, 4, 'Ba', 1),
(135, 4, 'Ba', 1),
(136, 4, 'Ba', 1),
(137, 4, 'Ba', 1),
(138, 4, 'Ba', 1),
(139, 4, 'Ba', 1),
(140, 4, 'Ba', 1),
(141, 4, 'Ba', 1),
(142, 4, 'Ba', 1),
(143, 4, 'Ba', 1),
(144, 6, 'Ba', 1);

-- --------------------------------------------------------

--
-- Table structure for table `Students`
--

CREATE TABLE `Students` (
  `StudentID` int NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `DateOfBirth` bigint NOT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `Allergies` text,
  `AdmissionDate` bigint DEFAULT NULL,
  `EnrollmentStatus` varchar(50) DEFAULT 'Active',
  `AvatarURL` text,
  `ClassID` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Students`
--

INSERT INTO `Students` (`StudentID`, `FullName`, `DateOfBirth`, `Gender`, `Allergies`, `AdmissionDate`, `EnrollmentStatus`, `AvatarURL`, `ClassID`) VALUES
(1, 'Nguyễn Minh Khang', 1684108800, 'Nam', 'Dị ứng lạc', NULL, 'Active', NULL, 1),
(19, 'Nguyễn Minh Chánh', 1464739200, 'Nam', 'Sài gòn bạc', 1781082000, 'Active', 'https://media.kindercare.app/parents/student-profile-avatar/Student_NMC.jpg', 1),
(20, 'Trần Gia Bảo', 1673740800, 'Nam', 'Không', 1757030400, 'Active', NULL, 2),
(21, 'Lê Nhã Uyên', 1679443200, 'Nữ', 'Dị ứng sữa bò', 1757030400, 'Active', NULL, 2),
(22, 'Phạm Tuấn Kiệt', 1683676800, 'Nam', 'Không', 1757030400, 'Active', NULL, 2),
(23, 'Vũ Ngọc Diệp', 1688774400, 'Nữ', 'Dị ứng lạc', 1757030400, 'Active', NULL, 2),
(24, 'Đinh Trọng Vũ', 1644796800, 'Nam', 'Không', 1757030400, 'Active', NULL, 3),
(25, 'Hoàng Mộc Miên', 1651276800, 'Nữ', 'Không', 1757030400, 'Active', NULL, 3),
(26, 'Ngô Đức Anh', 1655251200, 'Nam', 'Dị ứng hải sản', 1757030400, 'Active', NULL, 3),
(27, 'Bùi Thảo My', 1660953600, 'Nữ', 'Không', 1757030400, 'Active', NULL, 3),
(28, 'Lý Thiên Phúc', 1641772800, 'Nam', 'Không', 1757030400, 'Active', NULL, 3),
(29, 'Đoàn Tú Anh', 1651708800, 'Nữ', 'Dị ứng thời tiết', 1757030400, 'Active', NULL, 4),
(30, 'Trương Nhật Minh', 1662940800, 'Nam', 'Không', 1757030400, 'Active', NULL, 4),
(31, 'Hồ Bích Ngọc', 1669334400, 'Nữ', 'Không', 1757030400, 'Active', NULL, 4),
(32, 'Dương Hải Đăng', 1615161600, 'Nam', 'Không', 1757030400, 'Active', NULL, 5),
(33, 'Tô Tuệ Lâm', 1626652800, 'Nữ', 'Dị ứng tôm', 1757030400, 'Active', NULL, 5),
(34, 'Phan Chấn Hưng', 1633132800, 'Nam', 'Không', 1757030400, 'Active', NULL, 5),
(35, 'Đỗ Quỳnh Anh', 1639526400, 'Nữ', 'Không', 1757030400, 'Active', NULL, 5),
(36, 'Mai Gia Huy', 1611532800, 'Nam', 'Dị ứng mèo', 1757030400, 'Active', NULL, 6),
(37, 'Trịnh Tường Vy', 1618185600, 'Nữ', 'Không', 1757030400, 'Active', NULL, 6),
(38, 'Khổng Thái Sơn', 1630281600, 'Nam', 'Không', 1757030400, 'Active', NULL, 6),
(39, 'Tống Khánh Linh', 1636588800, 'Nữ', 'Dị ứng đậu nành', 1757030400, 'Active', NULL, 6),
(40, 'Nguyễn Anh Dũng', 1578787200, 'Nam', 'Không', 1757030400, 'Active', NULL, 7),
(41, 'Trần Lan Anh', 1582588800, 'Nữ', 'Không', 1757030400, 'Active', NULL, 7),
(42, 'Lê Quốc Bảo', 1583625600, 'Nam', 'Dị ứng hải sản', 1757030400, 'Active', NULL, 7),
(43, 'Phạm Thảo My', 1586822400, 'Nữ', 'Không', 1757030400, 'Active', NULL, 7),
(44, 'Hoàng Trọng Tín', 1589932800, 'Nam', 'Không', 1757030400, 'Active', NULL, 7),
(45, 'Vũ Thanh Hà', 1593475200, 'Nữ', 'Dị ứng thời tiết', 1757030400, 'Active', NULL, 7),
(46, 'Đặng Nam Khánh', 1594771200, 'Nam', 'Không', 1757030400, 'Active', NULL, 7),
(47, 'Bùi Minh Khuê', 1596585600, 'Nữ', 'Không', 1757030400, 'Active', NULL, 7),
(48, 'Đỗ Gia Hưng', 1600387200, 'Nam', 'Dị ứng sữa bò', 1757030400, 'Active', NULL, 7),
(49, 'Ngô Ngọc Diệp', 1603324800, 'Nữ', 'Không', 1757030400, 'Active', NULL, 7),
(50, 'Dương Thiên Phú', 1604880000, 'Nam', 'Không', 1757030400, 'Active', NULL, 7),
(51, 'Lý Nhã Kỳ', 1606780800, 'Nữ', 'Dị ứng lạc', 1757030400, 'Active', NULL, 7),
(52, 'Trương Tấn Phát', 1610582400, 'Nam', 'Không', 1757030400, 'Active', NULL, 7),
(53, 'Đoàn Bảo Ngọc', 1614470400, 'Nữ', 'Không', 1757030400, 'Active', NULL, 7),
(54, 'Hồ Chí Kiên', 1615334400, 'Nam', 'Không', 1757030400, 'Active', NULL, 7),
(55, 'Trịnh Kim Ngân', 1617494400, 'Nữ', 'Không', 1757030400, 'Active', NULL, 7),
(56, 'Đinh Thái Sơn', 1621382400, 'Nam', 'Dị ứng lông mèo', 1757030400, 'Active', NULL, 7),
(57, 'Tô Tuệ Nhi', 1624233600, 'Nữ', 'Không', 1757030400, 'Active', NULL, 7),
(58, 'Phan Khôi Nguyên', 1625616000, 'Nam', 'Không', 1757030400, 'Active', NULL, 7),
(59, 'Mai Phương Trà', 1628726400, 'Nữ', 'Không', 1757030400, 'Active', NULL, 7),
(60, 'Khổng Việt Hoàng', 1632528000, 'Nam', 'Không', 1757030400, 'Active', NULL, 7),
(61, 'Tống Minh Châu', 1635552000, 'Nữ', 'Không', 1757030400, 'Active', NULL, 7),
(62, 'Lương Thế Vinh', 1636934400, 'Nam', 'Không', 1757030400, 'Active', NULL, 7),
(63, 'Châu Mỹ Lệ', 1639958400, 'Nữ', 'Không', 1757030400, 'Active', NULL, 7),
(64, 'Bạch Chấn Phong', 1628380800, 'Nam', 'Dị ứng phấn hoa', 1757030400, 'Active', NULL, 7),
(85, 'Phạm Bảo Khang', 1641772800, 'Nam', 'Không', 1757030400, 'Active', NULL, 9),
(86, 'Lê Thị Ngọc Bích', 1644796800, 'Nữ', 'Không', 1757030400, 'Active', NULL, 9),
(87, 'Hoàng Gia Hưng', 1647734400, 'Nam', 'Dị ứng phấn hoa', 1757030400, 'Active', NULL, 9),
(88, 'Vũ Thị Hà My', 1649116800, 'Nữ', 'Không', 1757030400, 'Active', NULL, 9),
(89, 'Đỗ Văn Tài', 1652313600, 'Nam', 'Không', 1757030400, 'Active', NULL, 9),
(90, 'Trương Bích Ngọc', 1655510400, 'Nữ', 'Dị ứng sữa bò', 1757030400, 'Active', NULL, 9),
(91, 'Bùi Tiến Dũng', 1658448000, 'Nam', 'Không', 1757030400, 'Active', NULL, 9),
(92, 'Ngô Thu Phương', 1661817600, 'Nữ', 'Không', 1757030400, 'Active', NULL, 9),
(93, 'Đặng Quang Hải', 1662076800, 'Nam', 'Không', 1757030400, 'Active', NULL, 9),
(94, 'Lý Nhã My', 1665792000, 'Nữ', 'Dị ứng thời tiết', 1757030400, 'Active', NULL, 9),
(95, 'Hồ Văn Cường', 1668124800, 'Nam', 'Không', 1757030400, 'Active', NULL, 9),
(96, 'Đoàn Thị Thúy', 1670198400, 'Nữ', 'Không', 1757030400, 'Active', NULL, 9),
(97, 'Châu Tấn Phát', 1643068800, 'Nam', 'Dị ứng hải sản', 1757030400, 'Active', NULL, 9),
(98, 'Bạch Tuyết Nhi', 1646006400, 'Nữ', 'Không', 1757030400, 'Active', NULL, 9),
(99, 'La Quốc Toản', 1646870400, 'Nam', 'Không', 1757030400, 'Active', NULL, 9),
(100, 'Khổng Tuấn Kiệt', 1650326400, 'Nam', 'Không', 1757030400, 'Active', NULL, 9),
(101, 'Trịnh Kim Chi', 1653436800, 'Nữ', 'Dị ứng lạc', 1757030400, 'Active', NULL, 9),
(102, 'Cao Nhật Minh', 1656547200, 'Nam', 'Không', 1757030400, 'Active', NULL, 9),
(103, 'Đinh Thu Thủy', 1657152000, 'Nữ', 'Không', 1757030400, 'Active', NULL, 9),
(104, 'Lương Thế Thành', 1659916800, 'Nam', 'Không', 1757030400, 'Active', NULL, 9),
(105, 'Vũ Trường Giang', 1675987200, 'Nam', 'Không', NULL, 'Active', NULL, 1),
(106, 'Phạm Tường Vy', 1681516800, 'Nữ', 'Không', NULL, 'Active', NULL, 1),
(107, 'Đặng Anh Khoa', 1687219200, 'Nam', 'Không', NULL, 'Active', NULL, 1),
(108, 'Lý Nhã Phương', 1692921600, 'Nữ', 'Dị ứng hải sản', NULL, 'Active', NULL, 1),
(109, 'Bùi Minh Quang', 1698624000, 'Nam', 'Không', NULL, 'Active', NULL, 1),
(110, 'Nguyễn Gia Bảo', 1684108800, 'Nam', 'Không', 1781082000, 'Active', NULL, 1),
(111, 'Trần Minh Anh', 1684108800, 'Nữ', 'Không', 1781082000, 'Active', NULL, 1),
(112, 'Lê Hải Đăng', 1684108800, 'Nam', 'Không', 1781082000, 'Active', NULL, 1),
(113, 'Phạm Ngọc Diệp', 1684108800, 'Nữ', 'Không', 1781082000, 'Active', NULL, 1),
(114, 'Vũ Hoàng Long', 1684108800, 'Nam', 'Không', 1781082000, 'Active', NULL, 1),
(115, 'Hoàng Thu Thủy', 1684108800, 'Nữ', 'Không', 1781082000, 'Active', NULL, 1),
(116, 'Đặng Quang Minh', 1684108800, 'Nam', 'Không', 1781082000, 'Active', NULL, 1),
(117, 'Bùi Khánh Linh', 1684108800, 'Nữ', 'Không', 1781082000, 'Active', NULL, 1),
(118, 'Ngô Gia Khiêm', 1684108800, 'Nam', 'Không', 1781082000, 'Active', NULL, 1),
(119, 'Lý Thảo Nguyên', 1684108800, 'Nữ', 'Không', 1781082000, 'Active', NULL, 1),
(120, 'Đỗ Minh Khang', 1684108800, 'Nam', 'Không', 1781082000, 'Active', NULL, 1),
(121, 'Trương Mỹ Tâm', 1684108800, 'Nữ', 'Không', 1781082000, 'Active', NULL, 1),
(122, 'Phan Anh Tuấn', 1684108800, 'Nam', 'Không', 1781082000, 'Active', NULL, 1),
(123, 'Lê Khôi Nguyên', 1672876800, 'Nam', 'Không', NULL, 'Active', NULL, 2),
(124, 'Nguyễn Ngọc Hân', 1676332800, 'Nữ', 'Không', NULL, 'Active', NULL, 2),
(125, 'Trần Minh Khang', 1679270400, 'Nam', 'Dị ứng phấn hoa', NULL, 'Active', NULL, 2),
(126, 'Phạm Yến Nhi', 1681084800, 'Nữ', 'Không', NULL, 'Active', NULL, 2),
(127, 'Hoàng Quốc Việt', 1684713600, 'Nam', 'Không', NULL, 'Active', NULL, 2),
(128, 'Đỗ Bảo Trâm', 1687046400, 'Nữ', 'Dị ứng sữa bò', NULL, 'Active', NULL, 2),
(129, 'Vũ Hải Đăng', 1688688000, 'Nam', 'Không', NULL, 'Active', NULL, 2),
(130, 'Đinh Tuyết Mai', 1693353600, 'Nữ', 'Không', NULL, 'Active', NULL, 2),
(131, 'Bùi Tuấn Anh', 1694476800, 'Nam', 'Không', NULL, 'Active', NULL, 2),
(132, 'Trương Ngọc Anh', 1698192000, 'Nữ', 'Dị ứng thời tiết', NULL, 'Active', NULL, 2),
(133, 'Lý Chí Thành', 1699488000, 'Nam', 'Không', NULL, 'Active', NULL, 2),
(134, 'Ngô Kim Liên', 1702598400, 'Nữ', 'Không', NULL, 'Active', NULL, 2),
(135, 'Đoàn Hữu Tuấn', 1674864000, 'Nam', 'Không', NULL, 'Active', NULL, 2),
(136, 'Hồ Phương Linh', 1676851200, 'Nữ', 'Dị ứng hải sản', NULL, 'Active', NULL, 2),
(137, 'Châu Tuấn Hưng', 1678233600, 'Nam', 'Không', NULL, 'Active', NULL, 2),
(138, 'Bạch Nhã Yến', 1681430400, 'Nữ', 'Không', NULL, 'Active', NULL, 2),
(139, 'La Thành Đạt', 1684454400, 'Nam', 'Dị ứng lạc', NULL, 'Active', NULL, 2),
(140, 'Khổng Ngọc Hà', 1687305600, 'Nữ', 'Không', NULL, 'Active', NULL, 2),
(141, 'Trịnh Quang Nhật', 1688256000, 'Nam', 'Không', NULL, 'Active', NULL, 2),
(142, 'Cao Diệu Minh', 1691712000, 'Nữ', 'Không', NULL, 'Active', NULL, 2),
(143, 'Phùng Gia Hân', 1683849600, 'Nữ', 'Không', NULL, 'Active', NULL, 2),
(144, 'Vương Đình Phong', 1694131200, 'Nam', 'Dị ứng phấn hoa', NULL, 'Active', NULL, 2);

-- --------------------------------------------------------

--
-- Table structure for table `SystemLogs`
--

CREATE TABLE `SystemLogs` (
  `LogID` int NOT NULL,
  `UserID` int DEFAULT NULL,
  `Action` text NOT NULL,
  `Timestamp` bigint DEFAULT (unix_timestamp())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `TeacherRankHistory`
--

CREATE TABLE `TeacherRankHistory` (
  `HistoryID` int NOT NULL,
  `TeacherID` int DEFAULT NULL,
  `OldRank` varchar(50) DEFAULT NULL,
  `NewRank` varchar(50) DEFAULT NULL,
  `UpdatedBy` int DEFAULT NULL,
  `UpdatedAt` bigint DEFAULT (unix_timestamp())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Teachers`
--

CREATE TABLE `Teachers` (
  `TeacherID` int NOT NULL,
  `FullName` varchar(100) NOT NULL,
  `PhoneNumber` varchar(20) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `DateOfBirth` bigint DEFAULT NULL,
  `Gender` varchar(10) DEFAULT NULL,
  `IDCard` varchar(20) DEFAULT NULL,
  `Address` text,
  `ProfessionalRank` varchar(50) DEFAULT NULL,
  `WorkStatus` varchar(50) DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Teachers`
--

INSERT INTO `Teachers` (`TeacherID`, `FullName`, `PhoneNumber`, `Email`, `DateOfBirth`, `Gender`, `IDCard`, `Address`, `ProfessionalRank`, `WorkStatus`) VALUES
(3, 'Nguyễn Thị Lan', '0901234567', 'lan.nguyen@kindercare.edu.vn', 642729600, 'Nữ', '079190001234', '123 Nguyễn Huệ, Quận 1', 'Hạng III', 'Active'),
(5, 'Lê Quang Huy', '0912345678', 'huy.le@kindercare.edu.vn', 593308800, 'Nam', '079088001122', '123 Lê Lợi, Phường Bến Nghé, Quận 1, TP.HCM', 'Hạng II', 'Active'),
(7, 'Đoàn Tuyết Mai', '0911222333', 'tuyetmai@kindercare.edu.vn', 705456000, 'Nữ', '079123456789', 'Quận 7, TP.HCM', 'Hạng II', 'Active'),
(8, 'Ngô Phương Trinh', '0988777555', 'phuongtrinh@kindercare.edu.vn', 808876800, 'Nữ', '079987654321', 'Quận 4, TP.HCM', 'Hạng III', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `Timetables`
--

CREATE TABLE `Timetables` (
  `ScheduleID` int NOT NULL,
  `ClassID` int DEFAULT NULL,
  `DayOfWeek` varchar(20) NOT NULL,
  `Subject` varchar(100) NOT NULL,
  `StartTime` bigint DEFAULT NULL,
  `EndTime` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Transactions`
--

CREATE TABLE `Transactions` (
  `TransactionID` int NOT NULL,
  `InvoiceID` int DEFAULT NULL,
  `AmountPaid` decimal(15,2) NOT NULL,
  `PaymentMethod` varchar(50) DEFAULT NULL,
  `TransactionCode` varchar(100) DEFAULT NULL,
  `TransactionDate` bigint DEFAULT (unix_timestamp()),
  `Status` varchar(50) DEFAULT 'Success'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `UserID` int NOT NULL,
  `Username` varchar(100) NOT NULL,
  `PasswordHash` varchar(255) NOT NULL,
  `RoleID` int DEFAULT NULL,
  `fcm_token` varchar(255) DEFAULT NULL,
  `Status` varchar(20) DEFAULT 'Active',
  `AvatarURL` text,
  `ResetPasswordToken` varchar(255) DEFAULT NULL,
  `TokenExpiry` bigint DEFAULT NULL,
  `ReceiveEmailNotif` tinyint(1) DEFAULT '1',
  `ReceivePushNotif` tinyint(1) DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`UserID`, `Username`, `PasswordHash`, `RoleID`, `fcm_token`, `Status`, `AvatarURL`, `ResetPasswordToken`, `TokenExpiry`, `ReceiveEmailNotif`, `ReceivePushNotif`) VALUES
(1, 'admin_it', 'hash_pass', 1, NULL, 'Active', NULL, NULL, NULL, 1, 1),
(2, 'hieutruong_mai', 'hash_pass', 2, NULL, 'Active', NULL, NULL, NULL, 1, 1),
(3, 'gv_lan', 'hash_pass', 3, NULL, 'Active', NULL, NULL, NULL, 1, 1),
(4, 'ph_tuan', '$2a$12$iWf2E00ASg54.I3mqkNCgOAGwuNK38VGkW3y.5wxCad2GopnYTjr6', 4, NULL, 'Active', NULL, NULL, NULL, 1, 1),
(5, 'gv_quanghuy', '$2a$12$iWf2E00ASg54.I3mqkNCgOAGwuNK38VGkW3y.5wxCad2GopnYTjr6', 3, NULL, 'Active', NULL, NULL, NULL, 1, 1),
(6, 'hcngdanh', '$2a$12$Oy1J6YGhPdXGU6hqYIGQoe2PVmtYAOx9k3XXOKgYaIeqF/RzX1/VC', 4, NULL, 'Active', NULL, NULL, NULL, 1, 1),
(7, 'gv_tuyetmai', 'hash_pass', 3, NULL, 'Active', NULL, NULL, NULL, 1, 1),
(8, 'gv_phuongtrinh', 'hash_pass', 3, NULL, 'Active', NULL, NULL, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `WeeklyRewards`
--

CREATE TABLE `WeeklyRewards` (
  `RewardID` int NOT NULL,
  `StudentID` int NOT NULL,
  `WeekNumber` int NOT NULL,
  `Year` int NOT NULL,
  `TeacherNote` text,
  `DateAwarded` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AcademicYears`
--
ALTER TABLE `AcademicYears`
  ADD PRIMARY KEY (`YearID`);

--
-- Indexes for table `Admins`
--
ALTER TABLE `Admins`
  ADD PRIMARY KEY (`AdminID`);

--
-- Indexes for table `Attendances`
--
ALTER TABLE `Attendances`
  ADD PRIMARY KEY (`AttendanceID`),
  ADD KEY `StudentID` (`StudentID`);

--
-- Indexes for table `BaseFees`
--
ALTER TABLE `BaseFees`
  ADD PRIMARY KEY (`FeeID`),
  ADD KEY `YearID` (`YearID`);

--
-- Indexes for table `Buildings`
--
ALTER TABLE `Buildings`
  ADD PRIMARY KEY (`BuildingID`),
  ADD KEY `CampusID` (`CampusID`);

--
-- Indexes for table `Campuses`
--
ALTER TABLE `Campuses`
  ADD PRIMARY KEY (`CampusID`);

--
-- Indexes for table `Classes`
--
ALTER TABLE `Classes`
  ADD PRIMARY KEY (`ClassID`),
  ADD KEY `GradeID` (`GradeID`),
  ADD KEY `BuildingID` (`BuildingID`),
  ADD KEY `YearID` (`YearID`);

--
-- Indexes for table `ClassTeachers`
--
ALTER TABLE `ClassTeachers`
  ADD PRIMARY KEY (`ClassID`,`TeacherID`),
  ADD KEY `TeacherID` (`TeacherID`);

--
-- Indexes for table `Conversations`
--
ALTER TABLE `Conversations`
  ADD PRIMARY KEY (`ConversationID`),
  ADD KEY `TeacherID` (`TeacherID`),
  ADD KEY `ParentID` (`ParentID`);

--
-- Indexes for table `DailyActivities`
--
ALTER TABLE `DailyActivities`
  ADD PRIMARY KEY (`ActivityID`),
  ADD KEY `StudentID` (`StudentID`);

--
-- Indexes for table `DailySchedules`
--
ALTER TABLE `DailySchedules`
  ADD PRIMARY KEY (`DailyScheduleID`),
  ADD KEY `idx_class_date` (`ClassID`,`ScheduleDate`);

--
-- Indexes for table `DailyStudentLessons`
--
ALTER TABLE `DailyStudentLessons`
  ADD PRIMARY KEY (`LessonLogID`),
  ADD KEY `idx_student_lesson_date` (`StudentID`,`LessonDate`);

--
-- Indexes for table `EventClasses`
--
ALTER TABLE `EventClasses`
  ADD PRIMARY KEY (`EventID`,`ClassID`),
  ADD KEY `ClassID` (`ClassID`);

--
-- Indexes for table `Events`
--
ALTER TABLE `Events`
  ADD PRIMARY KEY (`EventID`),
  ADD KEY `CreatedBy` (`CreatedBy`);

--
-- Indexes for table `Extracurriculars`
--
ALTER TABLE `Extracurriculars`
  ADD PRIMARY KEY (`ActivityID`);

--
-- Indexes for table `Feedbacks`
--
ALTER TABLE `Feedbacks`
  ADD PRIMARY KEY (`FeedbackID`),
  ADD KEY `ParentID` (`ParentID`),
  ADD KEY `RespondedByID` (`RespondedByID`);

--
-- Indexes for table `Grades`
--
ALTER TABLE `Grades`
  ADD PRIMARY KEY (`GradeID`);

--
-- Indexes for table `HealthRecords`
--
ALTER TABLE `HealthRecords`
  ADD PRIMARY KEY (`RecordID`),
  ADD KEY `StudentID` (`StudentID`);

--
-- Indexes for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD PRIMARY KEY (`InvoiceID`),
  ADD KEY `StudentID` (`StudentID`),
  ADD KEY `PackageID` (`PackageID`);

--
-- Indexes for table `LeaveRequests`
--
ALTER TABLE `LeaveRequests`
  ADD PRIMARY KEY (`RequestID`),
  ADD KEY `StudentID` (`StudentID`),
  ADD KEY `ParentID` (`ParentID`),
  ADD KEY `ApproverID` (`ApproverID`);

--
-- Indexes for table `MedicationRequests`
--
ALTER TABLE `MedicationRequests`
  ADD PRIMARY KEY (`MedRequestID`),
  ADD KEY `StudentID` (`StudentID`),
  ADD KEY `ParentID` (`ParentID`);

--
-- Indexes for table `Menus`
--
ALTER TABLE `Menus`
  ADD PRIMARY KEY (`MenuID`),
  ADD KEY `ClassID` (`ClassID`);

--
-- Indexes for table `Messages`
--
ALTER TABLE `Messages`
  ADD PRIMARY KEY (`MessageID`),
  ADD KEY `ConversationID` (`ConversationID`),
  ADD KEY `SenderID` (`SenderID`);

--
-- Indexes for table `Newsfeeds`
--
ALTER TABLE `Newsfeeds`
  ADD PRIMARY KEY (`PostID`),
  ADD KEY `ClassID` (`ClassID`),
  ADD KEY `TeacherID` (`TeacherID`);

--
-- Indexes for table `NewsfeedTags`
--
ALTER TABLE `NewsfeedTags`
  ADD PRIMARY KEY (`PostID`,`StudentID`),
  ADD KEY `StudentID` (`StudentID`);

--
-- Indexes for table `Notifications`
--
ALTER TABLE `Notifications`
  ADD PRIMARY KEY (`NotifID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `Parents`
--
ALTER TABLE `Parents`
  ADD PRIMARY KEY (`ParentID`);

--
-- Indexes for table `PaymentPackages`
--
ALTER TABLE `PaymentPackages`
  ADD PRIMARY KEY (`PackageID`);

--
-- Indexes for table `Principals`
--
ALTER TABLE `Principals`
  ADD PRIMARY KEY (`PrincipalID`);

--
-- Indexes for table `QuickReplies`
--
ALTER TABLE `QuickReplies`
  ADD PRIMARY KEY (`ReplyID`),
  ADD KEY `TeacherID` (`TeacherID`);

--
-- Indexes for table `RewardBadges`
--
ALTER TABLE `RewardBadges`
  ADD PRIMARY KEY (`BadgeID`);

--
-- Indexes for table `Roles`
--
ALTER TABLE `Roles`
  ADD PRIMARY KEY (`RoleID`);

--
-- Indexes for table `StudentAssessments`
--
ALTER TABLE `StudentAssessments`
  ADD PRIMARY KEY (`AssessmentID`),
  ADD KEY `StudentID` (`StudentID`);

--
-- Indexes for table `StudentBadges`
--
ALTER TABLE `StudentBadges`
  ADD PRIMARY KEY (`StudentBadgeID`),
  ADD KEY `StudentID` (`StudentID`),
  ADD KEY `BadgeID` (`BadgeID`);

--
-- Indexes for table `StudentExtracurriculars`
--
ALTER TABLE `StudentExtracurriculars`
  ADD PRIMARY KEY (`EnrollmentID`),
  ADD KEY `StudentID` (`StudentID`),
  ADD KEY `ActivityID` (`ActivityID`);

--
-- Indexes for table `StudentParents`
--
ALTER TABLE `StudentParents`
  ADD PRIMARY KEY (`StudentID`,`ParentID`),
  ADD KEY `ParentID` (`ParentID`);

--
-- Indexes for table `Students`
--
ALTER TABLE `Students`
  ADD PRIMARY KEY (`StudentID`),
  ADD KEY `ClassID` (`ClassID`);

--
-- Indexes for table `SystemLogs`
--
ALTER TABLE `SystemLogs`
  ADD PRIMARY KEY (`LogID`),
  ADD KEY `UserID` (`UserID`);

--
-- Indexes for table `TeacherRankHistory`
--
ALTER TABLE `TeacherRankHistory`
  ADD PRIMARY KEY (`HistoryID`),
  ADD KEY `TeacherID` (`TeacherID`),
  ADD KEY `UpdatedBy` (`UpdatedBy`);

--
-- Indexes for table `Teachers`
--
ALTER TABLE `Teachers`
  ADD PRIMARY KEY (`TeacherID`);

--
-- Indexes for table `Timetables`
--
ALTER TABLE `Timetables`
  ADD PRIMARY KEY (`ScheduleID`),
  ADD KEY `ClassID` (`ClassID`);

--
-- Indexes for table `Transactions`
--
ALTER TABLE `Transactions`
  ADD PRIMARY KEY (`TransactionID`),
  ADD KEY `InvoiceID` (`InvoiceID`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD KEY `RoleID` (`RoleID`);

--
-- Indexes for table `WeeklyRewards`
--
ALTER TABLE `WeeklyRewards`
  ADD PRIMARY KEY (`RewardID`),
  ADD KEY `StudentID` (`StudentID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `AcademicYears`
--
ALTER TABLE `AcademicYears`
  MODIFY `YearID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Attendances`
--
ALTER TABLE `Attendances`
  MODIFY `AttendanceID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

--
-- AUTO_INCREMENT for table `BaseFees`
--
ALTER TABLE `BaseFees`
  MODIFY `FeeID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Buildings`
--
ALTER TABLE `Buildings`
  MODIFY `BuildingID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Campuses`
--
ALTER TABLE `Campuses`
  MODIFY `CampusID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Classes`
--
ALTER TABLE `Classes`
  MODIFY `ClassID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `Conversations`
--
ALTER TABLE `Conversations`
  MODIFY `ConversationID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `DailyActivities`
--
ALTER TABLE `DailyActivities`
  MODIFY `ActivityID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `DailySchedules`
--
ALTER TABLE `DailySchedules`
  MODIFY `DailyScheduleID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `DailyStudentLessons`
--
ALTER TABLE `DailyStudentLessons`
  MODIFY `LessonLogID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Events`
--
ALTER TABLE `Events`
  MODIFY `EventID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Extracurriculars`
--
ALTER TABLE `Extracurriculars`
  MODIFY `ActivityID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Feedbacks`
--
ALTER TABLE `Feedbacks`
  MODIFY `FeedbackID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Grades`
--
ALTER TABLE `Grades`
  MODIFY `GradeID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `HealthRecords`
--
ALTER TABLE `HealthRecords`
  MODIFY `RecordID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Invoices`
--
ALTER TABLE `Invoices`
  MODIFY `InvoiceID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `LeaveRequests`
--
ALTER TABLE `LeaveRequests`
  MODIFY `RequestID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `MedicationRequests`
--
ALTER TABLE `MedicationRequests`
  MODIFY `MedRequestID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `Menus`
--
ALTER TABLE `Menus`
  MODIFY `MenuID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Messages`
--
ALTER TABLE `Messages`
  MODIFY `MessageID` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Newsfeeds`
--
ALTER TABLE `Newsfeeds`
  MODIFY `PostID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Notifications`
--
ALTER TABLE `Notifications`
  MODIFY `NotifID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `PaymentPackages`
--
ALTER TABLE `PaymentPackages`
  MODIFY `PackageID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `QuickReplies`
--
ALTER TABLE `QuickReplies`
  MODIFY `ReplyID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `RewardBadges`
--
ALTER TABLE `RewardBadges`
  MODIFY `BadgeID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `Roles`
--
ALTER TABLE `Roles`
  MODIFY `RoleID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `StudentAssessments`
--
ALTER TABLE `StudentAssessments`
  MODIFY `AssessmentID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `StudentBadges`
--
ALTER TABLE `StudentBadges`
  MODIFY `StudentBadgeID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `StudentExtracurriculars`
--
ALTER TABLE `StudentExtracurriculars`
  MODIFY `EnrollmentID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Students`
--
ALTER TABLE `Students`
  MODIFY `StudentID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT for table `SystemLogs`
--
ALTER TABLE `SystemLogs`
  MODIFY `LogID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `TeacherRankHistory`
--
ALTER TABLE `TeacherRankHistory`
  MODIFY `HistoryID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Timetables`
--
ALTER TABLE `Timetables`
  MODIFY `ScheduleID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Transactions`
--
ALTER TABLE `Transactions`
  MODIFY `TransactionID` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `UserID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `WeeklyRewards`
--
ALTER TABLE `WeeklyRewards`
  MODIFY `RewardID` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Admins`
--
ALTER TABLE `Admins`
  ADD CONSTRAINT `Admins_ibfk_1` FOREIGN KEY (`AdminID`) REFERENCES `Users` (`UserID`);

--
-- Constraints for table `Attendances`
--
ALTER TABLE `Attendances`
  ADD CONSTRAINT `Attendances_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`);

--
-- Constraints for table `BaseFees`
--
ALTER TABLE `BaseFees`
  ADD CONSTRAINT `BaseFees_ibfk_1` FOREIGN KEY (`YearID`) REFERENCES `AcademicYears` (`YearID`);

--
-- Constraints for table `Buildings`
--
ALTER TABLE `Buildings`
  ADD CONSTRAINT `Buildings_ibfk_1` FOREIGN KEY (`CampusID`) REFERENCES `Campuses` (`CampusID`);

--
-- Constraints for table `Classes`
--
ALTER TABLE `Classes`
  ADD CONSTRAINT `Classes_ibfk_1` FOREIGN KEY (`GradeID`) REFERENCES `Grades` (`GradeID`),
  ADD CONSTRAINT `Classes_ibfk_2` FOREIGN KEY (`BuildingID`) REFERENCES `Buildings` (`BuildingID`),
  ADD CONSTRAINT `Classes_ibfk_3` FOREIGN KEY (`YearID`) REFERENCES `AcademicYears` (`YearID`);

--
-- Constraints for table `ClassTeachers`
--
ALTER TABLE `ClassTeachers`
  ADD CONSTRAINT `ClassTeachers_ibfk_1` FOREIGN KEY (`ClassID`) REFERENCES `Classes` (`ClassID`),
  ADD CONSTRAINT `ClassTeachers_ibfk_2` FOREIGN KEY (`TeacherID`) REFERENCES `Teachers` (`TeacherID`);

--
-- Constraints for table `Conversations`
--
ALTER TABLE `Conversations`
  ADD CONSTRAINT `Conversations_ibfk_1` FOREIGN KEY (`TeacherID`) REFERENCES `Teachers` (`TeacherID`),
  ADD CONSTRAINT `Conversations_ibfk_2` FOREIGN KEY (`ParentID`) REFERENCES `Parents` (`ParentID`);

--
-- Constraints for table `DailyActivities`
--
ALTER TABLE `DailyActivities`
  ADD CONSTRAINT `DailyActivities_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`);

--
-- Constraints for table `DailySchedules`
--
ALTER TABLE `DailySchedules`
  ADD CONSTRAINT `FK_DailySchedules_Classes` FOREIGN KEY (`ClassID`) REFERENCES `Classes` (`ClassID`) ON DELETE CASCADE;

--
-- Constraints for table `DailyStudentLessons`
--
ALTER TABLE `DailyStudentLessons`
  ADD CONSTRAINT `FK_DailyStudentLessons_Students` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`) ON DELETE CASCADE;

--
-- Constraints for table `EventClasses`
--
ALTER TABLE `EventClasses`
  ADD CONSTRAINT `EventClasses_ibfk_1` FOREIGN KEY (`EventID`) REFERENCES `Events` (`EventID`) ON DELETE CASCADE,
  ADD CONSTRAINT `EventClasses_ibfk_2` FOREIGN KEY (`ClassID`) REFERENCES `Classes` (`ClassID`) ON DELETE CASCADE;

--
-- Constraints for table `Events`
--
ALTER TABLE `Events`
  ADD CONSTRAINT `Events_ibfk_1` FOREIGN KEY (`CreatedBy`) REFERENCES `Users` (`UserID`);

--
-- Constraints for table `Feedbacks`
--
ALTER TABLE `Feedbacks`
  ADD CONSTRAINT `Feedbacks_ibfk_1` FOREIGN KEY (`ParentID`) REFERENCES `Parents` (`ParentID`),
  ADD CONSTRAINT `Feedbacks_ibfk_2` FOREIGN KEY (`RespondedByID`) REFERENCES `Users` (`UserID`);

--
-- Constraints for table `HealthRecords`
--
ALTER TABLE `HealthRecords`
  ADD CONSTRAINT `HealthRecords_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`);

--
-- Constraints for table `Invoices`
--
ALTER TABLE `Invoices`
  ADD CONSTRAINT `Invoices_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`),
  ADD CONSTRAINT `Invoices_ibfk_2` FOREIGN KEY (`PackageID`) REFERENCES `PaymentPackages` (`PackageID`);

--
-- Constraints for table `LeaveRequests`
--
ALTER TABLE `LeaveRequests`
  ADD CONSTRAINT `LeaveRequests_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`),
  ADD CONSTRAINT `LeaveRequests_ibfk_2` FOREIGN KEY (`ParentID`) REFERENCES `Parents` (`ParentID`),
  ADD CONSTRAINT `LeaveRequests_ibfk_3` FOREIGN KEY (`ApproverID`) REFERENCES `Teachers` (`TeacherID`);

--
-- Constraints for table `MedicationRequests`
--
ALTER TABLE `MedicationRequests`
  ADD CONSTRAINT `MedicationRequests_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`),
  ADD CONSTRAINT `MedicationRequests_ibfk_2` FOREIGN KEY (`ParentID`) REFERENCES `Parents` (`ParentID`);

--
-- Constraints for table `Menus`
--
ALTER TABLE `Menus`
  ADD CONSTRAINT `Menus_ibfk_1` FOREIGN KEY (`ClassID`) REFERENCES `Classes` (`ClassID`);

--
-- Constraints for table `Messages`
--
ALTER TABLE `Messages`
  ADD CONSTRAINT `Messages_ibfk_1` FOREIGN KEY (`ConversationID`) REFERENCES `Conversations` (`ConversationID`),
  ADD CONSTRAINT `Messages_ibfk_2` FOREIGN KEY (`SenderID`) REFERENCES `Users` (`UserID`);

--
-- Constraints for table `Newsfeeds`
--
ALTER TABLE `Newsfeeds`
  ADD CONSTRAINT `Newsfeeds_ibfk_1` FOREIGN KEY (`ClassID`) REFERENCES `Classes` (`ClassID`),
  ADD CONSTRAINT `Newsfeeds_ibfk_2` FOREIGN KEY (`TeacherID`) REFERENCES `Teachers` (`TeacherID`);

--
-- Constraints for table `NewsfeedTags`
--
ALTER TABLE `NewsfeedTags`
  ADD CONSTRAINT `NewsfeedTags_ibfk_1` FOREIGN KEY (`PostID`) REFERENCES `Newsfeeds` (`PostID`) ON DELETE CASCADE,
  ADD CONSTRAINT `NewsfeedTags_ibfk_2` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`) ON DELETE CASCADE;

--
-- Constraints for table `Notifications`
--
ALTER TABLE `Notifications`
  ADD CONSTRAINT `Notifications_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`);

--
-- Constraints for table `Parents`
--
ALTER TABLE `Parents`
  ADD CONSTRAINT `Parents_ibfk_1` FOREIGN KEY (`ParentID`) REFERENCES `Users` (`UserID`);

--
-- Constraints for table `Principals`
--
ALTER TABLE `Principals`
  ADD CONSTRAINT `Principals_ibfk_1` FOREIGN KEY (`PrincipalID`) REFERENCES `Users` (`UserID`);

--
-- Constraints for table `QuickReplies`
--
ALTER TABLE `QuickReplies`
  ADD CONSTRAINT `QuickReplies_ibfk_1` FOREIGN KEY (`TeacherID`) REFERENCES `Teachers` (`TeacherID`);

--
-- Constraints for table `StudentAssessments`
--
ALTER TABLE `StudentAssessments`
  ADD CONSTRAINT `StudentAssessments_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`);

--
-- Constraints for table `StudentBadges`
--
ALTER TABLE `StudentBadges`
  ADD CONSTRAINT `StudentBadges_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`) ON DELETE CASCADE,
  ADD CONSTRAINT `StudentBadges_ibfk_2` FOREIGN KEY (`BadgeID`) REFERENCES `RewardBadges` (`BadgeID`) ON DELETE CASCADE;

--
-- Constraints for table `StudentExtracurriculars`
--
ALTER TABLE `StudentExtracurriculars`
  ADD CONSTRAINT `StudentExtracurriculars_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`),
  ADD CONSTRAINT `StudentExtracurriculars_ibfk_2` FOREIGN KEY (`ActivityID`) REFERENCES `Extracurriculars` (`ActivityID`);

--
-- Constraints for table `StudentParents`
--
ALTER TABLE `StudentParents`
  ADD CONSTRAINT `StudentParents_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`),
  ADD CONSTRAINT `StudentParents_ibfk_2` FOREIGN KEY (`ParentID`) REFERENCES `Parents` (`ParentID`);

--
-- Constraints for table `Students`
--
ALTER TABLE `Students`
  ADD CONSTRAINT `Students_ibfk_1` FOREIGN KEY (`ClassID`) REFERENCES `Classes` (`ClassID`);

--
-- Constraints for table `SystemLogs`
--
ALTER TABLE `SystemLogs`
  ADD CONSTRAINT `SystemLogs_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `Users` (`UserID`);

--
-- Constraints for table `TeacherRankHistory`
--
ALTER TABLE `TeacherRankHistory`
  ADD CONSTRAINT `TeacherRankHistory_ibfk_1` FOREIGN KEY (`TeacherID`) REFERENCES `Teachers` (`TeacherID`),
  ADD CONSTRAINT `TeacherRankHistory_ibfk_2` FOREIGN KEY (`UpdatedBy`) REFERENCES `Users` (`UserID`);

--
-- Constraints for table `Teachers`
--
ALTER TABLE `Teachers`
  ADD CONSTRAINT `Teachers_ibfk_1` FOREIGN KEY (`TeacherID`) REFERENCES `Users` (`UserID`);

--
-- Constraints for table `Timetables`
--
ALTER TABLE `Timetables`
  ADD CONSTRAINT `Timetables_ibfk_1` FOREIGN KEY (`ClassID`) REFERENCES `Classes` (`ClassID`);

--
-- Constraints for table `Transactions`
--
ALTER TABLE `Transactions`
  ADD CONSTRAINT `Transactions_ibfk_1` FOREIGN KEY (`InvoiceID`) REFERENCES `Invoices` (`InvoiceID`);

--
-- Constraints for table `Users`
--
ALTER TABLE `Users`
  ADD CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`RoleID`) REFERENCES `Roles` (`RoleID`);

--
-- Constraints for table `WeeklyRewards`
--
ALTER TABLE `WeeklyRewards`
  ADD CONSTRAINT `WeeklyRewards_ibfk_1` FOREIGN KEY (`StudentID`) REFERENCES `Students` (`StudentID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;



-- 
-- MOCK DATA FOR TEACHER DASHBOARD (Today's Data)
--

-- 1. DailySchedules (Today)
INSERT IGNORE INTO `DailySchedules` (`ClassID`, `Date`, `StartTime`, `EndTime`, `ActivityName`, `Description`) VALUES
(1, 1782259200, 1782288000, 1782289800, 'Đón trẻ', 'Đón trẻ và tập thể dục buổi sáng'),
(1, 1782259200, 1782291600, 1782295200, 'Học tiếng Anh', 'Học từ vựng cơ bản với giáo viên bản ngữ'),
(1, 1782259200, 1782295200, 1782298800, 'Hoạt động ngoài trời', 'Chơi trò chơi tập thể ngoài sân'),
(1, 1782259200, 1782302400, 1782309600, 'Ngủ trưa', 'Giờ ngủ trưa của bé'),
(1, 1782259200, 1782313200, 1782316800, 'Ăn xế và chơi tự do', 'Ăn nhẹ buổi chiều và chơi đồ chơi trong lớp');

-- 2. Menus (Today)
INSERT IGNORE INTO `Menus` (`ClassID`, `Date`, `MealType`, `MealTime`, `DishName`, `NutritionInfo`, `ImageURL`) VALUES
(1, 1782259200, 'Sáng', 1782289800, 'Phở bò', 'Chứa nhiều protein và tinh bột', 'https://example.com/pho.jpg'),
(1, 1782259200, 'Trưa', 1782299700, 'Cơm cá hồi sốt cam, Canh rau ngót thịt băm', 'Giàu Omega-3 và vitamin', 'https://example.com/salmon.jpg'),
(1, 1782259200, 'Xế', 1782311400, 'Sữa chua trái cây', 'Bổ sung lợi khuẩn', 'https://example.com/yogurt.jpg');

-- 3. LeaveRequests (Pending for today/tomorrow)
INSERT IGNORE INTO `LeaveRequests` (`StudentID`, `ParentID`, `StartDate`, `EndDate`, `Reason`, `Status`, `TeacherNote`) VALUES
(1, 1, 1782259200, 1782259200, 'Bé bị ốm nhẹ', 'Pending', NULL),
(2, 2, 1782259200, 1782432000, 'Gia đình có việc bận về quê', 'Pending', NULL),
(3, 3, 1782172800, 1782172800, 'Bé đi tiêm phòng', 'Approved', 'Đã lưu ý');

-- 4. MedicationRequests (Pending for today)
INSERT IGNORE INTO `MedicationRequests` (`StudentID`, `ParentID`, `RequestDate`, `MedicineDetails`, `Dosage`, `Frequency`, `TimeToTake`, `ParentNote`, `Status`) VALUES
(4, 4, 1782259200, 'Thuốc ho Paburon', '1 nắp (5ml)', '1 lần/ngày', 'Sau ăn trưa 30 phút', 'Cô cho bé uống bằng thìa nhỏ giúp mẹ nhé', 'Pending'),
(5, 5, 1782259200, 'Thuốc hạ sốt Hapacol', '1 gói', 'Chỉ uống khi sốt > 38.5 độ', 'Khi cần thiết', 'Nếu bé sốt cô báo mẹ ngay nhé', 'Pending');

-- 5. RewardBadges (Ensure they exist)
INSERT IGNORE INTO `RewardBadges` (`BadgeID`, `BadgeName`, `BadgeImageURL`, `CriteriaType`) VALUES
(1, 'Phiếu bé ngoan cuối tuần', '/images/badges/phieubengoan.png', 'Đánh giá tuần'),
(2, 'Bé ăn ngoan', '/images/badges/anngoan.png', 'Theo chuyên đề'),
(3, 'Bé ngủ ngoan', '/images/badges/ngungoan.png', 'Theo chuyên đề'),
(4, 'Bé đi học đều', '/images/badges/dihocdeu.png', 'Đánh giá tháng');

