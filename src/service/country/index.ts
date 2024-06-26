import request from "../config"

// ----------------> Instance Services Country<-------------------------------------
export interface postCountry{
    nameRu: string,
    nameUz: string,
}

export interface UpdateCountry {
    id:number;
}


// test apida qoshilsa qo'shiladi
export interface GetCountry{
    search?: string,
    page?:number;
    limit?:number;
}




interface Country{
    getCompany : ()=> any,
    postCompany : (data:postCountry)=> any,
    updateCompany: (data:UpdateCountry)=> any,
    deleteCompany : (id:number)=> any,
}

// ---------> Interface Stor Country <--------------------
export interface StoreCountry {
    isLoader:boolean;
    dataCountry:any[];
    totlCount:number;
    getDataCountry: ()=> Promise <any>;
    postDataCountry: (data:postCountry)=> Promise <any>;
    updateDataCountry: (data:UpdateCountry)=> Promise <any>;
    deleteDataCountry: (id:number)=> Promise <any>;
}




// ----------------> Instance Category <----------------------------
export const country:Country = {
    getCompany: ()=> request.get(`/services/admin/api/country-pageList`),
    postCompany: (data)=> request.post("/services/admin/api/country" , data),
    updateCompany: (data)=> request.put(`/services/admin/api/country`, data),
    deleteCompany: (id)=> request.delete(`/services/admin/api/country/${id}`),
}