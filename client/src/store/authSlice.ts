import { createSlice } from "@reduxjs/toolkit";

export interface authStateType {
  themeMode: "light" | "dark";
  user: {
    firstName: string;
    lastName: string;
    friends: [];
  } | null;
  token: string | null;
  posts: { _id: string }[];
}

const initialState: authStateType = {
  themeMode: "light",
  user: null,
  token: null,
  posts: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setThemeMode: (state) => {
      state.themeMode = state.themeMode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("there's no user friends");
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload.posts;
    },
    setPost: (state, action) => {
      const updatedPost = state.posts.map((post) => {
        if (post._id === action.payload.post_id) {
          return action.payload.post;
        } else {
          return post;
        }
      });

      state.posts = updatedPost;
    },
  },
});

export const {
  setThemeMode,
  setLogin,
  setLogout,
  setFriends,
  setPosts,
  setPost,
} = authSlice.actions;

export default authSlice.reducer;
