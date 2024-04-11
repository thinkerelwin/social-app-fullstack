import { Box, Typography, useTheme } from "@mui/material";
import { useState, useEffect } from "react";

import Friend from "@/components/Friend";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { User, setFriends } from "@/store/authSlice";

export default function FriendListWidget({
  userId,
}: {
  readonly userId?: string;
}) {
  const dispatch = useAppDispatch();
  const { palette } = useTheme();

  const token = useAppSelector((state) => state.token);
  const user = useAppSelector((state) => state.user);

  const isCurrentUser = user?._id === userId;

  const [localFriends, setLocalFriends] = useState<User[]>([]);

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

      const data: User[] = await response.json();

      if (isCurrentUser) {
        dispatch(setFriends({ friends: data }));
      } else {
        setLocalFriends(data);
      }
    }

    getFriends();
  }, [isCurrentUser, userId, token, dispatch]);

  const friends = isCurrentUser ? user?.friends : localFriends;

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
            actionable={isCurrentUser}
          />
        ))}
      </Box>
    </WidgetWrapper>
  );
}
