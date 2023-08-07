import User from "../models/User.js";

export async function getUser(req, res) {
  try {
    mongoose.sanitizeFilter(req.params);
    const user = await User.findById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function getUserFriends(req, res) {
  try {
    mongoose.sanitizeFilter(req.params);
    const user = await User.findById(req.params.id);

    const friends = await Promise.all(
      user.friends.map((friendId) => User.findById(friendId))
    );

    const formattedFriends = friends.map((friend) => ({
      _id: friend._id,
      firstName: friend.firstName,
      lastName: friend.lastName,
      occupation: friend.occupation,
      location: friend.location,
      picturePath: friend.picturePath,
    }));

    res.status(200).json(formattedFriends);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function addFriend(req, res) {
  try {
    mongoose.sanitizeFilter(req.params);
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user.friends.includes(friendId)) {
      user.friends.push(friendId);
      friend.friends.push(id);

      await user.save();
      await friend.save();

      const friends = await Promise.all(
        user.friends.map((friendId) => User.findById(friendId))
      );

      const formattedFriends = friends.map((friend) => ({
        _id: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        occupation: friend.occupation,
        location: friend.location,
        picturePath: friend.picturePath,
      }));

      res.status(200).json(formattedFriends);
    } else {
      throw new Error(
        "The user you want to add is already on your friend list"
      );
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function removeFriend(req, res) {
  try {
    mongoose.sanitizeFilter(req.params);
    const { id: userId, friendId } = req.params;
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (user.friends.includes(friendId)) {
      user.friends = user.friends.filter((id) => id !== friendId);
      friend.friends = friend.friends.filter((id) => id !== userId);

      await user.save();
      await friend.save();

      const friends = await Promise.all(
        user.friends.map((friendId) => User.findById(friendId))
      );

      const formattedFriends = friends.map((friend) => ({
        _id: friend._id,
        firstName: friend.firstName,
        lastName: friend.lastName,
        occupation: friend.occupation,
        location: friend.location,
        picturePath: friend.picturePath,
      }));

      res.status(200).json(formattedFriends);
    } else {
      throw new Error("The user you want to remove isn't on your friend list");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
