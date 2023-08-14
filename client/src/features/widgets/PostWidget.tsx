import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";

import FlexBetween from "@/components/FlexBetween";
import Friend from "@/components/Friend";
import WidgetWrapper from "@/components/WidgetWrapper";
import { Post, setPost } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";

export default function PostWidget({
  post,
  postUserId,
}: {
  post: Post;
  postUserId: string;
}) {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.token);
  const loggedInUserId = useAppSelector((state) => state.user?._id);
  const { palette } = useTheme();

  const [isComments, setIsComments] = useState(false);

  const mainColor = palette.neutral.main;
  const primaryMainColor = palette.primary.main;

  const isLiked =
    loggedInUserId !== undefined
      ? Boolean(post.likes?.[loggedInUserId])
      : false;
  const likeCount = Object.keys(post.likes).length;
  const authorName = `${post.firstName} ${post.lastName}`;

  async function updateLike() {
    const response = await fetch(
      `http://localhost:3010/posts/${post._id}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      }
    );

    const updatedPost = await response.json();

    dispatch(setPost({ post: updatedPost }));
  }

  return (
    <WidgetWrapper margin="2rem 0">
      <Friend
        friendId={postUserId}
        name={authorName}
        subtitle={post.location}
        userPicturePath={post.userPicturePath}
      />
      <Typography
        color={mainColor}
        sx={{
          marginTop: "1rem",
        }}
      >
        {post.description}
      </Typography>
      {post.picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3010/assets/${post.picturePath}`}
        />
      )}
      <FlexBetween marginTop="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={updateLike}>
              {isLiked ? (
                <FavoriteOutlined
                  sx={{
                    color: primaryMainColor,
                  }}
                />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          <FlexBetween gap="0.3rem">
            <IconButton onClick={() => setIsComments(!isComments)}>
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{post.comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton>
          <ShareOutlined />
        </IconButton>
      </FlexBetween>
      {isComments && (
        <Box marginTop="0.5rem">
          {post.comments.map((comment, index) => (
            <Box key={`${authorName}-${index}`}>
              <Divider />
              <Typography
                sx={{
                  color: mainColor,
                  margin: "0.5rem 0",
                  paddingLeft: "1rem",
                }}
              >
                {comment}
              </Typography>
            </Box>
          ))}
          <Divider />
        </Box>
      )}
    </WidgetWrapper>
  );
}
