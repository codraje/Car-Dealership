import { getDB } from '../db';

const db = getDB();

const DealershipController = {
  async getAllDealerships(req, res) {
    try {
      const dealerships = await db.collection('dealerships').find().toArray();
      res.json(dealerships);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async getDealershipById(req, res) {
    const { dealershipId } = req.params;
    try {
      const dealership = await db.collection('dealerships').findOne({ dealership_id: dealershipId });
      if (!dealership) {
        return res.status(404).json({ message: 'Dealership not found' });
      }
      res.json(dealership);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async createDealership(req, res) {
    const { name, location, password, dealershipInfo } = req.body;
    try {
      const existingDealership = await db.collection('dealerships').findOne({ name });
      if (existingDealership) {
        return res.status(400).json({ message: 'Dealership already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newDealership = await db.collection('dealerships').insertOne({
        name,
        location,
        password: hashedPassword,
        dealership_info: dealershipInfo,
        cars: [],
        deals: [],
        sold_vehicles: []
      });
      res.status(201).json({ message: 'Dealership created successfully', dealership: newDealership.ops[0] });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

export default DealershipController;
