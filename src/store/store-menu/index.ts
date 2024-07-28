
import { create } from 'zustand' ;
import { menu ,StoreMenu} from '@menu';
import { toast } from 'react-toastify';


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
    postDataMenu: async(data)=>{
        try{
            const response = await menu.postMenu(data)
            if(response.status === 200){
                set((state)=>({dataMenu: [...state.dataMenu, data] }))
                return response?.status
            }
        }catch(error){
            console.log(error)
        }
    },
    updateDataMenu: async(data)=>{
        try{
            const response = await menu.updateMenu(data)
            if(response.status === 200){
                set((state)=>({dataMenu: state.dataMenu.map((el:any)=>el.id === data?.id? {...data, id: data.id} : el)}))
                return response?.status
            }

        }catch(error){
            console.log(error)
        }
    },
    deleteDataMenu: async(id)=>{
        try{
            const response = await menu.deleteMenu(id)
            if(response.status === 200){
                set((state)=>({dataMenu: state.dataMenu.filter((el:any)=>el.id!== id)}))
                toast.success("Menu deleted successfully");
            }
        }catch(error){
            console.log(error)
        }
    }
}))

export default useMenuStore