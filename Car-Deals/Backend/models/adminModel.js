import { getDB } from '../db';

const db = getDB();

const AdminModel = {
  async findByAdminId(adminId) {
    try {
      return await db.collection('admin').findOne({ admin_id: adminId });
    } catch (error) {
      console.error('Error:', error);
      throw new Error('Failed to find admin');
    }
  },

  // Add more methods as needed
};

export default AdminModel;
