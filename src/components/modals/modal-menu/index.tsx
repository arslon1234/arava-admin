import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Modal, Select } from "antd";
import { ConfigProvider, Form, Input } from "antd";
const { Option } = Select;

import { useBranchStore , useMenuStore } from "@store";
import { toast } from "react-toastify";
interface propsData {
  title?: string;
  id?: number;
  data?: any;
}

const Index = ({ title, data , id}: propsData) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const { getDataBranch, dataBranch } = useBranchStore();
  const { postDataMenu , updateDataMenu } = useMenuStore();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // function useEffect <-----------------

  useEffect(() => {
    getDataBranch({});
  }, []);

  //=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // function to create or update  country <---------------
  const handelSubmit = async (value: any) => {
    setLoader(true);
    let status;
    if (!id) {
      status = await postDataMenu(value);
    } else {
      const updateData = { ...value, id: id };
      status = await updateDataMenu(updateData);
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
            initialValues={{'branchId': data?.branchId ? data?.branchId : undefined}}
            layout="vertical"
          >
            <h1 className="text-center mb-2 text-[23px] font-semibold">
              {title == "post" ? "Add a menu" : "Edit a menu"}
            </h1>
            <div className="grid grid-cols-2 gap-x-3">

              {/* name  uz*/}
              <Form.Item
                name="nameUz"
                label="Name uz"
                hasFeedback
                style={{ width: "100%" }}
                rules={[{ required: true }]}
                initialValue={data?.name ? data.name : ""}
              >
                <Input style={{ width: "100%" }} size="large" />
              </Form.Item>

              {/* name ru */}
              <Form.Item
                name="nameRu"
                label="name ru"
                hasFeedback
                style={{ width: "100%" }}
                rules={[{ required: true }]}
                initialValue={data?.name ? data.name : ""}
              >
                <Input style={{ width: "100%" }} size="large" />
              </Form.Item>

              {/* description uz */}
              <Form.Item
                name="descriptionUz"
                label="Description uz"
                hasFeedback
                style={{ width: "100%" }}
                rules={[{ required: true }]}
                initialValue={data?.description ? data.description : ""}
              >
                <Input.TextArea style={{ width: "100%" }} size="small" />
              </Form.Item>

              {/* description ru */}
              <Form.Item
                name="descriptionRu"
                label="Description ru"
                hasFeedback
                style={{ width: "100%" }}
                rules={[{ required: true }]}
                initialValue={data?.description ? data.description : ""}
              >
                <Input.TextArea style={{ width: "100%" }} size="small" />
              </Form.Item>

              {/* branch name | id */}
              <Form.Item
                label="Select a branch"
                name="branchId"
                hasFeedback
                rules={[{ required: true, message: "Select branch" }]}
              >
                <Select
                  size="large"
                  value={data?.branchId && data?.branchId}
                  showSearch={true}
                >
                  {dataBranch.map((item: any) => (
                    <Option key={item?.id} value={item?.id}>
                      {item?.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            
              {/* form button */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  loading={loader}
                  style={{ width: "100%" }}
                  className="mt-[30px]"
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
