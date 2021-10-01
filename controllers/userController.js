const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const generateToken = require('../utilis/generateToken')
const User = require('../models/userModel')

//@desc    Register user & get token
//@route   POST /api/users/register
//@access  Public

const registerUser = asyncHandler(async (req, res) => {
  let { email, password, passwordCheck, firstName, lastName, phoneNumber } =
    req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// get users

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})

  if (users) {
    res.json({
      users,
    })
  }
})

module.exports = { registerUser, getUsers }
