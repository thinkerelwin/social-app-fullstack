import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";
import { EditOutlined as EditOutlinedIcon } from "@mui/icons-material";
import { Formik, Form, FormikHelpers } from "formik";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { toFormikValidationSchema } from "zod-formik-adapter";

import { useAppDispatch } from "@/store/hook";
import { setLogin } from "@/store/authSlice";
import FlexBetween from "@/components/FlexBetween";

enum PageType {
  Login = "login",
  Register = "register",
}

type RegisterValuesType = typeof initialValuesForRegister;
type LoginValuesType = typeof initialValuesForLogin;

const AcceptedFilesSchema = z.custom<File>(
  (val) => val instanceof File,
  "Please upload a file"
);

const registerSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
    location: z.string(),
    occupation: z.string(),
    picture: AcceptedFilesSchema,
  })
  .required();

const loginSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
  })
  .required();

const initialValuesForRegister = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  location: "",
  occupation: "",
  picture: new File(["default"], "default.jpg"),
};

const initialValuesForLogin = {
  email: "",
  password: "",
};

function LoginForm() {
  const [pageType, setPageType] = useState<PageType>(PageType.Login);
  const { palette } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === PageType.Login;
  const isRegister = pageType === PageType.Register;
  const neutralMediumColor = palette.neutral.medium;
  const primaryMainColor = palette.primary.main;
  const altrColor = palette.background.alt;
  const pirmaryLightColor = palette.primary.light;

  async function register(
    values: RegisterValuesType,
    onSubmitProps: FormikHelpers<RegisterValuesType>
  ) {
    // alow image to be sent
    const formData = new FormData();

    for (const key in values) {
      formData.append(key, values[key as keyof RegisterValuesType]);
    }

    formData.append("picturePath", values.picture.name);
    // TODO error handling(ex: when user type wrong password)
    const savedUserResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        body: formData,
      }
    );

    const savedUser = await savedUserResponse.json();

    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType(PageType.Login);
    }
  }

  async function login(
    values: LoginValuesType,
    onSubmitProps: FormikHelpers<LoginValuesType>
  ) {
    const loggedInResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/auth/login`,
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(values),
      }
    );

    const loggedIn = await loggedInResponse.json();

    onSubmitProps.resetForm();

    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  }

  async function handleFormatSubmit(
    values: LoginValuesType | RegisterValuesType,
    onSubmitProps:
      | FormikHelpers<LoginValuesType>
      | FormikHelpers<RegisterValuesType>
  ) {
    if (isLogin) {
      await login(
        values as LoginValuesType,
        onSubmitProps as FormikHelpers<LoginValuesType>
      );
    } else if (isRegister) {
      await register(
        values as RegisterValuesType,
        onSubmitProps as FormikHelpers<RegisterValuesType>
      );
    }
  }

  return (
    <>
      {isLogin ? (
        <Formik
          onSubmit={handleFormatSubmit}
          initialValues={initialValuesForLogin}
          validationSchema={toFormikValidationSchema(loginSchema)}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            resetForm,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobileScreens ? undefined : "span 2",
                  },
                }}
              >
                <TextField
                  label="Email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
              </Box>

              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    margin: "2rem 0",
                    padding: "1rem",
                    backgroundColor: primaryMainColor,
                    color: altrColor,
                    "&:hover": {
                      color: primaryMainColor,
                    },
                  }}
                >
                  LOGIN
                </Button>
              </Box>
              <Typography
                onClick={() => {
                  setPageType(PageType.Register);
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: primaryMainColor,
                  "&:hover": {
                    cursor: "pointer",
                    color: pirmaryLightColor,
                  },
                }}
              >
                Don't have an account? Sign Up here.
              </Typography>
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          onSubmit={handleFormatSubmit}
          initialValues={initialValuesForRegister}
          validationSchema={toFormikValidationSchema(registerSchema)}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                sx={{
                  "& > div": {
                    gridColumn: isNonMobileScreens ? undefined : "span 2",
                  },
                }}
              >
                <TextField
                  label="First Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  name="firstName"
                  error={
                    Boolean(touched.firstName) && Boolean(errors.firstName)
                  }
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    gridColumn: "span 1",
                  }}
                />
                <TextField
                  label="Last Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  name="lastName"
                  error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    gridColumn: "span 1",
                  }}
                />
                <TextField
                  label="Location"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.location}
                  name="location"
                  error={Boolean(touched.location) && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <TextField
                  label="Occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.occupation}
                  name="occupation"
                  error={
                    Boolean(touched.occupation) && Boolean(errors.occupation)
                  }
                  helperText={touched.occupation && errors.occupation}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <Box
                  gridColumn="span 2"
                  border={`1px solid ${neutralMediumColor}`}
                  borderRadius="5px"
                  padding="1rem"
                >
                  <Dropzone
                    accept={{ "image/*": [".jpg", ".jpeg", ".png"] }}
                    multiple={false}
                    onDrop={(acceptedFiles) =>
                      setFieldValue("picture", acceptedFiles[0])
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <Box
                        {...getRootProps()}
                        border={`2px dashed ${primaryMainColor}`}
                        padding="1rem"
                        sx={{
                          "&;hover": {
                            cursor: "pointer",
                          },
                        }}
                      >
                        <input {...getInputProps()} />
                        {!values.picture ? (
                          <p>Add Picture Here</p>
                        ) : (
                          <FlexBetween>
                            <Typography>{values.picture.name}</Typography>
                            <EditOutlinedIcon />
                          </FlexBetween>
                        )}
                      </Box>
                    )}
                  </Dropzone>
                </Box>
                <TextField
                  label="Email"
                  type="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={Boolean(touched.email) && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
                <TextField
                  label="Password"
                  type="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={Boolean(touched.password) && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{
                    gridColumn: "span 2",
                  }}
                />
              </Box>

              <Box>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    margin: "2rem 0",
                    padding: "1rem",
                    backgroundColor: primaryMainColor,
                    color: altrColor,
                    "&:hover": {
                      color: primaryMainColor,
                    },
                  }}
                >
                  REGISTER
                </Button>
              </Box>
              <Typography
                onClick={() => {
                  setPageType(PageType.Login);
                  resetForm();
                }}
                sx={{
                  textDecoration: "underline",
                  color: primaryMainColor,
                  "&:hover": {
                    cursor: "pointer",
                    color: pirmaryLightColor,
                  },
                }}
              >
                Already have an account? Login here.
              </Typography>
            </Form>
          )}
        </Formik>
      )}
    </>
  );
}

export default LoginForm;
