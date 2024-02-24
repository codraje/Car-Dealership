# Car Dealership App

Welcome to the Car Dealership App! This application allows users to browse, buy, and sell cars through an intuitive web interface.

## Features

- **Authentication**: Users can sign up, log in, and log out securely.
- **Role-Based Access Control**: Different functionalities are available based on user roles (e.g., user, dealership).
- **Browse Cars**: Users can view a list of available cars and filter them based on various criteria.
- **Buy and Sell Cars**: Users and dealerships can buy and sell cars, with transactional support.
- **Dashboard**: Users and dealerships have a personalized dashboard to manage their vehicles and deals.

## Technologies Used

- **Frontend**: SvelteKit, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Database**: MongoDB
- **API Documentation**: Swagger (optional)

## Getting Started

To get started with the Car Dealership App, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/car-dealership-app.git`
2. Install dependencies:
   ```
   cd car-dealership-app
   npm install
   ```
3. Set up the backend:
   - Configure environment variables in `.env` file (e.g., MongoDB URI, JWT secret)
   - Run the backend server: `npm run dev:server`
4. Set up the frontend:
   - Start the frontend development server: `npm run dev:frontend`
5. Access the application in your web browser: [http://localhost:3000](http://localhost:3000)

## API Documentation

The API endpoints and documentation can be found at [http://localhost:3000/api/docs](http://localhost:3000/api/docs) when the backend server is running.
