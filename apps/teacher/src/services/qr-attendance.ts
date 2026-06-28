import { apiClient } from '@kindercare/core';

export interface QrScanResult {
  studentId: string | number;
  fullName: string;
  className: string;
  campusName: string;
  attendanceType: 'checkin' | 'checkout';
  time: string;
}

export class QrAttendanceService {
  /**
   * Gọi API quét mã QR để điểm danh
   * @param qrToken Mã QR lấy được từ camera
   */
  public static async scanQrToken(qrToken: string): Promise<QrScanResult> {
    const response = await apiClient.post('/teacher/attendance/scan', { qrToken });
    return response.data?.data;
  }
}
