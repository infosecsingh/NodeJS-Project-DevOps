from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route("/contact", methods=["POST"])
def contact():

    data = request.form

    name = data["name"]
    email = data["email"]
    message = data["message"]

    # send to node notification service
    requests.post(
        "http://notification:3001/send",
        json={
            "name": name,
            "email": email,
            "message": message
        }
    )

    return jsonify({"status":"received"})

@app.route("/health")
def health():
    return "OK"

if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000)