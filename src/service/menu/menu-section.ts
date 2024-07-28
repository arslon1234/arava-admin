import request from "../config";

// ----------------> Instance Services Menu Section<-------------------------------------

export interface postMenuSection {
  nameRu: string;
  nameUz: string;
}

export interface createMenuSction{
    menuId:string|undefined;
    data: postMenuSection
}



export interface UpdateMenuSection {
  id: number;
}

// test apida qoshilsa qo'shiladi
export interface GetMenu {
  search?: string;
  page?: number;
  limit?: number;
}

interface MenuSection {
  getMenuSection: (id:number|string|undefined) => any;
  postMenuSection: (data: createMenuSction) => any;
  updateMenuSection: (data: UpdateMenuSection) => any;
  deleteMenuSection: (id: number) => any;
}

// ---------> Interface Stor Menu <--------------------
export interface StoreMenuSection {
  isLoader: boolean;
  dataMenuSection: any[];
  totlCount: number;
  getDataMenuSection: (id:number|string|undefined) => Promise<any>;
  postDataMenuSection: (data: createMenuSction) => Promise<any>;
  updateDataMenuSection: (data: UpdateMenuSection) => Promise<any>;
  deleteDataMenuSection: (id: number) => Promise<any>;
}

// ----------------> Instance MenuSection <----------------------------
export const menuSection: MenuSection = {
  getMenuSection: (id) => request.get(`/services/admin/api/menu-section-pageList/${id}`),
  postMenuSection: (data) => request.post(`/services/admin/api/menu-section/${data?.menuId}`, data?.data),
  updateMenuSection: (data) => request.put(`/services/admin/api/menu-section`, data),
  deleteMenuSection: (id) => request.delete(`/services/admin/api/menu-section/${id}`),
};
