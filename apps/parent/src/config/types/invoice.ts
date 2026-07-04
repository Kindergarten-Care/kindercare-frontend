export type InvoiceType = 'TUITION' | 'MONTHLY';
export type PaymentStatus = 'Unpaid' | 'Partial' | 'Paid';
export type TransactionStatus = 'Success' | 'Pending' | 'Failed';

export interface InvoiceApiDto {
  invoiceId: number;
  invoiceType: InvoiceType;
  billingMonth: string;
  periodRange: string | null;
  tuitionFee: number;
  expectedMealFee: number;
  extracurricularFee: number;
  surcharge: number;
  refundAmount: number;
  discountAmount: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  dueDate: number | null;
  createdAt: number;
}

export interface InvoiceDomainModel {
  invoiceId: number;
  invoiceType: InvoiceType;
  billingMonth: string;
  periodRange: string | null;
  tuitionFee: number;
  expectedMealFee: number;
  extracurricularFee: number;
  surcharge: number;
  refundAmount: number;
  discountAmount: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  dueDate: number | null;
  createdAt: number;
}

export interface InvoiceTransactionApiDto {
  transactionId: number;
  amountPaid: number;
  paymentMethod: string;
  transactionCode: string | null;
  transactionDate: number;
  status: TransactionStatus;
}

export interface InvoiceTransactionDomainModel {
  transactionId: number;
  amountPaid: number;
  paymentMethod: string;
  transactionCode: string | null;
  transactionDate: number;
  status: TransactionStatus;
}

export interface InvoiceDetailApiDto extends InvoiceApiDto {
  studentId: number;
  packageId: number | null;
  transactions: InvoiceTransactionApiDto[];
}

export interface InvoiceDetailDomainModel extends InvoiceDomainModel {
  studentId: number;
  packageId: number | null;
  transactions: InvoiceTransactionDomainModel[];
}

export interface InvoiceListQuery {
  type?: InvoiceType;
  status?: PaymentStatus;
  from?: string;
  to?: string;
}

export interface PayInvoiceDto {
  amountPaid: number;
  paymentMethod: string;
  transactionCode?: string;
}

export interface PayInvoiceResult {
  transactionId: number;
  invoiceId: number;
  amountPaid: number;
  totalPaid: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
}

export interface PayMomoResult {
  payUrl: string;
  orderId: string;
}

export interface PayVnpayResult {
  payUrl: string;
  txnRef: string;
}
