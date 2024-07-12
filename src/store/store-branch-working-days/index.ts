
import { create } from 'zustand' ;
import { branchWorkingDays , BranchWorkingDaysState } from '@branch-working-days';
// import { toast } from 'react-toastify';


const useBranchWorkingDaysStore = create <BranchWorkingDaysState> ((set)=>({
    isLoader: false,
    dataBranchWorkingDays: [],
    totlCount: 0,
    getDataBranchDays : async(id)=>{
        try{
           set({isLoader: true})
           const response = await branchWorkingDays.getBranchWorkingDays(id);
           if(response.status === 200){
               set({dataBranchWorkingDays: response?.data});
            //    set({totlCount: respons?.data?.data?.count})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },

    activatedBranchDays : async(data)=>{
        try{
            const response = await branchWorkingDays.activatedBranchWorkingDays(data)
            if(response?.status === 200){
                set((state)=>({dataBranchWorkingDays: state.dataBranchWorkingDays.map((el:any)=>el.id == data?.id? {...el , activated:data?.activated } : el)}))
                return response?.status
            }
        }catch(error:any){
            console.log(error)
        }
    },
    updateBranchWorkingTime: async(data)=>{
        try{
            const response = await branchWorkingDays.updateBranchWorkingTime(data)
            if(response?.status === 200){
                set((state)=>({dataBranchWorkingDays: state.dataBranchWorkingDays.map((el:any)=>el.id == data?.id? {...el , ...data } : el)}))
                // toast.success("Time Updated Successfully")
                return response?.status
            }
        }catch(error:any){
            console.log(error)
        }
    },
    postBranchWorkingDays: async(data)=>{
        try{
            const response = await branchWorkingDays.postBranchWorkingDays(data)
            if(response?.status === 200){
                
                // toast.success("Day Added Successfully")
                return response?.status
            }
        }catch(error:any){
            console.log(error)
        }
    }

}))

export default useBranchWorkingDaysStore