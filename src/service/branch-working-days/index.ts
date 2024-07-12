import request from "../config";

// ---------------- Interface branch working days ----------------

interface Data {
    days : number;
    activated: boolean;
    workingStartTime:string;
    workingEndTime : string;
    open: boolean;
}

export interface postBranchWorkingDays {
  id: string | any;
  data: Data[];
}



export interface ActivatedBranch {
    id?: number|any;
    activated: boolean;
}

export interface BranchWorkingTime {
    id: number | any,
    workingStartTime: string |any, 
    workingEndTime: string | any
}

interface BranchWorkingDays{
    getBranchWorkingDays : (id:string | undefined)=> any,
    activatedBranchWorkingDays:(data:ActivatedBranch)=> any,
    updateBranchWorkingTime : (data:BranchWorkingTime)=> any,
    
    //API da hali qo'shilmadi
    postBranchWorkingDays : (data:postBranchWorkingDays)=> any,
}


// ----------------> Instance BranchWorkingDays <----------------------------

export const branchWorkingDays: BranchWorkingDays = {
  getBranchWorkingDays: (id: string | undefined) => {
    return request.get(`/services/admin/api/branch-working-days/${id}`);
  },

  activatedBranchWorkingDays: (data: ActivatedBranch) => {
    return request.put(`/services/admin/api/branch-working-days-activate`, data);
  },
  
  updateBranchWorkingTime: (data: BranchWorkingTime) => {
    return request.put(`/services/admin/api/branch-working-time`, data);
  },




  /// hali qo'shilmadi 

  postBranchWorkingDays: (data: postBranchWorkingDays) => {
    return request.post(`/services/admin/api/branch-working-days/${data?.id}`, data?.data);
  },

};


// ------- Interfaces Srore Branch Working Days --------------------------------

export interface BranchWorkingDaysState {
    isLoader:boolean;
    dataBranchWorkingDays: any[];
    totlCount:number;
    getDataBranchDays: (id:string | undefined)=> Promise <any>;
    activatedBranchDays : (data:ActivatedBranch) => Promise<any>;
    updateBranchWorkingTime: (data: BranchWorkingTime) => Promise<any>;
    postBranchWorkingDays: (data: postBranchWorkingDays) => Promise<any>;
}

