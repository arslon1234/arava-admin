import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
// import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { Button, TextField } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';

// import useCategoryStore from "@stor-category";
// import {postCategory} from "@category"


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
  // const { postDatacategory , updateDataCategory } = useCategoryStore();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// my code start <-----------------------------
 

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    // parent_category_id: Yup.number().min(0, "must be at least greater than 0"),
    // position: Yup.number().min(0, "must be at least greater than 0"),
  });

  const initialValues: any = {
    name: data?.name || "", 
  };

  const handelSubmit = async (value:any ) => {
    if(!id){
      console.log(value);
      
      // const status = await postDatacategory(value);
      // if (status === 201) {
      // toast.success("success full");
      // handleClose();
      // } else {
      //  toast.error("Error :" + status);
      //  handleClose();
      // }
    }else{
      console.log(value);
      
      // const updateData= {id:id, updateData : value}
      // const status = await updateDataCategory(updateData);
      // if (status === 200) {
      // toast.success("update success full"); 
      // handleClose();
      // } else {
      //  toast.error("Error :" + status);
      //  handleClose();
      // }
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
                  title == "post"? "Add a company" : "Edit a company"
                }
              </h1>
              <Field
                as={TextField}
                label="Company name"
                sx={{ "& input": { color: "#00000", fontSize: "20px" } }}
                type="text"
                name="name"
                className=" w-[100%]  mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                     name="name"
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
