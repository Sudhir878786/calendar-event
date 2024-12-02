// server/routes/auth.js
const { Router } = require("express");
const { check } = require("express-validator");
const { createUser, loginUser, renewToken } = require("../controllers/auth");
const { emailExists } = require("../helpers/databaseValidators");
const validateFields = require("../middlewares/validateFields");
const validateJWT = require("../middlewares/validateJWT");
const User = require("../models/");  // User model for searching
const router = Router();

router.post(
  "/register",
  [
    check("name", "Name is required").not().isEmpty(),
    check("name", "Name length must be max 32 characters").isLength({
      max: 32,
    }),
    check("email", "Invalid email").isEmail(),
    check(
      "password",
      "Password should be between 8-32 characters and should include 1 number, 1 symbol, 1 lowercase and 1 uppercase."
    ).isStrongPassword(),
    check("password", "Password should be between 8-32 characters.").isLength({
      max: 32,
    }),
    validateFields,
    emailExists,
  ],
  createUser
);

router.post(
  "/login",
  [
    check("email", "Invalid email").isEmail(),
    check("password", "Password is required.").not().isEmpty(),
    validateFields,
  ],
  loginUser
);

router.get("/renew", validateJWT, renewToken);
router.get("/search", validateJWT, async (req, res) => {
  try {
      const searchTerm = req.query.term; // Search term from the query params
      const users = await User.find({
          email: { $regex: searchTerm, $options: 'i' }, // Case-insensitive search by email
      }).select('email name'); // Only return email and name

      if (!users.length) {
          return res.status(404).json({ message: 'No users found' });
      }

      res.json(users);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
