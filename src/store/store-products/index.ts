
import { create } from 'zustand' ;
import { products ,StoreProducts} from '@products';


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
}))

export default useProductsStore