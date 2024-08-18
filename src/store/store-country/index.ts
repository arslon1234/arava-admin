
import { create } from 'zustand' ;
import { country ,StoreCountry} from '@country';
import { toast } from 'react-toastify';


const useCompanyStore = create <StoreCountry> ((set)=>({
    isLoader: false,
    dataCountry: [],
    totlCount: 0,
    getDataCountry : async(params)=>{
        try{
           set({isLoader: true})
           const response = await country.getCompany(params)
           if(response.status === 200){
               set({dataCountry: response?.data?.content});
               set({totlCount: response?.data?.totalElements})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },

    postDataCountry: async(data)=>{
        
            try{
                const response = await country.postCompany(data)
                if(response.status === 200){
                    set((state)=>({dataCountry: [...state.dataCountry, data] }))
                    // set((state)=>({dataCountry: state.dataCountry.length < 10 ? [...state.dataCountry, response?.data?.data] : [...state.dataCountry]})) \
                    // set((state)=>({totlCount: state.totlCount += 1}))
                    return response?.status
                }
             }catch(error){
                 console.log(error)
             }
    },

    deleteDataCountry: async(id)=>{
        try{
           const response = await country.deleteCompany(id)
        //    console.log(respons)
           if(response.status === 200){
               set((state)=>({dataCountry: state.dataCountry.filter((el:any)=>el.id !== id)})) 
               set((state)=>({totlCount: state.totlCount -= 1}))
            toast.success("Country deleted successfully")
           }
        }catch(error:any){
            console.log(error)
        }
    },

    updateDataCountry: async(data)=>{
            try{
                const response = await country.updateCompany(data)
                if(response?.status === 200){
                    set((state)=>({dataCountry: state.dataCountry.map((el:any)=>el.id == data?.id ? data : el)}))
                    return response?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },

}))

export default useCompanyStore