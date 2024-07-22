import request from "../config"

// ----------------> Instance Services Products<-------------------------------------
export interface postProducts{
    nameRu: string,
    nameUz: string,
}

export interface UpdateProducts {
    id:number;
}


// test apida qoshilsa qo'shiladi
export interface GetProducts{
    search?: string,
    page?:number;
    limit?:number;
}




interface Products{
    getProducts : ()=> any,
}

// ---------> Interface Stor Products <--------------------
export interface StoreProducts {
    isLoader:boolean;
    dataProducts:any[];
    totlCount:number;
    getDataProducts: ()=> Promise <any>;
}




// ----------------> Instance Menu <----------------------------
export const products:Products = {
    getProducts: ()=> request.get(`/services/admin/api/products-pageList`),
}