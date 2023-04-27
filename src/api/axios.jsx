import axios from "axios"

export const axiosInstance = axios.create ({
    baseURL: 'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1',
    
});


export default axiosInstance
