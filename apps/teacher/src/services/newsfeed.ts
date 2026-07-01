import { apiClient } from '@kindercare/core';

export class NewsfeedService {
  /**
   * Tạo bài viết/nhật ký lớp học mới
   * @param classId ID của lớp học
   * @param content Nội dung bài đăng
   * @param mediaUrl URL hình ảnh đính kèm (nếu có)
   * @returns postId của bài viết vừa tạo
   */
  public static async createNewsfeedPost(classId: number | string, content: string, mediaUrl?: string): Promise<string> {
    const res = await apiClient.post(`/teacher/classes/${classId}/newsfeed`, {
      content,
      mediaUrl
    });
    return res.data?.data?.postId || '';
  }

  /**
   * Lấy danh sách nhật ký của lớp
   */
  public static async getNewsfeeds(classId: number | string): Promise<any[]> {
    const res = await apiClient.get(`/teacher/classes/${classId}/newsfeed`);
    return res.data?.data || [];
  }

  /**
   * Tải ảnh lên máy chủ
   * @param file Tệp ảnh
   * @returns URL tĩnh của ảnh sau khi tải
   */
  public static async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('folder', 'newsfeeds');

    const res = await apiClient.post('/teacher/upload', formData);
    return res.data?.data?.url || '';
  }
}
