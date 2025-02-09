# AI Crypto Tax Agent

This project is an AI-powered cryptocurrency tax assistant designed to analyze transaction data from a cryptocurrency wallet and estimate potential tax implications. It leverages the OpenAI API for tax analysis and provides insights to the user on potential tax liabilities and optimization strategies.

## Features

*   **AI-Powered Tax Analysis:** Utilizes the OpenAI API to analyze cryptocurrency transactions and identify potential taxable events.
*   **Transaction Data Retrieval:** Fetches transaction data from a specified API based on a wallet address.
*   **Tax Estimation:** Calculates potential tax amounts due for each taxable transaction, considering capital gains/losses and income from staking/rewards.
*   **Tax Optimization Suggestions:** Provides suggestions to the user on how they could potentially optimize their tax liability in the future.
*   **JSON Output:** Returns the analysis results in a structured JSON format.
*   **Configurable System Prompt:**  Uses a system prompt to guide the AI's behavior and ensure accurate analysis.
*   **Error Handling:** Robust error handling for API requests, data validation, and OpenAI API calls.
*   **Modular Design:**  The code is organized into separate modules for better organization and maintainability.

## Technologies Used

*   **Backend (Python):**
    *   Python 3.x
    *   OpenAI API
    *   `requests` library for API calls
    *   `python-dotenv` for managing environment variables
*   **Frontend (Next.js - *Assumed*):**
    *   Next.js (React framework)
    *   (Add specific frontend libraries/frameworks used here, e.g., Material UI, Tailwind CSS, etc.)

## Frontend (Next.js) Setup and Usage

This project is set up to easily communicate with a Next.js frontend.

1.  **Frontend Clone:** Clone the frontend repository (separate from this backend).

2.  **Environment Variables (Frontend):** The frontend will need to know the URL of this backend. In your Next.js project, create a `.env.local` file (or use your preferred environment variable mechanism) and add the following:

    ```
    NEXT_PUBLIC_API_URL=http://localhost:5000/api/analyze  # Or your deployment URL
    ```
    (Replace `http://localhost:5000/api/analyze` with the correct URL for your backend.)


3.  **Adjust Frontend Code:** Modify the example frontend code to fit your specific requirements, including:
    *   Styling using your preferred CSS framework.
    *   Error handling.
    *   User Interface: Adapt the UI elements to match your application's design.
    *   Add loading indicators.
    *   Input Validation: Validate the wallet address input on the frontend to improve user experience.
    *   Display results more elegantly than just a raw JSON dump.

## Backend Setup and Usage

1.  **Clone the Repository:** `git clone [repository_url]`
2.  **Navigate to the Directory:** `cd crypto_tax_agent`
3.  **Install Dependencies:** `pip install -r requirements.txt`
4.  **Set OpenAI API Key:**
    *   Create a `.env` file in the project root directory.
    *   Add your OpenAI API key to the `.env` file:
        ```
        OPENAI_API_KEY=YOUR_OPENAI_API_KEY
        TRANSACTION_API_URL=YOUR_TRANSACTION_API_URL #Optional, can be passed as a parameter
        ```
    *   Replace `YOUR_OPENAI_API_KEY` with your actual OpenAI API key.
    *   Optionally, set the `TRANSACTION_API_URL` if you don't plan to pass it as a parameter to `get_wallet_transactions`.
5.  **(Optional) Set up a Transaction API:**  You need an API that provides cryptocurrency transaction data based on wallet addresses.  You can:
    *   Use a third-party cryptocurrency API (e.g., CoinGecko, Blockchair, etc.).  Choose one that fits your needs and budget.
    *   Build your own API if you have access to blockchain data.
    *   For testing, you can create a mock API that returns sample transaction data.  This allows you to test the agent without connecting to a real API.
6.  **Run the Agent:**
   * Run with Flask: You can use any other web frameworks like Django
    ```bash
    python -m flask --app agent_api run
    ```
   *  Or you can just run the agent directly:
