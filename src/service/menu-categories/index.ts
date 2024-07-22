import request from "../config"

// ----------------> Instance Services Menu Categories<-------------------------------------

// test apida qoshilsa qo'shiladi
export interface postMenuCategories{
    nameRu: string,
    nameUz: string,
}

export interface UpdateMenuCategories {
    id:number;
}


// test apida qoshilsa qo'shiladi
export interface GetMenuCategories{
    search?: string,
    page?:number;
    limit?:number;
}




interface MenuCategories{
    getMenuCategories : ()=> any,
}

// ---------> Interface Stor Menu <--------------------
export interface StoreMenuCategories {
    isLoader:boolean;
    dataMenuCategories:any[];
    totlCount:number;
    getDataMenuCategories: ()=> Promise <any>;
}




// ----------------> Instance Menu <----------------------------
export const menuCategories:MenuCategories = {
    getMenuCategories: ()=> request.get(`/services/admin/api/menu-categories-pageList`),
}