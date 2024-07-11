import request from "../config";

// ---------------- Interface branch working days ----------------

export interface postBranchWorkingDays {
  branchId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}

export interface updateBranchWorkingDays {
  id: number;
}

export interface ActivatedBranch {
    id?: number|any;
    activated: boolean;
}

interface BranchWorkingDays{
    getBranchWorkingDays : (id:number)=> any,
    
    //API da hali qo'shilmadi
    deleteBranchWorkingDays: (id:number)=> any,
    postBranchWorkingDays : (data:postBranchWorkingDays)=> any,
    updateBranchWorkingDays: (data:updateBranchWorkingDays)=> any,
    activatedBranchWorkingDays:(data:ActivatedBranch)=> any,
}


// ----------------> Instance BranchWorkingDays <----------------------------

export const branchWorkingDays: BranchWorkingDays = {
  getBranchWorkingDays: (id: number) => {
    return request.get(`/services/admin/api/branch-working-days/${id}`);
  },

  deleteBranchWorkingDays: (id: number) => {
    return request.delete(`/branch-working-days/${id}`);
  },

  postBranchWorkingDays: (data: postBranchWorkingDays) => {
    return request.post(`/services/admin/api/branch-working-days`, data);
  },

  updateBranchWorkingDays: (data: updateBranchWorkingDays) => {
    return request.put(`/services/admin/api/branch-working-days` , data);
  },

  activatedBranchWorkingDays: (data: ActivatedBranch) => {
    return request.put(`/branch-working-days/activated`, data);
  },
};