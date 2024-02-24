import { getDB } from '../db';

const db = getDB();

const DealController = {
  async getAllDeals(req, res) {
    try {
      const deals = await db.collection('deals').find().toArray();
      res.json(deals);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async getDealsByDealership(req, res) {
    const { dealershipId } = req.params;
    try {
      const dealership = await db.collection('dealerships').findOne({ dealership_id: dealershipId });
      if (!dealership) {
        return res.status(404).json({ message: 'Dealership not found' });
      }
      const deals = await db.collection('deals').find({ _id: { $in: dealership.deals } }).toArray();
      res.json(deals);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async addDealToDealership(req, res) {
    const { dealershipId } = req.params;
    const { carId, dealInfo } = req.body;
    try {
      const dealership = await db.collection('dealerships').findOne({ dealership_id: dealershipId });
      if (!dealership) {
        return res.status(404).json({ message: 'Dealership not found' });
      }
      const insertedDeal = await db.collection('deals').insertOne({ car_id: carId, deal_info: dealInfo });
      await db.collection('dealerships').updateOne({ dealership_id: dealershipId }, { $push: { deals: insertedDeal.insertedId } });
      res.status(201).json({ message: 'Deal added to dealership successfully', deal: insertedDeal.ops[0] });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

export default DealController;
