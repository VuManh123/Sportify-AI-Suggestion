import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd

def extract(track_id):
    client_id = "5356afb958c84e71a2c37c43e2a2cbf2"
    client_secret = "83e531491e9c458ba658ac30c4c56bc0"

    # Use the client secret and id details
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # Fetch track details
    track_data = sp.track(track_id)

    # Extract track information
    track_title = track_data['name']
    track_artists = [artist['name'] for artist in track_data['artists']]
    track_first_artist = track_artists[0]

    # Fetch track audio features
    track_features = sp.audio_features([track_id])[0]

    # Create a dictionary to form the DataFrame
    track_info = {
        'id': track_features['id'],
        'title': track_title,
        'first_artist': track_first_artist,
        'all_artists': track_artists,
        'danceability': track_features['danceability'],
        'energy': track_features['energy'],
        'key': track_features['key'],
        'loudness': track_features['loudness'],
        'mode': track_features['mode'],
        'acousticness': track_features['acousticness'],
        'instrumentalness': track_features['instrumentalness'],
        'liveness': track_features['liveness'],
        'valence': track_features['valence'],
        'tempo': track_features['tempo'],
        'duration_ms': track_feaotures['duration_ms'],
        'time_signature': track_features['time_signature']
    }

    # Create a DataFrame
    features_df = pd.DataFrame([track_info])
    
    return features_df
