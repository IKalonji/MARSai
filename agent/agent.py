import openai
import json
import os
from dotenv import load_dotenv
from api_client import get_wallet_transactions
from utils import validate_transaction_data  

load_dotenv()  

class Agent():

    def __init__(self, wallet_address, name):
        print("agent init")
        self.name = name
        self.agent_key = os.getenv("OPENAI_API_KEY")
        self.wallet_address = wallet_address
        openai.api_key = self.agent_key
        self.context = None

    def get_system_prompt(self, file):

        script_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(script_dir, file)

        with open(file_path, "r") as f:
            system_prompt = f.read()
        return system_prompt
    
    def agent_chat(self, question):
        """
        Chat with the agent based on the current tax report and suggestions.

        Returns:
            dict: A JSON object containing the chat results.  Follows the specified format.
        """

        system_prompt = self.get_system_prompt("system_chat_prompt.txt")

        if self.context == None:
            return {
                    "response": "error",
                    "error": "No analysis found in the agent context, try getting your analysis first."
                }
        
        message = f"{self.context}\n{question}?"

        return self.send_query_to_llm(system_prompt, message)

    def send_query_to_llm(self, system_prompt, content):
        print("Sending to LLM")
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": content}
        ]

        try:
            response = openai.ChatCompletion.create(
                model="gpt-4o-mini", 
                messages=messages,
                temperature=0.7  
            )

            ai_response = response.choices[0].message.content
            self.context = ai_response

            try:
                cleaned_response = ai_response.replace("```json", "").replace("```", "")
                json_response = json.loads(cleaned_response)
                print(json_response)
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
                print(json_response)
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

    def analyze_crypto_transactions(self):
        """
        Analyzes cryptocurrency transactions for potential tax implications.

        Args:
            wallet_address (str): The cryptocurrency wallet address to analyze.

        Returns:
            dict: A JSON object containing the analysis results.  Follows the specified format.
        """
        print("In analyze")
        transactions = get_wallet_transactions(self.wallet_address)
        
        if not transactions:
            return {
                "response": "error",
                "error": "Failed to retrieve transaction data."
            }

        if not all(validate_transaction_data(tx) for tx in transactions['data']['transactions']):
            return {
                "response": "error",
                "error": "Invalid transaction data received."
            }

        system_prompt = self.get_system_prompt("system_prompt.txt")

        return self.send_query_to_llm(system_prompt, json.dumps(transactions))
    
    
# Test Agent
if __name__ == '__main__':
    wallet_address = "0x5590882e54bb029ba24d54908cd225a1a27cb398" 
    agent = Agent(os.getenv("OPENAI_API_KEY"), wallet_address)
    tax_analysis = agent.analyze_crypto_transactions()
    print(json.dumps(tax_analysis, indent=2))
    chat_response = agent.agent_chat("Which of my assets generated the highest tax obligation")
    print(json.dumps(chat_response, indent=2))