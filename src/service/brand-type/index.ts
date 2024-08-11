import request from "../config"

// ----------------> Instance Services BrandType<-------------------------------------
export interface postBrandType{
    activated: boolean,
    nameRu: string,
    nameUz: string,
    descriptionRu: string,
    descriptionUz: string,
    sorting: number,
}

export interface UpdateBrandType {
    id:number;
}


// test apida qoshilsa qo'shiladi
export interface GetBrandType{
    search?: string,
    page:number;
    size:number;
}

export interface brandTypeActivated{
    id?:number|any;
    activated: boolean;
}



interface BrandType{
    getBrandType : (params:GetBrandType)=> any,
    deleteBrandType : (id:number)=> any,
    postBrandType : (data:postBrandType)=> any,
    updateBrandType: (data:UpdateBrandType)=> any,
    brandTypeActivated:(data:brandTypeActivated)=>any,
}

// ---------> Interface Stor BrandType <--------------------
export interface StoreBrandType {
    isLoader:boolean;
    dataBrandType:any[];
    totlCount:number;
    getDataBrandType: (params:GetBrandType)=> Promise <any>;
    deleteDataBrandType: (id:number)=> Promise <any>;
    postDataBrandType: (data:postBrandType)=> Promise <any>;
    updateDataBrandType: (data:UpdateBrandType)=> Promise <any>;

    brandTypeActivated:(data:brandTypeActivated)=> Promise <any>;
}




// ----------------> Instance Category <----------------------------
export const brandType:BrandType = {
    getBrandType: (params)=> request.get(`/services/admin/api/brand-type-pageList?page=${params?.page}&size=${params?.size}&search=${params?.search}`),
    deleteBrandType: (id)=> request.delete(`/services/admin/api/brand-type/${id}`),
    postBrandType: (data)=> request.post("/services/admin/api/brand-type" , data),
    updateBrandType: (data)=> request.put(`/services/admin/api/brand-type`, data),

    brandTypeActivated: (data)=> request.put(`/services/admin/api/brand-type-activate`, data),

}