# Installation 🔧

## Local Installation

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
Navigate to the Project Path
bash
Copy code
cd <project-directory>
Server Setup
Change Directory to the Server Path

bash
Copy code
cd server
Install Dependencies

bash
Copy code
npm install
Set Up Environment Variables
Create a .env file in the server directory and add the following:

bash
Copy code
PORT=5000
MONGODB_CNN=mongodb://localhost:27017  # Replace with your MongoDB connection string
JWT_SECRET_KEY=RANDOMKEY              # Replace with your secret key
Client Setup
Go Back to the Project Path

bash
Copy code
cd ..
Change Directory to the Client Path

bash
Copy code
cd client
Install Dependencies

bash
Copy code
npm install
Deployment 📦
Start the Server
Open a terminal in the project path and run:

bash
Copy code
cd server
npm start
Start the Client
Open another terminal in the project path and run:

bash
Copy code
cd client
npm start
Access the Application

text
Copy code
Open your browser and navigate to: http://localhost:3000
