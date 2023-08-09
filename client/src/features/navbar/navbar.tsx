import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setThemeMode, setLogout } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import FlexBetween from "@/components/FlexBetween";

function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  const [isMobileMenuToggle, setIsMobileMenuToggle] = useState(false);

  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user?.firstName} ${user?.lastName}`;

  // TODO fix the Type
  console.log("color", neutralLight, dark);

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)">
          SocialApp
        </Typography>
      </FlexBetween>
    </FlexBetween>
  );
}

Navbar.propTypes = {};

export default Navbar;
