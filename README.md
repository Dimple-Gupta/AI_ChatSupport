# AI Chat Project

A full-stack AI chat application built with Node.js, TypeScript, React, and MySQL. The backend integrates an LLM API (Gemini) for generating responses.

- Real-time chat interface
- Chat history stored in MySQL database
- Integration with LLM API (OpenAI/Anthropic)
- Clean frontend using React
- Modular backend structure with TypeScript

AICHAT/
├── backend/
│   ├── src/
│   │   ├── config/        # App & environment configuration
│   │   ├── models/        # Database models
│   │   ├── routes/        # API route definitions
│   │   ├── services/      # Business logic & services
│   │   ├── types/         # Shared TypeScript types
│   │   ├── app.ts         # Express app setup
│   │   └── server.ts      # Server entry point
│   ├── database.sqlite   # SQLite database
│   ├── .env               # Environment variables
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
│
├── frontend/
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── assets/        # Images & static files
│   │   ├── components/    # Reusable UI components
│   │   ├── api.ts         # API client / HTTP calls
│   │   ├── App.tsx        # Main React component
│   │   ├── main.tsx       # React entry point
│   │   ├── types.ts       # Frontend TypeScript types
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html
│   ├── eslint.config.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md

**Tech Stack
Backend**
Node.js
TypeScript
Express
MySQL
REST API architecture

**Frontend**
React
TypeScript
Vite
CSS

**Setup & Installation**
1. **Clone the repository**
git clone https://github.com/Dimple-Gupta/AI_ChatSupport.git
cd AI_ChatSupport

2. **Backend Setup**
cd backend
npm install
Create a .env file if it doesn’t exist:
PORT=4000
Run the backend server:
npm run dev
The backend will typically run on:
http://localhost:4000

3. **Frontend Setup**
cd frontend
npm install
npm run dev
The frontend will typically run on:
http://localhost:5173

4. **Database**
backend/src/config/database
Models
backend/src/models/

5. **LLM API**
'AIzaSyBILhwDofsiaG4z5lthXM8Fx-iRHJ1PvAE'

**Note: Used Gemini API for LLM.** 
