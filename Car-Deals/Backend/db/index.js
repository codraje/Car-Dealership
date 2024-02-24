import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017';
const dbName = 'car_dealership';

const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connect() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

function getDB() {
  return db;
}

export { connect, getDB };
