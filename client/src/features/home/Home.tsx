import { Box, useMediaQuery } from "@mui/material";
import Navbar from "@/features/navbar/Navbar";

import { useAppSelector } from "@/store/hook";
import { User } from "@/store/authSlice";
import UserWidget from "@/features/widgets/UserWidget";
import MyPostWidget from "@/features/widgets/MyPostWidget";
import PostsWidget from "@/features/widgets/PostsWidget";
import AdWidget from "@/features/widgets/AdWidget";
import FriendListWidget from "../widgets/FriendListWidget";

function Home() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useAppSelector((state) => state.user as User);

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={user._id} picturePath={user.picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          marginTop={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={user.picturePath} />
          <PostsWidget userId={user._id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%">
            <AdWidget />
            <Box margin="2rem 0">
              <FriendListWidget userId={user._id} />
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default Home;
