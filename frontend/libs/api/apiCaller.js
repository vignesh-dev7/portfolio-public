import apiClient from './client';

/**
 * Generic API caller
 * @param {Object} options
 * @param {'get'|'post'|'put'|'delete'} options.method
 * @param {string} options.url
 * @param {Object} [options.data]
 * @param {Object} [options.params]
 */
export const callApi = async ({ method, url, data, params }) => {
  try {
    const response = await apiClient.request({ method, url, data, params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
