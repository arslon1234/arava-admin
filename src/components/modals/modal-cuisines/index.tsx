import { useState } from "react";
import { Button, Modal } from "antd";
import { ConfigProvider, Form, Input } from "antd";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";

import { useBannerStore, useCuisinesStore } from "@store";
import { ImageUploding } from "@modals";

interface propsData {
  title?: string;
  id?: number;
  data?: any;
}

const Index = ({ title, id, data }: propsData) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const { imageUrl, imageUrlUpdated } = useBannerStore();
  const { postDataCuisines, updateDataCuisines } = useCuisinesStore();
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

      const status = await postDataCuisines({
        ...value,
        imageUrl: imageUrl && imageUrl,
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
        ...value,
        id: id,
        imageUrl: imageUrl ? imageUrl : data?.imageUrl,
      };
      const status = await updateDataCuisines(updateData);
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
        width={600}
        style={{ top: "5%", left: "auto", right: "auto", bottom: "auto" }}
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
              {title == "post" ? "Add a cuisines" : "Edit a cuisines"}
            </h1>
            <div className="grid grid-cols-2 gap-x-4">
              {/*  name  uz*/}
              <Form.Item
                name="nameUz"
                label="Name uz"
                hasFeedback
                style={{ width: "100%" }}
                rules={[{ required: true }]}
                initialValue={data?.nameUz ? data.nameUz : ""}
              >
                <Input style={{ width: "100%" }} size="large" />
              </Form.Item>

              {/*  name ru */}
              <Form.Item
                name="nameRu"
                label="Name ru"
                hasFeedback
                style={{ width: "100%" }}
                rules={[{ required: true }]}
                initialValue={data?.nameRu ? data.nameRu : ""}
              >
                <Input style={{ width: "100%" }} size="large" />
              </Form.Item>

              {/*  description uz*/}
              <Form.Item
                name="descriptionUz"
                label="Description uz"
                hasFeedback
                style={{ width: "100%" }}
                rules={[{ required: true }]}
                initialValue={data?.descriptionUz ? data.descriptionUz : ""}
              >
                <Input.TextArea style={{ width: "100%" }} size="small" />
              </Form.Item>

              {/*  description ru */}
              <Form.Item
                name="descriptionRu"
                label="Description ru"
                hasFeedback
                style={{ width: "100%" }}
                rules={[{ required: true }]}
                initialValue={data?.descriptionRu ? data.descriptionRu : ""}
              >
                <Input.TextArea style={{ width: "100%" }} size="small" />
              </Form.Item>

              {/*  sorting */}
              <Form.Item
                name="sorting"
                label="Sorting "
                hasFeedback
                style={{ width: "100%" }}
                rules={[{ required: true }]}
                initialValue={data?.sorting ? data.sorting : ""}
              >
                <Input style={{ width: "100%" }} size="large" type="number" />
              </Form.Item>

              {/* Image uploud  */}
              <div className="mt-8">
                <ImageUploding text="cuisines" />
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

              {/* Form button */}
              <Form.Item style={{ width: "100%", marginTop: 10 }}>
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
