import axios from "axios"
import { BASE_URL } from "./apiPaths"

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout : 10000,
    headers : {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
})

//req intercept
axiosInstance.interceptors.request.use{
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (!accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
}
// res intercept

axiosInstance.interceptors.response.use{
    (response) => {
        return response;
    },(error) => {
        //handle common error
        if(error.response){
            if(error.response.status === 401){
                console.log("Unauthorized! Redirecting to login...");
                window.location.href ="/login"
            }else if (error.response.status === 500){
                console.log("Server error. Please try again later.");
                
            }
            
        }else if (error.code ==="ECONNABORTED") {
            console.log("Request timeout. Please try again.");
            
        }
        return Promise.reject(error)
    }
}

export default axiosInstance;