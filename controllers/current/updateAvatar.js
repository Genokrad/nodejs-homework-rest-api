const { User } = require("../../models");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  try {
    const resultUpload = path.join(avatarsDir, `${id}_${originalname}`);

    const cropImg = await jimp.read(tempUpload);
    await cropImg.cover(250, 250).writeAsync(tempUpload);

    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("public", "avatars", originalname);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });
    console.log(tempUpload);

    res.json({ avatarURL });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
};

module.exports = updateAvatar;
