
import { create } from 'zustand' ; 
import { сouriers , StoreCouriers } from '@сouriers';
import { toast } from 'react-toastify';


const useCouriersStore = create <StoreCouriers> ((set)=>({
    isLoader: false,
    dataCouriers: [],
    totlCount: 0,
    getDataCouriers : async(params)=>{
        try{
           set({isLoader: true})
           const response = await сouriers.getCouriers(params)
           if(response.status === 200){
               set({dataCouriers: response?.data});
            //    set({totlCount: respons?.data?.data?.count})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },

    postDataCouriers: async(data)=>{
        
            try{
                const response = await сouriers.postCouriers(data)
                if(response.status === 200){
                    set((state)=>({dataCouriers: [...state.dataCouriers, data] }))
                    // set((state)=>({dataCountry: state.dataCountry.length < 10 ? [...state.dataCountry, response?.data?.data] : [...state.dataCountry]})) \
                    // set((state)=>({totlCount: state.totlCount += 1}))
                    return response?.status
                }
             }catch(error){
                 console.log(error)
             }
    },

    deleteDataCouriers: async(id)=>{
        try{
           const response = await сouriers.deleteCouriers(id)
        //    console.log(respons)
           if(response.status === 200){
               set((state)=>({dataCouriers: state.dataCouriers.filter((el:any)=>el.id !== id)})) 
            //    set((state)=>({totlCount: state.totlCount -= 1}))
            toast.success("Couriers deleted successfully")
           }
        }catch(error:any){
            console.log(error)
        }
    },

    updateDataCouriers: async(data)=>{
            try{
                const response = await сouriers.updateCouriers(data)
                if(response?.status === 200){
                    set((state)=>({dataCouriers: state.dataCouriers.map((el:any)=>el.id == data?.id ? data : el)}))
                    return response?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },

}))

export default useCouriersStore