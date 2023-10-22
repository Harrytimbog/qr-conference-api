const Conference = require("../models/Conference");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

// Get all conferences
const getAllConferences = async (req, res) => {
  const conferences = await Conference.find().sort("-createdAt");
  res.status(StatusCodes.OK).json({ conferences, count: conferences.length });
};

// Get a specific conference by ID
const getConference = async (req, res) => {
  const {
    params: { id: conferenceId },
  } = req;

  const conference = await Conference.findById(conferenceId);

  if (!conference) {
    throw new NotFoundError(`No conference with id ${conferenceId}`);
  }
  res.status(StatusCodes.OK).json({ conference });
};

// Create a new conference
const createConference = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const conference = await Conference.create(req.body);
  res.status(StatusCodes.CREATED).json({ conference });
};

// Update a conference (only the owner can update)
const updateConference = async (req, res) => {
  const {
    body: { title, description },
    user: { userId },
    params: { id: conferenceId },
    body,
  } = req;

  if (title === "" || description === "") {
    throw new BadRequestError("Title or Description fields can not be empty");
  }

  const conference = await Conference.findOne({
    _id: conferenceId,
    createdBy: userId,
  });

  if (!conference) {
    throw new NotFoundError(`No conference with id ${conferenceId}`);
  }

  const updatedConference = await Conference.findByIdAndUpdate(
    conferenceId,
    body,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(StatusCodes.OK).json({ conference: updatedConference });
};

// Delete a conference (only the owner can delete)
const deleteConference = async (req, res) => {
  const {
    user: { userId },
    params: { id: conferenceId },
  } = req;

  const conference = await Conference.findOneAndRemove({
    _id: conferenceId,
    createdBy: userId,
  });

  if (!conference) {
    throw new NotFoundError(`No conference with id ${conferenceId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = {
  getAllConferences,
  getConference,
  createConference,
  updateConference,
  deleteConference,
};
