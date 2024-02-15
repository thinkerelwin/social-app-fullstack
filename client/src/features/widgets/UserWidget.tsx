import {
  ManageAccountsOutlined,
  EditOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserImage from "@/components/UserImage";
import FlexBetween from "@/components/FlexBetween";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useAppSelector } from "@/store/hook";
import { User } from "@/store/authSlice";

import TwitterIcon from "@/assets/twitter.png";
import LinkedInIcon from "@/assets/linkedin.png";

export default function UserWidget({
  userId,
  picturePath,
}: {
  userId?: string;
  picturePath: string;
}) {
  const [user, setUser] = useState<User | null>(null);
  const { palette } = useTheme();
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.token);
  const dark = palette.neutral.dark;
  const mediumColor = palette.neutral.medium;
  const mainColor = palette.neutral.main;
  const light = palette.primary.light;

  useEffect(() => {
    if (!userId) return;

    async function getUser() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data: User = await response.json();

      setUser(data);
    }

    getUser();
  }, [userId, token]);

  if (!user) return null;

  return (
    <WidgetWrapper>
      <FlexBetween
        gap="0.5rem"
        paddingBottom="1.1rem"
        onClick={() => navigate(`/profile/${userId}`)}
      >
        <FlexBetween gap="1rem">
          <UserImage image={picturePath} />
          <Box>
            <Typography
              variant="h4"
              color={dark}
              fontWeight="500"
              sx={{
                "&:hover": {
                  color: light,
                  cursor: "pointer",
                },
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography color={mediumColor}>
              {user.friends?.length} friends
            </Typography>
          </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      <Box padding="1rem 0">
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          marginBottom="0.5rem"
        >
          <LocationOnOutlined
            fontSize="large"
            sx={{
              color: mainColor,
            }}
          />
          <Typography color={mediumColor}>{user.location}</Typography>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          gap="1rem"
          marginBottom="0.5rem"
        >
          <WorkOutlineOutlined
            fontSize="large"
            sx={{
              color: mainColor,
            }}
          />
          <Typography color={mediumColor}>{user.location}</Typography>
        </Box>
      </Box>

      <Divider />

      <Box padding="1rem 0">
        <FlexBetween marginBottom="0.5rem">
          <Typography color={mediumColor}>Who's viewed your profile</Typography>
          <Typography color={mainColor} fontWeight="500">
            {user.viewedProfile}
          </Typography>
        </FlexBetween>
        <FlexBetween>
          <Typography color={mediumColor}>Impressions of your post</Typography>
          <Typography color={mainColor} fontWeight="500">
            {user.impressions}
          </Typography>
        </FlexBetween>
      </Box>

      <Divider />

      <Box padding="1rem 0">
        <Typography
          fontSize="1rem"
          color={mainColor}
          fontWeight="500"
          marginBottom="1rem"
        >
          Social Profiles
        </Typography>
        <FlexBetween gap="1rem" marginBottom="0.5rem">
          <FlexBetween gap="1rem">
            <img src={TwitterIcon} alt="twitter" />
            <Box>
              <Typography color={mainColor} fontWeight="500">
                Twitter
              </Typography>
              <Typography color={mediumColor} fontWeight="500">
                Social Network
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined
            sx={{
              color: mainColor,
            }}
          />
        </FlexBetween>

        <FlexBetween gap="1rem">
          <FlexBetween gap="1rem">
            <img src={LinkedInIcon} alt="linkedin" />
            <Box>
              <Typography color={mainColor} fontWeight="500">
                LinkedIn
              </Typography>
              <Typography color={mediumColor} fontWeight="500">
                Network Platform
              </Typography>
            </Box>
          </FlexBetween>
          <EditOutlined
            sx={{
              color: mainColor,
            }}
          />
        </FlexBetween>
      </Box>
    </WidgetWrapper>
  );
}
