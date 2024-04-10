import { Typography, useTheme } from "@mui/material";

import FlexBetween from "@/components/FlexBetween";
import WidgetWrapper from "@/components/WidgetWrapper";

export default function AdWidget() {
  const { palette } = useTheme();

  const dark = palette.neutral.dark;
  const mainColor = palette.neutral.main;
  const mediumColor = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={mediumColor}>Create Ad</Typography>
      </FlexBetween>
      <img
        width="280"
        height="180"
        alt="ad"
        src={`${import.meta.env.VITE_BACKEND_URL}/assets/info1.webp`}
        style={{
          borderRadius: "0.75rem",
          margin: "0.75rem 0",
          width: "100%",
          height: "auto",
        }}
      />
      <FlexBetween>
        <Typography color={mainColor}>MikaCossmetics</Typography>
        <Typography color={mediumColor}>mikacossmetics.com</Typography>
      </FlexBetween>
      <Typography color={mediumColor} margin="0.5rem 0">
        Your pathway to stunning and immaculate beauty and make sure your skin
        is exfoliating skin and shining like light.
      </Typography>
    </WidgetWrapper>
  );
}
