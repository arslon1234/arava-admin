
import { create } from 'zustand' ;
import { products ,StoreProducts} from '@products';
import { toast } from 'react-toastify';


const useProductsStore = create <StoreProducts> ((set)=>({
    isLoader: false,
    dataProducts: [],
    imgeList: [],
    totlCount: 0,
    getDataProducts: async(params)=>{
        try{
           set({isLoader: true})
           const response = await products.getProducts(params)
           if(response.status === 200){
               set({dataProducts: response?.data?.content});
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
                set({isLoader: false})
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
                set({isLoader: false})
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
                toast.success("Product deleted successfully");
                set({isLoader: false})
                return response?.status
            }
        }catch(error){
            console.log(error)
            set({isLoader: false})
        }
    },
    pushImgeList:(url)=>{
        set((state)=>({imgeList: [...state.imgeList, url]}))
    },
    clearImgeList: ()=>{
        set({imgeList: []})
    }
}))

export default useProductsStore
