import { getDB } from '../db';
import bcrypt from 'bcrypt';

const db = getDB();

const DealershipModel = {
  async findByEmail(email) {
    try {
      return await db.collection('dealerships').findOne({ dealership_email: email });
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to find dealership by email');
    }
  },

  async createDealership(dealershipData) {
    try {
      const existingDealership = await db.collection('dealerships').findOne({ dealership_email: dealershipData.email });
      if (existingDealership) {
        throw new Error('Dealership already exists');
      }
      const hashedPassword = await bcrypt.hash(dealershipData.password, 10);
      const newDealership = await db.collection('dealerships').insertOne({
        dealership_email: dealershipData.email,
        dealership_id: dealershipData.dealershipId,
        dealership_name: dealershipData.name,
        dealership_location: dealershipData.location,
        password: hashedPassword,
        dealership_info: dealershipData.dealershipInfo,
        cars: [],
        deals: [],
        sold_vehicles: []
      });
      return newDealership.ops[0];
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to create dealership');
    }
  }
};

export default DealershipModel;
