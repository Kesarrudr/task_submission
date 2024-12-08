# Task Submission

---

## **Getting Started**

### **Option 1: Using Docker (Recommended)**

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd task_submission
   ```

2. **Run the application with Docker:**

   ```bash
   docker-compose up
   ```

3. **Wait for both servers to start.**
   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend: [http://localhost:3000](http://localhost:3000)

---

### **Option 2: Manual Setup (Without Docker)**

#### **1. Backend Setup**

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Set up the environment file:

   - Create a `.env` file in the backend directory.
   - Add your PostgreSQL database URL:

     ```
     DATABASE_URL=your_postgres_database_url
     ```

4. Initialize the database:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. Start the backend server:

   ```bash
   pnpm run dev
   ```

---

#### **2. Frontend Setup**

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the frontend development server:

   ```bash
   pnpm run dev
   ```

---

## **Important Notes**

1. **Database Initialization**:  
   Once both services are running, visit the following endpoint in your browser **once** to initialize the database with sample data:

   ```
   http://localhost:3000/api/v1/database/initialize
   ```

2. **Environment Variables**:
   - Ensure the PostgreSQL database URL is correctly set in the backend `.env` file.

---

## **Technologies Used**

- **Frontend**: React, Vite, PNPM
- **Backend**: Node.js, Express.js, Prisma ORM
- **Database**: PostgreSQL
- **Deployment**: Docker & Docker Compose

---
