import { DailyAlbumApiDto, DailyAlbumDomainModel, PhotoApiDto, PhotoDomainModel } from '@/config/types/dailyAlbum';

export class DailyAlbumMapper {
  static toPhotoDomain(dto: PhotoApiDto): PhotoDomainModel {
    return {
      photoId: dto.photoId,
      albumId: dto.albumId,
      photoUrl: dto.photoUrl,
      description: dto.description,
      createdAt: BigInt(dto.createdAt),
    };
  }

  static toDomain(dto: DailyAlbumApiDto): DailyAlbumDomainModel {
    return {
      albumId: dto.albumId,
      classId: dto.classId,
      teacherId: dto.teacherId,
      albumDate: BigInt(dto.albumDate),
      caption: dto.caption,
      createdAt: BigInt(dto.createdAt),
      updatedAt: BigInt(dto.updatedAt),
      photos: dto.photos.map(p => this.toPhotoDomain(p)),
    };
  }

  static toDomainList(dtos: DailyAlbumApiDto[]): DailyAlbumDomainModel[] {
    return dtos.map(dto => this.toDomain(dto));
  }
}
