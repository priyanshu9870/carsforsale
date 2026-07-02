import logging
from flask import Flask, request, jsonify
from pymongo import MongoClient
from werkzeug.security import check_password_hash, generate_password_hash
from flask_cors import CORS
import os 
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

logging.basicConfig(level=logging.DEBUG)

load_dotenv()

# Configure MongoDB
# client = MongoClient('mongodb://mongo:27017/')
# db = client['user_database']
# users_collection = db['users']

MONGO_URI = os.getenv("MONGO_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
users_collection = db["users"]

@app.route('/register', methods=['POST'])
def register_user():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 415

    data = request.get_json()
    print("Received data:", data)  # Debugging statement

    email = data.get('email')
    fullname = data.get('fullname')
    password = data.get('password')

    if not email or not fullname or not password:
        return jsonify({"error": "Email, username, and password are required"}), 400

    existing_user = users_collection.find_one({"email": email})

    print("Searching for:", email)
    print("Existing User:", existing_user)

    if existing_user:
        return jsonify({"error": "Email already exists"}), 400

    hashed_password = generate_password_hash(password)

    user = {
        "email": email,
        "fullname": fullname,
        "password": hashed_password
    }

    users_collection.insert_one(user)

    return jsonify({"message": "User registered successfully"}), 201



@app.route('/login', methods=['POST' , 'OPTIONS'])
def login_user():
    if request.method == 'OPTIONS':
    # Respond to preflight requests
        response = jsonify({'message': 'Preflight request handled'})
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response
    if not request.is_json:
        app.logger.debug("Request content-type is not JSON")
        return jsonify({"error": "Request must be JSON"}), 415

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        app.logger.debug("Missing email or password")
        return jsonify({"error": "Email and password are required"}), 400

    user = users_collection.find_one({"email": email})
    if user and check_password_hash(user['password'], password):
        app.logger.debug("Login successful")
        return jsonify({"success": True, "message": "Login successful"}), 200
    else:
        app.logger.debug("Invalid email or password")
        return jsonify({"error": "Invalid email or password"}), 401

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
# if __name__ == "__main__":
#     app.run(debug=True)