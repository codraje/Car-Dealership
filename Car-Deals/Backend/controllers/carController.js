import { getDB } from '../db';

const db = getDB();

const CarController = {
  async getAllCars(req, res) {
    try {
      const cars = await db.collection('cars').find().toArray();
      res.json(cars);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async getCarsByDealership(req, res) {
    const { dealershipId } = req.params;
    try {
      const dealership = await db.collection('dealerships').findOne({ dealership_id: dealershipId });
      if (!dealership) {
        return res.status(404).json({ message: 'Dealership not found' });
      }
      const cars = await db.collection('cars').find({ _id: { $in: dealership.cars } }).toArray();
      res.json(cars);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async addCarToDealership(req, res) {
    const { dealershipId } = req.params;
    const { carId } = req.body;
    try {
      const dealership = await db.collection('dealerships').findOne({ dealership_id: dealershipId });
      if (!dealership) {
        return res.status(404).json({ message: 'Dealership not found' });
      }
      await db.collection('dealerships').updateOne({ dealership_id: dealershipId }, { $push: { cars: carId } });
      res.status(201).json({ message: 'Car added to dealership successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  async getDealsOnCar(req, res) {
    const { carId } = req.params;
    try {
      const deals = await db.collection('deals').find({ car_id: carId }).toArray();
      res.json(deals);
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
};

export default CarController;
