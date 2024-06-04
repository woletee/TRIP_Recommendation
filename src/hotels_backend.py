from flask import Flask, jsonify, request
import mysql.connector
import logging
import os
from dotenv import load_dotenv
import pandas as pd
from sklearn.cluster import KMeans
import numpy as np

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

app = Flask(__name__)
def convert_to_float(value):
    try:
        return float(value)
    except ValueError:
        return None


# Load data from CSV
print("Loading data from CSV...")
df = pd.read_csv("./Data/Restaurants/dataset.csv")

# Filter out rows with missing longitude or latitude values
print("Filtering out rows with missing coordinates...")
filtered_df = df.dropna(subset=['longitude', 'latitude','rankingPosition','image'])

# Sort by rankingPosition
print("Sorting by ranking position...")
top = filtered_df.sort_values(by=['rankingPosition'], ascending=True)

# Extract coordinates
print("Extracting coordinates...")
coords = top[['longitude', 'latitude']]

# Fit KMeans with k=3
print("Fitting KMeans model...")
kmeans = KMeans(n_clusters=3, init='k-means++')
kmeans.fit(coords)
# Add cluster labels to the DataFrame
top['cluster'] = kmeans.labels_
print(top)


def recommend_restaurants(top, longitude, latitude):
    cluster = kmeans.predict(np.array([longitude, latitude]).reshape(1, -1))[0]
    print("Cluster:", cluster)
    cluster_df = top[top['cluster'] == cluster].iloc[:5, [12,7,9,18,6]]
    return cluster_df


@app.route('/api/clusters')
def get_clusters():
    # Add other information to the clusters data
    print("Preparing clusters data...")
    clusters_data = top[['name', 'rankingPosition', 'address', 'image']]

    # Convert clusters data to list of dictionaries
    print("Converting clusters data to list of dictionaries...")
    clusters_list = clusters_data.to_dict(orient='records')

    print("Data processing completed.")
    return jsonify({'clusters': clusters_list})

@app.route('/api/recommend')
def recommend():
    longitude_str = request.args.get('longitude')
    latitude_str = request.args.get('latitude')
    #rankingPosition=request.args.get('rankingPosition')
    print(top)

    # Convert longitude and latitude strings to floats
    longitude = convert_to_float(longitude_str)
    latitude = convert_to_float(latitude_str)

    if longitude is not None and latitude is not None:
        recommended_restaurants = recommend_restaurants(top, longitude, latitude)
        return jsonify({'recommended_restaurants': recommended_restaurants.to_dict(orient='records')
})
    else:
        return jsonify({'error': 'Invalid longitude or latitude value.'})

if __name__ == '__main__':
    app.run(debug=True)
