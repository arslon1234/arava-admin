import { useState } from "react";
import { useParams } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Button, Modal } from "antd";
import { ConfigProvider, Form, Input } from "antd";

import { useMenuSectionStore } from "@store";
import { toast } from "react-toastify";


interface propsData {
  title?: string;
  menuSectionId?: number;
  data?: any;
}

const Index = ({ title, data , menuSectionId }: propsData) => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const { postDataMenuSection, updateDataMenuSection } = useMenuSectionStore();

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
    let status;
    if (!menuSectionId) {
        status = await postDataMenuSection({menuId:id , data: {...value}},);
    } else {
        status = await updateDataMenuSection({id:menuSectionId, ...value});
    }

    if (status === 200) {
      toast.success(id ? "Update successful" : "Addition successful");
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
              onFinish={handelSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
              }}
              layout="vertical"
            >
              <h1 className="text-center mb-2 text-[23px] font-semibold">
                {title == "post" ? "Add a menu section" : "Edit a menu section"}
              </h1>
              <div>
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

                {/*   name ru */}
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

