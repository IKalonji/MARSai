from flask import Flask, request
from agent import Agent

app = Flask(__name__)
deployed_agents = {}

@app.route("/")
def hello_world():
    return "<p>TAX AGENT!</p>"

@app.route("/agent/has_agent/<address>", methods=["GET"])
def has_agent(address):
    try: 
        if deployed_agents.get(address) != None:
            return {"result": "ok", "name": deployed_agents.get(address).name }
        return {"result": "not found"}
    except Exception as e:
        return {"result": "error", "error": e}

@app.route("/agent/deploy/<address>/<name>", methods=["GET"])
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
def analyze(address):
    print("called analyze")
    try: 
        agent = deployed_agents.get(address)
        print("Agent found, ", agent)
        return agent.analyze_crypto_transactions()
    except Exception as e:
        return {"result": "error", "error": e}
    
@app.route("/agent/chat/<address>", methods=["POST"])
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