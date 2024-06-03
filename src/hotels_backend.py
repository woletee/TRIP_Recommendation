from flask import Flask, jsonify, request
import mysql.connector
import logging
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Load database configuration from environment variables
db_config = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', 'root'),
    'database': os.getenv('DB_NAME', 'recommendation_system')
}

def get_top_hotels(limit=20):
    try:
        # Connect to the MySQL database
        conn = mysql.connector.connect(**db_config)
        cursor = conn.cursor(dictionary=True)

        # Query to get the top 20 hotels based on rating
        query = """
        SELECT hotel_id, image_url, description, hotel_name, rating
        FROM hotels
        ORDER BY rating DESC
        LIMIT %s;
        """
        cursor.execute(query, (limit,))
        top_hotels = cursor.fetchall()

        # Close the database connection
        cursor.close()
        conn.close()

        return top_hotels
    except mysql.connector.Error as err:
        logging.error(f"MySQL Error: {err}")
        return {'error': str(err)}
    except Exception as e:
        logging.error(f"General Error: {e}")
        return {'error': str(e)}

@app.route('/', methods=['GET'])
def home():
    logging.debug("Default route '/' was called")
    return jsonify({'message': 'Welcome to the Hotels API. Use /api/top-hotels to get the top hotels.'})

@app.route('/api/top-hotels', methods=['GET'])
def api_top_hotels():
    logging.debug("API endpoint '/api/top-hotels' was called")
    top_hotels = get_top_hotels()
    if 'error' in top_hotels:
        return jsonify(top_hotels), 500
    return jsonify(top_hotels)

@app.errorhandler(404)
def not_found_error(error):
    logging.error(f"404 Error: {request.url} was not found on the server.")
    return jsonify({'error': 'Not Found', 'message': f"The requested URL {request.url} was not found on the server."}), 404

@app.errorhandler(500)
def internal_error(error):
    logging.error(f"500 Error: Internal server error at {request.url}. Error: {error}")
    return jsonify({'error': 'Internal Server Error', 'message': 'An internal server error occurred.'}), 500

@app.errorhandler(Exception)
def handle_exception(error):
    logging.error(f"Unhandled Exception: {error}")
    return jsonify({'error': 'Server Error', 'message': str(error)}), 500

if __name__ == '__main__':
    app.run(debug=True)
