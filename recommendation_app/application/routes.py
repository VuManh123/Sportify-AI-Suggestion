from application import app
from flask import render_template, request
from application.model import generate_song_recos
import pandas as pd

# Load the datasets
songDF = pd.read_csv("./application/frontend/data1/allsong_data.csv")
complete_feature_set = pd.read_csv("./application/frontend/data1/complete_feature.csv")

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
    # track_url = request.form['URL']
    # Extract track ID from the URL
    # track_id = track_url.split('/')[-1]
    track_id = request.json['track_id']

    # number_of_recs = int(request.form['number-of-recs'])
    number_of_recs = request.json['number_of_recs']
    

    # Generate recommendations based on the specific track ID
    top_recommendations = generate_song_recos(songDF, track_id, complete_feature_set, top_n=number_of_recs)
    print("Recommendations generated successfully.")

    # Check if recommendations were found
    if top_recommendations.empty:
        return "No recommendations found. Please check the track ID and try again.", 404

    # Prepare the list of recommended songs
    my_songs = []
    for i in range(len(top_recommendations)):
                albumCover= str(top_recommendations.iloc[i]['image_uri'])
                trackId= str(top_recommendations.iloc[i]['id'])
                trackName= str(top_recommendations.iloc[i]['track_name'])
                artists= str(top_recommendations.iloc[i]['artist_name'])
                danceability= str(top_recommendations.iloc[i]['danceability'])
                energy= str(top_recommendations.iloc[i]['energy'])
                key= str(top_recommendations.iloc[i]['key'])
                loudness= str(top_recommendations.iloc[i]['loudness'])
                mode= str(top_recommendations.iloc[i]['mode'])
                speechiness= str(top_recommendations.iloc[i]['speechiness'])
                acousticness= str(top_recommendations.iloc[i]['acousticness'])
                instrumentalness= str(top_recommendations.iloc[i]['instrumentalness'])
                livenes= float(top_recommendations.iloc[i]['liveness'])
                valence= float(top_recommendations.iloc[i]['valence'])
                tempo= float(top_recommendations.iloc[i]['tempo'])
                trackGenres= str(top_recommendations.iloc[i]['genres'])
      
                my_songs.append({
                "albumCover": albumCover,
                "trackId":trackId,
                "trackName": trackName,
                "artists": artists,
                "danceability": danceability,
                "energy": energy,
                "key": key,
                "loudness": loudness,
                "mode": mode,
                "speechiness": speechiness,
                "acousticness": acousticness,
                "instrumentalness": instrumentalness,
                "livenes": livenes,
                "valence": valence,
                "tempo":tempo,
                "trackGenres": trackGenres
            })
        # # artist_name = str(top_recommendations.iloc[i]['artist_name'])
        # track_url = "https://open.spotify.com/track/" + str(top_recommendations.iloc[i]['id'])
        # my_songs.append(json.dumps(top_recommendations.iloc[i]))
        # print(my_songs)
        # print(top_recommendations.iloc[i])
        # my_songs.append([song_name,artist_name, danceability,energy,key,loudness,mode,speechiness,acousticness,instrumentalness])
          
 
    # return render_template('results.html', songs=my_songs)
    return {"songs": my_songs}, 200




# @app.route('/recommend', methods=['POST'])
# def recommend():
#     # Requesting the track ID from the HTML form
#     track_url = request.form['URL']
#     number_of_recs = int(request.form['number-of-recs'])

#     # Extract track ID from the URL
#     track_id = track_url.split('/')[-1]

#     # Generate recommendations based on the specific track ID
#     top_recommendations = generate_song_recos(songDF, track_id, complete_feature_set, top_n=number_of_recs)
#     print("Recommendations generated successfully.")

#     # Check if recommendations were found
#     if top_recommendations.empty:
#         return "No recommendations found. Please check the track ID and try again.", 404

#     # Prepare the list of recommended songs
#     my_songs = []
#     for i in range(len(top_recommendations)):
#         song_name = str(top_recommendations.iloc[i]['track_name'])
#         artist_name = str(top_recommendations.iloc[i]['artist_name'])
#         track_url = "https://open.spotify.com/track/" + str(top_recommendations.iloc[i]['id'])
#         my_songs.append([f"{song_name} - \"{artist_name}\"", track_url])

#     return render_template('results.html', songs=my_songs)

#  trackId= str(top_recommendations.iloc[i]['trackId'])
#                 trackName= str(top_recommendations.iloc[i]['trackName'])
#                 artists= list(top_recommendations.iloc[i]['artists'])
#                 danceability= str(top_recommendations.iloc[i]['danceability'])
#                 energy= str(top_recommendations.iloc[i]['energy'])
#                 key= str(top_recommendations.iloc[i]['key'])
#                 loudness= str(top_recommendations.iloc[i]['loudness'])
#                 mode= str(top_recommendations.iloc[i]['mode'])
#                 speechiness= str(top_recommendations.iloc[i]['speechiness'])
#                 acousticness= str(top_recommendations.iloc[i]['acousticness'])
#                 instrumentalness= str(top_recommendations.iloc[i]['instrumentalness'])
#                 livenes= float(top_recommendations.iloc[i]['liveness'])
#                 valence= float(top_recommendations.iloc[i]['valence'])
#                 tempo= float(top_recommendations.iloc[i]['tempo'])
#                 trackGenres= list(top_recommendations.iloc[i]['trackGenres'])
      
#         my_songs.append({
#                 "track_name": trackName,
#                 "artist_name": artists,
#                 "danceability": danceability,
#                 "energy": energy,
#                 "key": key,
#                 "loudness": loudness,
#                 "mode": mode,
#                 "speechiness": speechiness,
#                 "acousticness": acousticness,
#                 "instrumentalness": instrumentalness
#             })