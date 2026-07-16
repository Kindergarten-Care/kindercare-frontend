export interface FeePackageDto {
  id: number;
  name: string;
  duration: number;
  discount: number;
}

export interface BaseFeeDto {
  id: number;
  yearId: number;
  yearName: string | null;
  isActive: 0 | 1 | null;
  monthlyTuition: number;
  dailyMealFee: number;
}

export interface ExtracurricularDto {
  id: number;
  name: string;
  monthlyFee: number;
  description: string | null;
}

export interface FeesDataDto {
  packages: FeePackageDto[];
  baseFees: BaseFeeDto[];
  extracurriculars: ExtracurricularDto[];
}

export type InvoiceStatus = string;
export type InvoiceType = 'TUITION' | 'MONTHLY' | 'EXTRACURRICULAR' | string;

export interface InvoiceDto {
  id: number;
  studentId: number | null;
  studentFullName: string | null;
  classId: number | null;
  className: string | null;
  packageId: number | null;
  packageName: string | null;
  periodRange: string | null;
  billingMonth: string;
  tuitionFee: number;
  expectedMealFee: number;
  extracurricularFee: number;
  surcharge: number;
  refundAmount: number;
  discountAmount: number;
  totalAmount: number;
  paymentStatus: InvoiceStatus;
  invoiceType: InvoiceType;
  createdAt: number;
  dueDate: number | null;
  published: 0 | 1;
  publishedAt: number | null;
  reminderSentAt: number | null;
  overdueReminderSentAt: number | null;
}

export interface InvoiceTransactionDto {
  id: number;
  amountPaid: number;
  paymentMethod: string;
  transactionCode: string;
  transactionDate: number;
  status: string;
}

export interface MealRefundBreakdownDto {
  deductedDays: number;
  dailyFee: number;
  refundAmount: number;
}

export interface InvoiceDetailDto extends InvoiceDto {
  /** Chỉ có giá trị khi invoiceType === 'MONTHLY'; null với TUITION/EXTRACURRICULAR. */
  mealRefundBreakdown: MealRefundBreakdownDto | null;
  transactions: InvoiceTransactionDto[];
}

export interface InvoiceFilters {
  studentId?: number;
  billingMonth?: string;
  paymentStatus?: string;
  invoiceType?: string;
  published?: '0' | '1';
}

export interface RunMonthlyPayload {
  billingMonth?: string;
  /** Chỉ có tác dụng khi billingMonth trùng tháng hiện tại của server — dùng cho demo/test, cron thật không gửi cờ này. */
  partialMonth?: boolean;
}

export interface RunMonthlyResultDto {
  billingMonth: string;
  generated: {
    tuition: number;
    monthly: number;
    extracurricular: number;
  };
  skipped: number;
  failedStudentIds: number[];
  /** Server xác nhận đã thực sự áp dụng tính theo ngày hay chưa — có thể false dù request gửi true. */
  partialMonth: boolean;
  /** Ngày trong tháng dùng làm mốc cắt; null nếu partialMonth = false. */
  partialUntilDay: number | null;
}

export interface PublishInvoicesResultDto {
  billingMonth: string;
  publishedCount: number;
}

export interface PublishSelectedInvoicesResultDto {
  publishedCount: number;
  publishedIds: number[];
  skippedIds: number[];
}

/** Raw DB column response from PATCH /billing/invoices/{id}/publish — PascalCase, different convention from list/detail. */
export interface PublishInvoiceRawDto {
  InvoiceID: number;
  StudentID: number;
  PackageID: number | null;
  PeriodRange: string | null;
  BillingMonth: string;
  TuitionFee: string;
  ExpectedMealFee: string;
  ExtracurricularFee: string;
  Surcharge: string;
  RefundAmount: string;
  DiscountAmount: string;
  TotalAmount: string;
  PaymentStatus: string;
  Published: 0 | 1;
  PublishedAt: number | null;
  CreatedAt: number;
  InvoiceType: string;
  DueDate: number | null;
  ReminderSentAt: number | null;
  OverdueReminderSentAt: number | null;
}

export interface UpdateBaseFeePayload {
  monthlyTuition?: number;
  dailyMealFee?: number;
}

export interface CreatePaymentPackagePayload {
  name: string;
  duration: number;
  discount?: number;
}

export interface UpdatePaymentPackagePayload {
  name?: string;
  duration?: number;
  discount?: number;
}

export interface CreateExtracurricularPayload {
  name: string;
  monthlyFee: number;
  description?: string;
}

export interface UpdateExtracurricularPayload {
  name?: string;
  monthlyFee?: number;
  description?: string;
}
