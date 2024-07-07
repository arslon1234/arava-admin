
import { useState } from "react";
import { Button, Modal, Switch } from "antd";
import { ConfigProvider, Form, Input } from "antd";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";

import { useBannerStore } from "@store";
import {ImageUploding} from "@modals"

interface propsData {
  title?: string;
  id?: number;
  data?: any;
}

const Index = ({ title, id, data }: propsData) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
const { postDataBanner, updateDataBanner, imageUrl, imageUrlUpdated } = useBannerStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // function to create or update  country <---------------
  const handelSubmit = async (value: any) => {
    setLoader(true);
    if (!id) {
      console.log(imageUrl);

      const status = await postDataBanner({
        ...value,
        imageUrl: imageUrl != "" && imageUrl,
      });
      if (status === 200) {
        toast.success("success full");
        setLoader(false);
        imageUrlUpdated("");
        handleCancel();
        window.location.reload();
      } else {
        toast.error("Error :" + status);
        setLoader(false);
        imageUrlUpdated("");
        handleCancel();
      }
    } else {
      console.log(value);

      const updateData = {
        id: id,
        bannerUrl: data?.bannerUrl ? data.bannerUrl : value?.bannerUrl,
        imageUrl: imageUrl ? imageUrl : data?.imageUrl,
        activated: value?.activated ? value?.activated : data?.activated,
      };
      const status = await updateDataBanner(updateData);
      if (status === 200) {
        toast.success("update success full");
        setLoader(false);
        handleCancel();
      } else {
        toast.error("Error :" + status);
        setLoader(false);
        handleCancel();
      }
    }
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  return (
    <>
      {title == "post" ? (
        <button
          onClick={showModal}
          className="py-2 px-6 text-white font-semibold bg-[#008524] hover:bg-[#008124] active:bg-[#008524] duration-200 rounded-lg"
        >
          To add
        </button>
      ) : (
        <Button
          color="inherit"
          onClick={showModal}
          style={{
            color: "#767676",
            border: "none",
            boxShadow: "none", // HEX formatida rang
          }}
        >
          <EditIcon />
        </Button>
      )}
      <Modal
        className="testModal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        width={400}
        style={{ top: "25%", left: "auto", right: "auto", bottom: "auto" }}
      >
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
              display: "flex",
              flexDirection: "column",
            }}
            layout="vertical"
          >
            <h1 className="text-center mb-2 text-[23px] font-semibold">
              {title == "post" ? "Add a banner" : "Edit a banner"}
            </h1>
            <div>
              {/*  Banner Url */}
              <Form.Item
                name="bannerUrl"
                label="Banner url"
                hasFeedback
                style={{ width: "100%" }}
                rules={[{ required: true }]}
                initialValue={data?.bannerUrl ? data.bannerUrl : ""}
              >
                <Input style={{ width: "100%" }} size="large" />
              </Form.Item>

              {/* Image uploud  */}
              <div className="">
                <ImageUploding />
              </div>
              {data?.imageUrl && (
                <div>
                  <img
                    src={baseUrl + data?.imageUrl}
                    alt="banner"
                    className="w-[100%] h-[150px] object-fill"
                  />
                </div>
              )}
            </div>
            <div className="flex items-end">
              {/* Activated  */}
              <Form.Item
                name="activated"
                label="Activated"
                hasFeedback
                style={{ width: "40%" }}
                rules={[{ required: true }]}
                initialValue={data?.activated ? data?.activated : false}
              >
                <Switch defaultChecked />
              </Form.Item>

              {/* Form button */}
              <Form.Item style={{ width: "60%" }}>
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
            </div>
          </Form>
        </ConfigProvider>
      </Modal>
    </>
  );
};

export default Index;
