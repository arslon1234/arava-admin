import request from "../config"

// ----------------> Instance Services Brand<-------------------------------------
export interface postBrand{
    companyId:number|string,
    name: string,
    shortName: string,
    mainOfficeAddress:string,
    countryId:number|string,
    regionId:number|string,
    cityId:number|string,
    gpsPointX: string,
    gpsPointY: string,
    activated: boolean,
    brandTypeIdList: number[] | any,
    imageUrl: string,
}

export interface UpdateBrand {
    id:number;
}

export interface Location {
    lat: number;
    lng:number;
}


// test apida qoshilsa qo'shiladi
export interface GetBrand{
    search?: string,
    page?:number;
    size?:number;
}


export interface BrandActivated{
    id?:number|any;
    activated: boolean;
}



interface Brand{
    getBrand : (params:GetBrand)=> any,
    postBrand : (data:postBrand)=> any,
    deleteBrand : (id:number)=> any,
    getBrandId : (id:string|undefined)=>any,
    brandActivated : (data:BrandActivated)=> any,

    // updateBrand test jarayonida 
    updateBrand: (data:UpdateBrand)=> any,
}

// ---------> Interface Stor Brand <--------------------
export interface StoreBrand {
    isLoader:boolean;
    dataBrand:any[];
    totlCount:number;
    dataBrandId:any;
    location :Location;
    getDataBrand: (params:GetBrand)=> Promise <any>;
    getBrandId: (id:string|undefined)=> Promise <any>;
    postDataBrand: (data:postBrand)=> Promise <any>;
    deleteDataBrand: (id:number)=> Promise <any>;
    locationUpdate : (data:Location)=> void;
    
    activateBrand: (data:BrandActivated)=> Promise <any>;


    // updateDataBrand test jarayonida 
    updateDataBrand: (data:UpdateBrand)=> Promise <any>;
}




// ----------------> Instance Category <----------------------------
export const brand:Brand = {
    getBrand: (params)=> request.get(params?.page ? `/services/admin/api/brand-pageList?page=${params.page}&size=${params.size}&search=${params.search}` : `/services/admin/api/brand-pageList`),
    deleteBrand: (id)=> request.delete(`/services/admin/api/brand/${id}`),
    postBrand: (data)=> request.post("/services/admin/api/brand" , data),
    getBrandId: (id)=> request.get(`/services/admin/api/brand/${id}`),

    brandActivated: (data)=> request.put(`/services/admin/api/brand-activate`, data),
    
    // updateBrand test jarayonida
    updateBrand: (data)=> request.put(`/services/admin/api/brand`, data),

}