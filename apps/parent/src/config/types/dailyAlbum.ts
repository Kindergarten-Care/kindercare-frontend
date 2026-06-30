export interface PhotoApiDto {
  photoId: number;
  albumId: number;
  photoUrl: string;
  description: string | null;
  createdAt: number;
}

export interface PhotoDomainModel {
  photoId: number;
  albumId: number;
  photoUrl: string;
  description: string | null;
  createdAt: bigint;
}

export interface DailyAlbumApiDto {
  albumId: number;
  classId: number;
  teacherId: number;
  albumDate: number;
  caption: string | null;
  createdAt: number;
  updatedAt: number;
  photos: PhotoApiDto[];
}

export interface DailyAlbumDomainModel {
  albumId: number;
  classId: number;
  teacherId: number;
  albumDate: bigint;
  caption: string | null;
  createdAt: bigint;
  updatedAt: bigint;
  photos: PhotoDomainModel[];
}
