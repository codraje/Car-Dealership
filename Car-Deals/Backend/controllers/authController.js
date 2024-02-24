import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import UserModel from '../models/userModel';
import AdminModel from '../models/adminModel';
import DealershipModel from '../models/dealershipModel';

const AuthController = {
  async login(req, res) {
    const { email, password } = req.body;
    try {
      let user = await UserModel.findByEmail(email);
      if (!user) {
        // If user is not found, check if it's an admin
        const admin = await AdminModel.findByAdminId(email);
        if (!admin) {
          // If not admin either, check if it's a dealership
          const dealership = await DealershipModel.findByEmail(email);
          if (!dealership) {
            return res.status(404).json({ message: 'User not found' });
          }
          // Check dealership password
          const isPasswordValid = await bcrypt.compare(password, dealership.password);
          if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid password' });
          }
          const token = jwt.sign({ email: dealership.dealership_email, role: 'dealership' }, JWT_SECRET, { expiresIn: '1h' });
          return res.status(200).json({ token });
        }
        // Check admin password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ email: admin.admin_id, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({ token });
      }
      // Check user password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
      }
      const token = jwt.sign({ email: user.user_email, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  // Implement signup logic if needed
};

export default AuthController;
