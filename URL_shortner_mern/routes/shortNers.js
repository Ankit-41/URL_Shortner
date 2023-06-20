const express = require('express')
const router = express.Router()

const {
  getAllShort_Ners,
  createShort_Ner,
  getShort_Ner,
  handleGetAnalytics,
  deleteShort_Ner,
  search_it,
  show_it

} = require('../controllers/shortNers')
router.get("/analytics/:shortId", handleGetAnalytics);
router.route('/').get(getAllShort_Ners).post(createShort_Ner)
router.route('/search').get(search_it)
router.route('/:shortId').get(show_it)
router.route('/:id').get(getShort_Ner).delete(deleteShort_Ner)

module.exports = router
