
import { create } from 'zustand' ;
import { brand , StoreBrand } from '@brand';
import { toast } from 'react-toastify';


const useBrandStore = create <StoreBrand> ((set)=>({
    isLoader: false,
    dataBrand: [],
    totlCount: 0,
    location:{lat: 0, lng: 0},

    getDataBrand : async(params)=>{
        try{
           set({isLoader: true})
           const response = await brand.getBrand(params)
           if(response.status === 200){
               set({dataBrand: response?.data?.content});
               set({totlCount: response?.data?.totalElements})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },

    postDataBrand: async(data)=>{
        
            try{
                const response = await brand.postBrand(data)
                if(response.status === 200){
                    set((state)=>({dataBrand: [...state.dataBrand, data] }))
                    // set((state)=>({dataCountry: state.dataCountry.length < 10 ? [...state.dataCountry, response?.data?.data] : [...state.dataCountry]})) \
                    // set((state)=>({totlCount: state.totlCount += 1}))
                    return response?.status
                }
             }catch(error){
                 console.log(error)
             }
    },

    deleteDataBrand: async(id)=>{
        try{
           const response = await brand.deleteBrand(id)
        //    console.log(respons)
           if(response.status === 200){
               set((state)=>({dataBrand: state.dataBrand.filter((el:any)=>el.id !== id)})) 
               set((state)=>({totlCount: state.totlCount -= 1}))
            toast.success("Brand deleted successfully")
           }
        }catch(error:any){
            console.log(error)
        }
    },

    updateDataBrand: async(data)=>{
            try{
                const response = await brand.updateBrand(data)
                if(response?.status === 200){
                    set((state)=>({dataBrand: state.dataBrand.map((el:any)=>el.id == data?.id ? data : el)}))
                    return response?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },

    locationUpdate : (data)=>{
        set({location: data})
    },

    activateBrand: async(data)=> {
        try{
            const response = await brand.brandActivated(data)
            if(response.status === 200){
                set((state)=>({dataBrand: state.dataBrand.map((el:any)=> el.id == data.id ? {...el, activated:data?.activated} : el)}))
                return response?.status
            }
        }catch(error:any){
            console.log(error)
        }
    }

}))

export default useBrandStore