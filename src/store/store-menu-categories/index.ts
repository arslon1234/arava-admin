
import { create } from 'zustand' ;
import { menuCategories ,StoreMenuCategories} from '@menu-categories';
import { toast } from 'react-toastify';


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
    postDataMenuCategories: async(data)=>{
        try{
            const response = await menuCategories.postMenuCategories(data)
            if(response.status === 200){
                set((state)=>({dataMenuCategories: [...state.dataMenuCategories, data] }))
                return response?.status
            }
        }catch(error){
            console.log(error)
        }
    },
    updateDataMenuCategories: async(data)=>{
        try{
            const response = await menuCategories.updateMenuCategories(data)
            if(response.status === 200){
                set((state)=>({dataMenuCategories: state.dataMenuCategories.map((el:any)=>el.id === data?.id? {...data, id: data.id} : el)}))
                return response?.status
            }

        }catch(error){
            console.log(error)
        }
    },
    deleteDataMenuCategories: async(id)=>{
        try{
            const response = await menuCategories.deleteMenuCategories(id)
            if(response.status === 200){
                set((state)=>({dataMenuCategories: state.dataMenuCategories.filter((el:any)=>el.id!== id)}))
                toast.success("Menu categories deleted successfully");
            }
        }catch(error){
            console.log(error)
        }
    }
}))

export default useMenuCategoriesStore