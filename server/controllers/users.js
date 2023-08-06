import User from "../models/User.js";

export async function getUser(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

export async function getUserFriends(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

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
