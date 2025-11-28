import { callApi } from './apiCaller';
import { ACCOUNT_ENDPOINTS } from './endpoints';

export const getAccountInfo = () => callApi({ method: 'get', url: ACCOUNT_ENDPOINTS.GET_ACCOUNT_INFO });
export const sendContactMail = (data) => callApi({ method: 'post', url: ACCOUNT_ENDPOINTS.SEND_CONTACT_MAIL, data });

