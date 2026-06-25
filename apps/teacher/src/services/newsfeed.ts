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
}
