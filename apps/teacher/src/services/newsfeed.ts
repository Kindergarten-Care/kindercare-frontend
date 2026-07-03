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
   * Xóa bài đăng nhật ký
   * @param classId ID của lớp học
   * @param postId ID của bài đăng
   */
  public static async deleteNewsfeedPost(classId: number | string, postId: number | string): Promise<boolean> {
    const res = await apiClient.delete(`/teacher/classes/${classId}/newsfeed/${postId}`);
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
    const res = await apiClient.post('/teacher/upload', formData, { onUploadProgress });
    return res.data?.data?.url || '';
  }
}
