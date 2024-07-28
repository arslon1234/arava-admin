
import { create } from 'zustand' ;
import { products ,StoreProducts} from '@products';
import { toast } from 'react-toastify';


const useProductsStore = create <StoreProducts> ((set)=>({
    isLoader: false,
    dataProducts: [],
    totlCount: 0,
    getDataProducts: async()=>{
        try{
           set({isLoader: true})
           const response = await products.getProducts()
           if(response.status === 200){
               set({dataProducts: response?.data});
            //    set({totlCount: respons?.data?.data?.count})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },
    postDataProducts: async(data)=> {
        try{
            set({isLoader: true})
            const response = await products.postProducts(data)
            if(response.status === 200){
                set((state)=>({dataProducts: [...state.dataProducts, data] }))
                return response?.status
            }
        }catch(error){
            console.log(error)
            set({isLoader: false})
        }
    },
    updateDataProducts: async(data)=> {
        try{
            set({isLoader: true})
            const response = await products.updateProducts(data)
            if(response.status === 200){
                set((state)=>({dataProducts: state.dataProducts.map((el:any)=>el.id == data?.id? data : el)}))
                return response?.status
            }
        }catch(error){
            console.log(error)
            set({isLoader: false})
        }
    },
    deleteDataProducts: async(id)=> {
        try{
            set({isLoader: true})
            const response = await products.deleteProducts(id)
            if(response.status === 200){
                set((state)=>({dataProducts: state.dataProducts.filter((el:any)=>el.id!= id)}))
                toast.success("Product deleted successfully")
                return response?.status
            }
        }catch(error){
            console.log(error)
            set({isLoader: false})
        }
    }
}))

export default useProductsStore
