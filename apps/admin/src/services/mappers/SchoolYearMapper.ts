import { SchoolYearModel, SchoolYearResponseDTO } from '../../config/types/schoolYear';

export class SchoolYearMapper {
  static toDomain(raw: SchoolYearResponseDTO): SchoolYearModel {
    return {
      id: raw.id,
      name: raw.name,
      startDate: raw.start_date,
      endDate: raw.end_date,
      totalFacilities: raw.total_facilities,
      totalClasses: raw.total_classes,
      status: raw.status,
    };
  }

  static toDomainList(rawList: SchoolYearResponseDTO[]): SchoolYearModel[] {
    return rawList.map(raw => this.toDomain(raw));
  }
}
