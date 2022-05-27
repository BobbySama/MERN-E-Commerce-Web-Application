import User from '../models/userModel.js';
import generatedToken from '../utils/token.js';
import asyncHandler from 'express-async-handler';

const authUser = asyncHandler(async (req, res) => {
  //get the email and password from the input of the page
  const { email, password } = req.body;

  //get the user corresponding to the email retrieved from the input
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generatedToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password no se puede');
  }
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('user already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generatedToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generatedToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// ==============  TESTING SECTION  ========================

// const authUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   console.log('am scris ca email:', email);
//   console.log('am scris ca parola:', password);

//   const user = await User.findOne({ email });

//   console.log('am primit ca email:', user.email);
//   console.log('am primit ca parola:', user.password);
//   console.log('am primit ca nume:', user.name);

//   // res.send({ email, password });

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token: generatedToken(user._id),
//     });
//   } else {
//     res.status(401);
//     throw new Error('Invalid email or password=============');
//   }
// });
// export { authUser };

// const getUserProfile = asyncHandler(async (req, res) => {
//   res.send('SUCCESS');
// });

export { authUser, registerUser, getUserProfile, updateUserProfile };
