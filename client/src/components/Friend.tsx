import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setFriends } from "@/store/authSlice";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

export default function Friend({
  friendId,
  name,
  subtitle,
  userPicturePath,
}: {
  friendId: string;
  name: string;
  subtitle: string;
  userPicturePath: string;
}) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const token = useAppSelector((state) => state.token);
  const friends = useAppSelector((state) => state.user?.friends);
  const { palette } = useTheme();

  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const mainColor = palette.neutral.main;
  const mediumColor = palette.neutral.medium;

  const isFriend = useMemo(
    () => friends?.find((friend) => friend._id === friendId),
    [friends, friendId]
  );

  async function updateFriend(methodType: "POST" | "DELETE") {
    if (!user) return;

    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/users/${user._id}/${friendId}`,
      {
        method: methodType,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    dispatch(setFriends({ friends: data }));
  }

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box onClick={() => navigate(`/profile/${friendId}`)}>
          <Typography
            color={mainColor}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={mediumColor} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      <IconButton
        onClick={() =>
          isFriend ? updateFriend("DELETE") : updateFriend("POST")
        }
        sx={{
          backgroundColor: primaryLight,
          padding: "0.6rem",
        }}
        aria-label="update friend"
      >
        {isFriend ? (
          <PersonRemoveOutlined
            sx={{
              color: primaryDark,
            }}
          />
        ) : (
          <PersonAddOutlined
            sx={{
              color: primaryDark,
            }}
          />
        )}
      </IconButton>
    </FlexBetween>
  );
}
