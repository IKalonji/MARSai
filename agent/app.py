from flask import Flask, request
from flask_cors import CORS, cross_origin
from agent import Agent
from db_client import SQLiteDB

app = Flask(__name__)
CORS(app=app)

DBCLIENT = SQLiteDB("analysisDB")
DBCLIENT.create_table("analysis_history", {
    "user": "TEXT UNIQUE", #Wallet address,
    "agent_name": "TEXT",
    "analysis_as text": "TEXT",
    "analysis_transactions": "TEXT"
})

deployed_agents = {}

@app.route("/")
@cross_origin()
def hello_world():
    return "<p>TAX AGENT!</p>"

@app.route("/agent/has_agent/<address>", methods=["GET"])
@cross_origin()
def has_agent(address):
    try: 
        if deployed_agents.get(address) != None:
            return {"result": "ok", "name": deployed_agents.get(address).name }
        return {"result": "not found"}
    except Exception as e:
        return {"result": "error", "error": e}

@app.route("/agent/deploy/<address>/<name>", methods=["GET"])
@cross_origin()
def deploy(address, name):
    if deployed_agents.get(address) != None:
        return {"error": "User already has an agent"}
    try: 
        user_agent = Agent(address, name)
        deployed_agents[address] = user_agent
        return {"result" : "ok", "name": deployed_agents[address].name}
    except Exception as e:
        return {"result": "error", "error": e}

@app.route("/agent/analyze/<address>", methods=["GET"])
@cross_origin()
def analyze(address):
    print("called analyze")
    try: 
        agent = deployed_agents.get(address)
        print("Agent found, ", agent)
        return agent.analyze_crypto_transactions()
    except Exception as e:
        return {"result": "error", "error": e}
    
@app.route("/agent/chat/<address>", methods=["POST"])
@cross_origin()
def chat(address):
    body = request.get_json()
    print("request body, ", body)
    try: 
        agent = deployed_agents.get(address)
        return agent.agent_chat(body['query'])
    except Exception as e:
        return {"result": "error", "error": e}
    
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8085)