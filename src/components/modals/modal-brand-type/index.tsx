import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Modal, Switch } from "antd";
import { toast } from "react-toastify";
import { ConfigProvider, Form, Input } from "antd";

import { useBrandTypeStore } from "@store";

interface propsData {
  title?: string;
  id?: number;
  data?: any;
}

const Index = ({ title, id, data }: propsData) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { postDataBrandType, updateDataBrandType } = useBrandTypeStore();
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

  // function to create or update brand type <------------
  const handelSubmit = async (value: any) => {
    setLoader(true);
    let status;
    if (!id) {
      status = await postDataBrandType({ ...value, sorting: 0 });
    } else {
      const updateData = {
        id: id,
        nameUz: value?.nameUz ? value.nameUz : data?.nameUz,
        nameRu: value?.nameRu ? value.nameRu : data?.nameRu,
        descriptionRu: value?.descriptionRu
          ? value.descriptionRu
          : data?.descriptionRu,
        descriptionUz: value?.descriptionUz
          ? value.descriptionUz
          : data?.descriptionUz,
        activated: value?.activated ? value?.activated : data?.activated,
        sorting: data?.sorting ? data?.sorting : 0,
      };
      status = await updateDataBrandType(updateData);
    }

    if (status === 200) {
      toast.success(id ? "Update successful" : "Addition successful");
      setLoader(false);
      setTimeout(() => {
        handleCancel();
        window.location.reload();
      }, 1000);
    } else {
      toast.error("Error: " + status);
      setLoader(false);
      handleCancel();
    }
  };
  //=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

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
              {title == "post" ? "Add a brand type" : "Edit a brand type"}
            </h1>

            {/*  name  uz*/}
            <Form.Item
              name="nameUz"
              label="Country name uz"
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
              label="Country name ru"
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
