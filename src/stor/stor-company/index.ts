
import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { company ,StoreCompany } from '@company';


const useCategoryStore = create <StoreCompany> ((set)=>({
    isLoader: false,
    dataCompany: [],
    totlCount: 0,
    getDataCompany : async()=>{
        try{
           set({isLoader: true})
           const respons = await company.getCompany()
        //    console.log(respons)
           if(respons.status === 200){
               set({dataCompany: respons?.data?.data});
            //    set({totlCount: respons?.data?.data?.count})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },

    postDataCompany: async(data)=>{
        
            try{
                const respons = await company.postCompany(data)
             //    console.log(respons)
                if(respons.status === 201){
                    set((state)=>({dataCompany: state.dataCompany.length < 10 ? [...state.dataCompany, respons?.data?.data] : [...state.dataCompany]})) 
                    // set((state)=>({totlCount: state.totlCount += 1}))
                    return respons?.status
                }
             }catch(error){
                 console.log(error)
             }
    },

    deleteDataCompany: async(id)=>{
        try{
           const respons = await company.deleteCompany(id)
        //    console.log(respons)
           if(respons.status === 200){
               set((state)=>({dataCompany: state.dataCompany.filter((el:any)=>el.id !== id)})) 
            //    set((state)=>({totlCount: state.totlCount -= 1}))
               toast.success("Deleted successfully")
           }
        }catch(error:any){
            console.log(error)
        }
    },

    updateDataCompany: async(data)=>{
            try{
                const respons = await company.updateCompany(data)
                if(respons?.status === 200){
                    set((state)=>({dataCompany: state.dataCompany.map((el:any)=>el.id === data?.id ? {...data , id:data.id} : el)}))
                    return respons?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },

}))

export default useCategoryStore