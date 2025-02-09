from flask import Flask
from agent import analyze_crypto_transactions

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>TAX AGENT!</p>"

@app.route("/agent/<address>", methods=["GET"])
def analyze(address):
    try: 
        return analyze_crypto_transactions(address)
    except Exception as e:
        return {"result": "error", "error": e}
    
