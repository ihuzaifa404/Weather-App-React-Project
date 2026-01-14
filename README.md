# Weather Forecast Application

A **production-ready, responsive Weather Forecast Application** built using **React (Vite)**, **TypeScript**, **TanStack Query**, and **shadcn/ui**.  
The application delivers **real-time weather data**, **location-based forecasts**, and **interactive visualizations** with a modern and accessible user interface.

---

## Overview

This project focuses on providing accurate and real-time weather information using modern frontend technologies.  
It supports **automatic location detection**, **manual city search**, **forecast visualization**, and **persistent user preferences**, ensuring a smooth and user-friendly experience across all devices.

---

## Key Features

### 📍 Location-Based Weather
- Requests user permission for location access  
- Automatically detects and displays current city weather  
- Graceful error handling when location access is denied  

### 🌤️ Real-Time Weather Data
- Displays current temperature, feels-like temperature, humidity, wind speed, pressure, and weather conditions  
- Data fetched and managed efficiently using **TanStack Query**

### 📊 Forecast Visualization
- Graphical representation of weather forecasts  
- Easy-to-read charts for temperature trends  

### 🔍 City Search
- Search weather details for any city worldwide  
- Real-time results with forecast data  

### ⭐ Favorites Management
- Add or remove cities from favorites  
- Persistent favorites using **localStorage**  
- User-friendly favorite toggle system  

### 🕒 Recent Search History
- Stores recent searches locally  
- Option to clear saved history  

### ⚠️ Error Handling & UX
Dedicated UI for:
- Location permission denial  
- API errors  
- Invalid city searches  

### 📱 Responsive Design
- Fully responsive layout  
- Optimized for mobile, tablet, and desktop screens  

---

## Technology Stack

- **Frontend Framework:** React (Vite)  
- **Language:** TypeScript  
- **Data Fetching & Caching:** TanStack Query  
- **UI Components:** shadcn/ui  
- **Charts & Visualization:** Forecast graphs  
- **State Persistence:** Local Storage  

### APIs Used
- Geolocation API  
- Reverse Geocoding API  
- Real-Time Weather API  
- Forecast Weather API  

---

## Project Structure

```bash
src/
├── components/        # Reusable UI components
├── hooks/             # Custom React hooks
├── api/               # API services & types
├── pages/             # Application pages
├── utils/             # Utility functions
├── styles/            # Global styles
└── main.tsx           # App entry point

Installation & Setup
Clone the Repository
git clone https://github.com/ihuzaifa404/Weather-App-React-Project
cd Weather-App-React-Project

Install Dependencies
npm install

Environment Variables

Create a .env file in the root directory:

VITE_WEATHER_API_KEY=your_api_key_here

Run the Application
npm run dev

Performance & Best Practices

Optimized API calls using caching and background refetching

Type-safe codebase with TypeScript

Clean and modular component architecture

Reusable hooks and utility functions

Future Enhancements

Dark / Light theme support

User authentication

Cloud-based favorites synchronization

Multi-language support

Offline mode

Author

M Huzaifa Butt
Frontend Developer
Specialized in React, TypeScript, and modern UI frameworks
