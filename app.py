from flask import Flask, jsonify, request
import pandas as pd
from sklearn.cluster import KMeans
import numpy as np


# Initialize W&B with your API key


app = Flask(__name__)
def convert_to_float(value):
    try:
        return float(value)
    except ValueError:
        return None


# Load data from CSV
print("Loading data from CSV...")
df = pd.read_csv("/home/carla/Desktop/dataset.csv")

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
