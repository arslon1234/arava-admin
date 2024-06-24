
import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { country ,StoreCompany} from '@country';


const useCompanyStore = create <StoreCompany> ((set)=>({
    isLoader: false,
    dataCountry: [],
    totlCount: 0,
    getDataCountry : async()=>{
        try{
           set({isLoader: true})
           const respons = await country.getCompany()
        //    console.log(respons)
           if(respons.status === 200){
               set({dataCountry: respons?.data});
            //    set({totlCount: respons?.data?.data?.count})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },

    postDataCountry: async(data)=>{
        
            try{
                const respons = await country.postCompany(data)
             //    console.log(respons)
                if(respons.status === 200){
                    set((state)=>({dataCountry: [...state.dataCountry, data] }))
                    // set((state)=>({dataCountry: state.dataCountry.length < 10 ? [...state.dataCountry, respons?.data?.data] : [...state.dataCountry]})) \
                    // set((state)=>({totlCount: state.totlCount += 1}))
                    return respons?.status
                }
             }catch(error){
                 console.log(error)
             }
    },

    deleteDataCountry: async(id)=>{
        try{
           const respons = await country.deleteCompany(id)
        //    console.log(respons)
           if(respons.status === 200){
               set((state)=>({dataCountry: state.dataCountry.filter((el:any)=>el.id !== id)})) 
            //    set((state)=>({totlCount: state.totlCount -= 1}))
               toast.success("Deleted successfully")
           }
        }catch(error:any){
            console.log(error)
        }
    },

    updateDataCountry: async(data)=>{
            try{
                const respons = await country.updateCompany(data)
                if(respons?.status === 200){
                    set((state)=>({dataCountry: state.dataCountry.map((el:any)=>el.id == data?.id ? data : el)}))
                    return respons?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },

}))

export default useCompanyStore