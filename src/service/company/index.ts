import request from "../config"

// ----------------> Instance Services Company<-------------------------------------
export interface postCompany{
    name: string,
}

export interface UpdateCompany {
    id:number;
}

export interface GetCompany{
    search?: string,
    page?:number;
    limit?:number;
}




interface Category{
    getCompany : ()=> any,

    // ESLATMA swagger to'grilansa davom etiladi
    postCompany : (data:postCompany)=> any,
    deleteCompany : (id:number)=> any,
    updateCompany: (data:UpdateCompany)=> any,
}

// ---------> Interface Stor Company <--------------------
export interface StoreCompany {
    isLoader:boolean;
    dataCompany:any[];
    totlCount:number;
    getDataCompany: ()=> Promise <any>;

    // ESLATMA swagger to'grilansa davom etiladi
    deleteDataCompany: (id:number)=> Promise <any>;
    postDataCompany: (data:postCompany)=> Promise <any>;
    updateDataCompany: (data:UpdateCompany)=> Promise <any>;
}




// ----------------> Instance Category <----------------------------
export const company:Category = {
    getCompany: ()=> request.get(`/services/admin/api/company-pageList`),

    // ESLATMA swagger to'grilansa davom etiladi
    deleteCompany: (id)=> request.delete(`/api/test/${id}`),
    postCompany: (data)=> request.post("/api/test" , data),
    updateCompany: (data)=> request.patch(`/api/test${data.id}`, data),
}