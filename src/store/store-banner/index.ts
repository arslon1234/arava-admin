
import { create } from 'zustand' ;
import { banner , StoreBanner } from '@banner';
import { toast } from 'react-toastify';


const useBannerStore = create <StoreBanner> ((set)=>({
    isLoader: false,
    dataBanner: [],
    totlCount: 0,
    imageUrl: "",
    getDataBanner : async(params)=>{
        try{
           set({isLoader: true})
           const response = await banner.getBanner(params)
           if(response.status === 200){
               set({dataBanner: response?.data?.content});
               set({totlCount: response?.data?.totalElements})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },

    postDataBanner: async(data)=>{
        
            try{
                const response = await banner.postBanner(data)
                if(response.status === 200){
                    set((state)=>({dataBanner: [...state.dataBanner, data] }))
                    // set((state)=>({dataCountry: state.dataCountry.length < 10 ? [...state.dataCountry, response?.data?.data] : [...state.dataCountry]})) \
                    // set((state)=>({totlCount: state.totlCount += 1}))
                    return response?.status
                }
             }catch(error){
                 console.log(error)
             }
    },

    deleteDataBanner: async(id)=>{
        try{
           const response = await banner.deleteBanner(id)
        //    console.log(respons)
           if(response.status === 200){
               set((state)=>({dataBanner: state.dataBanner.filter((el:any)=>el.id !== id)})) 
               set((state)=>({totlCount: state.totlCount -= 1}))
              toast.success("Banner deleted successfully")
           }
        }catch(error:any){
            console.log(error)
        }
    },

    updateDataBanner: async(data)=>{
            try{
                const response = await banner.updateBanner(data)
                if(response?.status === 200){
                    set((state)=>({dataBanner: state.dataBanner.map((el:any)=>el.id == data?.id ? data : el)}))
                    return response?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },
    bannerActivate: async(data)=>{
        try{
            const response = await banner.bannerActivate(data)
            if(response?.status === 200){
                set((state)=>({dataBanner: state.dataBanner.map((el:any)=>el.id == data?.id? {...el , activated:data?.activated } : el)}))
                return response?.status
            }
        }catch(error:any){
            console.log(error)
        }
    },

    imageUrlUpdated: (Url:string)=>{
        set({imageUrl: Url})
    }

}))

export default useBannerStore