import requests
import os
from dotenv import load_dotenv

load_dotenv() # Load environment variables from .env if it exists

def get_wallet_transactions(wallet_address, api_url=None):
    """
    Retrieves transaction data from API.  

    Returns:
        list: A list of transaction dictionaries, or None if an error occurs.
    """
    if api_url is None:
      api_url = os.getenv("TRANSACTION_API_URL") 

    if not api_url:
        print("Error: TRANSACTION_API_URL not found in environment variables or provided as argument")
        return None

    url = f"{api_url}{wallet_address}"  
    try:
        response = requests.get(url)
        response.raise_for_status()  
        return response.json()  
    except requests.exceptions.RequestException as e:
        print(f"API Error: {e}")
        return None

if __name__ == '__main__':
      
    wallet_address = ""  
    
    transactions = get_wallet_transactions(wallet_address, api_url=os.getenv("TRANSACTION_API_URL"))

    if transactions:
        print("Transactions Retrieved:")
        for tx in transactions:
            print(tx)
    else:
        print("Failed to retrieve transactions.")