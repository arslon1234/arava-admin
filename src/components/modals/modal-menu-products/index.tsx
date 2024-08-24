import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Modal, Select } from "antd";
import { ConfigProvider, Form } from "antd";

import { useMenuProductsStore, useProductsStore } from "@store";
import { toast } from "react-toastify";
import { getCookies } from "@cookie";

interface propsData {
  title?: string;
  menuSectionId?: number;
  data?: any;
}

const Index = ({ title }: propsData) => {
  const { sectionId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const { postDataMenuProducts } = useMenuProductsStore();
  const { getProductHelper, dataProductHelper } = useProductsStore();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    let branchId = getCookies("branchId");
    branchId && getProductHelper(branchId);
  }, []);

  // function to create or update country
  const handelSubmit = async (value: any) => {
    setLoader(true);

    const status = await postDataMenuProducts({
      ...value,
      menuSectionId: Number(sectionId),
    });

    if (status === 200) {
      toast.success("Addition successful");
      setLoader(false);
      setTimeout(() => {
        handleCancel();
        window.location.reload();
      }, 800);
    } else {
      toast.error("Error: " + status);
      setLoader(false);
      handleCancel();
    }
  };

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
            boxShadow: "none",
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
              {title == "post" ? "Add a menu products" : "Edit a menu products"}
            </h1>
            <div>
              {/* Product name | id */}
              <Form.Item
                label="Select a product"
                name="productId"
                hasFeedback
                rules={[{ required: true, message: "Select product" }]}
              >
                <Select
                  showSearch
                  placeholder="Search to Select"
                  optionFilterProp="label"
                  filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                  }
                  options={dataProductHelper.map((item: any) => ({
                    value: item.id,
                    label: item.name
                  }))}
                  size="large"
                />
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
