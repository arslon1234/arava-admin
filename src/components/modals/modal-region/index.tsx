import { useState , useEffect } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, MenuItem, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';


import {useCountryStore , useRegionStore} from "@store";


const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #2BC62B", 
  boxShadow: 24,
  p: 4,
};

interface propsData{
  title: string;
  id?: number;
  data?: any;
}

export default function BasicModal({title , id , data}:propsData) {
  const { getDataCountry , dataCountry } = useCountryStore();
  const {postDataRegion , updateDataRegion} = useRegionStore();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// my code start <-----------------------------
 

  const validationSchema = Yup.object().shape({
    nameUz: Yup.string().required("Name is required"),
    nameRu: Yup.string().required("Name is required"),
    countryId: Yup.string().required("Name is required"),
  });

  const initialValues: any = {
    nameUz: data?.nameUz || "", 
    nameRu: data?.nameRu || "", 
    countryId: data?.countryId || "",
  };


  //useEfect to get country --------------
  useEffect(() => {
    getDataCountry();
  }, []);

  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  const handelSubmit = async (value:any ) => {
    if(!id){
      console.log(value);
      
      const status = await postDataRegion(value);
      if (status === 200) {
      toast.success("success full");
      setTimeout(() => {
        handleClose();
        window.location.reload();
      },1000)
      } else {
       toast.error("Error :" + status);
       handleClose();
      }
    }else{
      console.log(value);
      
      const updateData= {...value , id:id,}
      const status = await updateDataRegion(updateData);
      if (status === 200) {
      toast.success("update success full"); 
      setTimeout(() => {
        handleClose();
        window.location.reload();
      },1000)
      } else {
       toast.error("Error :" + status);
       handleClose();
      }
    }
  };

  // my code end <--------------------------------

  return (
    <div>
      {
        title == "post" ? 
        <button
        onClick={handleOpen}
        className="py-2 px-6 text-white font-semibold bg-[#008524] hover:bg-[#008124] active:bg-[#008524] duration-200 rounded-lg"
      >
        To add
      </button> : 
      <Button
        color="inherit"
        onClick={handleOpen}
        sx={{ 
          color: '#767676' // HEX formatida rang
        }}
      >
        <EditIcon  />
      </Button>
      }
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handelSubmit}
          >
            <Form className=" max-w-[600px]  w-full flex flex-col gap-[12px]">
              <h1 className="text-center mb-2 text-[26px] font-bold">
                {
                  title == "post"? "Add a region" : "Edit a region"
                }
              </h1>

                {/* Country data select */}
                <Field
                        name="countryId"
                        type="text"
                        as={TextField}
                        label="Country name"
                        select
                        sx={{ "& select": {  height:18 } ,  }}
                        className="relative"
                        margin="none"
                        variant="outlined"
                        fullWidth
                        helperText={
                          <ErrorMessage
                            name="countryId"
                            component="div"
                            className="text-[red] text-[15px] text-center"
                          />
                        }
                      >
                        {dataCountry?.map((item: any, index: number) => (
                          <MenuItem key={index} value={item.id}>
                            {true ? item?.nameUz : item?.nameRu}
                          </MenuItem>
                        ))}
                      </Field>

              <Field
                as={TextField}
                label="Region name Uz"
                sx={{ "& input": { color: "#00000", fontSize: "20px" , height:20 } ,  }}
                type="text"
                name="nameUz"
                className=" w-[100%]  mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                     name="nameUz"
                     component="div"
                     className=" text-[red] text-center text-[15px] font-medium "
                  />
                }
              />
              <Field
                as={TextField}
                label="Region name Ru"
                sx={{ "& input": { color: "#00000", fontSize: "20px" , height:20 } }}
                type="text"
                name="nameRu"
                className=" w-[100%]  mb-3 outline-none py-0 "
                helperText={
                  <ErrorMessage
                     name="nameRu"
                     component="div"
                     className=" text-[red] text-center text-[15px] font-medium"
                  />
                }
              />
              
              <Button
                sx={{ fontSize: "16px", fontWeight: "600" ,backgroundColor: "#008524", "&:hover" :{background: "#008124"} }}
                variant="contained"
                type="submit"
                className="w-[100%] py-3"
              >
                {
                  title == "post"? "to add" : "to edit"
                }
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
