import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import DeleteIcon from "@mui/icons-material/Delete";
import { toast  } from 'react-toastify';

import {useBannerStore , useBrandStore ,
   useBrandTypeStore , useCityStore ,
    useCountryStore , useCouriersStore , useRegionStore } from '@store';




export default function FadeMenu({id , title}:{id:number , title : string}) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // my function start ----------------------
 const {deleteDataBanner} = useBannerStore();
 const {deleteDataBrand} = useBrandStore();
 const {deleteDataBrandType} = useBrandTypeStore();
 const {deleteDataCity} = useCityStore();
 const {deleteDataCountry} = useCountryStore();
 const {deleteDataCouriers} = useCouriersStore();
 const {deleteDataRegion} = useRegionStore();

  
  const deleteData = async() => {
    if(title == "banner"){
      try{
          const staus = await deleteDataBanner(id)
        if(staus === 200){
          handleClose()
          toast.success("Banner deleted successfully")
        } 
      }catch(err:any){
          toast.error("Error " + err?.message)
          console.log(err);
      }
    }else if(title == "brand"){
      try{
          const staus = await deleteDataBrand(id)
        if(staus === 200){
          handleClose()
          toast.success("Brand deleted successfully")
        } 
      }catch(err:any){
          toast.error("Error " + err?.message)
          console.log(err);
      }
    }else if(title == "brandType"){
      try{
          const staus = await deleteDataBrandType(id)
        if(staus === 200){
          handleClose()
          toast.success("Brand Type deleted successfully")
        } 
      }catch(err:any){
          toast.error("Error " + err?.message)
          console.log(err);
      }
    }else if(title =="city"){
      try{
          const staus = await deleteDataCity(id)
        if(staus === 200){
          handleClose()
          toast.success("City deleted successfully")
        } 
      }catch(err:any){
          toast.error("Error " + err?.message)
          console.log(err);
      }
    }else if(title == "country"){
      try{
          const staus = await deleteDataCountry(id)
        if(staus === 200){
          handleClose()
          toast.success("Country deleted successfully")
        } 
      }catch(err:any){
          toast.error("Error " + err?.message)
          console.log(err);
      }
    }else if (title == "couriers"){
      try{
          const staus = await deleteDataCouriers(id)
        if(staus === 200){
          handleClose()
          toast.success("Couriers deleted successfully")
        } 
      }catch(err:any){
          toast.error("Error " + err?.message)
          console.log(err);
      }
    }else if(title == "region"){
      try{
          const staus = await deleteDataRegion(id)
        if(staus === 200){
          handleClose()
          toast.success("Region deleted successfully")
        } 
      }catch(err:any){
          toast.error("Error " + err?.message)
          console.log(err);
      }
    }else {
      alert("delete , id - " + id);
    }
  }

  // my function end ----------------------

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color="inherit"
        
      >
        <DeleteIcon/>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        sx={{marginTop: 1}}
      >
        <div className='px-4 py-2'>
            <h3 className=''>Are you sure you want to delete?</h3>
            <div className='flex items-center justify-end gap-3 mt-2'>
                <button onClick={handleClose} className='py-1 px-2 rounded-md bg-[#008524] hover:bg-[#008124] active:bg-[#008524] text-white'>No</button>
                <button onClick={deleteData} className='py-1 px-2 rounded-md bg-red-600 hover:bg-red-700 active:bg-red-600 text-white'>Yes</button>
            </div>
        </div>
        
        </Menu>
    </div>
  );
}
