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
import { useBannerStore } from "@store";
import UplodAntd from "../../modals/test-antd-uploding"

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

  const baseUrl = import.meta.env.VITE_BASE_URL
  const { postDataBanner, updateDataBanner , imageUrl , imageUrlUpdated } = useBannerStore();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// my code start <-----------------------------

  const validationSchema = Yup.object().shape({
    activated: Yup.string().required("Activeted is required"),
    bannerUrl: Yup.string().required("Banner URL is required"),
    // imageUrl: Yup.string().required("Name is required"),
  });

  const initialValues: any = {
    activated: data?.activated == true ? "True" : "False" || "",
    bannerUrl: data?.bannerUrl || "",
    // imageUrl: data?.imageUrl || image ,
  };

  const handelSubmit = async (value: any) => {
    const activated: boolean | any = value?.activated == "True" ? true : false;

    if (!id) {
      console.log(imageUrl);
      
      const status = await postDataBanner({ ...value, activated: activated , imageUrl: imageUrl != "" && imageUrl });
      if (status === 200) {
        toast.success("success full");
        handleClose();
        imageUrlUpdated("")
        // window.location.reload();
      } else {
        toast.error("Error :" + status);
        handleClose();
        imageUrlUpdated("")
      }
    } else {
      console.log(value);

      const updateData = {
        id: id,
        bannerUrl: value?.bannerUrl,
        imageUrl: data?.imageUrl,
        activated: activated,
      };
      const status = await updateDataBanner(updateData);
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
                {title == "post" ? "Add a banner" : "Edit a banner"}
              </h1>
              <Field
                as={TextField}
                label="Banner url"
                sx={{ "& input": { color: "#00000", fontSize: "20px" ,height:18} }}
                type="text"
                name="bannerUrl"
                className=" w-[100%]  mb-3 outline-none py-0"
                helperText={
                  <ErrorMessage
                    name="bannerUrl"
                    component="div"
                    className="mb-3 text-red-500 text-center text-[18px] font-medium"
                  />
                }
              />
              {/* <div className=" flex flex-col gap-3 items-center">
                <input
                  className="border border-[#C4C4C4] py-[10px] w-full px-2 rounded-[4px] "
                  type="file"
                  accept="image/*"
                  onChange={bannerUpload}
                />
              </div> */}
              <div className="">
              <UplodAntd/>
              </div>
              {
                data?.imageUrl && <div>
                <img
                  src={baseUrl+data?.imageUrl}
                  alt="banner"
                  className="w-[100%] h-[150px] object-fill"
                />
            </div>
              }
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
