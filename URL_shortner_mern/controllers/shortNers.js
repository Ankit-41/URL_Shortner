const Short_Ner = require("../models/Short_Ner");
const shortid = require("shortid");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllShort_Ners = asyncWrapper(async (req, res) => {
  const shortNers = await Short_Ner.find({});
  res.status(200).json({ shortNers });
});
const show_it=async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await Short_Ner.findOneAndUpdate(
    {
      shortId
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  console.log(entry);
  res.redirect(entry.redirectURL);
};

const createShort_Ner = asyncWrapper(async (req, res) => {
  const shortID = shortid();
  const body = req.body;

  const shortNer = await Short_Ner.create({
    notess: body.notess,
    name: body.name,
    
    shortId: shortID,
    redirectURL: body.name,
    visitHistory: [],
  });
  res.status(201).json({ shortNer });
});

const getShort_Ner = asyncWrapper(async (req, res, next) => {
  const { id: shortNerID } = req.params;
  const shortNer = await Short_Ner.findOne({ _id: shortNerID });
  if (!shortNer) {
    return next(createCustomError(`No shortNer with id : ${shortNerID}`, 404));
  }

  res.status(200).json({ shortNer });
});
const deleteShort_Ner = asyncWrapper(async (req, res, next) => {
  const { id: shortNerID } = req.params;
  const shortNer = await Short_Ner.findOneAndDelete({ _id: shortNerID });
  if (!shortNer) {
    return next(createCustomError(`No shortNer with id : ${shortNerID}`, 404));
  }
  res.status(200).json({ shortNer });
});
async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

const search_it= async (req, res) => {
  const searchTerm = req.query.hihi;

  try {


    const results = await Short_Ner.find({
      $or: [
        { notess: { $regex: searchTerm, $options: 'i' } },
        { name: { $regex: searchTerm, $options: 'i' } },
        { shortId: { $regex: searchTerm, $options: 'i' } }
      ]
    });

    res.json({ results });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'An error occurred while fetching the data.' });
  }
};



module.exports = {
  getAllShort_Ners,
  createShort_Ner,
  getShort_Ner,
  handleGetAnalytics,
  deleteShort_Ner,
  search_it,
  show_it
};
