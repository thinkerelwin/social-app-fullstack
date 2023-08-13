import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";

import { setPosts } from "@/store/authSlice";
import PostWidget from "./PostWidget";

export default function PostsWidget({
  userId,
  isProfile = false,
}: {
  userId: string;
  isProfile: boolean;
}) {
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.posts);
  const token = useAppSelector((state) => state.token);

  async function getPosts() {
    const response = await fetch("http://localhost:3010/posts", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return <div>PostsWidget</div>;
}
