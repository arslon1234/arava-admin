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
} from "antd";
const { Option } = Select;
import { ImageUploding } from "@modals";
import {
  useCompanyStore,
  useCountryStore,
  useRegionStore,
  useCityStore,
  useBrandTypeStore,
  useBrandStore,
  useBannerStore,
} from "@store";
import { GoogleMaps } from "../../ui";

interface CouriersProps {
  data?: any;
  id?: number;
  title?: string;
}

const Index = ({ data }: CouriersProps) => {
  const [open, setOpen] = useState(false);
  const [countryId, setCountryId] = useState(0);
  const [regionId, setRegionId] = useState(0);
  const { getDataCompany, dataCompany } = useCompanyStore();
  const { getDataCountry, dataCountry } = useCountryStore();
  const { getDataRegionHelper, dataRegionHelper } = useRegionStore();
  const { getDataCityHelper, dataCityHelper } = useCityStore();
  const { getDataBrandType, dataBrandType } = useBrandTypeStore();
  const { postDataBrand, location } = useBrandStore();
  const { imageUrl, imageUrlUpdated } = useBannerStore();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getDataCompany({});
    getDataCountry({});
    getDataBrandType({});
  }, []);

  // get region in country id =-=-=-=-==-=-=-=-=-==-=-
  useEffect(() => {
    if (countryId) {
      getDataRegionHelper(countryId);
    }
  }, [countryId]);
  // get city in region id =-=-=-=-==-=-=-=-=-==-=-
  useEffect(() => {
    if (regionId) {
      getDataCityHelper(regionId);
    }
  }, [regionId]);

  const handleSubmit = async (values: any) => {
    console.log("Received values of form: ", values);
    const lat = location && location?.lat.toString();
    const lng = location && location?.lng.toString();

    const postBrand = {
      ...values,
      imageUrl: imageUrl != "" && imageUrl,
      gpsPointX: lat,
      gpsPointY: lng,
    };

    try {
      const respons = await postDataBrand(postBrand);
      if (respons === 200) {
        toast.success("Brand creste successfully");
        setTimeout(() => {
          onClose();
          imageUrlUpdated("");
          window.location.reload();
        }, 1000);
      }
    } catch (err: any) {
      toast.error("Error : " + err?.message);
      console.log(err);
    }
    // setOpen(false);
  };

  // slect brand type list function <---------------
  const brandTypeOptions = dataBrandType.map((item: any) => ({
    value: item.id,
    label: item.nameUz || item.nameRu,
  }));
  //=-=-=-=-==-==-=-=-=-=-===-=-=-=-=-=-=--=-=-==-=-=-=-=-=-=-=-=-=-=-

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
      <Drawer title="Brand create" onClose={onClose} open={open} width={620}>
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
                {/* Company name | id */}
                <Form.Item
                  label="Select a company"
                  name="companyId"
                  hasFeedback
                  rules={[{ required: true, message: "Select company" }]}
                >
                  <Select
                    size="large"
                    value={data?.companyId && data?.companyId}
                  >
                    {dataCompany.map((item: any) => (
                      <Option key={item?.id} value={item?.id}>
                        {item?.companyName}
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
                  initialValue={data?.firstName ? data.firstName : ""}
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
                    onChange={(value:number) => {
                      setCountryId(value);
                    }}
                  >
                    {dataCountry && dataCountry.map((item: any) => (
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
                  <Select size="large" disabled={!countryId} value={data?.regionId && data?.regionId} onChange={(value:number)=>{setRegionId(value)}}>
                    {dataRegionHelper && dataRegionHelper.map((item: any) => (
                      <Option key={item?.id} value={item?.id}>
                        {item?.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* Main Office Address */}
                <Form.Item
                  hasFeedback
                  name="mainOfficeAddress"
                  label="Main Office Address"
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={
                    data?.mainOfficeAddress ? data.mainOfficeAddress : ""
                  }
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
                  <Select size="large" value={data?.cityId && data?.cityId} disabled={!regionId}>
                    {dataCityHelper && dataCityHelper.map((item: any) => (
                      <Option key={item?.id} value={item?.id}>
                        {item?.name}
                      </Option>
                    ))}
                  </Select>
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

                {/* ImageUploading */}
                <div className="mt-3">
                  <ImageUploding text="brand" />
                </div>
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
