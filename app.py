from flask import Flask, request, jsonify
from home_task import parse_email, classify_with_model

app = Flask(__name__)

@app.route("/classify", methods=["POST"])
def classify():
    print("Received POST /classify")
    data = request.json
    
    if all(k in data for k in ("sender", "subject", "body")):
        sender = data["sender"]
        subject = data["subject"]
        body = data["body"]
    
    elif "email_content" in data:
        sender, subject, body = parse_email(data["email_content"])
    
    else:
        return jsonify({"error": "Missing required fields"}), 400

    result = classify_with_model(sender, subject, body)
    return jsonify({"classification": result})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
