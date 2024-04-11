import { Box, useMediaQuery } from "@mui/material";
import { useState, useEffect } from "react";
import { useAppSelector } from "@/store/hook";
import { useParams } from "react-router-dom";

import Navbar from "@/features/navbar/Navbar";
import FriendListWidget from "@/features/widgets/FriendListWidget";
import PostsWidget from "@/features/widgets/PostsWidget";
import UserWidget from "@/features/widgets/UserWidget";
import { User } from "@/store/authSlice";

function Profile() {
  const token = useAppSelector((state) => state.token);

  const [user, setUser] = useState<User | null>(null);

  const { userId } = useParams();
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

  useEffect(() => {
    const controller = new AbortController();

    async function getUser() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/users/${userId}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
            signal: controller.signal,
          }
        );

        const data = await response.json();

        setUser(data);
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") {
          // no action needed
        } else {
          console.error("Error:", error);
        }
      }
    }

    getUser();

    return () => {
      controller.abort();
    };
  }, [userId, token]);

  if (!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} picturePath={user.picturePath} />
          <Box margin="2rem 0" />
          <FriendListWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          marginTop={isNonMobileScreens ? undefined : "2rem"}
        >
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  );
}

export default Profile;
