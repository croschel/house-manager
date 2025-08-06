# House Manager

A full-stack application for managing household expenses and shopping lists. Built with modern technologies including TypeScript, React, Express.js, and MongoDB.

## 🏗️ Architecture

This project consists of two main components:

- **Server**: A RESTful API built with Express.js, TypeScript, and MongoDB
- **Web**: A React frontend application built with Vite, TypeScript, and Tailwind CSS

## 🚀 Features

### Expense Management

- Track and categorize household expenses
- View expense lists and summaries
- Data visualization with charts

### Market/Shopping Lists

- Create and manage shopping lists
- Track product purchases
- Monitor shopping status and progress

### User Management

- User authentication and authorization
- Secure session management with JWT
- User profiles and preferences

## 🛠️ Tech Stack

### Backend (Server)

- **Runtime**: Node.js 20
- **Framework**: Express.js 5
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcrypt
- **Validation**: Zod schemas
- **Testing**: Jest
- **Email**: Resend for email services

### Frontend (Web)

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **Forms**: React Hook Form
- **Charts**: Recharts
- **Date Handling**: date-fns
- **HTTP Client**: Axios

## 📋 Prerequisites

Before running this project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 20 or higher)
- [Yarn](https://yarnpkg.com/) package manager
- [Docker](https://docker.com/) and Docker Compose (for containerized setup)
- [MongoDB](https://mongodb.com/) (if running locally without Docker)

## 🚀 Getting Started

### Option 1: Running with Docker (Recommended)

This is the easiest way to get the entire application running with all dependencies.

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd house-manager
   ```

2. **Start the application with Docker Compose**

   ```bash
   docker-compose up --build
   ```

3. **Access the applications**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:4000
   - MongoDB: mongodb://localhost:27017

The Docker setup includes:

- MongoDB database
- Backend server with hot reload
- Frontend development server with hot reload

### Option 2: Running Locally with Yarn

If you prefer to run the applications locally:

#### Prerequisites Setup

1. **Install MongoDB locally** or use MongoDB Atlas
2. **Set up environment variables** (see Environment Variables section)

#### Backend Setup

1. **Navigate to the server directory**

   ```bash
   cd server
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start the development server**

   ```bash
   yarn dev
   ```

   The server will run on http://localhost:4000

#### Frontend Setup

1. **Navigate to the web directory**

   ```bash
   cd web
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start the development server**

   ```bash
   yarn dev
   ```

   The frontend will run on http://localhost:5173

## 🔧 Environment Variables

### Server Environment Variables

Create a `.env` file in the `server` directory:

```env
NODE_ENV=development
PORT=4000
MONGO_URL=mongodb://localhost:27017/house-manager
JWT_SECRET=your-jwt-secret-key
JWT_REFRESH_SECRET=your-jwt-refresh-secret
APP_ORIGIN=http://localhost:5173
RESEND_API_KEY=your-resend-api-key
```

## 📝 Available Scripts

### Server Scripts

```bash
yarn dev          # Start development server with hot reload
yarn build        # Build for production
yarn start        # Start production server
yarn prod         # Start built production server
yarn test         # Run tests in watch mode
```

### Web Scripts

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build
yarn lint         # Run ESLint
yarn mock         # Start JSON server for mocking APIs
```

## 🧪 Testing (In Progress)

### Running Backend Tests

```bash
cd server
yarn test
```

The backend uses Jest for testing with TypeScript support.

### Frontend Testing

The frontend is set up with ESLint for code quality. To run linting:

```bash
cd web
yarn lint
```

## 📁 Project Structure

```
house-manager/
├── docker-compose.yml          # Docker compose configuration
├── server/                     # Backend application
│   ├── src/
│   │   ├── controllers/        # Route controllers
│   │   ├── models/            # MongoDB models
│   │   ├── routes/            # API routes
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Express middleware
│   │   ├── schemas/           # Zod validation schemas
│   │   ├── utils/             # Utility functions
│   │   └── index.ts           # Application entry point
│   ├── Dockerfile
│   └── package.json
└── web/                       # Frontend application
    ├── src/
    │   ├── components/        # React components
    │   ├── pages/             # Page components
    │   ├── services/          # API services
    │   ├── reducers/          # Redux state management
    │   ├── hooks/             # Custom React hooks
    │   ├── lib/               # Utility libraries
    │   └── App.tsx            # Main app component
    ├── Dockerfile
    └── package.json
```

## 🔗 API Endpoints

### Authentication

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout
- `GET /auth/verify` - Verify JWT token

### Expenses

- `GET /expense` - Get user expenses
- `POST /expense` - Create new expense
- `PUT /expense/:id` - Update expense
- `DELETE /expense/:id` - Delete expense

### Market/Shopping

- `GET /market` - Get shopping lists
- `POST /market` - Create shopping list
- `PUT /market/:id` - Update shopping list
- `DELETE /market/:id` - Delete shopping list

### Users

- `GET /user/profile` - Get user profile
- `PUT /user/profile` - Update user profile

## 🚀 Production Deployment

### Docker Production Setup

1. **Update docker-compose.yml** for production (uncomment production sections)
2. **Build and run**
   ```bash
   docker-compose up --build
   ```

### Manual Deployment

1. **Build the backend**

   ```bash
   cd server
   yarn build
   ```

2. **Build the frontend**

   ```bash
   cd web
   yarn build
   ```

3. **Deploy the built files** to your hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 4000, 5173, and 27017 are available
2. **MongoDB connection**: Check if MongoDB is running and accessible
3. **Environment variables**: Verify all required environment variables are set
4. **Node version**: Ensure you're using Node.js 20 or higher

### Docker Issues

- Run `docker-compose down` and `docker-compose up --build` to rebuild containers
- Check Docker logs: `docker-compose logs [service-name]`

### Getting Help

If you encounter any issues, please check the logs and ensure all prerequisites are properly installed and configured.
