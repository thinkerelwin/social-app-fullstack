import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  ShareOutlined,
} from "@mui/icons-material";
import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router-dom";

import FlexBetween from "@/components/FlexBetween";
import Friend from "@/components/Friend";
import WidgetWrapper from "@/components/WidgetWrapper";
import { Post, setPost } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";

export default function PostWidget({
  post,
  postUserId,
}: Readonly<{
  post: Post;
  postUserId: string;
}>) {
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const token = useAppSelector((state) => state.token);
  const currentUserId = useAppSelector((state) => state.user?._id);
  const { palette } = useTheme();

  const [isComments, setIsComments] = useState(false);

  const mainColor = palette.neutral.main;
  const primaryMainColor = palette.primary.main;

  const isLiked =
    currentUserId !== undefined ? Boolean(post.likes?.[currentUserId]) : false;
  const likeCount = Object.keys(post.likes).length;
  const authorName = `${post.firstName} ${post.lastName}`;
  const canTakeAction = currentUserId !== postUserId && userId !== postUserId;

  async function updateLike() {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/posts/${post._id}/like`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: currentUserId }),
      }
    );

    const updatedPost = await response.json();

    dispatch(setPost({ post: updatedPost }));
  }

  return (
    <WidgetWrapper margin="2rem 0" className="post-widget">
      <Friend
        friendId={postUserId}
        name={authorName}
        subtitle={post.location}
        userPicturePath={post.userPicturePath}
        actionable={canTakeAction}
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
          width="480"
          height="320"
          alt="post"
          loading="lazy"
          style={{
            borderRadius: "0.75rem",
            marginTop: "0.75rem",
            width: "100%",
            height: "auto",
          }}
          src={`${import.meta.env.VITE_BACKEND_URL}/assets/${post.picturePath}`}
        />
      )}
      <FlexBetween marginTop="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={updateLike} aria-label="like">
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
            <IconButton
              onClick={() => setIsComments(!isComments)}
              aria-label="friends"
            >
              <ChatBubbleOutlineOutlined />
            </IconButton>
            <Typography>{post.comments.length}</Typography>
          </FlexBetween>
        </FlexBetween>
        <IconButton aria-label="share">
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
