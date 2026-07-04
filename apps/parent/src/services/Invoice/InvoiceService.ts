import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import {
  InvoiceApiDto,
  InvoiceDomainModel,
  InvoiceDetailApiDto,
  InvoiceDetailDomainModel,
  InvoiceListQuery,
  PayInvoiceDto,
  PayInvoiceResult,
  PayMomoResult,
} from '@/config/types/invoice';
import { InvoiceMapper } from './InvoiceMapper';

class InvoiceService {
  async getInvoices(studentId: number | string, query?: InvoiceListQuery): Promise<InvoiceDomainModel[]> {
    const url = SERVER.parent.getInvoices.replace(':studentId', studentId.toString());
    const params = new URLSearchParams();
    if (query?.type) params.set('type', query.type);
    if (query?.status) params.set('status', query.status);
    if (query?.from) params.set('from', query.from);
    if (query?.to) params.set('to', query.to);
    const qs = params.toString();

    const { data: res } = await apiClient.get<ApiResponse<InvoiceApiDto[]>>(qs ? `${url}?${qs}` : url);
    if (!res.success) throw new Error(res.message);
    return InvoiceMapper.toDomainList(res.data);
  }

  async getInvoiceDetail(invoiceId: number | string): Promise<InvoiceDetailDomainModel> {
    const url = SERVER.parent.getInvoiceDetail.replace(':invoiceId', invoiceId.toString());
    const { data: res } = await apiClient.get<ApiResponse<InvoiceDetailApiDto>>(url);
    if (!res.success) throw new Error(res.message);
    return InvoiceMapper.detailToDomain(res.data);
  }

  async payInvoice(invoiceId: number | string, dto: PayInvoiceDto): Promise<PayInvoiceResult> {
    const url = SERVER.parent.payInvoice.replace(':invoiceId', invoiceId.toString());
    const { data: res } = await apiClient.post<ApiResponse<PayInvoiceResult>>(url, dto);
    if (!res.success) throw new Error(res.message);
    return res.data;
  }

  async payInvoiceMomo(invoiceId: number | string): Promise<PayMomoResult> {
    const url = SERVER.parent.payInvoiceMomo.replace(':invoiceId', invoiceId.toString());
    const { data: res } = await apiClient.post<ApiResponse<PayMomoResult>>(url);
    if (!res.success) throw new Error(res.message);
    return res.data;
  }
}

export const invoiceService = new InvoiceService();
