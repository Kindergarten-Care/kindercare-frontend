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
export type InvoiceType = 'MONTHLY' | 'EXTRACURRICULAR' | string;

export interface InvoiceDto {
  id: number;
  studentId: number | null;
  studentFullName: string | null;
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
  reminderSentAt: number | null;
  overdueReminderSentAt: number | null;
}

export interface InvoiceFilters {
  studentId?: number;
  billingMonth?: string;
  paymentStatus?: string;
  invoiceType?: string;
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
