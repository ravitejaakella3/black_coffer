# Frontend (React.js Dashboard)

This directory contains the frontend for the Data Visualization Dashboard, built with React.js. It consumes data from the Node.js Express backend API to display interactive charts and statistics.

## Getting Started

To get a local copy of this project up and running, follow these simple steps.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/ravitejaakella3/black_coffer.git
    ```
2.  **Navigate to the frontend directory:**
    ```bash
    cd black_coffer/frontend
    ```

## Features

-   **Interactive Filters:** Dynamically filter data by year, topic, sector, region, pestle, source, and country.
-   **Key Statistics:** Displays average intensity, likelihood, relevance, and total records.
-   **Dynamic Charts:** Visualizes data using Chart.js, including:
    -   Average Intensity by Year (Line Chart)
    -   Topics Distribution (Pie Chart)
    -   Average Likelihood by Region (Bar Chart)
    -   Average Relevance by Sector (Bar Chart)
    -   Country Distribution (Doughnut Chart)

## Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

## Running the Frontend

To start the frontend development server:

```bash
npm start
```

This will typically open the application in your browser at `http://localhost:3000` (or another available port).

**Note:** Ensure the backend server is running (`npm start` in the `backend` directory) before starting the frontend, as the frontend relies on the backend API for data.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


