import request from "../config"

// ----------------> Instance Services Branch<-------------------------------------

export interface postBranch{
    brandId: number,
    name: string,
    shortName: string,
    description: string,
    address: string,
    phone: string,
    email: string,
    countryId: number,
    regionId: number,
    cityId: number,
    gpsPointX: number,
    gpsPointY: number,
    deliveryFrom: number,
    deliveryTo: number,
    imageUrl: string,
    deliveryPrice:number,
    brandTypeIdList:number[],
    cuisinesIdList:number[],
}

export interface UpdateBranch {
    id:number;
}


// test apida qoshilsa qo'shiladi
export interface GetBranch{
    search?: string,
    page?:number;
    limit?:number;
}

interface ActivatedBranch{
    id: number;
    activated: boolean;
}




interface Branch{
    getBranch : ()=> any,
    
    //API da hali qo'shilmadi
    deleteBranch: (id:number)=> any,
    postBranch : (data:postBranch)=> any,
    updateBranch: (data:UpdateBranch)=> any,
    activatedBranch:(data:ActivatedBranch)=> any,
}

// ---------> Interface Stor Couriers <--------------------
export interface StoreBranch {
    isLoader:boolean;
    dataBranch:any[];
    totlCount:number;
    getDataBranch: ()=> Promise <any>;
    
    //API da hali qo'shilmadi
    deleteDataBranch: (id:number)=> Promise <any>;
    postDataBranch: (data:postBranch)=> Promise <any>;
    updateDataBranch: (data:UpdateBranch)=> Promise <any>;

    activatedBranch:(data:ActivatedBranch)=> Promise <any>;

}




// ----------------> Instance Couriers <----------------------------
export const branch:Branch = {
    getBranch: ()=> request.get(`/services/admin/api/branch-pageList`),
    
    //API da hali qo'shilmadi
    deleteBranch: (id)=> request.delete(`/services/admin/api/branch/${id}`), 
    postBranch: (data)=> request.post("/services/admin/api/branch" , data),
    updateBranch: (data)=> request.put(`/services/admin/api/branch`, data),

    activatedBranch:(data)=>request.put(`/services/admin/api/branch-activate` , data),
}