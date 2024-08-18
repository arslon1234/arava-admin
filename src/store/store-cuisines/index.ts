
import { create } from 'zustand' ;
import { cuisines , StoreCuisines} from '@cuisines';
import { toast } from 'react-toastify';


const useCuisinesStore = create <StoreCuisines> ((set)=>({
    isLoader: false,
    dataCuisines: [],
    totlCount: 0,
    getDataCuisines : async(params)=>{
        try{
           set({isLoader: true})
           const response = await cuisines.getCuisines(params)
           if(response.status === 200){
               set({dataCuisines: response?.data?.content});
               set({totlCount: response?.data?.totalElrments})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },

    postDataCuisines: async(data)=>{
        
            try{
                const response = await cuisines.postCuisines(data)
                if(response.status === 200){
                    set((state)=>({dataCuisines: [...state.dataCuisines, data] }))
                    // set((state)=>({dataRegion: state.dataRegion.length < 10 ? [...state.dataRegion, response?.data] : [...state.dataRegion]})) \
                    // set((state)=>({totlCount: state.totlCount += 1}))
                    return response?.status
                }
             }catch(error){
                 console.log(error)
             }
    },

    deleteDataCuisines: async(id)=>{
        try{
           const response = await cuisines.deleteCuisines(id)
        //    console.log(respons)
           if(response.status === 200){
               set((state)=>({dataCuisines: state.dataCuisines.filter((el:any)=>el.id !== id)})) 
               set((state)=>({totlCount: state.totlCount -= 1}))
            toast.success("Deleted successfully")
           }
        }catch(error:any){
            console.log(error)
        }
    },

    updateDataCuisines: async(data)=>{
            try{
                const response = await cuisines.updateCuisines(data)
                if(response?.status === 200){
                    set((state)=>({dataCuisines: state.dataCuisines.map((el:any)=>el.id == data?.id ? data : el)}))
                    return response?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },

}))

export default useCuisinesStore