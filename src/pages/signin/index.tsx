import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { setCookies } from "@cookie";
import { auth } from "@service-auth";
import ImageAuth from "../../assets/SPRK_default_preset_name_custom – 2.png";
import "./style.scss";
import { Button, ConfigProvider, Form, Input } from "antd";

function Index() {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  // Function to handle form submission
  const signIn = async (values: any) => {
    setLoader(true);
    console.log(values);
    
    try {
      const res = await auth.signin(values);
      if (res?.status == 200) {
        setCookies("access_token", res?.data?.access_token);
        setCookies("refresh_token", res?.data?.refresh_token);
        toast.success("Sign in success");
        setLoader(false);
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }
    } catch (err: any) {
      toast.error(err?.message);
      setLoader(false);
      console.log(err);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="auth">
        <div className="auth__image">
          <img src={ImageAuth} alt="imge" />
        </div>
        <div className="auth__right">
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
                className=" min-w-[320px] sm:min-w-[400px] w-full flex flex-col gap-[15px]"
                onFinish={signIn}
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                layout="vertical"
              >
                <h1 className=" text-[20px] sm:text-[32px] text-center text-[#008524] font-medium">
                  Sign In
                </h1>
                <div>
                  {/*  username */}
                  <Form.Item
                    name="username"
                    label="Username"
                    hasFeedback
                    style={{ width: "100%" }}
                    rules={[{ required: true }]}
                  >
                    <Input style={{ width: "100%" , height:"50px" }} size="large" />
                  </Form.Item>

                  {/*  password */}
                  <Form.Item
                    name="password"
                    label="Password"
                    hasFeedback
                    style={{ width: "100%"  }}
                    rules={[{ required: true }]}
                  >
                    <Input.Password style={{ width: "100%" , height:"50px" }} size="large" />
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
