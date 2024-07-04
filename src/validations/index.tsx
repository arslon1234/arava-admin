import * as Yup from "yup";




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



// validation the cuoriers ---------------------------------
export const CuoriersSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    login: Yup.string().required("Login is required"),
    activated: Yup.boolean().required("Activated is required"),
    address: Yup.string().required("Address is required"),
    birthDate: Yup.date().required("Birth date is required"),
    email: Yup.string().email().required("Email is required"),
    gender: Yup.number().required("Gender is required"),
    homePhone: Yup.string().required("Home phone is required"),
    lastName: Yup.string().required("Last name is required"),
    mobilePhone: Yup.string().required("Mobile phone is required"),
    password: Yup.string().required("Password is required"),
});

//=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=