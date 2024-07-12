import { useState } from "react";
import ManageHistoryIcon from '@mui/icons-material/ManageHistory';
import { Button, Modal, TimePicker } from "antd";
import { ConfigProvider, Form } from "antd";
import { toast  } from "react-toastify";
import {useBranchWorkingDaysStore} from "@store";
import dayjs from 'dayjs';

interface propsData {
  id?: number;
  data?: any;
}

const Index = ({ id, data }: propsData) => {

  const {updateBranchWorkingTime} = useBranchWorkingDaysStore(); 
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
  
  // function to create or update test <---------------
  const handelSubmit = async (values: any) => {
    setLoader(true);

    const { workingTimeRange } = values;
    const workingStartTime = workingTimeRange[0].format('HH:mm:ss');
    const workingEndTime = workingTimeRange[1].format('HH:mm:ss');
    
    const payload = {
      id,
      workingStartTime,
      workingEndTime
    };

    try{
      const status = await updateBranchWorkingTime(payload);
      if(status === 200){
        toast.success('success full');
        setTimeout(()=>{
          handleCancel();
        }, 1000)
      }
      setLoader(false);

    }catch(err:any){
      toast.error('Error :'+ err.message);
      console.log(err);
      setLoader(false);
      handleCancel();
    };

  };

  const workingStartTime = data ? dayjs(data.workingStartTime, 'HH:mm:ss') : null;
  const workingEndTime = data ? dayjs(data.workingEndTime, 'HH:mm:ss') : null;

  return (
    <>
      <Button
        color="inherit"
        onClick={showModal}
        style={{
          color: "#767676",
          border: "none",
          boxShadow: "none", // HEX formatida rang
        }}
      >
        <ManageHistoryIcon />
      </Button>
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
            initialValues={{
              workingTimeRange: [workingStartTime, workingEndTime]
            }}
          >
            <h1 className="text-center mb-2 text-[23px] font-semibold">
              Edit time
            </h1>
            <div>
              {/* Working Start Time | Working End Time */}
              <Form.Item
                name="workingTimeRange"
                label="Working start and end time"
                hasFeedback
                style={{ width: "100%" }}
                rules={[{ required: true }]}
              >
                <TimePicker.RangePicker
                  style={{ width: "100%" }}
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
