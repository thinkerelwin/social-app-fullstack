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
import { useNavigate } from "react-router-dom";

import { setThemeMode, setLogout } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import FlexBetween from "@/components/FlexBetween";

function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const { palette } = useTheme();

  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

  const neutralLight = palette.neutral.light;
  const dark = palette.neutral.dark;
  const backgroundColor = palette.background.default;
  const primaryLight = palette.primary.light;
  const altColor = palette.background.alt;

  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <FlexBetween padding="1rem 6%" bgcolor={altColor}>
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="primary"
          sx={{
            "&:hover": {
              color: primaryLight,
              cursor: "pointer",
            },
          }}
          onClick={() => navigate("/home")}
        >
          SocialApp
        </Typography>
        {isNonMobileScreens && (
          <FlexBetween
            bgcolor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>
      {/* Desktop Nav */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setThemeMode())}>
            {palette.mode === "dark" ? (
              <DarkMode
                sx={{
                  fontSize: "25px",
                }}
              />
            ) : (
              <LightMode
                sx={{
                  color: dark,
                  fontSize: "25px",
                }}
              />
            )}
          </IconButton>
          <Message
            sx={{
              fontSize: "25px",
            }}
          />
          <Notifications
            sx={{
              fontSize: "25px",
            }}
          />
          <Help
            sx={{
              fontSize: "25px",
            }}
          />
          <FormControl variant="standard">
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                padding: "0.25rem 1rem",
                "& .MuiSvgIcon-root": {
                  paddingRight: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          aria-label="hamburger menu"
        >
          <Menu />
        </IconButton>
      )}

      {/* Mobile Nav */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          bgcolor={backgroundColor}
        >
          <Box display="flex" justifyContent="flex-end" padding="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton
              onClick={() => dispatch(setThemeMode())}
              sx={{
                fontSize: "25px",
              }}
            >
              {palette.mode === "dark" ? (
                <DarkMode
                  sx={{
                    fontSize: "25px",
                  }}
                />
              ) : (
                <LightMode
                  sx={{
                    color: dark,
                    fontSize: "25px",
                  }}
                />
              )}
            </IconButton>
            <Message
              sx={{
                fontSize: "25px",
              }}
            />
            <Notifications
              sx={{
                fontSize: "25px",
              }}
            />
            <Help
              sx={{
                fontSize: "25px",
              }}
            />
            <FormControl variant="standard">
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  padding: "0.25rerm 1rem",
                  "& .MuiSvgIcon-root": {
                    paddingRight: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
}

export default Navbar;
