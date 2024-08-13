import request from "../config"

// ----------------> Instance Services Region<-------------------------------------
export interface postRegion{
    countryId:number|string;
    nameRu: string,
    nameUz: string,
}

export interface UpdateRegion {
    id:number;
}


// test apida qoshilsa qo'shiladi
export interface getRegion{
    search?: string,
    page?:number;
    size?:number;
}




interface Region{
    getRegion : (params:getRegion)=> any,
    postRegion : (data:postRegion)=> any,
    updateRegion: (data:UpdateRegion)=> any,
    deleteRegion : (id:number)=> any,
}

// ---------> Interface Stor Country <--------------------
export interface StoreRegion {
    isLoader:boolean;
    dataRegion:any[];
    totlCount:number;
    getDataRegion: (param :getRegion)=> Promise <any>;
    postDataRegion: (data:postRegion)=> Promise <any>;
    updateDataRegion: (data:UpdateRegion)=> Promise <any>;
    deleteDataRegion: (id:number)=> Promise <any>;
}




// ----------------> Instance Category <----------------------------
export const region:Region = {
    getRegion: (param)=> request.get(param?.page ? `/services/admin/api/region-pageList?page=${param?.page}&size=${param?.size}&search=${param?.search}` : `/services/admin/api/region-pageList`),
    postRegion: (data)=> request.post("/services/admin/api/region" , data),
    updateRegion: (data)=> request.put(`/services/admin/api/region`, data),
    deleteRegion: (id)=> request.delete(`/services/admin/api/region/${id}`),
}