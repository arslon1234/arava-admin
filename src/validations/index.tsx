import * as Yup from "yup";


// companyId:number|string,
//     name: string,
//     shortName: string,
//     mainOfficeAddress:string,
//     countryId:number|string,
//     regionId:number|string,
//     cityId:number|string,
//     gpsPointX: string,
//     gpsPointY: string,
//     activated: boolean,
//     brandTypeIdList: number[] | any,
//     imageUrl: string,

// Validation the brand --------------------------------------

export const BrandSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    shortName: Yup.string().required("Short Name is required"),
    mainOfficeAddress: Yup.string().required("Main Office Address is required"),
    countryId: Yup.number().required("Country ID is required"),
    regionId: Yup.number().required("Region ID is required"),
    cityId: Yup.number().required("City ID is required"),
    companyId: Yup.number().required("Company ID is required"),
    activated: Yup.string().required("Activeted is required"),
});
///=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=