
import { create } from 'zustand' ;
import { region , StoreRegion} from '@region';
import { toast } from 'react-toastify';


const useRegionStore = create <StoreRegion> ((set)=>({
    isLoader: false,
    dataRegion: [],
    dataRegionHelper: [],
    totlCount: 0,
    getDataRegion : async(params)=>{
        try{
           set({isLoader: true})
           const response = await region.getRegion(params)
           if(response.status === 200){
               set({dataRegion: response?.data?.content});
               set({totlCount: response?.data?.totalElements})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },

    getDataRegionHelper :async(id)=>{
        try{
            const response = await region.getRegionHelper(id)
            if(response.status === 200){
                set({dataRegionHelper: response?.data})
            }
       }catch(error){
        console.log(error)
       }
    },

    postDataRegion: async(data)=>{
        
            try{
                const response = await region.postRegion(data)
                if(response.status === 200){
                    set((state)=>({dataRegion: [...state.dataRegion, data] }))
                    // set((state)=>({dataRegion: state.dataRegion.length < 10 ? [...state.dataRegion, response?.data] : [...state.dataRegion]})) \
                    // set((state)=>({totlCount: state.totlCount += 1}))
                    return response?.status
                }
             }catch(error){
                 console.log(error)
             }
    },

    deleteDataRegion: async(id)=>{
        try{
           const response = await region.deleteRegion(id)
        //    console.log(respons)
           if(response.status === 200){
               set((state)=>({dataRegion: state.dataRegion.filter((el:any)=>el.id !== id)})) 
               set((state)=>({totlCount: state.totlCount -= 1}))
            toast.success("Region deleted successfully")
           }
        }catch(error:any){
            console.log(error)
        }
    },

    updateDataRegion: async(data)=>{
            try{
                const response = await region.updateRegion(data)
                if(response?.status === 200){
                    set((state)=>({dataRegion: state.dataRegion.map((el:any)=>el.id == data?.id ? data : el)}))
                    return response?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },

}))

export default useRegionStore