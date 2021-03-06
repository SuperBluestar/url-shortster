/* eslint-disable  @typescript-eslint/no-explicit-any */
import axios from 'axios';

const serverApiBaseUri = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8000';

export const apiServer = axios.create({
  baseURL: serverApiBaseUri,
  withCredentials: false // required to handle the CSRF token
});

export const axiosErrorHandler = (error: any) => {
  if (axios.isAxiosError(error) && error.response && error.response) {
    return error.response.data;
  } else {
    return String(error);
  }
};

export default {
  /**
   * Ping to server
   */
  async pingToServer() {
    try {
      await apiServer.get('/api-testing');
      return {
        success: true
      };
    } catch (err) {
      return {
        success: false
      };
    }
  },
  /**
   * register new shortcode
   */
  async registerUrlCode(param: { urlOriginal: string; urlCode?: string }) {
    try {
      await apiServer.post('/api/url/register', param);
      return {
        success: true
      };
    } catch (err) {
      return {
        success: false,
        message: axiosErrorHandler(err)
      };
    }
  },
  /**
   * register new shortcode
   */
  async getShortCodeStats(param: { shortcode: string }) {
    try {
      const res = await apiServer.get(`/api/${param.shortcode}/stats`);
      return {
        success: true,
        content: res.data
      };
    } catch (err) {
      return {
        success: false,
        message: axiosErrorHandler(err)
      };
    }
  }
};
