import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import { toast } from "react-toastify";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
// import MenuItem from '@mui/material/MenuItem';
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { ImageUploding } from "@modals";
import {
  useCountryStore,
  useCompanyStore,
  useCityStore,
  useBrandTypeStore,
  useRegionStore,
  useBannerStore,
  useBrandStore,
} from "@store";
import { GoogleMaps } from "@ui";
import {BrandSchema} from "@validations";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


export default function TemporaryDrawer({ data }: any) {
  const [open, setOpen] = useState(false);
  const { getDataCountry, dataCountry } = useCountryStore();
  const { getDataCompany, dataCompany } = useCompanyStore();
  const { getDataCity, dataCity } = useCityStore();
  const { getDataBrandType, dataBrandType } = useBrandTypeStore();
  const { getDataRegion, dataRegion } = useRegionStore();
  const { imageUrl } = useBannerStore();
  const { postDataBrand , location } = useBrandStore();

  // useEfect function ---------------------------
  useEffect(() => {
    getDataCountry();
    getDataCompany();
    getDataCity();
    getDataBrandType();
    getDataRegion();
  }, []);

  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  // brand tepe select functio --------------------------
  const theme = useTheme();
  const [personName, setPersonName] = useState<number[]>([]);
  const [selectedNames] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    const selectedIds =
      typeof value === "string" ? value.split(",").map(Number) : value;
    setPersonName(selectedIds);

    dataBrandType
      .filter((el) => selectedIds.includes(el?.id))
      .map((el) => el?.nameUz);

    setSelectedIds(selectedIds);
  };
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const initialValues = {
    companyId: data?.companyId || "",
    name: data?.name || "",
    mainOfficeAddress: data?.mainOfficeAddress || "",
    countryId: data?.countryId || "",
    regionId: data?.regionId || "",
    cityId: data?.cityId || "",
    activated: data?.activated == true ? "True" : "False" || "",
  };


  // Function Brand create ---------------------------------------------------
  const handleSubmit = async (values: any) => {
    console.log(values);
    const lat = location && location?.lat.toString()
    const lng = location &&  location?.lng.toString()
    
    const postBrand = {
      ...values,
      activated: values.activated == "True" ? true : false,
      brandTypeIdList: selectedIds,
      imageUrl: imageUrl != "" && imageUrl,
      gpsPointX: lat,
      gpsPointY: lng,
      
    };

    try {
        const respons = await postDataBrand(postBrand)
        if(respons === 200){
            
            toast.success("Brand creste successfully")
            setTimeout(()=>{
              toggleDrawer(false)
              window.location.reload();
            },1000)
        }
    } catch (err:any) {
      toast.error("Error : " + err?.message)
      console.log(err);
    }
  };
  ///=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

  const DrawerList = (
    <>
      <Box sx={{ width: 700 }} role="presentation">
        <div className="w-full h-full">
          <div className="py-2 px-2 flex justify-start">
            <button
              onClick={toggleDrawer(false)}
              className="py-1 px-2 rounded-md hover:shadow-md duration-200"
            >
              <ClearIcon />
            </button>
          </div>
          <div className="px-3 pb-4">
            <Formik
              initialValues={initialValues}
              validationSchema={BrandSchema}
              onSubmit={handleSubmit}
            >
              <Form className="w-full flex flex-col gap-[8px]">
                <h2 className="text-center text-[#008524] text-[22px] pb-4 font-semibold">
                  Add a brand
                </h2>
                
                  <div className="flex items-start gap-3 ">
                    <div className="w-[350px] flex flex-col gap-2">
                        {/* Nmae */}
                      <Field
                        as={TextField}
                        label="Nmae"
                        sx={{
                          "& input": {
                            color: "#00000",
                            fontSize: "18px",
                            height: 23,
                          },
                        }}
                        type="text"
                        name="name"
                        className="w-[100%] mb-3 outline-none py-0"
                        helperText={
                          <ErrorMessage
                            name="name"
                            component="div"
                            className=" text-[red] text-[15px]"
                          />
                        }
                      />

                      {/* Short Name */}
                      <Field
                        as={TextField}
                        label="Short name"
                        sx={{
                          "& input": {
                            color: "#00000",
                            fontSize: "18px",
                            height: 23,
                          },
                        }}
                        type="text"
                        name="shortName"
                        className="w-[100%] mb-3 outline-none py-0"
                        helperText={
                          <ErrorMessage
                            name="shortName"
                            component="div"
                            className="text-[red] text-[15px]"
                          />
                        }
                      />

                      {/* Main Office Address */}
                      <Field
                        as={TextField}
                        label="Main office address"
                        sx={{
                          "& input": {
                            color: "#00000",
                            fontSize: "18px",
                            height: 23,
                          },
                        }}
                        type="text"
                        name="mainOfficeAddress"
                        className="w-[100%] mb-3 outline-none py-0 "
                        helperText={
                          <ErrorMessage
                            name="mainOfficeAddress"
                            component="span"
                            className=" text-[red] text-[15px]"
                          />
                        }
                      />

                      {/* Imge Uploding Component */}
                      <ImageUploding text="brand" />

                      {/* Activtet -> true || false */}
                      <Field
                        as={RadioGroup}
                        aria-label="activated"
                        name="activated"
                        className="flex items-center mb-3"
                      >
                        <div className=" text-[20px] w-full">Activated</div>
                        <div className="flex items-center justify-between">
                          <FormControlLabel
                            value="False"
                            control={<Radio />}
                            label="False"
                          />
                          <FormControlLabel
                            value="True"
                            control={<Radio />}
                            label="True"
                          />
                        </div>
                      </Field>
                      <ErrorMessage
                        name="activated"
                        component="div"
                        className="mb-3 text-red-500 text-center"
                      />
                    </div>
                    <div className="w-[350px] flex flex-col gap-2">
                      {/* Company data select */}
                      <Field
                        name="companyId"
                        type="text"
                        as={TextField}
                        label="Company name"
                        select
                        className="relative"
                        margin="none"
                        variant="outlined"
                        fullWidth
                        helperText={
                          <ErrorMessage
                            name="companyId"
                            component="div"
                            className="text-[red] text-[15px]"
                          />
                        }
                      >
                        {dataCompany?.map((item: any, index: number) => (
                          <MenuItem key={index} value={item.id}>
                            {item.name}
                          </MenuItem>
                        ))}
                      </Field>

                      {/* Country data select */}
                      <Field
                        name="countryId"
                        type="text"
                        as={TextField}
                        label="Country name"
                        select
                        className="relative"
                        margin="none"
                        variant="outlined"
                        fullWidth
                        helperText={
                          <ErrorMessage
                            name="countryId"
                            component="div"
                            className="text-[red] text-[15px]"
                          />
                        }
                      >
                        {dataCountry?.map((item: any, index: number) => (
                          <MenuItem key={index} value={item.id}>
                            {true ? item?.nameUz : item?.nameRu}
                          </MenuItem>
                        ))}
                      </Field>

                      {/* Region data select */}
                      <Field
                        name="regionId"
                        type="text"
                        as={TextField}
                        label="Region name"
                        select
                        className="relative"
                        margin="none"
                        variant="outlined"
                        fullWidth
                        helperText={
                          <ErrorMessage
                            name="regionId"
                            component="div"
                            className="text-[red] text-[15px]"
                          />
                        }
                      >
                        {dataRegion?.map((item: any, index: number) => (
                          <MenuItem key={index} value={item.id}>
                            {true ? item?.nameUz : item?.nameRu}
                          </MenuItem>
                        ))}
                      </Field>


                      {/* City data select */}
                      <Field
                        name="cityId"
                        type="text"
                        as={TextField}
                        label="City name"
                        select
                        className="relative"
                        margin="none"
                        variant="outlined"
                        fullWidth
                        helperText={
                          <ErrorMessage
                            name="cityId"
                            component="div"
                            className="text-[red] text-[15px]"
                          />
                        }
                      >
                        {dataCity?.map((item: any, index: number) => (
                          <MenuItem key={index} value={item.id}>
                            {true ? item?.nameUz : item?.nameRu}
                          </MenuItem>
                        ))}
                      </Field>

                      {/* Brand Type Select id and name */}
                      <FormControl sx={{ width: 330 }}>
                        <InputLabel id="demo-multiple-name-label">
                          Brand type
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          multiple
                          value={personName}
                          onChange={handleChange}
                          input={<OutlinedInput label="Brand type" />}
                          MenuProps={MenuProps}
                        >
                          {dataBrandType.map((el) => (
                            <MenuItem
                              key={el?.id}
                              value={el?.id}
                              style={getStyles(el.nameUz, selectedNames, theme)}
                            >
                              {true ? el?.nameUz : el?.nameRu}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="">
                    <GoogleMaps />
                  </div>

                <Button
                  sx={{
                    fontSize: "16px",
                    fontWeight: "600",
                    padding: "14px",
                    backgroundColor: "#008124",
                    "&:hover": { background: "#008100" },

                  }}
                  variant="contained"
                  type="submit"
                  className="w-[100%] "
                >
                  to add
                </Button>
              </Form>
            </Formik>
          </div>
        </div>
      </Box>
    </>
  );

  return (
    <div>
      <button
        aria-label="add to favorites"
        onClick={toggleDrawer(true)}
        className="py-2 px-5 rounded-md bg-[#008524] text-white font-medium hover:bg-[#008100] duration-300 active:bg-[#008524]"
      >
        To add
      </button>

      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
