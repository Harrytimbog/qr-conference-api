const { Router } = require("express");
const express = require("express");
const router = Router();

const {
  getAllConferences,
  getConference,
  createConference,
  updateConference,
  deleteConference,
} = require("../controllers/conference");

const authenticateUser = require("../middleware/authentication");

router
  .route("/")
  .post(authenticateUser, createConference)
  .get(getAllConferences);
router
  .route("/:id")
  .get(getConference)
  .delete(authenticateUser, deleteConference)
  .patch(authenticateUser, updateConference);

module.exports = router;
