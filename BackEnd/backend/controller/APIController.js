// backend/controller/APIController.js
import express from 'express';
import loadCSV from '../utils/loadCSV.js';
import { searchSongs, searchByWords } from '../utils/searchSongs.js';

const router = express.Router();

// Load the CSV data
let songsData = [];
loadCSV('allsong_data.csv').then((data) => {
  songsData = data;
}).catch((error) => {
  console.error('Error loading CSV data:', error);
});

// Search endpoint
router.get('/search', (req, res) => {
  const keyword = req.query.keyword;
  if (!keyword) {
    return res.status(400).json({ error: 'Keyword is required' });
  }

  const results = searchSongs(songsData, keyword);
  res.json(results);
});

// Advanced search endpoint
router.get('/advanced-search', (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  const keywords = query.split(' ');
  const bestMatch = searchSongs(songsData, query);
  const wordMatches = searchByWords(songsData, keywords);

  res.json({
    bestMatch,
    wordMatches
  });
});

export default router;
