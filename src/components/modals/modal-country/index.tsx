import { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";

import { useCountryStore } from "@store";
import { ConfigProvider, Form, Input , Button } from "antd";

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
  const { postDataCountry, updateDataCountry } = useCountryStore();

  const [open, setOpen] = useState(false);
  const [loader , setLoader] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  /// my code start <-----------------------------

  const handelSubmit = async (value: any) => {
    if (!id) {
      console.log(value);
      setLoader(true)
      const status = await postDataCountry(value);
      if (status === 200) {
        toast.success("success full");
        setLoader(false)
        setTimeout(() => {
          handleClose();
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Error :" + status);
        setLoader(false)
        handleClose();
      }
    } else {
      console.log(value);

      const updateData = {
        id: id,
        nameUz: value?.nameUz,
        nameRu: value?.nameRu,
      };
      const status = await updateDataCountry(updateData);
      if (status === 200) {
        toast.success("update success full");
        setTimeout(() => {
          handleClose();
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Error :" + status);
        handleClose();
      }
    }
  };

  // my code end <--------------------------------

  return (
    <div>
      {title == "post" ? (
        <button
          onClick={handleOpen}
          className="py-2 px-6 text-white font-semibold bg-[#008524] hover:bg-[#008124] active:bg-[#008524] duration-200 rounded-lg"
        >
          To add
        </button>
      ) : (
        <Button
          color="inherit"
          onClick={handleOpen}
          style={{
            color: "#767676",
            border: "none" ,
            boxShadow: "none",// HEX formatida rang
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
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#008524",
              },
              components: {
                Input: {
                  activeBorderColor: "#008524",
                  activeShadow: "#008524",
                  hoverBorderColor: "#008524",
                },
              },
            }}
          >
            <Form
              name="nest-messages"
              onFinish={handelSubmit}
              style={{
                width: 330,
                display: "flex",
                flexDirection: "column",
              }}
              layout="vertical"
            >
              <h1 className="text-center mb-2 text-[23px] font-semibold">
                {title == "post" ? "Add a country" : "Edit a country"}
              </h1>
              <div>
                {/*  name  uz*/}
                <Form.Item
                  name="nameUz"
                  label="Country name uz"
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={data?.nameUz ? data.nameUz : ""}
                >
                  <Input style={{ width: "100%" }} size="large" />
                </Form.Item>

                {/*  name ru */}
                <Form.Item
                  name="nameRu"
                  label="Country name ru"
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={data?.nameRu ? data.nameRu : ""}
                >
                  <Input style={{ width: "100%" }} size="large" />
                </Form.Item>
              </div>
              <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={loader}
                      style={{ width: "100%" }}
                    >
                      Submit
                    </Button>
                  </Form.Item>
            </Form>
          </ConfigProvider>
        </Box>
      </Modal>
    </div>
  );
}
