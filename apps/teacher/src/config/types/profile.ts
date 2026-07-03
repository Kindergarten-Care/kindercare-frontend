export interface WorkHistoryApiDto {
  historyId: number;
  title: string;
  tag: string;
  description: string;
  kind: string;
  eventDate: number; // Unix timestamp in seconds
}

export interface WorkHistoryDomainModel {
  historyId: number;
  title: string;
  tag: string;
  description: string;
  kind: string;
  eventDate: bigint;
}

export interface SettingsApiDto {
  emailEnabled: number | boolean;
  pushEnabled: number | boolean;
  weeklyReportEnabled: number | boolean;
}

export interface SettingsDomainModel {
  emailEnabled: boolean;
  pushEnabled: boolean;
  weeklyReportEnabled: boolean;
}
