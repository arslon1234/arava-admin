import { useState } from "react";
import { Button, Modal, TimePicker } from "antd";
import { ConfigProvider, Form } from "antd";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useBranchWorkingDaysStore } from "@store";

const Index = () => {
  const { postBranchWorkingDays } = useBranchWorkingDaysStore();
  const { id } = useParams();
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

  // data wokind days ---------------------------
  const data = [
    {
      days: 1,
      activated: true,
      workingStartTime: "00:00",
      workingEndTime: "23:59",
      open: true,
    },
    {
      days: 2,
      activated: true,
      workingStartTime: "00:00",
      workingEndTime: "23:59",
      open: true,
    },
    {
      days: 3,
      activated: true,
      workingStartTime: "00:00",
      workingEndTime: "23:00",
      open: true,
    },
    {
      days: 4,
      activated: true,
      workingStartTime: "00:00",
      workingEndTime: "23:00",
      open: true,
    },
    {
      days: 5,
      activated: true,
      workingStartTime: "00:00",
      workingEndTime: "23:00",
      open: true,
    },
    {
      days: 6,
      activated: true,
      workingStartTime: "00:00",
      workingEndTime: "23:00",
      open: true,
    },
    {
      days: 7,
      activated: true,
      workingStartTime: "00:00",
      workingEndTime: "23:00",
      open: true,
    },
  ];

  //=-=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=--=-=-=-=-

  // function create brach workindg days <-----------------------------------
  const handelSubmit = async (values: any) => {
    setLoader(true);
    const { workingTimeRange } = values;
    const workingStartTime = workingTimeRange[0].format("HH:mm:ss");
    const workingEndTime = workingTimeRange[1].format("HH:mm:ss");
    

    const newData = data.map((el) => {
      return {
        ...el,
        workingStartTime: workingStartTime,
        workingEndTime: workingEndTime,
      };
    });

    console.log(newData);

    try {
      const status = await postBranchWorkingDays({ id: id, data: newData });
      if (status === 200) {
        setLoader(false);
        toast.success("created working days");
        setTimeout(() => {
          handleCancel();
          window.location.reload();
        }, 1200);
      }
    } catch (err: any) {
      setLoader(false);
      toast.error("Error : " + err?.message);
      handleCancel();
      console.log(err);
    }
  };

  //=-=-=-=-=-=-=-=-===-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  return (
    <>
      <button
        className="py-2 px-6 text-white font-semibold bg-[#008524] hover:bg-[#008124] active:bg-[#008524] duration-200 rounded-lg"
        onClick={showModal}
      >
        To add
      </button>
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
              add working hours 
            </h1> 
            {/* Working Start Time | Working End Time */}
            <Form.Item
              name="workingTimeRange"
              label="Working days start and end time"
              hasFeedback
              style={{ width: "100%" }}
              rules={[{ required: true }]}
            >
              <TimePicker.RangePicker style={{ width: "100%" }} size="large" />
            </Form.Item>
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
