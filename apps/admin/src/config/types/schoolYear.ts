export interface SchoolYearModel {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  totalFacilities: number;
  totalClasses: number;
  status: 'active' | 'past';
}

export interface SchoolYearResponseDTO {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  total_facilities: number;
  total_classes: number;
  status: 'active' | 'past';
}
