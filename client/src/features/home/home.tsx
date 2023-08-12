import { Box, useMediaQuery } from "@mui/material";
import Navbar from "@/features/navbar/Navbar";

import { useAppSelector } from "@/store/hook";
import UserWidget from "@/features/widgets/UserWidget";
import { User } from "@/store/authSlice";

function Home() {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const user = useAppSelector((state) => state.user) as User;

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
      </Box>
    </Box>
  );
}

export default Home;
