
import { create } from 'zustand' ;
import { toast } from 'react-toastify'; 
import { brandType , StoreBrandType } from '@brand-type';


const useBrandTypeStore = create <StoreBrandType> ((set)=>({
    isLoader: false,
    dataBrandType: [],
    totlCount: 0,
    getDataBrandType : async()=>{
        try{
           set({isLoader: true})
           const response = await brandType.getBrandType()
           if(response.status === 200){
               set({dataBrandType: response?.data});
            //    set({totlCount: respons?.data?.data?.count})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },

    postDataBrandType: async(data)=>{
        
            try{
                const response = await brandType.postBrandType(data)
                if(response.status === 200){
                    set((state)=>({dataBrandType: [...state.dataBrandType, data] }))
                    // set((state)=>({dataCountry: state.dataCountry.length < 10 ? [...state.dataCountry, response?.data?.data] : [...state.dataCountry]})) \
                    // set((state)=>({totlCount: state.totlCount += 1}))
                    return response?.status
                }
             }catch(error){
                 console.log(error)
             }
    },

    deleteDataBrandType: async(id)=>{
        try{
           const response = await brandType.deleteBrandType(id)
        //    console.log(respons)
           if(response.status === 200){
               set((state)=>({dataBrandType: state.dataBrandType.filter((el:any)=>el.id !== id)})) 
            //    set((state)=>({totlCount: state.totlCount -= 1}))
               toast.success("Deleted successfully")
           }
        }catch(error:any){
            console.log(error)
        }
    },

    updateDataBrandType: async(data)=>{
            try{
                const response = await brandType.updateBrandType(data)
                if(response?.status === 200){
                    set((state)=>({dataBrandType: state.dataBrandType.map((el:any)=>el.id == data?.id ? data : el)}))
                    return response?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },

    brandTypeActivated: async(data)=>{
        try{
            const response = await brandType.brandTypeActivated(data)
            if(response?.status === 200){
                set((state)=>({dataBrandType: state.dataBrandType.map((el:any)=>el.id == data?.id? {...el , activated:data?.activated } : el)}))
                return response?.status
            }
        }catch(error:any){
            console.log(error)
        }
    },

}))

export default useBrandTypeStore