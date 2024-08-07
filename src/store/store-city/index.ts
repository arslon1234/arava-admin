
import { create } from 'zustand' ;
import { city , StoreCity } from '@city';
import { toast } from 'react-toastify';


const useCityStore = create <StoreCity> ((set)=>({
    isLoader: false,
    dataCity: [],
    totlCount: 0,
    getDataCity : async(params)=>{
        try{
           set({isLoader: true})
           const response = await city.getCity(params)
           if(response.status === 200){
               set({dataCity: response?.data});
            //    set({totlCount: respons?.data?.data?.count})
           }
           set({isLoader: false})
       }catch(error){
        console.log(error)
        set({isLoader: false})
       }
       
    },

    postDataCity: async(data)=>{
        
            try{
                const response = await city.postCity(data)
                if(response.status === 200){
                    set((state)=>({dataCity: [...state.dataCity, data] }))
                    // set((state)=>({dataCountry: state.dataCountry.length < 10 ? [...state.dataCountry, response?.data?.data] : [...state.dataCountry]})) \
                    // set((state)=>({totlCount: state.totlCount += 1}))
                    return response?.status
                }
             }catch(error){
                 console.log(error)
             }
    },

    deleteDataCity: async(id)=>{
        try{
           const response = await city.deleteCity(id)
        //    console.log(respons)
           if(response.status === 200){
               set((state)=>({dataCity: state.dataCity.filter((el:any)=>el.id !== id)})) 
            //    set((state)=>({totlCount: state.totlCount -= 1}))
            toast.success("City deleted successfully")
           }
        }catch(error:any){
            console.log(error)
        }
    },

    updateDataCity: async(data)=>{
            try{
                const response = await city.updateCity(data)
                if(response?.status === 200){
                    set((state)=>({dataCity: state.dataCity.map((el:any)=>el.id == data?.id ? data : el)}))
                    return response?.status
                }
                
                }catch(error:any){
                    console.log(error)
                }
    },

}))

export default useCityStore