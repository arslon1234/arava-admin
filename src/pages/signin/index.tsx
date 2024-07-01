import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import { TextField, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import {  useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import { setCookies } from "@cookie";
import { auth } from "@service-auth";
import ImageAuth from "../../assets/SPRK_default_preset_name_custom – 2.png";
import "./style.scss";

function Index() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-root": {
      color: "#008524", // Default text color
      fontSize: "20px",
      [theme.breakpoints.down('sm')]: {
        fontSize: "16px", // Smaller font size for small screens
      },
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#008524", // Default border color
      },
      "&:hover fieldset": {
        borderColor: "#008524", // Hover border color
      },
      "&.Mui-focused fieldset": {
        borderColor: "#008524", // Focused border color
      },
    },
    "& .MuiInputLabel-root": {
      color: "#008524", // Default label color
      fontSize: "20px", // Default font size
      "&.Mui-focused": {
        color: "#008524", // Focused label color
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: "16px", // Smaller font size for small screens
      },
    },
  }));

  // Validate form control input
  const signInValidationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
  });

  // Function to handle form submission
  const signIn = async (values: any) => {
    try {
      const res = await auth.signin(values);
      if (res?.status == 200) {
        setCookies("access_token", res?.data?.access_token);
        setCookies("refresh_token", res?.data?.refresh_token);
        toast.success("Sign in success");
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      }
    } catch (err:any) {
      toast.error(err?.message);
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
            <Formik
              initialValues={{ username: "", password: "" }}
              validationSchema={signInValidationSchema}
              onSubmit={signIn}
            >
              {({ errors, touched }: FormikProps<any>) => (
                <Form className=" min-w-[320px] sm:min-w-[400px] w-full flex flex-col gap-[15px]">
                  <h2 className=" text-[20px] sm:text-[32px] text-center text-[#008524] font-medium">Sign In</h2>
                  <Field
                    as={StyledTextField}
                    label="Username"
                    type="text"
                    name="username"
                    error={touched.username && !!errors.username}
                    className="w-full mb-1 outline-none bg-transparent "
                    helperText={
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="mb-1 text-[#DB2F2F] text-center text-[18px] font-medium"
                      />
                    }
                  />

                  <p
                    onClick={() => {
                      alert("therefore, it should not be forgotten : ) ");
                    }}
                    className="text-[18px] sm:text-[20px]  py-2 text-[#008524] forgot-password hover:text-[#2f633d] duration-200 cursor-pointer"
                  >
                    Forgot password?
                  </p>

                  <Field
                    as={StyledTextField}
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    error={touched.password && !!errors.password}
                    className="w-[100%] mb-3 outline-none py-0"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <button
                            onClick={() => setShowPassword(!showPassword)}
                            // edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff style={{ color: "#008524" }} />
                            ) : (
                              <Visibility style={{ color: "#008524" }} />
                            )}
                          </button>
                        </InputAdornment>
                      ),
                    }}
                    helperText={
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="mb-3 text-[#DB2F2F] text-center text-[16px] font-medium"
                      />
                    }
                  />

                  <button
                    type="submit"
                    className="w-[100%] text-[16px] p-[14px] bg-[#008524] hover:bg-[#008200] active:bg-[#008524] duration-200 text-white font-bold rounded-md "
                  >
                    Sign In
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
