import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Modal } from "antd";
import { toast } from "react-toastify";
import { ConfigProvider, Form, Input, Select } from "antd";

import { useCityStore, useRegionStore } from "@store";
const { Option } = Select;


interface propsData {
  title?: string;
  id?: number;
  data?: any;
}

const Index = ({ title, id, data }: propsData) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { postDataCity , updateDataCity } = useCityStore();
  const { getDataRegion , dataRegion } = useRegionStore();
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

  // useEffect to get country data
  useEffect(() => {
    getDataRegion({});
  }, []);


  // function to create or update region <------------------
  const handleSubmit = async (value: any) => {
    setLoader(true);
    let status;
    if (!id) {
      status = await postDataCity(value);
    } else {
      const updateData = { ...value, id: id };
      status = await updateDataCity(updateData);
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
            border: "none" ,
            boxShadow: "none",// HEX formatida rang
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
      style={{top: "25%" , left : "auto" , right : "auto" , bottom:"auto"} }
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
          onFinish={handleSubmit}
          initialValues={{'regionId': data?.regionId ? data?.regionId : undefined}}
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          layout="vertical"
        >
          <h1 className="text-center mb-2 text-[23px] font-semibold">
            {title == "post" ? "Add a city" : "Edit a city"}
          </h1>
          <div>
            <Form.Item
              label="Select a region"
              name="regionId"
              hasFeedback
              rules={[{ required: true, message: "Select country" }]}
            >
              <Select size="large" value={data?.regionId && data?.regionId}>
                {dataRegion.map((item: any) => (
                  <Option key={item.id} value={item.id}>
                    {item.nameUz}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="nameUz"
              hasFeedback
              label="City name uz"
              style={{ width: "100%" }}
              rules={[{ required: true }]}
              initialValue={data?.nameUz || ""}
            >
              <Input style={{ width: "100%" }} size="large" />
            </Form.Item>

            <Form.Item
              name="nameRu"
              label="City name ru"
              hasFeedback
              style={{ width: "100%" }}
              rules={[{ required: true }]}
              initialValue={data?.nameRu || ""}
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
      </Modal>
    </>
  );
};

export default Index;
