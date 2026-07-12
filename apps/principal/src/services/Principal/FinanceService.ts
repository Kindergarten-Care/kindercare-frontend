import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import {
  FeesDataDto,
  InvoiceDto,
  InvoiceFilters,
  FeePackageDto,
  ExtracurricularDto,
  UpdateBaseFeePayload,
  CreatePaymentPackagePayload,
  UpdatePaymentPackagePayload,
  CreateExtracurricularPayload,
  UpdateExtracurricularPayload,
} from '@/config/types/finance';

class FinanceService {
  async getFees(): Promise<FeesDataDto> {
    const { data: res } = await apiClient.get<ApiResponse<FeesDataDto>>(SERVER.principal.getFees);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }

  async getInvoices(filters?: InvoiceFilters): Promise<InvoiceDto[]> {
    const { data: res } = await apiClient.get<ApiResponse<InvoiceDto[]>>(SERVER.principal.getInvoices, {
      params: filters,
    });
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data || [];
  }

  async updateBaseFee(id: number, payload: UpdateBaseFeePayload): Promise<void> {
    const url = SERVER.principal.updateBaseFee.replace(':id', String(id));
    const { data: res } = await apiClient.patch<ApiResponse<null>>(url, payload);
    if (!res.success) {
      throw new Error(res.message);
    }
  }

  async createPaymentPackage(payload: CreatePaymentPackagePayload): Promise<FeePackageDto> {
    const { data: res } = await apiClient.post<ApiResponse<FeePackageDto>>(SERVER.principal.createPaymentPackage, payload);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }

  async updatePaymentPackage(id: number, payload: UpdatePaymentPackagePayload): Promise<void> {
    const url = SERVER.principal.updatePaymentPackage.replace(':id', String(id));
    const { data: res } = await apiClient.patch<ApiResponse<null>>(url, payload);
    if (!res.success) {
      throw new Error(res.message);
    }
  }

  async createExtracurricular(payload: CreateExtracurricularPayload): Promise<ExtracurricularDto> {
    const { data: res } = await apiClient.post<ApiResponse<ExtracurricularDto>>(SERVER.principal.createExtracurricular, payload);
    if (!res.success) {
      throw new Error(res.message);
    }
    return res.data;
  }

  async updateExtracurricular(id: number, payload: UpdateExtracurricularPayload): Promise<void> {
    const url = SERVER.principal.updateExtracurricular.replace(':id', String(id));
    const { data: res } = await apiClient.patch<ApiResponse<null>>(url, payload);
    if (!res.success) {
      throw new Error(res.message);
    }
  }
}

export const financeService = new FinanceService();
