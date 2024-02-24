import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import UserModel from '../models/userModel';
import AdminModel from '../models/adminModel';
import DealershipModel from '../models/dealershipModel';

const AuthService = {
  async login(email, password) {
    try {
      let user = await UserModel.findByEmail(email);
      if (!user) {
        // If user is not found, check if it's an admin
        const admin = await AdminModel.findByAdminId(email);
        if (!admin) {
          // If not admin either, check if it's a dealership
          const dealership = await DealershipModel.findByEmail(email);
          if (!dealership) {
            throw new Error('User not found');
          }
          // Check dealership password
          const isPasswordValid = await bcrypt.compare(password, dealership.password);
          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }
          const token = jwt.sign({ email: dealership.dealership_email, role: 'dealership' }, JWT_SECRET, { expiresIn: '1h' });
          return { token };
        }
        // Check admin password
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }
        const token = jwt.sign({ email: admin.admin_id, role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
        return { token };
      }
      // Check user password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
      const token = jwt.sign({ email: user.user_email, role: 'user' }, JWT_SECRET, { expiresIn: '1h' });
      return { token };
    } catch (error) {
      throw new Error(error.message);
    }
  },
  // Implement signup logic if needed
};

export default AuthService;
