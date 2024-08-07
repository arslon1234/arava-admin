import request from "../config"

// ----------------> Instance Services Couriers<-------------------------------------

export interface postCouriers{
    activated: boolean,
    firstName: string,
    lastName: string,
    login: string,
    address: string,
    birthDate: string,
    email: string,
    gender: number,
    homePhone: string,
    mobilePhone: string,
    password: string,
}

export interface UpdateCouriers {
    id:number;
}


// test apida qoshilsa qo'shiladi
export interface GetCouriers{
    search?: string,
    page:number;
    size:number;
}




interface Couriers{
    getCouriers : (params:GetCouriers)=> any,
    deleteCouriers: (id:number)=> any,
    
    //API da hali qo'shilmadi
    postCouriers : (data:postCouriers)=> any,
    updateCouriers: (data:UpdateCouriers)=> any,
}

// ---------> Interface Stor Couriers <--------------------
export interface StoreCouriers {
    isLoader:boolean;
    dataCouriers:any[];
    totlCount:number;
    getDataCouriers: (params:GetCouriers)=> Promise <any>;
    deleteDataCouriers: (id:number)=> Promise <any>;
    
    //API da hali qo'shilmadi
    postDataCouriers: (data:postCouriers)=> Promise <any>;
    updateDataCouriers: (data:UpdateCouriers)=> Promise <any>;
}




// ----------------> Instance Couriers <----------------------------
export const сouriers:Couriers = {
    getCouriers: (params)=> request.get(`/services/admin/api/couriers-pageList?page=${params?.page}&size=${params?.size}&search=${params?.search}`),
    deleteCouriers: (id)=> request.delete(`/services/admin/api/delete/${id}`),  //test

    //API da hali qo'shilmadi
    postCouriers: (data)=> request.post("/services/admin/api/couriers" , data),
    updateCouriers: (data)=> request.put(`/services/admin/api/couriers`, data),

}