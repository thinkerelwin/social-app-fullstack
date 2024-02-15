import { Box, Typography, useTheme } from "@mui/material";
import { useEffect } from "react";

import Friend from "@/components/Friend";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setFriends } from "@/store/authSlice";

export default function FriendListWidget({ userId }: { userId?: string }) {
  const dispatch = useAppDispatch();
  const { palette } = useTheme();

  const token = useAppSelector((state) => state.token);
  const friends = useAppSelector((state) => state.user?.friends);

  const neutralDarkColor = palette.neutral.dark;

  useEffect(() => {
    if (!userId) return;

    async function getFriends() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/users/${userId}/friends`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      dispatch(setFriends({ friends: data }));
    }

    getFriends();
  }, [userId, token, dispatch]);

  return (
    <WidgetWrapper>
      <Typography
        color={neutralDarkColor}
        variant="h5"
        fontWeight="500"
        sx={{
          marginBottom: "1.5rem",
        }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends?.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={`${friend.firstName} ${friend.lastName}`}
            subtitle={friend.occupation}
            userPicturePath={friend.picturePath}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
}
