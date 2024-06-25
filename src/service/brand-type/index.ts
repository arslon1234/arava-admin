import request from "../config"

// ----------------> Instance Services BrandType<-------------------------------------
export interface postBrandType{
    activated: boolean,
    bannerUrl: string,
    imageUrl: string,
}

export interface UpdateBrandType {
    id:number;
}


// test apida qoshilsa qo'shiladi
export interface GetBrandType{
    search?: string,
    page?:number;
    limit?:number;
}




interface BrandType{
    getBrandType : ()=> any,
    
    //API da hali qo'shilmadi
    postBrandType : (data:postBrandType)=> any,
    updateBrandType: (data:UpdateBrandType)=> any,
    deleteBrandType : (id:number)=> any,
}

// ---------> Interface Stor BrandType <--------------------
export interface StoreBrandType {
    isLoader:boolean;
    dataBrandType:any[];
    totlCount:number;
    getDataBrandType: ()=> Promise <any>;
    
    //API da hali qo'shilmadi
    postDataBrandType: (data:postBrandType)=> Promise <any>;
    updateDataBrandType: (data:UpdateBrandType)=> Promise <any>;
    deleteDataBrandType: (id:number)=> Promise <any>;
}




// ----------------> Instance Category <----------------------------
export const brandType:BrandType = {
    getBrandType: ()=> request.get(`/services/admin/api/brand-type-pageList`),

    //API da hali qo'shilmadi
    deleteBrandType: (id)=> request.delete(`/services/admin/api/brand-type/${id}`),
    postBrandType: (data)=> request.post("/services/admin/api/brand-type" , data),
    updateBrandType: (data)=> request.put(`/services/admin/api/brand-type`, data),

}