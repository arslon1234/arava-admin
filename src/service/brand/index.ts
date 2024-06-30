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
    limit?:number;
}




interface Brand{
    getBrand : ()=> any,
    
    //API da hali qo'shilmadi
    postBrand : (data:postBrand)=> any,
    updateBrand: (data:UpdateBrand)=> any,
    deleteBrand : (id:number)=> any,
}

// ---------> Interface Stor Brand <--------------------
export interface StoreBrand {
    isLoader:boolean;
    dataBrand:any[];
    totlCount:number;
    location :Location;
    getDataBrand: ()=> Promise <any>;
    
    //API da hali qo'shilmadi
    postDataBrand: (data:postBrand)=> Promise <any>;
    updateDataBrand: (data:UpdateBrand)=> Promise <any>;
    deleteDataBrand: (id:number)=> Promise <any>;
    locationUpdate : (data:Location)=> void;
}




// ----------------> Instance Category <----------------------------
export const brand:Brand = {
    getBrand: ()=> request.get(`/services/admin/api/brand-pageList`),

    //API da hali qo'shilmadi
    deleteBrand: (id)=> request.delete(`/services/admin/api/brand/${id}`),
    postBrand: (data)=> request.post("/services/admin/api/brand" , data),
    updateBrand: (data)=> request.put(`/services/admin/api/brand`, data),

}