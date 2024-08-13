import request from "../config"

// ----------------> Instance Services Company<-------------------------------------
export interface postCompany{
    login: string;
    firstName: string;
    lastName: string;
    patronymicName: string;
    gender: number;
    birthday: string;
    email: string;
    companyName: string;
    countryId: number;
    activated: boolean;
    password:string;
}

export interface UpdateCompany {
    id:number;
}

export interface GetCompany{
    search?: string,
    page?:number;
    size?:number;
}

export interface CompanyActivated{
    id:number|any;
    activated: boolean;
}




interface Category{
    getCompany : (params:GetCompany)=> any,

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
    getDataCompany: (params:GetCompany)=> Promise <any>;

    // ESLATMA swagger to'grilansa davom etiladi
    deleteDataCompany: (id:number)=> Promise <any>;
    postDataCompany: (data:postCompany)=> Promise <any>;
    updateDataCompany: (data:UpdateCompany)=> Promise <any>;

    activateCompany: (data:CompanyActivated)=> Promise <any>;
}




// ----------------> Instance Category <----------------------------
export const company:Category = {
    getCompany: (params)=> request.get(params?.page ? `/services/admin/api/company-pageList?page=${params?.page}&size=${params?.size}&search=${params?.search}` : `/services/admin/api/company-pageList`),

    // ESLATMA swagger to'grilansa davom etiladi
    deleteCompany: (id)=> request.delete(`/services/admin/api/company/${id}`),
    postCompany: (data)=> request.post("/services/admin/api/company" , data),
    updateCompany: (data)=> request.patch(`/services/admin/api/company`, data),

    activateCompany: (data)=> request.put(`/services/admin/api/company-activate`, data),
}