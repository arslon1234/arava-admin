
import { create } from 'zustand' ;
import { company ,StoreCompany } from '@company';
import { toast } from 'react-toastify';


const useCompanyStore = create <StoreCompany> ((set)=>({
    isLoader: false,
    dataCompany: [],
    totlCount: 0,
    getDataCompany : async(params)=>{
        try{
           set({isLoader: true})
           const response = await company.getCompany(params)
           if(response.status === 200){
               set({dataCompany: response?.data?.content});
               set({totlCount: response?.data?.totalElements})
           }
           set({isLoader: false})
           
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },

    postDataCompany: async(data)=>{
        
            try{
                const response = await company.postCompany(data)
                console.log(response)
                if(response.status === 200){
                    set((state)=>({dataCompany: state.dataCompany.length < 10 ? [...state.dataCompany, data] : [...state.dataCompany]})) 
                    // set((state)=>({totlCount: state.totlCount += 1}))
                    return response?.status
                }
             }catch(error){
                 console.log(error)
             }
    },

    deleteDataCompany: async(id)=>{
        try{
           const response = await company.deleteCompany(id)
           if(response.status === 200){
               set((state)=>({dataCompany: state.dataCompany.filter((el:any)=>el.id !== id)})) 
               set((state)=>({totlCount: state.totlCount -= 1}))
            toast.success("Company deleted successfully")
           }
        }catch(error:any){
            console.log(error)
        }
    },

    updateDataCompany: async(data)=>{
            try{
                const response = await company.updateCompany(data)
                if(response?.status === 200){
                    set((state)=>({dataCompany: state.dataCompany.map((el:any)=>el.id === data?.id ? {...data , id:data.id} : el)}))
                    return response?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },

    activateCompany: async(data)=>{
        try{
            const response = await company.activateCompany(data)
            if(response.status === 200){
                set((state)=>({dataCompany: state.dataCompany.map((el:any)=>el.id === data?.id? {...el , ...data} : el)}))
                // toast.success("Company status changed successfully")
                return response?.status
            }
        }catch(error:any){
            console.log(error)
        }
    },

}))

export default useCompanyStore