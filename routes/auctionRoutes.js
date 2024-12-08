const express = require('express');
const router = express.Router();
const AuctionController = require('../controllers/auctionController');

// Get all auction items
router.get('/', AuctionController.getAllAuctionItems);

// Place a bid
router.post('/:id/bid', AuctionController.placeBid);

module.exports = router;
