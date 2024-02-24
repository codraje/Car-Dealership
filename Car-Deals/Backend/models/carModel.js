import { getDB } from '../db';

const db = getDB();

const CarModel = {
  async getAllCars() {
    try {
      return await db.collection('cars').find().toArray();
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch cars');
    }
  },

  async getCarsByDealership(dealershipId) {
    try {
      const dealership = await db.collection('dealerships').findOne({ dealership_id: dealershipId });
      if (!dealership) {
        throw new Error('Dealership not found');
      }
      return await db.collection('cars').find({ _id: { $in: dealership.cars } }).toArray();
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to fetch cars by dealership');
    }
  },

  // Add more methods as needed
};

export default CarModel;
