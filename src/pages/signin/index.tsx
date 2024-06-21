import * as Yup from "yup";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikProps } from "formik";
import { TextField,  InputAdornment,  } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";

import { setCookies } from "@coocse";
import {auth} from "@service-auth"
import "./style.scss";

function Index() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Custom styling for TextField when there's an error
  const StyledTextField = styled(TextField)(({}) => ({
    "& .MuiInputBase-root": {
      color: "#FFF", // Default text color
      fontSize: "20px",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#0f0", // Default border color
      },
      "&:hover fieldset": {
        borderColor: "#0f0", // Hover border color
      },
      "&.Mui-focused fieldset": {
        borderColor: "#0f0", // Focused border color
      },
    },
    "& .MuiInputLabel-root": {
      color: "#0f0", // Default label color
      fontSize:"20px", // Default font size
      "&.Mui-focused": {
        color: "#0f0", // Focused label color
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
  const signIn = async(values: any) => {
    try{
        const res = await auth.signin(values)
        if(res?.status == 200){
            setCookies("access_token" , res?.data?.access_token);
            setCookies("refresh_token" , res?.data?.refresh_token);
            toast.success("Sign in success");
            setTimeout(() => {
                navigate("/home");
            },1500)
        }
    }catch(err){
        console.log(err)
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="wrapper-signin">
        <div className="parent-signin">
          {Array.from({ length: 144 }).map((_, index) => (
            <span key={index} />
          ))}
          <div className="signin">
            <div className="content">
              <h2 className=" font-medium">Sign In</h2>

              <div className="form">
                <Formik
                  initialValues={{ username: "", password: "" }}
                  validationSchema={signInValidationSchema}
                  onSubmit={signIn}
                >
                  {({ errors, touched }: FormikProps<any>) => (
                    <Form className=" min-w-[400px] w-full flex flex-col gap-[15px]">
                      <Field
                        as={StyledTextField}
                        label="Username"
                        type="text"
                        name="username"
                        error={touched.username && !!errors.username}
                        className="w-full mb-1 outline-none"
                        helperText={
                          <ErrorMessage
                            name="username"
                            component="div"
                            className="mb-1 text-[#ff0000] text-center text-[18px] font-medium"
                          />
                        }
                      />

                      <p
                        onClick={() => {
                          alert("therefore, it should not be forgotten : ) ");
                        }}
                        className="text-[20px]  py-2 text-[#0f0] forgot-password hover:text-[rgba(0,255,0,0.6)] duration-200 cursor-pointer"
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
                                  <VisibilityOff style={{ color: "#0f0" }} />
                                ) : (
                                  <Visibility style={{ color: "#0f0" }} />
                                )}
                              </button>
                            </InputAdornment>
                          ),
                        }}
                        helperText={
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="mb-3 text-[#ff0000] text-center text-[16px] font-medium"
                          />
                        }
                      />

                      <button
                        type="submit"
                        className="w-[100%] text-[16px] p-[14px] bg-[#0f0] hover:bg-[#4f0]  duration-200 text-white font-bold rounded-md "
                      >
                        Sign In
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
