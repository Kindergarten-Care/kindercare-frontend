import { apiClient, ApiResponse, SERVER } from '@kindercare/core';
import { MedicationRequestApiDto, MedicationRequestDomainModel, CreateMedicationRequestDto } from '@/config/types/medicationRequest';
import { MedicationRequestMapper } from './MedicationRequestMapper';

class MedicationRequestService {
  async createMedicationRequest(dto: CreateMedicationRequestDto, file?: File | null): Promise<MedicationRequestDomainModel> {
    const formData = new FormData();
    formData.append('studentId', String(dto.studentId));
    formData.append('requestDate', String(dto.requestDate));
    formData.append('medicineDetails', dto.medicineDetails);
    formData.append('dosage', dto.dosage);
    if (dto.frequency) {
      formData.append('frequency', dto.frequency);
    }
    if (dto.timeToTake) {
      formData.append('timeToTake', dto.timeToTake);
    }
    if (dto.parentNote) {
      formData.append('parentNote', dto.parentNote);
    }
    if (file) {
      formData.append('medicineImage', file);
    }

    const { data: res } = await apiClient.post<ApiResponse<MedicationRequestApiDto>>(
      SERVER.parent.createMedicationRequest,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    if (!res.success) {
      throw new Error(res.message);
    }
    return MedicationRequestMapper.toDomain(res.data);
  }
}

export const medicationRequestService = new MedicationRequestService();
