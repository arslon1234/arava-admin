
import { create } from 'zustand' ;
import { menu ,StoreMenu} from '@menu';


const useMenuStore = create <StoreMenu> ((set)=>({
    isLoader: false,
    dataMenu: [],
    totlCount: 0,
    getDataMenu: async()=>{
        try{
           set({isLoader: true})
           const response = await menu.getMenu()
           if(response.status === 200){
               set({dataMenu: response?.data});
            //    set({totlCount: respons?.data?.data?.count})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },
}))

export default useMenuStore