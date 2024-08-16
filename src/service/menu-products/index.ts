import request from "../config";

// ----------------> Instance Services Menu Products<-------------------------------------

export interface postMenuProducts {
    menuSectionId: number|undefined;
    productId: number;
}


export interface GetMenuProducts {
  search?: string;
  page?: number;
  limit?: number;
}

interface MenuProducts {
  getMenuProducts: (id:number|string|undefined) => any;
  postMenuProducts: (data: postMenuProducts) => any;
  deleteMenuProducts: (id: number) => any;
}

// ---------> Interface Stor Menu Products <--------------------
export interface StoreMenuProducts {
  isLoader: boolean;
  dataMenuProducts: any[];
  totlCount: number;
  title: string;
  getDataMenuProducts: (id:number|string|undefined) => Promise<any>;
  postDataMenuProducts: (data: postMenuProducts) => Promise<any>;
  deleteDataMenuProducts: (id: number) => Promise<any>;
}

// ----------------> Instance MenuProducts <----------------------------
export const menuProducts: MenuProducts = {
  getMenuProducts: (id) => request.get(`/services/admin/api/menu-section/${id}`),
  postMenuProducts: (data) => request.post(`/services/admin/api/menu-product`, data),
  deleteMenuProducts: (id) => request.delete(`/services/admin/api/menu-product/${id}`),
};
