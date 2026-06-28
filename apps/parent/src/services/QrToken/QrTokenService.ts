import { apiClient, ApiResponse, SERVER } from '@kindercare/core';

interface QrTokenResponse {
  token: string;
  expiresAt: number;
  ttl: number;
}

class QrTokenService {
  async getQrToken(studentId: number | string): Promise<QrTokenResponse> {
    const url = SERVER.parent.getQrToken.replace(':studentId', studentId.toString());
    const { data: res } = await apiClient.get<ApiResponse<QrTokenResponse>>(url);
    if (!res.success) throw new Error(res.message);
    return res.data;
  }
}

export const qrTokenService = new QrTokenService();
