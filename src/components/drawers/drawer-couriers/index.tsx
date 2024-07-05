import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { Button, ConfigProvider, Form, Input, Radio, Switch } from "antd";
import EditIcon from "@mui/icons-material/Edit";

import { toast } from "react-toastify";
import { useCouriersStore } from "@store";

interface CouriersProps {
  data?: any;
  id?: number;
  title: string;
}

export default function TemporaryDrawer({ title, id, data }: CouriersProps) {
  const [open, setOpen] = useState(false);
  const { postDataCouriers , updateDataCouriers } = useCouriersStore();
  const [bootonLoding, setBootonLoding] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // function to create brand <---------------------------------------------------
  const handleSubmit = async (values: any) => {
    console.log(values);
    if (!id) {
      setBootonLoding(true);
      try {
        const respons = await postDataCouriers(values);
        if (respons === 200) {
          toast.success("Brand creste successfully");
          setTimeout(() => {
            toggleDrawer(false);
            window.location.reload();
          }, 1000);
        }
      } catch (err: any) {
        toast.error("Error : " + err?.message);
        console.log(err);
      } finally {
        setBootonLoding(false);
      }
    }else{
      setBootonLoding(true);
      try {
        const respons = await updateDataCouriers({...values , id:id});
        if (respons === 200) {
          toast.success("update success full"); 
          setTimeout(() => {
            toggleDrawer(false);
            window.location.reload();
          }, 1000);
        }
      } catch (err: any) {
        toast.error("Error : " + err?.message);
        console.log(err);
      } finally {
        setBootonLoding(false);
      }
    }
  };
  ///=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  const DrawerList = (
    <>
      <Box sx={{ width: 600 }} role="presentation">
        <div className="w-full h-full">
          <div className="pt-2 px-2 flex justify-start">
            <button
              onClick={toggleDrawer(false)}
              className="py-1 px-2 rounded-md hover:shadow-md duration-200"
            >
              <ClearIcon />
            </button>
          </div>
          <div> 
            <h1 className=" text-center text-[20px]">{title=="post" ? "Add a couriers" : "Edite a couriers"}</h1>
          </div>
          <div className="px-2 flex items-center justify-center">
            <div className="">
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
                  style={{
                    width: 570,
                    display: "flex",
                    flexDirection: "column",
                  }}
                  layout="vertical"
                >
                  <div className=" grid  grid-cols-2 gap-x-8 gap-y-[-50px]">
                    {/* Firs name */}
                    <Form.Item
                      name="firstName"
                      label="First name"
                      hasFeedback
                      style={{ width: "100%" }}
                      rules={[{ required: true }]}
                      initialValue={data?.firstName ? data.firstName : "" }
                    >
                      <Input style={{ width: "100%" }} size="large" />
                    </Form.Item>

                    {/* Last name */}
                    <Form.Item
                      name="lastName"
                      hasFeedback
                      label="Last name"
                      style={{ width: "100%" }}
                      rules={[{ required: true }]}
                      initialValue={data?.lastName ? data.lastName : ""}
                    >
                      <Input style={{ width: "100%" }} size="large" />
                    </Form.Item>

                    {/* Login */}
                    <Form.Item
                      hasFeedback
                      name="login"
                      label="Login"
                      style={{ width: "100%" }}
                      rules={[{ required: true }]}
                      initialValue={data?.login ? data.login : ""}
                    >
                      <Input style={{ width: "100%" }} size="large" />
                    </Form.Item>

                    {/* Password */}
                    <Form.Item
                      name="password"
                      label="Password"
                      hasFeedback
                      style={{ width: "100%" }}
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        {
                          min: 6,
                          message: "Please input at least 6 characters!",
                        },
                      ]}
                      initialValue={data?.password? data.password : ""}
                    >
                      <Input.Password style={{ width: "100%" }} size="large" />
                    </Form.Item>

                    {/* Address */}
                    <Form.Item
                      name="address"
                      label="Address"
                      hasFeedback
                      style={{ width: "100%" }}
                      rules={[{ required: true }]}
                      initialValue={data?.address? data.address : ""}
                    >
                      <Input style={{ width: "100%" }} size="large" />
                    </Form.Item>

                    {/* Birth date */}
                    <Form.Item
                      name="birthDate"
                      label="Birth date"
                      hasFeedback
                      style={{ width: "100%" }}
                      rules={[{ required: true }]}
                      initialValue={data?.birthDate? data.birthDate : ""}
                    >
                      <Input
                        type="date"
                        style={{ width: "100%" }}
                        size="large"
                      />
                    </Form.Item>

                    {/* Mobile Phone */}
                    <Form.Item
                      name="mobilePhone"
                      label="Mobile phone"
                      hasFeedback
                      style={{ width: "100%" }}
                      initialValue={data?.mobilePhone ? data?.mobilePhone : "+998"}
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone number!",
                        },
                        {
                          pattern: /^\+998\d{9}$/,
                          message: "The number is incorrect",
                        },
                      ]}
                    >
                      <Input
                        style={{ width: "100%" }}
                        size="large"
                        maxLength={13}
                      />
                    </Form.Item>

                    {/*Home Phone  */}
                    <Form.Item
                      name="homePhone"
                      label="Home phone"
                      hasFeedback
                      style={{ width: "100%" }}
                      rules={[
                        {
                          required: true,
                          message: "Please input your phone number!",
                        },
                        {
                          pattern: /^\+998\d{9}$/,
                          message: "The number is incorrect",
                        },
                      ]}
                      initialValue={data?.homePhone ? data?.homePhone : "+998"}
                    >
                      <Input
                        style={{ width: "100%" }}
                        size="large"
                        maxLength={13}
                      />
                    </Form.Item>

                    <div className="flex items-center">
                      {/* Gender  */}
                      <Form.Item
                        name="gender"
                        label="Gender"
                        hasFeedback
                        style={{ width: "60%" }}
                        rules={[{ required: true }]}
                        initialValue={data?.gender && data?.gender}
                      >
                        <Radio.Group>
                          <Radio value={0}>Male</Radio>
                          <Radio value={1}>Fmale</Radio>
                        </Radio.Group>
                      </Form.Item>

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
                    </div>

                    {/* Email */}
                    <Form.Item
                      name="email"
                      label="Email"
                      hasFeedback
                      style={{ width: "100%" }}
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                        {
                          type: "email",
                          message: "The input is not a valid email!",
                        },
                      ]}
                      initialValue={data?.email ? data.email : ""} 
                    >
                      <Input
                        style={{ width: "100%" }}
                        type="email"
                        size="large"
                      />
                    </Form.Item>
                  </div>

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      loading={bootonLoding}
                    >
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
              </ConfigProvider>
            </div>
          </div>
        </div>
      </Box>
    </>
  );

  return (
    <div>
      {
        title =="post"? (<button
        aria-label="add to favorites"
        onClick={toggleDrawer(true)}
        className="py-2 px-5 rounded-md bg-[#008524] text-white font-medium hover:bg-[#008100] duration-300 active:bg-[#008524]"
      >
        To add
      </button>) :
      (
        <Button
          color="inherit"
          onClick={toggleDrawer(true)}
          style={{
            color: "#767676",  
            border : "none",
            boxShadow: "none",
            
          }}
        >
          <EditIcon />
        </Button>
      )

      }

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
