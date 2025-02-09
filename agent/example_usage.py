import json
from agent import analyze_crypto_transactions

wallet_address = ""

tax_analysis = analyze_crypto_transactions(wallet_address)

print(json.dumps(tax_analysis, indent=2))