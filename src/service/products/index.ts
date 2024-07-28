import request from "../config"

// ----------------> Instance Services Products<-------------------------------------
export interface ProductBranchList{
    branchId: number,
    price: number,
}

export interface postProducts{
    brandId: number,
    categoriesId: number,
    descriptionRu: string,
    descriptionUz: string,
    imageThumbUrl: string,
    imageUrl: string,
    inStock: boolean,
    ingredientsRu: string,
    ingredientsUz: string,
    nameRu: string,
    nameUz: string,
    shortNameRu: string,
    shortNameUz: string
    cuisinesList: number[],
    galleryList: string[],
    productBranchList: ProductBranchList[],
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
    postProducts: (data:postProducts)=> any,
    updateProducts: (data:UpdateProducts)=> any,
    deleteProducts: (id:number)=> any,
}

// ---------> Interface Stor Products <--------------------
export interface StoreProducts {
    isLoader:boolean;
    dataProducts:any[];
    totlCount:number;
    getDataProducts: ()=> Promise <any>;
    postDataProducts: (data:postProducts)=> Promise <any>,
    updateDataProducts: (data:UpdateProducts)=> Promise <any>,
    deleteDataProducts: (id:number)=> Promise <any>,
}




// ----------------> Instance Product <----------------------------
export const products:Products = {
    getProducts: ()=> request.get(`/services/admin/api/product-pageList`),
    postProducts: (data)=> request.post(`/services/admin/api/product`, data),
    updateProducts: (data)=> request.put(`/services/admin/api/product`, data),
    deleteProducts: (id)=> request.delete(`/services/admin/api/product/${id}`),
}