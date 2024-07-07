import request from "../config"

// ----------------> Instance Services Branch<-------------------------------------

export interface postBranch{
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
    deleteBranch: (id:number)=> any,
    
    //API da hali qo'shilmadi
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