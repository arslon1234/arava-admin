
import { create } from 'zustand' ;
import { menuCategories ,StoreMenuCategories} from '@menu-categories';


const useMenuCategoriesStore = create <StoreMenuCategories> ((set)=>({
    isLoader: false,
    dataMenuCategories: [],
    totlCount: 0,
    getDataMenuCategories: async()=>{
        try{
           set({isLoader: true})
           const response = await menuCategories.getMenuCategories()
           if(response.status === 200){
               set({dataMenuCategories: response?.data});
            //    set({totlCount: respons?.data?.data?.count})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },
}))

export default useMenuCategoriesStore