import request from "../config"

// ----------------> Instance Services Couriers<-------------------------------------
export interface postCouriers{
    activated: boolean,
    bannerUrl: string,
    imageUrl: string,
}

export interface UpdateCouriers {
    id:number;
}


// test apida qoshilsa qo'shiladi
export interface GetCouriers{
    search?: string,
    page?:number;
    limit?:number;
}




interface Couriers{
    getCouriers : ()=> any,
    
    //API da hali qo'shilmadi
    postCouriers : (data:postCouriers)=> any,
    updateCouriers: (data:UpdateCouriers)=> any,
    deleteCouriers: (id:number)=> any,
}

// ---------> Interface Stor Couriers <--------------------
export interface StoreCouriers {
    isLoader:boolean;
    dataCouriers:any[];
    totlCount:number;
    getDataCouriers: ()=> Promise <any>;
    
    //API da hali qo'shilmadi
    postDataCouriers: (data:postCouriers)=> Promise <any>;
    updateDataCouriers: (data:UpdateCouriers)=> Promise <any>;
    deleteDataCouriers: (id:number)=> Promise <any>;
}




// ----------------> Instance Couriers <----------------------------
export const сouriers:Couriers = {
    getCouriers: ()=> request.get(`/services/admin/api/couriers-pageList`),

    //API da hali qo'shilmadi
    deleteCouriers: (id)=> request.delete(`/services/admin/api/couriers/${id}`),
    postCouriers: (data)=> request.post("/services/admin/api/couriers" , data),
    updateCouriers: (data)=> request.put(`/services/admin/api/couriers`, data),

}