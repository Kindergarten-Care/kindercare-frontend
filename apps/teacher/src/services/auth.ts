import { apiClient } from '@kindercare/core';
import { SERVER } from '@kindercare/core';

export const authService = {
  async login(emailOrUsername: string, password: string) {
    const res = await apiClient.post('/auth/teacher/login', {
      identifier: emailOrUsername,
      password
    });
    return res.data;
  }
};
