const User = require("../models/user");

exports.createOrUpdateUser = async (req, res) => {
  const { picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email: email },
    { name: email.split("@")[0], picture: picture },
    { new: true } // send the updated item in the db otherwise it will send the old one
  );
  if (user) {
    // console.log('user updated', user);
    res.json(user);
  } else {
    const newUser = await User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    // console.log('user created', newUser);
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  const { email } = req.user;
  await User.findOne({email: email}).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
}
