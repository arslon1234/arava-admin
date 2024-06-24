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

    //API da hali qo'shilmadi
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

    //API da hali qo'shilmadi
    deleteDataCountry: (id:number)=> Promise <any>;
}




// ----------------> Instance Category <----------------------------
export const country:Country = {
    getCompany: ()=> request.get(`/services/admin/api/country-pageList`),
    postCompany: (data)=> request.post("/services/admin/api/country" , data),
    updateCompany: (data)=> request.put(`/services/admin/api/country`, data),

    //API da hali qo'shilmadi
    deleteCompany: (id)=> request.delete(`/test/${id}`),
}