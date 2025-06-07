# Backend (Node.js Express API)

This directory contains the backend API for the Data Visualization Dashboard. It's built with Node.js and Express, and it interacts with a MongoDB database to serve filtered and aggregated data to the frontend.

## Getting Started

To get a local copy of this project up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ravitejaakella3/black_coffer.git
    ```
2.  **Navigate to the backend directory:**
    ```bash
    cd black_coffer/backend
    ```

## Features

-   **RESTful API:** Provides endpoints for fetching data, filter options, and various aggregations for charts.
-   **MongoDB Integration:** Connects to a MongoDB database to retrieve and process data.
-   **Filtering:** Supports dynamic filtering of data based on `end_year`, `topic`, `sector`, `region`, `pestle`, `source`, and `country`.

## Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Environment Variables:**
    Create a `.env` file in this directory with the following variable:
    ```
    MONGO_URI=your_mongodb_connection_string
    PORT=5332
    ```
    *   Replace `your_mongodb_connection_string` with your actual MongoDB connection URI.
    *   `PORT` is the port on which the server will run (defaulting to 5332 as per your frontend configuration).

3.  **Database Seeding (if not already done):**
    Ensure your `jsondata.json` file is imported into your MongoDB database. You might need a separate script or use `mongoimport`.
    Example `mongoimport` command (run from your terminal where `jsondata.json` is accessible):
    ```bash
    mongoimport --uri "your_mongodb_connection_string" --collection data --file path/to/jsondata.json --jsonArray
    ```

## Running the Backend

To start the backend server:

```bash
npm start
```

The server will typically run on `http://localhost:5332`.

## API Endpoints

-   `GET /api/data`: Get all data records.
-   `GET /api/data/filter`: Get filtered data records based on query parameters.
-   `GET /api/data/filters`: Get unique values for filter dropdowns.
-   `GET /api/data/stats`: Get average intensity, likelihood, relevance, and total records based on filters.
-   `GET /api/data/intensity-by-year`: Get average intensity grouped by year (filtered).
-   `GET /api/data/topics-distribution`: Get count of records by topic (top 10, filtered).
-   `GET /api/data/likelihood-by-region`: Get average likelihood by region (top 10, filtered).
-   `GET /api/data/relevance-by-sector`: Get average relevance by sector (top 10, filtered).
-   `GET /api/data/country-distribution`: Get count of records by country (top 10, filtered). 