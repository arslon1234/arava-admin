import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Button,
  ConfigProvider,
  Drawer,
  Form,
  Input,
  Select,
  Switch,
  TimePicker,
} from "antd";
const { Option } = Select;
import { ImageUploding } from "@modals";
import {
  useCountryStore,
  useRegionStore,
  useCityStore,
  useBrandTypeStore,
  useBrandStore,
  useBannerStore,
  useCuisinesStore,
  useBranchStore,
} from "@store";
import { GoogleMaps } from "../../ui";

interface CouriersProps {
  data?: any;
  id?: number;
  title?: string;
}

const Index = ({ data, title }: CouriersProps) => {
  const [open, setOpen] = useState(false);
  const { getDataCountry, dataCountry } = useCountryStore();
  const { getDataRegion, dataRegion } = useRegionStore();
  const { getDataCity, dataCity } = useCityStore();
  const { getDataBrandType, dataBrandType } = useBrandTypeStore();
  const { getDataBrand, dataBrand, location } = useBrandStore();
  const { getDataCuisines, dataCuisines } = useCuisinesStore();
  const { imageUrl , imageUrlUpdated } = useBannerStore();
  const {postDataBranch} = useBranchStore();

  const [timeStartEnd, setTimeStartEnd] = useState({
    start: data?.deliveryFrom ? data?.deliveryFrom : 0,
    end: data?.deliveryTo ? data?.deliveryTo : 0,
  });

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getDataCountry();
    getDataRegion();
    getDataCity();
    getDataBrandType();
    getDataBrand();
    getDataCuisines();
  }, []);

  const handleSubmit = async (values: any) => {
    const lat = location && location?.lat;
    const lng = location && location?.lng;

    const postBranch = {
      ...values,
      imageUrl: imageUrl != "" && imageUrl,
      gpsPointX: lat,
      gpsPointY: lng,
      deliveryFrom: timeStartEnd?.start,
      deliveryTo: timeStartEnd?.end,
      deliveryPrice: Number(values?.deliveryPrice),
    };
    console.log(postBranch);
    try{
      const respons = await postDataBranch(postBranch);
      if (respons === 200) {
        toast.success("Brand creste successfully");
        setTimeout(() => {
          onClose();
          imageUrlUpdated("");
          window.location.reload();
        }, 1000);
      }

    }catch(eror){
      onClose();
      toast.error("Brand creste failed")
      imageUrlUpdated("");
      console.log(eror)
    }
  };

  // slect brand type and cuisines list function <---------------
  const brandTypeOptions = dataBrandType.map((item: any) => ({
    value: item.id,
    label: item.nameUz || item.nameRu,
  }));

  const cuisinesOptions = dataCuisines.map((item: any) => ({
    value: item.id,
    label: item.nameUz || item.nameRu,
  }));
  //=-=-=-=-==-==-=-=-=-=-===-=-=-=-=-=-=--=-=-==-=-=-=-=-=-=-=-=-=-=-

  // test time to end ----------------
  const testTimeToEnd = (e: any) => {
    // console.log(e?.[0].$m);
    // console.log(e?.[1].$m);
    setTimeStartEnd({ start: e?.[0].$m, end: e?.[1].$m });
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
  return (
    <>
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
      <Drawer
        title={title == "post" ? "Branch created" : "Branch edited"}
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
              style={{
                width: 570,
                display: "flex",
                flexDirection: "column",
              }}
              layout="vertical"
            >
              <div className="grid grid-cols-2 gap-x-8 gap-y-[-50px]">
                {/* Brand name | id */}
                <Form.Item
                  label="Select a brand"
                  name="brandId"
                  hasFeedback
                  rules={[{ required: true, message: "Select brand" }]}
                >
                  <Select size="large" value={data?.brandId && data?.brandId}>
                    {dataBrand.map((item: any) => (
                      <Option key={item?.id} value={item?.id}>
                        {item?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Name */}
                <Form.Item
                  name="name"
                  label="Name"
                  hasFeedback
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={data?.name ? data.name : ""}
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

                {/* Short Name */}
                <Form.Item
                  name="shortName"
                  hasFeedback
                  label="Short Name"
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={data?.lastName ? data.lastName : ""}
                >
                  <Input style={{ width: "100%" }} size="large" />
                </Form.Item>

                {/* Region name | id */}
                <Form.Item
                  label="Select a region"
                  name="regionId"
                  hasFeedback
                  rules={[{ required: true, message: "Select region" }]}
                >
                  <Select size="large" value={data?.regionId && data?.regionId}>
                    {dataRegion.map((item: any) => (
                      <Option key={item?.id} value={item?.id}>
                        {item?.nameUz || item?.nameRu}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Address */}
                <Form.Item
                  hasFeedback
                  name="address"
                  label="Address"
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={data?.address ? data.address : ""}
                >
                  <Input style={{ width: "100%" }} size="large" />
                </Form.Item>

                {/* City name | id */}
                <Form.Item
                  label="Select a city"
                  name="cityId"
                  hasFeedback
                  rules={[{ required: true, message: "Select city" }]}
                >
                  <Select size="large" value={data?.cityId && data?.cityId}>
                    {dataCity.map((item: any) => (
                      <Option key={item?.id} value={item?.id}>
                        {item?.nameUz || item?.nameRu}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Phone */}
                <Form.Item
                  name="phone"
                  label="Phone"
                  hasFeedback
                  style={{ width: "100%" }}
                  initialValue={data?.phone ? data?.phone : "+998"}
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

                {/* Brand type list name | id */}
                <Form.Item
                  label="Select a brand type list"
                  name="brandTypeIdList"
                  hasFeedback
                  rules={[{ required: true, message: "Select brand type" }]}
                >
                  <Select
                    mode="tags"
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Select brand types"
                    options={brandTypeOptions}
                  />
                </Form.Item>

                {/* Delivery price */}
                <Form.Item
                  name="deliveryPrice"
                  label="Delivery price"
                  hasFeedback
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={data?.deliveryPrice ? data.deliveryPrice : ""}
                >
                  <Input type="number" style={{ width: "100%" }} size="large" />
                </Form.Item>

                {/* Cuisines list name | id */}
                <Form.Item
                  label="Select a cuisines list"
                  name="cuisinesIdList"
                  hasFeedback
                  rules={[{ required: true, message: "Select cuisines" }]}
                >
                  <Select
                    mode="tags"
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Select cuisines"
                    options={cuisinesOptions}
                  />
                </Form.Item>

                {/* Delivery from | Delivery to */}
                <Form.Item
                  name="deliveryFrom"
                  label="Delivery from and delivery to"
                  hasFeedback
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                >
                  <TimePicker.RangePicker
                    style={{ width: "100%" }}
                    size="large"
                    onChange={(e) => testTimeToEnd(e)}
                  />
                </Form.Item>

                {/*  description uz*/}
                <Form.Item
                  name="description"
                  label="Description"
                  hasFeedback
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={data?.description ? data.description : ""}
                >
                  <Input.TextArea style={{ width: "100%" }} size="small" />
                </Form.Item>

                {/* ImageUploading */}
                <div className="mt-[30px]">
                  <ImageUploding text="branch" />
                </div>

                {/* Activated */}
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
              <div className="my-2">
                <GoogleMaps />
              </div>
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large">
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
