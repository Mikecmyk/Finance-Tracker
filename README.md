# Finance Tracker

## Project Overview

Finance Tracker is a full-stack web application designed to help users manage their personal finances. It allows users to track their income and expenses, visualize their financial data through charts, and gain insights into their spending habits.

The application is built using modern web technologies to provide a responsive and intuitive user experience.

## Features

* **User Authentication**: Secure sign-up and login powered by Firebase Authentication.
* **Transaction Management**: Add, edit, and delete income and expense transactions.
* **Financial Summary**: View a real-time summary of your total income, total expenses, and current balance.
* **Data Visualization**: Interactive charts to visualize monthly income vs. expenses and categorize spending.
* **Responsive Design**: A clean, modern interface that works seamlessly on desktop and mobile devices.

## Technologies Used

* **Frontend**: React (with Vite)
* **Styling**: Tailwind CSS
* **Backend/Database**: Firebase (Firestore and Authentication)
* **Charting**: Recharts

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

* Node.js (v18 or higher recommended)
* npm (v8 or higher recommended)
* A Firebase project with Firestore and Authentication enabled.

### Installation

1.  **Clone the repository**:
    ```bash
    git clone [https://github.com/Mikecmyk/finance-tracker.git](https://github.com/Mikecmyk/finance-tracker.git)
    ```
2.  **Navigate to the project directory**:
    ```bash
    cd finance-tracker
    ```
3.  **Install dependencies**:
    ```bash
    npm install
    ```
4.  **Set up Firebase**:
    * Create a file named `.env` in the project root.
    * Add your Firebase configuration keys to the file:
        ```
        VITE_FIREBASE_API_KEY="YOUR_API_KEY"
        VITE_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
        VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
        VITE_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
        VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
        VITE_FIREBASE_APP_ID="YOUR_APP_ID"
        ```

### Running the Application

1.  **Start the development server**:
    ```bash
    npm run dev
    ```
2.  **Open the application**:
    * The application will be available at `http://localhost:5173`.