from flask import Flask, request, jsonify
import requests
from flask import Response
from prometheus_client import Counter, Histogram, generate_latest, CONTENT_TYPE_LATEST

app = Flask(__name__)

REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP Requests', ['endpoint'])
REQUEST_LATENCY = Histogram('http_request_latency_seconds', 'Request latency', ['endpoint'])


@app.route("/contact", methods=["POST"])
def contact():
    with REQUEST_LATENCY.labels(endpoint="/contact").time():
            REQUEST_COUNT.labels(endpoint="/contact").inc()

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
    with REQUEST_LATENCY.labels(endpoint="/health").time():
        REQUEST_COUNT.labels(endpoint="/health").inc()
    return "OK"

@app.route("/metrics")
def metrics():
    return Response(generate_latest(), mimetype=CONTENT_TYPE_LATEST)



if __name__ == "__main__":
    app.run(host="0.0.0.0",port=5000)