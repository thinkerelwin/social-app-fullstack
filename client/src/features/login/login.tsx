import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import LoginForm from "./LoginForm";

function Login() {
  const { palette } = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const altColor = palette.background.alt;

  return (
    <Box>
      <Box width="100%" bgcolor={altColor} padding="1rem 6%" textAlign="center">
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          SocialApp
        </Typography>
      </Box>
      <Box
        width={isNonMobileScreens ? "50%" : "90%"}
        padding="2rem"
        margin="2rem auto"
        borderRadius="1.5rem"
        bgcolor={altColor}
      >
        <Typography
          fontWeight="500"
          variant="h5"
          sx={{
            marginBottom: "1.5rem",
          }}
        >
          Welcome to SocialApp
        </Typography>
        <LoginForm />
      </Box>
    </Box>
  );
}

export default Login;
