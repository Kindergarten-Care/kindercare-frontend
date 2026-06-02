import { SchoolYearModel, SchoolYearResponseDTO } from '../config/types/schoolYear';
import { SchoolYearMapper } from './mappers/SchoolYearMapper';

const MOCK_SCHOOL_YEARS_API_RESPONSE: SchoolYearResponseDTO[] = [
  {
    id: '1',
    name: '2024 - 2025',
    start_date: '05/09/2024',
    end_date: '31/05/2025',
    total_facilities: 5,
    total_classes: 180,
    status: 'active'
  },
  {
    id: '2',
    name: '2023 - 2024',
    start_date: '05/09/2023',
    end_date: '31/05/2024',
    total_facilities: 5,
    total_classes: 175,
    status: 'past'
  },
  {
    id: '3',
    name: '2022 - 2023',
    start_date: '05/09/2022',
    end_date: '31/05/2023',
    total_facilities: 4,
    total_classes: 150,
    status: 'past'
  },
  {
    id: '4',
    name: '2021 - 2022',
    start_date: '05/09/2021',
    end_date: '31/05/2022',
    total_facilities: 4,
    total_classes: 140,
    status: 'past'
  }
];

export class SchoolYearService {
  /**
   * Fetches the list of school years.
   * This is currently returning mock data but is structured to call an API.
   */
  static async getSchoolYears(): Promise<SchoolYearModel[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Map raw DTOs to Domain Models
    return SchoolYearMapper.toDomainList(MOCK_SCHOOL_YEARS_API_RESPONSE);
  }
}
