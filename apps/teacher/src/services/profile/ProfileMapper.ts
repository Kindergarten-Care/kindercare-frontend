import { WorkHistoryApiDto, WorkHistoryDomainModel, SettingsApiDto, SettingsDomainModel } from '@/config/types/profile';

export class ProfileMapper {
  static toWorkHistoryDomain(dto: WorkHistoryApiDto): WorkHistoryDomainModel {
    return {
      historyId: dto.historyId,
      title: dto.title,
      tag: dto.tag,
      description: dto.description,
      kind: dto.kind,
      eventDate: BigInt(dto.eventDate),
    };
  }

  static toWorkHistoryList(dtos: WorkHistoryApiDto[]): WorkHistoryDomainModel[] {
    return dtos.map(this.toWorkHistoryDomain);
  }

  static toSettingsDomain(dto: SettingsApiDto): SettingsDomainModel {
    return {
      emailEnabled: Boolean(dto.emailEnabled),
      pushEnabled: Boolean(dto.pushEnabled),
      weeklyReportEnabled: Boolean(dto.weeklyReportEnabled),
    };
  }
}
