import json
from agent import analyze_crypto_transactions

wallet_address = "0x5590882e54bB029BA24d54908CD225A1A27CB398"

tax_analysis = analyze_crypto_transactions(wallet_address)

print(json.dumps(tax_analysis, indent=2))