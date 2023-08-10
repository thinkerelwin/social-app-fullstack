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
import { Formik } from "formik";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setLogin } from "@/store/authSlice";
import FlexBetween from "@/components/FlexBetween";

const registerSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
    location: z.string(),
    occupation: z.string(),
    picture: z.string(),
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
  picture: "",
};

const initialValuesForLogin = {
  email: "",
  password: "",
};

function LoginForm() {
  const [pageType, setPageType] = useState("login");
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isNonMobileScreens = useMediaQuery("(min-width: 600px)");
  const isLogin = pageType === "login";

  return <div>LoginForm</div>;
}

export default LoginForm;
