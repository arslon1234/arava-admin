import axios from "axios";
import { getCookies , setCookies} from "@cookie";

const URL =  import.meta.env.VITE_BASE_URL
const request = axios.create({
    baseURL: URL
})


async function  refreshAccsesToken (){
    try{
   const _refresh_token= getCookies("refresh_token"); 
   
   
   if(!_refresh_token){
       throw new Error ("Refresh token not found in cookie ") 
   }else{
       const response:any = await axios.get(`${URL}/auth/login${_refresh_token}`)
       const {access_token , refresh_token} = response?.data;
       setCookies("access_token", access_token);
       setCookies("refresh_token", refresh_token);
       return access_token;
   }
     
    }catch(error){
      console.log(error);
      
    }
}




request.interceptors.request.use((config) => {
    const access_token = getCookies("access_token") 
    if (access_token) {
        config.headers["Authorization"] =  `Bearer ${access_token}`
    }
    return config
})

request.interceptors.response.use((response:any)=>{
    return response
}, async (error :any)=>{
    if(error.response && error.response.status === 401){
       const access_token =  await refreshAccsesToken();
    //    console.log(access_token);
       
       if(access_token){
          const originalRequest = error.config
          originalRequest.headers["Authorization"] = access_token
       }else{
         console.error("Access token not found in config file " + error.config)
         return Promise.reject(error)
       }
    }
})

export default request


