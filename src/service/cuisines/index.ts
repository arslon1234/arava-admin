import request from "../config"

// ----------------> Instance Services Cuisines<-------------------------------------
export interface postCuisines{
    nameRu: string,
  nameUz: string,
  descriptionRu: string,
  descriptionUz: string,
  imageUrl: string,
  sorting: number
}

export interface UpdateCuisines {
    id:number;
}


// test apida qoshilsa qo'shiladi
export interface GetCuisines{
    search?: string,
    page:number;
    size:number;
}




interface Cuisines{
    getCuisines : (params:GetCuisines)=> any,
    postCuisines : (data:postCuisines)=> any,
    deleteCuisines : (id:number)=> any,
    updateCuisines: (data:UpdateCuisines)=> any,
}

// ---------> Interface Stor Cuisines <--------------------
export interface StoreCuisines {
    isLoader:boolean;
    dataCuisines:any[];
    totlCount:number;
    getDataCuisines: (params:GetCuisines)=> Promise <any>;
    postDataCuisines: (data:postCuisines)=> Promise <any>;
    deleteDataCuisines: (id:number)=> Promise <any>;
    updateDataCuisines: (data:UpdateCuisines)=> Promise <any>;
}




// ----------------> Instance Cuisines <----------------------------
export const cuisines:Cuisines = {
    getCuisines: (params)=> request.get(`/services/admin/api/cuisines-pageList?page=${params?.page}&size=${params?.size}&search=${params?.search}`),
    deleteCuisines: (id)=> request.delete(`/services/admin/api/cuisines/${id}`),
    postCuisines: (data)=> request.post("/services/admin/api/cuisines" , data),
    updateCuisines: (data)=> request.put(`/services/admin/api/cuisines`, data),
}