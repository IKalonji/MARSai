import openai
import json
import os
from dotenv import load_dotenv
from api_client import get_wallet_transactions
from utils import validate_transaction_data  

load_dotenv()  


openai.api_key = os.getenv("OPENAI_API_KEY")

def analyze_crypto_transactions(wallet_address):
    """
    Analyzes cryptocurrency transactions for potential tax implications.

    Args:
        wallet_address (str): The cryptocurrency wallet address to analyze.

    Returns:
        dict: A JSON object containing the analysis results.  Follows the specified format.
    """
    transactions = get_wallet_transactions(wallet_address)
    print(transactions)
    if not transactions:
        return {
            "response": "error",
            "error": "Failed to retrieve transaction data."
        }

    # Basic data validation (you'll likely want to expand this)
    if not all(validate_transaction_data(tx) for tx in transactions['data']['transactions']):
        return {
            "response": "error",
            "error": "Invalid transaction data received."
        }


    # Load the system prompt
    
    with open("agent/system_prompt.txt", "r") as f:
        system_prompt = f.read()

    # Construct the message for OpenAI
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": json.dumps(transactions)}
    ]

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini", 
            messages=messages,
            temperature=0.7  
        )

        ai_response = response.choices[0].message.content

        
        try:
            
            cleaned_response = ai_response.replace("```json", "").replace("```", "")

            print("Cleaned response: ", cleaned_response)
            
            json_response = json.loads(cleaned_response)

            if not isinstance(json_response, dict) or "analysis" not in json_response:
                raise ValueError("Invalid JSON response format from AI.")

            return json_response 

        except json.JSONDecodeError as e:
            print(f"JSON Decode Error: {e}")
            print(f"AI Response: {ai_response}") 
            return {
                "response": "error",
                "error": "Failed to decode JSON response from AI. Check AI output in logs."
            }
        except ValueError as e:
            print(f"Value Error: {e}")
            return {
                "response": "error",
                "error": str(e)
            }



    except Exception as e:
        print(f"OpenAI API Error: {e}")
        return {
            "response": "error",
            "error": f"OpenAI API Error: {e}"
        }


if __name__ == '__main__':
    
    wallet_address = ""  
    tax_analysis = analyze_crypto_transactions(wallet_address)

    print(json.dumps(tax_analysis, indent=2))