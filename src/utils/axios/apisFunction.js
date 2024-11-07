import axios from "axios";
import API_ENDPOINTS from "./apisEndPoint";

const BASE_URL = import.meta.env.VITE_BASE_URL;

/**
 * Generic POST request handler
 * @param {string} endpoint - The API endpoint to call (without base URL).
 * @param {object} data - Data to send in the POST request.
 * @returns {Promise<object>} - The response data from the API.
 */
const postRequest = async (endpoint, data) => {
    console.log(BASE_URL + endpoint, data);
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}`, data);
      return response.data;
    } catch (error) {
      console.error(
        `Error in POST ${endpoint}:`,
        error.response || error.message
      );
      throw error;
    }
  };

  /**
 * Generic GET request handler with token authentication
 * @param {string} endpoint - The API endpoint to call (without base URL).
 * @param {string} token - The authorization token to send in the headers.
 * @param {object} [params] - Query parameters to send in the GET request.
 * @returns {Promise<object>} - The response data from the API.
 */
const getRequest = async (endpoint, token) => {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(`Error in GET ${endpoint}:`, error.response || error.message);
      throw error;
    }
  };

 // REGISTER
  export const registerApi = async (hash, userAddress, refer) => {
    return postRequest(API_ENDPOINTS.auth.register, {
        hash,
        userAddress,
        refer,
    });
  };

    // LOGIN
  export const loginApi = async (userAddress) => {
    return postRequest(API_ENDPOINTS.auth.login, {
        userAddress, 
    }
    );
  };


//   Transaction Record 
export const transactionApi = async (userAddress, page, pageLimit)  => {
    return getRequest(API_ENDPOINTS.user.getTransactionDetails, {
     userAddress,
     page,
     pageLimit
    });
}
  