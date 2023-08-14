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
        width="100%"
        height="auto"
        alt="ad"
        src="http://localhost:3010/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
    </WidgetWrapper>
  );
}
