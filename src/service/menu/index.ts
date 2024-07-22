import request from "../config"

// ----------------> Instance Services Menu<-------------------------------------
export interface postMenu{
    nameRu: string,
    nameUz: string,
}

export interface UpdateMenu {
    id:number;
}


// test apida qoshilsa qo'shiladi
export interface GetMenu{
    search?: string,
    page?:number;
    limit?:number;
}




interface Menu{
    getMenu : ()=> any,
}

// ---------> Interface Stor Menu <--------------------
export interface StoreMenu {
    isLoader:boolean;
    dataMenu:any[];
    totlCount:number;
    getDataMenu: ()=> Promise <any>;
}




// ----------------> Instance Menu <----------------------------
export const menu:Menu = {
    getMenu: ()=> request.get(`/services/admin/api/menu-pageList`),
}