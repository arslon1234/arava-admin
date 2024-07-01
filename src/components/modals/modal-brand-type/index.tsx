import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { Field, Formik, Form, ErrorMessage } from "formik";
import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useBrandTypeStore } from "@store";

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

interface propsData {
  title: string;
  id?: number;
  data?: any;
}

export default function BasicModal({ title, id, data }: propsData) {

  const { postDataBrandType, updateDataBrandType , } = useBrandTypeStore();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// my code start <-----------------------------

  const validationSchema = Yup.object().shape({
    activated: Yup.string().required("Activeted is required"),
    nameRu: Yup.string().required("Nmae is required"),
    nameUz: Yup.string().required("Nmae is required"),
    descriptionRu: Yup.string().required("Description is required"),
    descriptionUz: Yup.string().required("Description is required"),
  });

  const initialValues: any = {
    activated: data?.activated == true ? "True" : "False" || "",
    nameUz: data?.nameUz || "",
    nameRu: data?.nameRu || "",
    descriptionRu: data?.descriptionRu || "",
    descriptionUz: data?.descriptionUz || "",
  };

  const handelSubmit = async (value: any) => {
    const activated: boolean | any = value?.activated == "True" ? true : false;

    if (!id) {
      const status = await postDataBrandType({ ...value, activated: activated , sorting:0 });
      if (status === 200) {
        toast.success("success full");
        setTimeout(()=>{
            handleClose();
             window.location.reload();
        },1500)
      } else {
        toast.error("Error :" + status);
        handleClose();
      }
    } else {
      console.log(value);

      const updateData = {
        id: id,
        nameUz: value?.nameUz ? value.nameUz : data?.nameUz,
        nameRu: value?.nameRu ? value.nameRu : data?.nameRu,
        descriptionRu: value?.descriptionRu ? value.descriptionRu : data?.descriptionRu,
        descriptionUz: value?.descriptionUz ? value.descriptionUz : data?.descriptionUz,
        activated: activated,
        sorting: data?.sorting ? data?.sorting : 0
      };
      const status = await updateDataBrandType(updateData);
      if (status === 200) {
        toast.success("update success full");
        handleClose();
      } else {
        toast.error("Error :" + status);
        handleClose();
      }
    }
  };

  return (
    <div>
      {title == "post" ? (
        <button
          onClick={handleOpen}
          className="py-2 px-6 text-white font-semibold bg-[#008524] hover:bg-[#349a34] active:bg-[#008524] duration-200 rounded-lg"
        >
          To add
        </button>
      ) : (
        <Button
          color="inherit"
          onClick={handleOpen}
          sx={{
            color: "#767676", // HEX formatida rang
          }}
        >
          <EditIcon />
        </Button>
      )}
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
                {title == "post" ? "Add a brand type" : "Edit a brand type" }
              </h1>
              <Field
                as={TextField}
                label="Name uz"
                sx={{ "& input": { color: "#00000", fontSize: "20px" ,height:18} }}
                type="text"
                name="nameUz"
                className=" w-[100%]  mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                    name="nameUz"
                    component="div"
                    className=" text-red-500 text-center text-[15px] font-medium"
                  />
                }
              />
              <Field
                as={TextField}
                label="Name ru"
                sx={{ "& input": { color: "#00000", fontSize: "20px" ,height:18} }}
                type="text"
                name="nameRu"
                className=" w-[100%]  mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                    name="nameRu"
                    component="div"
                    className=" text-red-500 text-center text-[15px] font-medium"
                  />
                }
              />
              <Field
                as={TextField}
                label="Description uz"
                sx={{ "& input": { color: "#00000", fontSize: "20px" ,height:18} }}
                type="text"
                name="descriptionRu"
                className=" w-[100%]  mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                    name="descriptionRu"
                    component="div"
                    className=" text-red-500 text-center text-[15px] font-medium"
                  />
                }
              />
              <Field
                as={TextField}
                label="Description ru"
                sx={{ "& input": { color: "#00000", fontSize: "20px" ,height:18} }}
                type="text"
                name="descriptionUz"
                className=" w-[100%]  mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                    name="descriptionUz"
                    component="div"
                    className=" text-red-500 text-center text-[15px] font-medium"
                  />
                }
              />

              <Field
                as={RadioGroup}
                aria-label="activated"
                name="activated"
                className="flex items-center mb-3"
              >
                <div className=" text-[20px] w-full">Activated</div>
                <div className="flex items-center justify-between">
                  <FormControlLabel
                    value="False"
                    control={<Radio />}
                    label="False"
                  />
                  <FormControlLabel
                    value="True"
                    control={<Radio />}
                    label="True"
                  />
                </div>
              </Field>
              <ErrorMessage
                name="activated"
                component="div"
                className="mb-3 text-red-500 text-center"
              />

              <Button
                sx={{
                  fontSize: "16px",
                  fontWeight: "600",
                  backgroundColor: "#008524",
                  "&:hover": { background: "#008124" },
                }}
                variant="contained"
                type="submit"
                className="w-[100%] py-3"
              >
                {title == "post" ? "to add" : "to edit"}
              </Button>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
}
