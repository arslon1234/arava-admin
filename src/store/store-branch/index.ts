
import { create } from 'zustand' ;
import { branch , StoreBranch } from '@branch';
import { toast } from 'react-toastify';


const useBranchStore = create <StoreBranch> ((set)=>({
    isLoader: false,
    dataBranch: [],
    totlCount: 0,
    getDataBranch : async(params)=>{
        try{
           set({isLoader: true})
           const response = await branch.getBranch(params)
           if(response.status === 200){
               set({dataBranch: response?.data?.content});
               set({totlCount: response?.data?.totalElements})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },

    postDataBranch: async(data)=>{
        
            try{
                const response = await branch.postBranch(data)
                if(response.status === 200){
                    set((state)=>({dataBranch: [...state.dataBranch, data] }))
                    // set((state)=>({dataCountry: state.dataCountry.length < 10 ? [...state.dataCountry, response?.data?.data] : [...state.dataCountry]})) \
                    // set((state)=>({totlCount: state.totlCount += 1}))
                    return response?.status
                }
             }catch(error){
                 console.log(error)
             }
    },

    deleteDataBranch: async(id)=>{
        try{
           const response = await branch.deleteBranch(id)
        //    console.log(respons)
           if(response.status === 200){
               set((state)=>({dataBranch: state.dataBranch.filter((el:any)=>el.id !== id)})) 
               set((state)=>({totlCount: state.totlCount -= 1}))
              toast.success("Branch deleted successfully")
           }
        }catch(error:any){
            console.log(error)
        }
    },

    updateDataBranch: async(data)=>{
            try{
                const response = await branch.updateBranch(data)
                if(response?.status === 200){
                    set((state)=>({dataBranch: state.dataBranch.map((el:any)=>el.id == data?.id ? data : el)}))
                    return response?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },
    activatedBranch: async(data)=>{
        try{
            const response = await branch.activatedBranch(data)
            if(response?.status === 200){
                set((state)=>({dataBranch: state.dataBranch.map((el:any)=>el.id == data?.id? {...el , activated:data?.activated } : el)}))
                return response?.status
            }
        }catch(error:any){
            console.log(error)
        }
    },

}))

export default useBranchStore