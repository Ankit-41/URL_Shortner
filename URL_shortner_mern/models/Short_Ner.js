const mongoose = require("mongoose");

const Short_NerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must provide name"],
      trim: true,
    },
    notess: {
      type: String,
      default: "notes not availbale",
      trim: true,
      // maxlength: [20, "notes can not be more than 20 characters"],
    },

   
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Short_Ner", Short_NerSchema);
