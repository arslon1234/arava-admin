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

export interface CompanyActivated{
    id:number|any;
    activated: boolean;
}




interface Category{
    getCompany : ()=> any,

    // ESLATMA swagger to'grilansa davom etiladi
    postCompany : (data:postCompany)=> any,
    deleteCompany : (id:number)=> any,
    updateCompany: (data:UpdateCompany)=> any,

    activateCompany : (data:CompanyActivated)=> any
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

    activateCompany: (data:CompanyActivated)=> Promise <any>;
}




// ----------------> Instance Category <----------------------------
export const company:Category = {
    getCompany: ()=> request.get(`/services/admin/api/company-pageList`),

    // ESLATMA swagger to'grilansa davom etiladi
    deleteCompany: (id)=> request.delete(`/services/admin/api/company/${id}`),
    postCompany: (data)=> request.post("/services/admin/api/company" , data),
    updateCompany: (data)=> request.patch(`/services/admin/api/company`, data),

    activateCompany: (data)=> request.put(`/services/admin/api/company-activate`, data),
}