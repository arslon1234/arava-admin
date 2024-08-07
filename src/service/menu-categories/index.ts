import request from "../config"

// ----------------> Instance Services Menu Categories<-------------------------------------

// test apida qoshilsa qo'shiladi
export interface postMenuCategories{
    nameRu: string,
    nameUz: string,
    descriptionUz: string,
    descriptionRu: string,
    imageUrl: string,
    parentId: number
}

export interface UpdateMenuCategories {
    id:number;
}


// test apida qoshilsa qo'shiladi
export interface GetMenuCategories{
    search?: string,
    page:number;
    size:number;
}




interface MenuCategories{
    getMenuCategories : (params: GetMenuCategories)=> Promise <any>,
    postMenuCategories: (data:postMenuCategories)=> Promise <any>,
    updateMenuCategories: (data:UpdateMenuCategories)=> Promise <any>,
    deleteMenuCategories: (id:number)=> Promise <any>,
}

// ---------> Interface Stor Menu <--------------------
export interface StoreMenuCategories {
    isLoader:boolean;
    dataMenuCategories:any[];
    totlCount:number;
    getDataMenuCategories: (params:GetMenuCategories)=> Promise <any>;
    postDataMenuCategories: (data:postMenuCategories)=> Promise <any>,
    updateDataMenuCategories: (data:UpdateMenuCategories)=> Promise <any>,
    deleteDataMenuCategories: (id:number)=> Promise <any>,
}




// ----------------> Instance Menu <----------------------------
export const menuCategories:MenuCategories = {
    getMenuCategories: (params)=> request.get(`/services/admin/api/categories-pageList?page=${params?.page}&size=${params?.size}&search=${params?.search}`),
    postMenuCategories: (data)=> request.post(`/services/admin/api/categories`, data),
    updateMenuCategories: (data)=> request.put(`/services/admin/api/categories`, data),
    deleteMenuCategories: (id)=> request.delete(`/services/admin/api/categories/${id}`),
}