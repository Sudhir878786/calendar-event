// server/routes/events.js
const { Router } = require("express");
const { check } = require("express-validator");
const {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const {
  eventExistsById,
  isEventOwner,
} = require("../helpers/databaseValidators");
const { isDate, isDateAfter } = require("../helpers/dateValidators");
const validateFields = require("../middlewares/validateFields");
const validateJWT = require("../middlewares/validateJWT");
const Event = require("../models/Event");  // Event model
const router = Router();

router.use(validateJWT);

router.get("/", getEvents);
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const events = await Event.find({ userId }).populate('user', 'name email');
    if (events.length === 0) {
      return res.status(404).json({ message: "No events found for this user." });
    }
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post(
  "/",
  [
    check("title", "Title is required").not().isEmpty(),
    check("title", "Title length must be max 32 characters").isLength({
      max: 32,
    }),
    check("start", "Start date is required").not().isEmpty(),
    check("start", "Invalid start date").custom(isDate),
    check("end", "End date is required").not().isEmpty(),
    check("end", "Invalid end date").custom(isDate),
    check("end", "End date must be after start date").custom((end, { req }) =>
      isDateAfter(end, req.body.start)
    ),
    check("notes", "Notes length must be max 128 characters")
      .optional()
      .isLength({
        max: 128,
      }),
    validateFields,
  ],
  createEvent
);

router.put(
  "/:id",
  [
    check("id", "Invalid event ID.").isMongoId(),
    check("title", "Title is required").not().isEmpty(),
    check("title", "Title length must be max 32 characters").isLength({
      max: 32,
    }),
    check("start", "Start date is required").not().isEmpty(),
    check("start", "Invalid start date").custom(isDate),
    check("end", "End date is required").not().isEmpty(),
    check("end", "Invalid end date").custom(isDate),
    check("notes", "Notes length must be max 128 characters")
      .optional()
      .isLength({
        max: 128,
      }),
    validateFields,
    eventExistsById,
    isEventOwner,
  ],
  updateEvent
);

router.delete(
  "/:id",
  [
    check("id", "Invalid event ID.").isMongoId(),
    validateFields,
    eventExistsById,
    isEventOwner,
  ],
  deleteEvent
);

module.exports = router;
