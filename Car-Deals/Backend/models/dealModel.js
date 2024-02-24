import { getDB } from '../db';

const db = getDB();

const DealModel = {
  async getAllDeals() {
    try {
      return await db.collection('deals').find().toArray();
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch deals');
    }
  },

  async getDealsByDealership(dealershipId) {
    try {
      const dealership = await db.collection('dealerships').findOne({ dealership_id: dealershipId });
      if (!dealership) {
        throw new Error('Dealership not found');
      }
      return await db.collection('deals').find({ _id: { $in: dealership.deals } }).toArray();
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch deals by dealership');
    }
  },

  // Add more methods as needed
};

export default DealModel;
