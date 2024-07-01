import request from "../config"

// ----------------> Instance Services Banner<-------------------------------------
export interface postBanner{
    activated: boolean,
    bannerUrl: string,
    imageUrl: string,
}

export interface UpdateBanner {
    id:number;
}


// test apida qoshilsa qo'shiladi
export interface GetBanner{
    search?: string,
    page?:number;
    limit?:number;
}


export interface BannerActivate{
    id:number | any;
    activated:boolean;
}



interface Banner{
    getBanner : ()=> any,
    postBanner : (data:postBanner)=> any,
    deleteBanner : (id:number)=> any,
    bannerActivate:(data:BannerActivate)=>any,
    
    //API da hali qo'shilmadi
    updateBanner: (data:UpdateBanner)=> any,
}

// ---------> Interface Stor Banner <--------------------
export interface StoreBanner {
    isLoader:boolean;
    dataBanner:any[];
    totlCount:number;
    imageUrl:string;
    getDataBanner: ()=> Promise <any>;
    postDataBanner: (data:postBanner)=> Promise <any>;
    deleteDataBanner: (id:number)=> Promise <any>;
    bannerActivate:(data:BannerActivate)=>Promise<any>,

    imageUrlUpdated:(Url:string)=> void;
    
    //API da hali qo'shilmadi
    updateDataBanner: (data:UpdateBanner)=> Promise <any>;
}




// ----------------> Instance Category <----------------------------
export const banner:Banner = {
    getBanner: ()=> request.get(`/services/admin/api/banner`),
    deleteBanner: (id)=> request.delete(`/services/admin/api/banner/${id}`),
    postBanner: (data)=> request.post("/services/admin/api/banner" , data),
    updateBanner: (data)=> request.put(`/services/admin/api/banner`, data),
    bannerActivate:(data)=>request.post(`/services/admin/api/banner/activate?id=${data?.id}&activate=${data?.activated}`),
}