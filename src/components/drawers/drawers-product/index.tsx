import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  ConfigProvider,
  Drawer,
  Form,
  Input,
  Select,
  Switch,
} from "antd";
import {
  useBrandStore,
  useCuisinesStore,
  useMenuCategoriesStore,
  useProductsStore,
  useBranchStore,
} from "@store";
import { ImageUploding } from "@modals";
import { toast } from "react-toastify";
const { Option } = Select;

interface CouriersProps {
  data?: any;
  id?: number;
  title?: string;
}

const Index = ({ data, title, id }: CouriersProps) => {
  const [open, setOpen] = useState(false);
  const [bootonLoding, setBootonLoding] = useState(false);
  const { getDataBrand, dataBrand } = useBrandStore();
  const { getDataCuisines, dataCuisines } = useCuisinesStore();
  const { getDataBranch, dataBranch } = useBranchStore();
  const { getDataMenuCategories, dataMenuCategories } =
    useMenuCategoriesStore();
  const { imgeList, clearImgeList, postDataProducts, updateDataProducts } =
    useProductsStore();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // function useEffects <--------------
  useEffect(() => {
    getDataMenuCategories({});
    getDataBrand({});
    getDataCuisines({});
    getDataBranch({});
  }, []);
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // function to create and updet products <---------------------------------------------------
  const handleSubmit = async (values: any) => {
    const array2 = values?.branchPrice
      ?.split(",")
      .map((item: string) => Number(item.trim()));
    let newProduct = {
      ...values,
      galleryList: imgeList.length && imgeList,
      imageUrl: imgeList[0] && imgeList[0],
      productBranchList: values?.branchList?.map((el: number, i: number) => {
        return {
          branchId: el,
          price: array2[i],
        };
      }),
    };
    delete newProduct.branchList;
    delete newProduct.branchPrice;

    // console.log(newProduct);

    if (!id) {
      setBootonLoding(true);
      try {
        const respons = await postDataProducts(newProduct);
        if (respons === 200) {
          toast.success("Product creste successfully");

          setTimeout(() => {
            setOpen(false);
            clearImgeList();
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
        const respons = await updateDataProducts({ ...newProduct, id: id });
        if (respons === 200) {
          toast.success("update success full");
          setTimeout(() => {
            setOpen(false);
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

  // slect cuisines list and branch list function <---------------
  const cuisinesOptions = dataCuisines.map((item: any) => ({
    value: item.id,
    label: item.nameUz || item.nameRu,
  }));
  const branchOptions = dataBranch.map((item: any) => ({
    value: item.id,
    label: item.name,
  }));
  //=-=-=-=-==-==-=-=-=-=-===-=-=-=-=-=-=--=-=-==-=-=-=-=-=-=-=-=-=-=-

  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
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
            boxShadow: "none",
          }}
        >
          <EditIcon />
        </Button>
      )}
      <Drawer
        title={title == "post" ? "Product created" : "Product edited"}
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
              <div className=" grid  grid-cols-2 gap-x-8 gap-y-[-50px]">
                {/* name uz */}
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

                {/* name ru */}
                <Form.Item
                  name="nameRu"
                  hasFeedback
                  label="Name ru"
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={data?.nameRu ? data.nameRu : ""}
                >
                  <Input style={{ width: "100%" }} size="large" />
                </Form.Item>

                {/* short name uz */}
                <Form.Item
                  name="shortNameUz"
                  label="Short name uz"
                  hasFeedback
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={data?.shortNameUz ? data.shortNameUz : ""}
                >
                  <Input style={{ width: "100%" }} size="large" />
                </Form.Item>

                {/* short name ru */}
                <Form.Item
                  name="shortNameRu"
                  hasFeedback
                  label="Short name ru"
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={data?.shortNameRu ? data.shortNameRu : ""}
                >
                  <Input style={{ width: "100%" }} size="large" />
                </Form.Item>

                {/* ingredients uz */}
                <Form.Item
                  name="ingredientsUz"
                  label="Ingredients uz"
                  hasFeedback
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={data?.ingredientsUz ? data.ingredientsUz : ""}
                >
                  <Input style={{ width: "100%" }} size="large" />
                </Form.Item>

                {/* ingredients ru */}
                <Form.Item
                  name="ingredientsRu"
                  hasFeedback
                  label="Ingredients Ru"
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={data?.ingredientsRu ? data.ingredientsRu : ""}
                >
                  <Input style={{ width: "100%" }} size="large" />
                </Form.Item>

                {/*  description uz*/}
                <Form.Item
                  name="descriptionUz"
                  label="Description uz"
                  hasFeedback
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={data?.descriptionUz ? data.descriptionUz : ""}
                >
                  <Input.TextArea style={{ width: "100%" }} size="small" />
                </Form.Item>

                {/*  description ru */}
                <Form.Item
                  name="descriptionRu"
                  label="Description ru"
                  hasFeedback
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  initialValue={data?.descriptionRu ? data.descriptionRu : ""}
                >
                  <Input.TextArea style={{ width: "100%" }} size="small" />
                </Form.Item>

                {/* brand name | id */}
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

                {/* categories name | id */}
                <Form.Item
                  label="Select a categories"
                  name="categoriesId"
                  hasFeedback
                  rules={[{ required: true, message: "Select categories" }]}
                >
                  <Select
                    size="large"
                    value={data?.countryId && data?.countryId}
                  >
                    {dataMenuCategories.map((item: any) => (
                      <Option key={item?.id} value={item?.id}>
                        {item?.nameUz || item?.nameRu}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>

                {/* branch list name | id */}
                <Form.Item
                  label="Select a baranch list"
                  name="branchList"
                  hasFeedback
                  rules={[{ required: true, message: "Select branch" }]}
                >
                  <Select
                    mode="tags"
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Select baranch list"
                    options={branchOptions}
                  />
                </Form.Item>

                {/* branch price */}
                <Form.Item
                  name="branchPrice"
                  label="Branch price"
                  hasFeedback
                  style={{ width: "100%" }}
                  rules={[{ required: true }]}
                  // initialValue={data?.ingredientsUz ? data.ingredientsUz : ""}
                >
                  <Input style={{ width: "100%" }} size="large" />
                </Form.Item>

                {/* cuisines list name | id */}
                <Form.Item
                  label="Select a cuisines list"
                  name="cuisinesList"
                  hasFeedback
                  rules={[{ required: true, message: "Select cuisines" }]}
                >
                  <Select
                    mode="tags"
                    size="large"
                    style={{ width: "100%" }}
                    placeholder="Select cuisines list"
                    options={cuisinesOptions}
                  />
                </Form.Item>

                {/* Imge uploding */}
                <ImageUploding text="product" />

                {/* in stock  */}
                <div className="flex items-end justify-between">
                  <Form.Item
                    name="inStock"
                    label="In stock"
                    hasFeedback
                    style={{ width: "40%" }}
                    rules={[{ required: true }]}
                    initialValue={data?.inStock ? data?.inStock : false}
                  >
                    <Switch defaultChecked />
                  </Form.Item>

                  {/* form button  */}
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
                </div>
              </div>
            </Form>
          </ConfigProvider>
        </div>
      </Drawer>
    </>
  );
};

export default Index;
