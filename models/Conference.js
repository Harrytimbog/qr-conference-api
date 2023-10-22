const mongoose = require("mongoose");

// Function to calculate the default date (2 months from now)
function getDefaultDate() {
  const currentDate = new Date();
  currentDate.setMonth(currentDate.getMonth() + 2);
  return currentDate;
}

const defaultImageUrl =
  "https://res.cloudinary.com/harrytimbog/image/upload/v1662391989/egajh6u2awuaxwawlvs6.jpg";

const ConferenceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide conference title"],
      maxLength: 100,
    },
    description: {
      type: String,
      required: [true, "Please provide conference description"],
    },
    date_time: {
      type: Date,
      required: [true, "Please provide conference date and time"],
      default: getDefaultDate,
    },
    location: {
      type: String,
      required: [true, "Please provide the location for the conference"],
      default: "Lagos Island",
    },
    venue: {
      type: String,
      required: [true, "Please provide conference venue"],
      maxLength: 100,
      default: "Eko Hotel",
    },
    image_url: {
      type: String,
      required: [true, "Please provide image URL"],
      default: defaultImageUrl,
    },
    status: {
      type: String,
      enum: ["confirmed", "pending", "cancelled"],
      default: "pending",
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Conference", ConferenceSchema);
