import { z } from 'zod';

// Ràng buộc số điện thoại Việt Nam
export const phoneSchema = z
  .string({ required_error: 'Số điện thoại là bắt buộc' })
  .regex(/^(03|05|07|08|09)[0-9]{8}$/, { 
    message: 'Số điện thoại không hợp lệ, phải gồm 10 chữ số và bắt đầu bằng đầu số chuẩn VN (03, 05, 07, 08, 09).' 
  });

// Ràng buộc Email
export const emailSchema = z
  .string({ required_error: 'Email là bắt buộc' })
  .min(1, { message: 'Email không được để trống.' })
  .email({ message: 'Email sai định dạng (ví dụ: example@domain.com).' });

// Ràng buộc Căn cước công dân (CCCD) / CMND
export const idCardSchema = z
  .string({ required_error: 'CCCD/CMND là bắt buộc' })
  .regex(/^([0-9]{9}|[0-9]{12})$/, { 
    message: 'CCCD/CMND phải là chuỗi số có độ dài chính xác 9 hoặc 12 chữ số.' 
  });

// Mẫu Schema chung cho User / Teacher / Parent Profile
export const userProfileSchema = z.object({
  fullName: z.string().min(2, { message: 'Họ tên phải có ít nhất 2 ký tự' }),
  phone: phoneSchema,
  email: emailSchema,
  idCard: idCardSchema,
});
