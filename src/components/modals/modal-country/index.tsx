import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

import {useCountryStore} from "@store";


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
  const { postDataCountry, updateDataCountry } = useCountryStore();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// my code start <-----------------------------
 

  const validationSchema = Yup.object().shape({
    nameUz: Yup.string().required("Name is required"),
    nameRu: Yup.string().required("Name is required"),

    // parent_category_id: Yup.number().min(0, "must be at least greater than 0"),
    // position: Yup.number().min(0, "must be at least greater than 0"),
  });

  const initialValues: any = {
    nameUz: data?.nameUz || "", 
    nameRu: data?.nameRu || "", 
  };

  const handelSubmit = async (value:any ) => {
    if(!id){
      console.log(value);
      
      const status = await postDataCountry(value);
      if (status === 200) {
      toast.success("success full");
      handleClose();
      } else {
       toast.error("Error :" + status);
       handleClose();
      }
    }else{
      console.log(value);
      
      const updateData= {id:id, nameUz: value?.nameUz , nameRu: value?.nameRu}
      const status = await updateDataCountry(updateData);
      if (status === 200) {
      toast.success("update success full"); 
      handleClose();
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
                  title == "post"? "Add a country" : "Edit a country"
                }
              </h1>
              <Field
                as={TextField}
                label="Country name Uz"
                sx={{ "& input": { color: "#00000", fontSize: "20px" , height:18 } ,  }}
                type="text"
                name="nameUz"
                className=" w-[100%]  mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                     name="nameUz"
                     component="div"
                     className="mb-3 text-red-500 text-center text-[18px] font-medium "
                  />
                }
              />
              <Field
                as={TextField}
                label="Country name Ru"
                sx={{ "& input": { color: "#00000", fontSize: "20px" , height:18 } }}
                type="text"
                name="nameRu"
                className=" w-[100%]  mb-3 outline-none py-0 "
                helperText={
                  <ErrorMessage
                     name="nameRu"
                     component="div"
                     className="mb-3 text-red-500 text-center text-[18px] font-medium"
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
