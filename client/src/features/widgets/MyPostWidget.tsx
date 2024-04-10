import {
  EditOutlined,
  DeleteOutlined,
  AttachFileOutlined,
  GifBoxOutlined,
  ImageOutlined,
  MicOutlined,
  MoreHorizOutlined,
} from "@mui/icons-material";
import {
  Box,
  Divider,
  Typography,
  InputBase,
  useTheme,
  Button,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import Dropzone from "react-dropzone";
import { useState } from "react";

import FlexBetween from "@/components/FlexBetween";
import UserImage from "@/components/UserImage";
import WidgetWrapper from "@/components/WidgetWrapper";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { User, setPosts } from "@/store/authSlice";

export default function MyPostWidget({
  picturePath,
}: {
  readonly picturePath: string;
}) {
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState<null | File>(null);
  const [post, setPost] = useState("");

  const dispatch = useAppDispatch();
  const { palette } = useTheme();
  const user = useAppSelector((state) => state.user as User);
  const token = useAppSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const mediumMainColor = palette.neutral.mediumMain;
  const mediumColor = palette.neutral.medium;
  const lightColor = palette.neutral.light;
  const primaryMainColor = palette.primary.main;
  const altColor = palette.background.alt;

  async function handlePost() {
    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("description", post);

    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/posts`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const posts = await response.json();

    dispatch(setPosts({ posts }));

    setImage(null);
    setPost("");
  }

  return (
    <WidgetWrapper>
      <FlexBetween gap="1.5rem">
        <UserImage image={picturePath} />
        <InputBase
          placeholder="What's on your mind..."
          onChange={(e) => setPost(e.target.value)}
          value={post}
          sx={{
            width: "100%",
            backgroundColor: lightColor,
            borderRadius: "2rem",
            padding: "1rem 2rem",
          }}
        />
      </FlexBetween>
      {isImage && (
        <Box
          border={`1px solid ${mediumColor}`}
          borderRadius="5px"
          marginTop="1rem"
          padding="1rem"
        >
          <Dropzone
            accept={{
              "image/jpeg": [".jpg", ".jpeg"],
              "image/png": [".png"],
              "image/webp": [".webp"],
            }}
            multiple={false}
            onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
          >
            {({ getRootProps, getInputProps }) => (
              <FlexBetween>
                <Box
                  {...getRootProps()}
                  border={`2px dashed ${primaryMainColor}`}
                  padding="1rem"
                  width="100%"
                  sx={{
                    "&;hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <input {...getInputProps()} />
                  {!image ? (
                    <p>Add Image Here</p>
                  ) : (
                    <FlexBetween>
                      <Typography>{image.name}</Typography>
                      <EditOutlined />
                    </FlexBetween>
                  )}
                </Box>
                {image && (
                  <IconButton
                    onClick={() => setImage(null)}
                    sx={{
                      width: "15%",
                    }}
                  >
                    <DeleteOutlined />
                  </IconButton>
                )}
              </FlexBetween>
            )}
          </Dropzone>
        </Box>
      )}

      <Divider
        sx={{
          margin: "1.25rem 0 ",
        }}
      />

      <FlexBetween>
        <FlexBetween gap="0.25rem" onClick={() => setIsImage(!isImage)}>
          <ImageOutlined
            sx={{
              color: mediumMainColor,
            }}
          />
          <Typography
            color={mediumMainColor}
            sx={{
              "&:hover": {
                cursor: "pointer",
                color: mediumColor,
              },
            }}
          >
            Image
          </Typography>
        </FlexBetween>
        {isNonMobileScreens ? (
          <>
            <FlexBetween gap="0.25rem">
              <GifBoxOutlined
                sx={{
                  color: mediumMainColor,
                }}
              />
              <Typography color={mediumMainColor}>Clip</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <AttachFileOutlined
                sx={{
                  color: mediumMainColor,
                }}
              />
              <Typography color={mediumMainColor}>Attachment</Typography>
            </FlexBetween>
            <FlexBetween gap="0.25rem">
              <MicOutlined
                sx={{
                  color: mediumMainColor,
                }}
              />
              <Typography color={mediumMainColor}>Clip</Typography>
            </FlexBetween>
          </>
        ) : (
          <FlexBetween gap="0.25rem">
            <MoreHorizOutlined
              sx={{
                color: mediumMainColor,
              }}
            />
          </FlexBetween>
        )}
        <Button
          disabled={!post}
          onClick={handlePost}
          sx={{
            color: altColor,
            backgroundColor: primaryMainColor,
            borderRadius: "3rem",
          }}
        >
          POST
        </Button>
      </FlexBetween>
    </WidgetWrapper>
  );
}
