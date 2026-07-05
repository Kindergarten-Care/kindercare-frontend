import {
  InvoiceApiDto,
  InvoiceDomainModel,
  InvoiceDetailApiDto,
  InvoiceDetailDomainModel,
  InvoiceTransactionApiDto,
  InvoiceTransactionDomainModel,
  ExtracurricularInvoiceItemApiDto,
  ExtracurricularInvoiceItemDomainModel,
} from '@/config/types/invoice';

const toNumber = (value: unknown): number => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

export class InvoiceMapper {
  static toDomain(dto: InvoiceApiDto): InvoiceDomainModel {
    return {
      invoiceId: dto.invoiceId,
      invoiceType: dto.invoiceType,
      billingMonth: dto.billingMonth,
      periodRange: dto.periodRange,
      tuitionFee: toNumber(dto.tuitionFee),
      expectedMealFee: toNumber(dto.expectedMealFee),
      extracurricularFee: toNumber(dto.extracurricularFee),
      surcharge: toNumber(dto.surcharge),
      refundAmount: toNumber(dto.refundAmount),
      discountAmount: toNumber(dto.discountAmount),
      totalAmount: toNumber(dto.totalAmount),
      paymentStatus: dto.paymentStatus,
      dueDate: dto.dueDate,
      createdAt: dto.createdAt,
    };
  }

  static toDomainList(dtos: InvoiceApiDto[]): InvoiceDomainModel[] {
    return dtos.map(InvoiceMapper.toDomain);
  }

  static transactionToDomain(dto: InvoiceTransactionApiDto): InvoiceTransactionDomainModel {
    return {
      transactionId: dto.transactionId,
      amountPaid: toNumber(dto.amountPaid),
      paymentMethod: dto.paymentMethod,
      transactionCode: dto.transactionCode,
      transactionDate: dto.transactionDate,
      status: dto.status,
    };
  }

  static extracurricularItemToDomain(dto: ExtracurricularInvoiceItemApiDto): ExtracurricularInvoiceItemDomainModel {
    return {
      enrollmentId: dto.enrollmentId,
      activityId: dto.activityId,
      activityName: dto.activityName,
      monthlyFee: toNumber(dto.monthlyFee),
      status: dto.status,
      feeRefunded: dto.feeRefunded,
    };
  }

  static detailToDomain(dto: InvoiceDetailApiDto): InvoiceDetailDomainModel {
    return {
      ...InvoiceMapper.toDomain(dto),
      studentId: dto.studentId,
      packageId: dto.packageId,
      transactions: (dto.transactions ?? []).map(InvoiceMapper.transactionToDomain),
      extracurricularItems: dto.extracurricularItems?.map(InvoiceMapper.extracurricularItemToDomain),
    };
  }
}
