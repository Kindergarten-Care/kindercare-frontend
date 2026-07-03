export interface NewsfeedApiDto {
  postId: number;
  classId: number;
  teacherId: number;
  content: string;
  mediaUrl: string | null;
  postedAt: number;
  teacherName: string;
  teacherAvatarUrl: string | null;
}

export interface NewsfeedDomainModel {
  postId: number;
  classId: number;
  teacherId: number;
  content: string;
  mediaUrl: string | null;
  postedAt: bigint;
  teacherName: string;
  teacherAvatarUrl: string | null;
}
