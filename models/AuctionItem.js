const mongoose = require('mongoose');

const auctionItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  startingBid: {
    type: Number,
    required: true,
  },
  currentBid: {
    type: Number,
    default: 0,
  },
  auctionTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('AuctionItem', auctionItemSchema);
