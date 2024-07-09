import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  ConfigProvider,
  Drawer,
  Form,
  Input,
  Radio,
  Select,
  Switch,
} from "antd";
import { useCountryStore, useCompanyStore } from "@store";
const { Option } = Select;

interface CouriersProps {
  data?: any;
  id?: number;
  title?: string;
}

const Index = ({ data, id, title }: CouriersProps) => {
  const [open, setOpen] = useState(false);
  const { getDataCountry, dataCountry } = useCountryStore();
  const { postDataCompany, updateDataCompany } = useCompanyStore();
  const [bootonLoding, setBootonLoding] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getDataCountry();
  }, []);

  // function to create company <---------------------------------------------------
  const handleSubmit = async (values: any) => {
    if (!id) {
      setBootonLoding(true);
      try {
        const respons = await postDataCompany(values);
        if (respons === 200) {
          toast.success("Company creste successfully");
          setTimeout(() => {
            onClose();
            window.location.reload();
          }, 1000);
        }
      } catch (err: any) {
        toast.error("Error : " + err?.message);
        console.log(err);
      } finally {
        setBootonLoding(false);
      }
    } else {
      setBootonLoding(true);
      try {
        const respons = await updateDataCompany({ ...values, id: id });
        if (respons === 200) {
          toast.success("update success full");
          setTimeout(() => {
            onClose();
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

  return (
    <>
      {title == "post" ? (
        <Button
          type="primary"
          onClick={showDrawer}
          style={{
            backgroundColor: "#008524",
            fontWeight: 600,
            padding: "18px 20px",
          }}
        >
          To add
        </Button>
      ) : (
        <Button
          color="inherit"
          onClick={showDrawer}
          style={{
            color: "#767676",
            border: "none",
            boxShadow: "none", // HEX formatida rang
          }}
        >
          <EditIcon />
        </Button>
      )}

      <Drawer
        title={title == "post" ? "Company create " : "Company edit" } 
        onClose={onClose}
        open={open}
        width={620}
      >
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
              initialValues={{
                countryId: data?.countryId ? data?.countryId : undefined,
              }}
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
                  initialValue={data?.firstName ? data.firstName : ""}
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
                  initialValue={data?.password ? data.password : ""}
                >
                  <Input.Password style={{ width: "100%" }} size="large" />
                </Form.Item>

                {/* Patronymic Name */}
                <Form.Item
                  name="patronymicName"
                  label="Patronymic name"
                  hasFeedback
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={data?.patronymicName ? data.patronymicName : ""}
                >
                  <Input style={{ width: "100%" }} size="large" />
                </Form.Item>

                {/* Birth date */}
                <Form.Item
                  name="birthday"
                  label="Birth date"
                  hasFeedback
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={data?.birthday ? data.birthday : ""}
                >
                  <Input type="date" style={{ width: "100%" }} size="large" />
                </Form.Item>

                {/* Company name */}
                <Form.Item
                  name="companyName"
                  label="Company ame"
                  hasFeedback
                  style={{ width: "100%" }}
                  initialValue={data?.companyName ? data?.companyName : ""}
                  rules={[{ required: true }]}
                >
                  <Input style={{ width: "100%" }} size="large" />
                </Form.Item>

                {/* Country name | id */}
                <Form.Item
                  label="Select a country"
                  name="countryId"
                  hasFeedback
                  rules={[{ required: true, message: "Select country" }]}
                >
                  <Select
                    size="large"
                    value={data?.countryId && data?.countryId}
                  >
                    {dataCountry.map((item: any) => (
                      <Option key={item?.id} value={item?.id}>
                        {item?.nameUz || item?.nameRu}
                      </Option>
                    ))}
                  </Select>
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
                  <Input style={{ width: "100%" }} type="email" size="large" />
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
      </Drawer>
    </>
  );
};

export default Index;
