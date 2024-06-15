
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
import logging
import os
import json
import pandas as pd
import joblib
import traceback
import random

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Paths to the model and dataset files
place_model_path = 'place_recommendation_model.pkl'
restaurant_model_path = 'kmeans_restaurants.pkl'
hotel_model_path = 'kmeans_hotels.pkl'
mall_model_path = 'kmeans_malls.pkl'  # Add the mall model path

places_data_path = 'combined_places_data(2).xlsx'
clustered_restaurants_data_path = 'clustered_restaurants_data.xlsx'
clustered_hotels_data_path = 'clustered_hotels_data.xlsx'
clustered_malls_data_path = 'clustered_malls_data.xlsx'  # Add the mall data path
places_csv_path = 'combined_places_data(2).csv'

# Define the conversion rate
USD_TO_KRW_CONVERSION_RATE = 1300.0

# List of hotel images
hotel_images = [
    # (Hotel images list)
]

# List of mall images
mall_images = [
    # (Mall images list)
]

# Load hotel data from JSON file
def load_hotel_data():
    try:
        with open('Hotels_Final.json', 'r') as file:
            data = json.load(file)
            logging.debug(f"Hotel data loaded: {data}")
            return data
    except FileNotFoundError as e:
        logging.error(f"File not found: {e}")
        return []
    except json.JSONDecodeError as e:
        logging.error(f"Error decoding JSON: {e}")
        return []
    except Exception as e:
        logging.error(f"Error loading hotel data: {e}")
        return []

# Function to get all hotels
def get_all_hotels():
    try:
        hotels = load_hotel_data()
        return hotels
    except KeyError as e:
        logging.error(f"Key error: {e}")
        return {'error': f"Key error: {e}"}
    except Exception as e:
        logging.error(f"General Error: {e}")
        return {'error': str(e)}

# Function to get top 7 hotels based on rating from all hotels
def get_top_hotels_from_all():
    try:
        hotels = get_all_hotels()
        if isinstance(hotels, dict) and 'error' in hotels:
            return hotels
        top_hotels = sorted(hotels, key=lambda x: x.get('rating', {}).get('value', 0), reverse=True)[:4]
        return top_hotels
    except KeyError as e:
        logging.error(f"Key error: {e}")
        return {'error': f"Key error: {e}"}
    except Exception as e:
        logging.error(f"General Error: {e}")
        return {'error': str(e)}

# Load restaurant data from CSV file
def load_restaurant_data():
    try:
        df = pd.read_csv('Restaurant.csv')
        data = df.to_dict(orient='records')
        logging.debug(f"Restaurant data loaded: {data}")
        return data
    except FileNotFoundError as e:
        logging.error(f"File not found: {e}")
        return []
    except pd.errors.EmptyDataError as e:
        logging.error(f"Empty data error: {e}")
        return []
    except pd.errors.ParserError as e:
        logging.error(f"Parsing error: {e}")
        return []
    except Exception as e:
        logging.error(f"Error loading restaurant data: {e}")
        return []

# Function to get all restaurants
def get_all_restaurants():
    try:
        restaurants = load_restaurant_data()
        return restaurants
    except KeyError as e:
        logging.error(f"Key error: {e}")
        return {'error': f"Key error: {e}"}
    except Exception as e:
        logging.error(f"General Error: {e}")
        return {'error': str(e)}

# Function to get top restaurants based on ranking from all restaurants
def get_top_restaurants():
    try:
        restaurants = get_all_restaurants()
        if isinstance(restaurants, dict) and 'error' in restaurants:
            return restaurants
        top_restaurants = sorted(restaurants, key=lambda x: x.get('rankingPosition', float('inf')))[:4]
        return top_restaurants
    except KeyError as e:
        logging.error(f"Key error: {e}")
        return {'error': f"Key error: {e}"}
    except Exception as e:
        logging.error(f"General Error: {e}")
        return {'error': str(e)}

# Function to load the trained models
def load_model(file_path):
    if os.path.exists(file_path):
        try:
            return joblib.load(file_path)
        except ModuleNotFoundError as e:
            print(f"Error loading model: {e}")
            raise
    else:
        raise FileNotFoundError(f"Model file not found: {file_path}")

# Function to load the datasets
def load_dataset(file_path, file_type='xlsx'):
    if os.path.exists(file_path):
        if file_type == 'xlsx':
            return pd.read_excel(file_path, engine='openpyxl')
        elif file_type == 'csv':
            return pd.read_csv(file_path, encoding='latin1')
    else:
        raise FileNotFoundError(f"Dataset file not found: {file_path}")

# Load models
try:
    place_model = load_model(place_model_path)
    restaurant_model = load_model(restaurant_model_path)
    hotel_model = load_model(hotel_model_path)
except FileNotFoundError as e:
    print(e)
    exit(1)
except ModuleNotFoundError as e:
    print(e)
    exit(1)

# Load datasets
try:
    places_data = load_dataset(places_data_path)
    restaurants_data = load_dataset(clustered_restaurants_data_path)
    hotels_data = load_dataset(clustered_hotels_data_path) # Load the mall data
    hotels_data['price.value'] = hotels_data['price.value'].replace(r'[\$,]', '', regex=True)
    hotels_data['price.value'] = pd.to_numeric(hotels_data['price.value'], errors='coerce')
    hotels_data = hotels_data.dropna(subset=['price.value', 'location.lat', 'location.lng'])
except FileNotFoundError as e:
    print(e)
    exit(1)

# One-hot encode the 'Type' column to ensure consistent features for place recommendations
places_data = pd.get_dummies(places_data, columns=['Type'], prefix='Type')

# Prepare features for place recommendation model
place_features = ['Rating', 'latitude', 'longitude', 'Open Hour', 'Close Hour'] + [col for col in places_data.columns if col.startswith('Type_')]

@app.route('/', methods=['GET'])
def home():
    logging.debug("Default route '/' was called")
    return jsonify({'message': 'Welcome to the Hotels and Trip Recommendation API. Use /api/all-hotels to get all the hotels, /api/all-restaurants to get all the restaurants, or /recommend to get trip recommendations.'})

@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

# Load places data from CSV file
def load_places_data():
    try:
        df = pd.read_csv(places_csv_path, encoding='latin1')
        data = df.to_dict(orient='records')
        logging.debug(f"Places data loaded: {data}")
        return data
    except FileNotFoundError as e:
        logging.error(f"File not found: {e}")
        return []
    except pd.errors.EmptyDataError as e:
        logging.error(f"Empty data error: {e}")
        return []
    except pd.errors.ParserError as e:
        logging.error(f"Parsing error: {e}")
        return []
    except Exception as e:
        logging.error(f"Error loading places data: {e}")
        return []

# Function to get all places
def get_all_places():
    try:
        places = load_places_data()
        return places
    except KeyError as e:
        logging.error(f"Key error: {e}")
        return {'error': f"Key error: {e}"}
    except Exception as e:
        logging.error(f"General Error: {e}")
        return {'error': str(e)}

# Function to get top places based on rating
def get_top_places():
    try:
        places = get_all_places()
        if isinstance(places, dict) and 'error' in places:
            return places
        top_places = sorted(places, key=lambda x: x.get('Rating', 0), reverse=True)[:4]
        return top_places
    except KeyError as e:
        logging.error(f"Key error: {e}")
        return {'error': f"Key error: {e}"}
    except Exception as e:
        logging.error(f"General Error: {e}")
        return {'error': str(e)}

@app.route('/recommend', methods=['POST'])
def recommend():
    try:
        user_input = request.json
        print("Received user input:", user_input)
        
        place_type = user_input.get('type', 'museum')
        start_time = int(user_input.get('start_time', 9))
        end_time = int(user_input.get('end_time', 17))
        include_restaurants = user_input.get('restaurant_recommendation', 'no') == 'yes'
        include_hotels = user_input.get('hotel_recommendation', 'no') == 'yes'
        include_malls = user_input.get('mall_recommendation', 'no') == 'yes'
        restaurant_budget = float(user_input.get('restaurant_budget', 0)) if include_restaurants else 0
        hotel_budget = float(user_input.get('hotel_budget', 0)) * USD_TO_KRW_CONVERSION_RATE if include_hotels else 0

        print(f"Place type: {place_type}, Start time: {start_time}, End time: {end_time}, Include Restaurants: {include_restaurants}, Include Hotels: {include_hotels}, Include Malls: {include_malls}")

        filtered_places = places_data[(places_data[f'Type_{place_type}'] == 1) &
                                      (places_data['Open Hour'] <= start_time) &
                                      (places_data['Close Hour'] >= end_time)].copy()

        if filtered_places.empty:
            print("No places found for the given criteria.")
            return jsonify({'places': [], 'restaurants': [], 'hotels': [], 'malls': []}), 200

        X_places = filtered_places[place_features]

        print(f"Filtered places count: {len(filtered_places)}")

        predicted_ratings = place_model.predict(X_places)
        filtered_places['predicted_rating'] = predicted_ratings
        recommended_places = filtered_places.sort_values(by='predicted_rating', ascending=False).head(5)

        response = {
            'places': recommended_places.to_dict(orient='records'),
            'restaurants': [],
            'hotels': [],
            'malls': []
        }

        if include_restaurants:
            try:
                user_location = [recommended_places.iloc[0]['latitude'], recommended_places.iloc[0]['longitude'], restaurant_budget]
                cluster = restaurant_model.predict([user_location])[0]
                recommended_restaurants = restaurants_data[restaurants_data['cluster'] == cluster]
                recommended_restaurants['distance'] = ((recommended_restaurants['latitude'] - user_location[0]) ** 2 + 
                                                       (recommended_restaurants['longitude'] - user_location[1]) ** 2) ** 0.5
                recommended_restaurants = recommended_restaurants.sort_values('distance').head(5)
                response['restaurants'] = recommended_restaurants.to_dict(orient='records')
            except Exception as e:
                print("Error fetching restaurant recommendations:", str(e))
                traceback.print_exc()
        else:
            print("Skipping restaurant recommendations based on user preference.")

        if include_hotels:
            try:
                user_location = [recommended_places.iloc[0]['latitude'], recommended_places.iloc[0]['longitude'], hotel_budget]
                cluster = hotel_model.predict([[user_location[0], user_location[1], user_location[2]]])[0]
                recommended_hotels = hotels_data[hotels_data['cluster'] == cluster]
                recommended_hotels['distance'] = ((recommended_hotels['location.lat'] - user_location[0]) ** 2 + 
                                                  (recommended_hotels['location.lng'] - user_location[1]) ** 2 + 
                                                  (recommended_hotels['price.value'] - user_location[2]) ** 2) ** 0.5
                recommended_hotels = recommended_hotels.sort_values('distance').head(5)
                recommended_hotels['thumbnail'] = [random.choice(hotel_images) for _ in range(len(recommended_hotels))]
                response['hotels'] = recommended_hotels.to_dict(orient='records')
            except Exception as e:
                print("Error fetching hotel recommendations:", str(e))
                traceback.print_exc()
        else:
            print("Skipping hotel recommendations based on user preference.")

    
        return jsonify(response)
    except Exception as e:
        print("Error during recommendation:", str(e))
        print(traceback.format_exc())
        return jsonify({'error': str(e)}), 500

@app.route('/api/all-hotels', methods=['GET'])
def api_all_hotels():
    logging.debug("API endpoint '/api/all-hotels' was called")
    all_hotels = get_all_hotels()
    if 'error' in all_hotels:
        return jsonify(all_hotels), 500
    return jsonify(all_hotels)

@app.route('/api/top-hotels', methods=['GET'])
def api_top_hotels():
    logging.debug("API endpoint '/api/top-hotels' was called")
    top_hotels = get_top_hotels_from_all()
    if 'error' in top_hotels:
        return jsonify(top_hotels), 500
    return jsonify(top_hotels)

@app.route('/api/all-restaurants', methods=['GET'])
def api_all_restaurants():
    logging.debug("API endpoint '/api/all-restaurants' was called")
    all_restaurants = get_all_restaurants()
    if 'error' in all_restaurants:
        return jsonify(all_restaurants), 500
    return jsonify(all_restaurants)

@app.route('/api/top-restaurants', methods=['GET'])
def api_top_restaurants():
    logging.debug("API endpoint '/api/top-restaurants' was called")
    top_restaurants = get_top_restaurants()
    if 'error' in top_restaurants:
        return jsonify(top_restaurants), 500
    return jsonify(top_restaurants)

@app.route('/api/all-places', methods=['GET'])
def api_all_places():
    logging.debug("API endpoint '/api/all-places' was called")
    all_places = get_all_places()
    if 'error' in all_places:
        return jsonify(all_places), 500
    return jsonify(all_places)

@app.route('/api/top-places', methods=['GET'])
def api_top_places():
    logging.debug("API endpoint '/api/top-places' was called")
    top_places = get_top_places()
    if 'error' in top_places:
        return jsonify(top_places), 500
    return jsonify(top_places)

def convert_to_float(value):
    try:
        return float(value)
    except ValueError:
        return None

# Load data from CSV
print("Loading data from CSV...")
df = pd.read_csv("Places.csv")
print("Sort by ranking position...")
top = df.sort_values(by=['Rating'], ascending=True)

# Load restaurant data
df_res = pd.read_csv("Restaurant.csv")
top_res = df_res.dropna(subset=['Ranking', 'image', 'longitude', 'latitude', 'phone'])

# Load shopping malls data
df_malls = pd.read_csv("ShoppingMalls.csv")
top_malls = df_malls.dropna(subset=['Ranking', 'image', 'longitude', 'latitude', 'phone', 'website'])

# Load hotels data
df_hotels = pd.read_csv("Hotels.csv")
top_hotels = df_hotels.dropna(subset=['image', 'longitude', 'latitude'])

# Extract coordinates for KMeans
coords_res = top_res[['longitude', 'latitude']]
coords_malls = top_malls[['longitude', 'latitude']]
coords_hotels = top_hotels[['longitude', 'latitude']]
coords_places = top[['longitude', 'latitude']]

# Fit KMeans with k=3 for all datasets
kmeans_res = KMeans(n_clusters=8, init='k-means++')
kmeans_res.fit(coords_res)
top_res['cluster'] = kmeans_res.labels_

kmeans_malls = KMeans(n_clusters=3, init='k-means++')
kmeans_malls.fit(coords_malls)
top_malls['cluster'] = kmeans_malls.labels_

kmeans_hotels = KMeans(n_clusters=8, init='k-means++')
kmeans_hotels.fit(coords_hotels)
top_hotels['cluster'] = kmeans_hotels.labels_

kmeans_places = KMeans(n_clusters=8, init='k-means++')
kmeans_places.fit(coords_places)
top['cluster'] = kmeans_places.labels_


def recommend_places(longitude, latitude):
    cluster = kmeans_places.predict(np.array([longitude, latitude]).reshape(1, -1))[0]
    cluster_df = top[top['cluster'] == cluster].iloc[:3, [0, 3, 6, 7, 8]]
    return cluster_df

def recommend_restaurants(longitude, latitude):
    cluster = kmeans_res.predict(np.array([longitude, latitude]).reshape(1, -1))[0]
    cluster_df = top_res[top_res['cluster'] == cluster].iloc[:3, [0, 2, 3, 4, 5, 7, 8]]
    return cluster_df

def recommend_malls(longitude, latitude):
    cluster = kmeans_malls.predict(np.array([longitude, latitude]).reshape(1, -1))[0]
    cluster_df = top_malls[top_malls['cluster'] == cluster].iloc[:3, [0, 1, 2, 3, 4]]
    return cluster_df

def recommend_hotels(longitude, latitude):
    cluster = kmeans_hotels.predict(np.array([longitude, latitude]).reshape(1, -1))[0]
    cluster_df = top_hotels[top_hotels['cluster'] == cluster].iloc[:3, [0, 1, 2, 6, 7]]
    return cluster_df
    
@app.route('/places')
def get_clusters():
    clusters_data = top[['Name', 'Rating', 'image', 'longitude', 'latitude','Location']]
    clusters_list = clusters_data.to_dict(orient='records')
    return jsonify({'clusters': clusters_list})

@app.route('/restaurants')
def get_restaurant_clusters():
    clusters_data = top_res[['name', 'Ranking', 'address', 'image', 'longitude', 'latitude', 'phone']]
    clusters_list = clusters_data.to_dict(orient='records')
    return jsonify({'clusters': clusters_list})
@app.route('/places/recommend')
def recommend_places_endpoint():
    longitude_str = request.args.get('longitude')
    latitude_str = request.args.get('latitude')

    longitude = convert_to_float(longitude_str)
    latitude = convert_to_float(latitude_str)

    if longitude is not None and latitude is not None:
        recommended_restaurants = recommend_restaurants(longitude, latitude)
        recommended_malls = recommend_malls(longitude, latitude)
        recommended_hotels = recommend_hotels(longitude, latitude)
        
        return jsonify({
            'recommended_restaurants': recommended_restaurants.to_dict(orient='records'),
            'recommended_malls': recommended_malls.to_dict(orient='records'),
            'recommended_hotels': recommended_hotels.to_dict(orient='records')
        })
    else:
        return jsonify({'error': 'Invalid longitude or latitude value.'}), 400

@app.route('/restaurants/recommend')
def recommend_restaurants_endpoint():
    longitude_str = request.args.get('longitude')
    latitude_str = request.args.get('latitude')

    longitude = convert_to_float(longitude_str)
    latitude = convert_to_float(latitude_str)

    if longitude is not None and latitude is not None:
        recommended_places = recommend_places(longitude, latitude)
        recommended_malls = recommend_malls(longitude, latitude)
        recommended_hotels = recommend_hotels(longitude, latitude)
        
        return jsonify({
            'recommended_places': recommended_places.to_dict(orient='records'),
            'recommended_malls': recommended_malls.to_dict(orient='records'),
            'recommended_hotels': recommended_hotels.to_dict(orient='records')
        })
    else:
        return jsonify({'error': 'Invalid longitude or latitude value.'}), 400

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
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
