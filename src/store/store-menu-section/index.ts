
import { create } from 'zustand' ;
import { menuSection ,StoreMenuSection} from '@menu-section';
import { toast } from 'react-toastify';


const useMenuSectionStore = create <StoreMenuSection> ((set)=>({
    isLoader: false,
    dataMenuSection: [],
    totlCount: 0,
    getDataMenuSection: async(id)=>{
        try{
           set({isLoader: true})
           const response = await menuSection.getMenuSection(id)
           if(response.status === 200){
               set({dataMenuSection: response?.data?.content});
               set({totlCount: response?.data?.totalElements})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },
    postDataMenuSection: async(data)=>{
        try{
            const response = await menuSection.postMenuSection(data)
            if(response.status === 200){
                set((state)=>({dataMenuSection: [...state.dataMenuSection, data?.data] }))
                return response?.status
            }
        }catch(error){
            console.log(error)
        }
    },
    updateDataMenuSection: async(data)=>{
        try{
            const response = await menuSection.updateMenuSection(data)
            if(response.status === 200){
                set((state)=>({dataMenuSection: state.dataMenuSection.map((el:any)=>el.id === data?.id? {...data, id: data.id} : el)}))
                return response?.status
            }

        }catch(error){
            console.log(error)
        }
    },
    deleteDataMenuSection: async(id)=>{
        try{
            const response = await menuSection.deleteMenuSection(id)
            if(response.status === 200){
                set((state)=>({dataMenuSection: state.dataMenuSection.filter((el:any)=>el.id!== id)}))
                toast.success("Menu section deleted successfully");
                set((state) => ({totlCount: state.totlCount -= 1}))
            }
        }catch(error){
            console.log(error)
        }
    }
}))

export default useMenuSectionStore