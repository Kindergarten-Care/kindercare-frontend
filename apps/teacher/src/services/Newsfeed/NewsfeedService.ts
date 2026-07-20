import { apiClient, SERVER } from '@kindercare/core';

export interface NewsfeedPost {
  postId: number;
  classId: number;
  teacherId: number;
  content: string;
  mediaUrl?: string;
  postedAt: number; // Unix timestamp
  teacherName?: string;
  teacherAvatar?: string;
  taggedStudents?: { studentId: number; studentName: string }[];
}
export class NewsfeedService {
  /**
   * Tạo bài viết/nhật ký lớp học mới
   * @param classId ID của lớp học
   * @param content Nội dung bài đăng
   * @param mediaUrl URL hình ảnh đính kèm (nếu có)
   * @returns postId của bài viết vừa tạo
   */
  public static async createNewsfeedPost(classId: number | string, content: string, mediaUrl?: string): Promise<string> {
    const url = SERVER.teacher.postNewsfeed.replace(':classId', String(classId));
    const res = await apiClient.post(url, {
      content,
      mediaUrl
    });
    return res.data?.data?.postId || '';
  }

  /**
   * Lấy danh sách nhật ký của lớp
   */
  public static async getNewsfeeds(classId: number | string): Promise<any[]> {
    const url = SERVER.teacher.getNewsfeeds.replace(':classId', String(classId));
    const res = await apiClient.get(url);
    return res.data?.data || [];
  }

  /**
   * Xóa bài đăng nhật ký
   * @param classId ID của lớp học
   * @param postId ID của bài đăng
   */
  public static async deleteNewsfeedPost(classId: number | string, postId: number | string): Promise<boolean> {
    const url = SERVER.teacher.deleteNewsfeed.replace(':postId', String(postId));
    const res = await apiClient.delete(url);
    return res.status === 200;
  }

  /**
   * Tải ảnh lên máy chủ
   * @param file Tệp ảnh
   * @param onUploadProgress Callback theo dõi tiến trình (Tùy chọn)
   * @returns URL tĩnh của ảnh sau khi tải
   */
  public static async uploadImage(file: File, onUploadProgress?: (progressEvent: any) => void): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
    const today = new Date();
    const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    formData.append('folder', `newsfeeds/feed-${dateStr}`);
    const res = await apiClient.post(SERVER.teacher.uploadPhoto, formData, { onUploadProgress });
    return res.data?.data?.url || '';
  }
}
