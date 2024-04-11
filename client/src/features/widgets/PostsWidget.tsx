import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";

import { setPosts } from "@/store/authSlice";
import PostWidget from "./PostWidget";

export default function PostsWidget({
  userId,
  isProfile = false,
}: Readonly<{
  userId?: string;
  isProfile?: boolean;
}>) {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);
  const token = useAppSelector((state) => state.token);

  useEffect(() => {
    async function getPosts() {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      dispatch(setPosts({ posts: data }));
    }

    async function getUserPosts() {
      if (!userId) return;

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/posts/${userId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      dispatch(setPosts({ posts: data }));
    }

    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, [dispatch, isProfile, token, userId]);

  return (
    <div className="posts-widget">
      {posts.map((post) => {
        return (
          <PostWidget key={post._id} post={post} postUserId={post.userId} />
        );
      })}
    </div>
  );
}
