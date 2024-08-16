
import { create } from 'zustand' ;
import { menuProducts ,StoreMenuProducts} from '../../service/menu-products';
import { toast } from 'react-toastify';


const useMenuProductsStore = create <StoreMenuProducts> ((set)=>({
    isLoader: false,
    dataMenuProducts: [],
    totlCount: 0,
    title: "",
    getDataMenuProducts: async(id)=>{
        try{
           set({isLoader: true})
           const response = await menuProducts.getMenuProducts(id)
           if(response.status === 200){
               set({dataMenuProducts: response?.data?.productList});
                set({title: response?.data?.nameUz})
            //    set({totlCount: response?.data?.totalElements})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },
    postDataMenuProducts: async(data)=>{
        try{
            const response = await menuProducts.postMenuProducts(data)
            if(response.status === 200){
                set((state)=>({dataMenuProducts: [...state.dataMenuProducts, data] }))
                return response?.status
            }
        }catch(error){
            console.log(error)
        }
    },
    deleteDataMenuProducts: async(params)=>{
        try{
            const response = await menuProducts.deleteMenuProducts(params)
            if(response.status === 200){
                set((state)=>({dataMenuProducts: state.dataMenuProducts.filter((el:any)=>el.id!== params?.productsId)}))
                toast.success("Menu product deleted successfully");
                // set((state) => ({totlCount: state.totlCount -= 1}))
            }
        }catch(error){
            console.log(error)
        }
    }
}))

export default useMenuProductsStore