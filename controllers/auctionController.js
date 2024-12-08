const AuctionItem = require('../models/AuctionItem');

exports.getAllAuctionItems = async (req, res) => {
  try {
    const items = await AuctionItem.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.placeBid = async (req, res) => {
  const { id } = req.params;
  const { bidAmount } = req.body;

  try {
    const item = await AuctionItem.findById(id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    if (bidAmount <= item.currentBid) {
      return res.status(400).json({ message: 'Bid amount must be higher than the current bid' });
    }

    item.currentBid = bidAmount;
    await item.save();

    // Real-time update to all connected clients
    io.emit('auctionUpdate', {
      itemId: item._id,
      currentBid: bidAmount,
      bidder: 'User XYZ',  // In production, this should be fetched from the logged-in user
    });

    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
