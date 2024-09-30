# Country Info App

## Tech Stack
- **Backend**: Nest.js
- **Frontend**: Next.js, Tailwind CSS, Recharts (for charting)

## Features
- Browse a list of countries
- View detailed information for each country, including population, neighboring countries, and flag details
- Interactive charts for population insights

---

## Backend

### Endpoints
All API endpoints are hosted at the base URL: `http://localhost:3001/api/`.

Refer to Swagger documentation for more details on available endpoints.

### How to Run the Backend

1. **Navigate to the project directory:**
   ```bash
   cd Country-Info-App/country-info-backend/src/
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the server in development mode:**
   ```bash
   npm run start:dev
   ```

   The server will be available at `http://localhost:3001`.

---

## Frontend

### Pages
- **Country List Page**: `http://localhost:3000`
- **Country Info Page**: `http://localhost:3000/country/[iso2]`  
  (Replace `[iso2]` with a country’s ISO2 code)

### How to Run the Frontend

1. **Navigate to the project directory:**
   ```bash
   cd Country-Info-App/country-info-frontend/src/
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend in development mode:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

---

## Styling & Charts
- **Styling**: Tailwind CSS
- **Charts**: Recharts for visualizing country data

---

## Demo

Below is a brief demonstration of the Country Info App in action:

![Country-Info-App Demo](https://raw.githubusercontent.com/Sersasj/Country-Info-App/refs/heads/main/Recording.gif)
