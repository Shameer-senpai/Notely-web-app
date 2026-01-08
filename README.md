# 📝 Notely – A Full Stack Web App

Notely is a full-stack notes Web application built with React (Vite) on the frontend and Node.js with Express on the backend.

The application allows users to create, read, update, and delete (CRUD) notes with persistent storage using a `notes.json` file, ensuring data remains available even after restarting the server.

## Features
- Add a new note with text and date  
- View all saved notes  
- Edit existing notes  
- Delete notes  
- Mark notes as completed  
- Persistent storage using JSON file system  

## Tech Stack
- **Frontend:** React, Vite, CSS  
- **Backend:** Node.js, Express.js  
- **Storage:** File system (JSON-based persistence)  
- **Other:** RESTful APIs, CORS  

## Project Structure

Notely-web-app/
│
├── backend/
│   ├── notes.json
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
├── package-lock.json
└── README.md

## Project Purpose
This project was built as part of an internship learning exercise to understand full-stack development, REST APIs, and frontend–backend integration.

## How to Run the Project

Backend(Terminal 1):
 Navigate to the backend folder using , 
   cd backend (then)
   npm install
   npm start
 The backend runs on http://localhost:5000 (ctrl+click)

Frontend(Terminal 2):
 Navigate to the frontend folder using ,
   cd frontend (then)
   npm install 
   npm run dev
 The frontend runs on http://localhost:5173 (ctrl+click)

## Author
Mohammed Shameer G

