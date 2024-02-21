import mongoose from "mongoose";
import { Request, Response } from "express";

import User from "../models/User.ts";

interface UserType {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  picturePath: string;
  friends: UserType[];
  location?: string | null;
  occupation?: string | null;
  viewedProfile?: number | null;
  impressions?: number | null;
}

type Friend = Pick<
  UserType,
  "_id" | "firstName" | "lastName" | "occupation" | "location" | "picturePath"
>;

type FriendFromDatabase = Friend & {
  createdAt: NativeDate;
  updatedAt: NativeDate;
};

function getFormattedFriends(friends: (FriendFromDatabase | null)[]) {
  return friends.reduce<Friend[]>((accu, friend) => {
    if (friend !== null) {
      accu.push({
        _id: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        occupation: friend.occupation ?? "",
        location: friend.location ?? "",
        picturePath: friend.picturePath,
      });
    }
    return accu;
  }, []);
}

export async function getUser(req: Request, res: Response) {
  try {
    mongoose.sanitizeFilter(req.params);
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(400).json({ msg: "user doesn't exist." });
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;

    res.status(200).json(rest);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);

    res.status(404).json({ error: errorMessage });
  }
}

export async function getUserFriends(req: Request, res: Response) {
  try {
    mongoose.sanitizeFilter(req.params);
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(400).json({ msg: "user doesn't exist." });
      return;
    }

    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId))
    );

    const formattedFriends = getFormattedFriends(friends);

    res.status(200).json(formattedFriends);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);

    res.status(404).json({ error: errorMessage });
  }
}

export async function addFriend(req: Request, res: Response) {
  try {
    mongoose.sanitizeFilter(req.params);
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user) {
      res.status(400).json({ msg: "user doesn't exist." });
      return;
    } else if (!friend) {
      res.status(400).json({ msg: "friend doesn't exist." });
      return;
    }

    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      friend.friends.push(id);

      await user.save();
      await friend.save();

      const friends = await Promise.all(
        user.friends.map((friendId) => User.findById(friendId))
      );

      const formattedFriends = getFormattedFriends(friends);

      res.status(200).json(formattedFriends);
    } else {
      throw new Error(
        "The user you want to add is already on your friend list"
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);

    res.status(404).json({ error: errorMessage });
  }
}

export async function removeFriend(req: Request, res: Response) {
  try {
    mongoose.sanitizeFilter(req.params);
    const { id: userId, friendId } = req.params;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user) {
      res.status(400).json({ msg: "user doesn't exist." });
      return;
    } else if (!friend) {
      res.status(400).json({ msg: "friend doesn't exist." });
      return;
    }

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== userId);

      await user.save();
      await friend.save();

      const friends = await Promise.all(
        user.friends.map((friendId) => User.findById(friendId))
      );

      const formattedFriends = getFormattedFriends(friends);

      res.status(200).json(formattedFriends);
    } else {
      throw new Error("The user you want to remove isn't on your friend list");
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : JSON.stringify(error);

    res.status(404).json({ error: errorMessage });
  }
}
