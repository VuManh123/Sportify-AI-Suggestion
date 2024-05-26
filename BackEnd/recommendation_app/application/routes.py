from application import app
from flask import render_template, request
from application.model import generate_song_recos
import pandas as pd

# Load the datasets
songDF = pd.read_csv("./data1/allsong_data.csv")
complete_feature_set = pd.read_csv("./data1/complete_feature.csv")

@app.route("/")
def home():
    # Render the home page
    return render_template('home.html')

@app.route("/about")
def about():
    # Render the about page
    return render_template('about.html')

@app.route('/recommend', methods=['POST'])
def recommend():
    # Requesting the track ID from the HTML form
    track_url = request.form['URL']
    number_of_recs = int(request.form['number-of-recs'])

    # Extract track ID from the URL
    track_id = track_url.split('/')[-1]

    # Generate recommendations based on the specific track ID
    top_recommendations = generate_song_recos(songDF, track_id, complete_feature_set, top_n=number_of_recs)
    print("Recommendations generated successfully.")

    # Check if recommendations were found
    if top_recommendations.empty:
        return "No recommendations found. Please check the track ID and try again.", 404

    # Prepare the list of recommended songs
    my_songs = []
    for i in range(len(top_recommendations)):
        song_name = str(top_recommendations.iloc[i]['track_name'])
        artist_name = str(top_recommendations.iloc[i]['artist_name'])
        track_url = "https://open.spotify.com/track/" + str(top_recommendations.iloc[i]['id'])
        my_songs.append([f"{song_name} - \"{artist_name}\"", track_url])

    return render_template('results.html', songs=my_songs)

