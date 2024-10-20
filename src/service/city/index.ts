import request from "../config"

// ----------------> Instance Services City<-------------------------------------
export interface postCity{
    activated: boolean,
    bannerUrl: string,
    imageUrl: string,
}

export interface UpdateCity {
    id:number;
}


// test apida qoshilsa qo'shiladi
export interface GetCity{
    search?: string,
    page?:number;
    size?:number;
}




interface City{
    getCity : (params:GetCity)=> any,
    postCity : (data:postCity)=> any,
    updateCity: (data:UpdateCity)=> any,
    deleteCity : (id:number)=> any,
    getCityHelper :(id:number|undefined)=> any
}

// ---------> Interface Stor City <--------------------
export interface StoreCity {
    isLoader:boolean;
    dataCity:any[];
    dataCityHelper:any[];
    totlCount:number;
    getDataCity: (params:GetCity)=> Promise <any>;
    postDataCity: (data:postCity)=> Promise <any>;
    updateDataCity: (data:UpdateCity)=> Promise <any>;
    deleteDataCity: (id:number)=> Promise <any>;
    getDataCityHelper:(id:number|undefined)=> Promise <any>,
}




// ----------------> Instance Category <----------------------------
export const city:City = {
    getCity: (params:GetCity)=> request.get(params?.page ? `/services/admin/api/city-pageList?page=${params?.page}&size=${params?.size}&search=${params?.search}` : `/services/admin/api/city-pageList`),
    deleteCity: (id)=> request.delete(`/services/admin/api/city/${id}`),
    postCity: (data)=> request.post("/services/admin/api/city" , data),
    updateCity: (data)=> request.put(`/services/admin/api/city`, data),
    getCityHelper:(id)=>  request.get(`/services/admin/api/city-helper/${id}`),

}