import request from "../config";

// ----------------> Instance Services Menu<-------------------------------------
export interface postMenu {
  branchId: number;
  descriptionRu: string;
  descriptionUz: string;
  nameRu: string;
  nameUz: string;
}

export interface UpdateMenu {
  id: number;
}

// test apida qoshilsa qo'shiladi
export interface GetMenu {
  search?: string;
  page?: number;
  limit?: number;
}

interface Menu {
  getMenu: () => any;
  postMenu: (data: postMenu) => any;
  updateMenu: (data: UpdateMenu) => any;
  deleteMenu: (id: number) => any;
}

// ---------> Interface Stor Menu <--------------------
export interface StoreMenu {
  isLoader: boolean;
  dataMenu: any[];
  totlCount: number;
  getDataMenu: () => Promise<any>;
  postDataMenu: (data: postMenu) => Promise<any>;
  updateDataMenu: (data: UpdateMenu) => Promise<any>;
  deleteDataMenu: (id: number) => Promise<any>;
}

// ----------------> Instance Menu <----------------------------
export const menu: Menu = {
  getMenu: () => request.get(`/services/admin/api/menu-pageList`),
  postMenu: (data) => request.post(`/services/admin/api/menu`, data),
  updateMenu: (data) => request.put(`/services/admin/api/menu`, data),
  deleteMenu: (id) => request.delete(`/services/admin/api/menu/${id}`),
};
