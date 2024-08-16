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
  size?: number;
  id:string|number|undefined;
}

interface MenuSection {
  getMenuSection: (params:GetMenu) => any;
  postMenuSection: (data: createMenuSction) => any;
  updateMenuSection: (data: UpdateMenuSection) => any;
  deleteMenuSection: (id: number) => any;
}

// ---------> Interface Stor Menu <--------------------
export interface StoreMenuSection {
  isLoader: boolean;
  dataMenuSection: any[];
  totlCount: number;
  getDataMenuSection: (params:GetMenu) => Promise<any>;
  postDataMenuSection: (data: createMenuSction) => Promise<any>;
  updateDataMenuSection: (data: UpdateMenuSection) => Promise<any>;
  deleteDataMenuSection: (id: number) => Promise<any>;
}

// ----------------> Instance MenuSection <----------------------------
export const menuSection: MenuSection = {
  getMenuSection: (params) => request.get(params?.page ? `/services/admin/api/menu-section-pageList/${params?.id}?page=${params?.page}&size=${params?.size}&search=${params?.search}` :`/services/admin/api/menu-section-pageList/${params?.id}`),
  postMenuSection: (data) => request.post(`/services/admin/api/menu-section/${data?.menuId}`, data?.data),
  updateMenuSection: (data) => request.put(`/services/admin/api/menu-section`, data),
  deleteMenuSection: (id) => request.delete(`/services/admin/api/menu-section/${id}`),
};
