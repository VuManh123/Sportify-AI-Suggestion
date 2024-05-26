import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import pandas as pd

# Authenticate with Spotify API
client_credentials_manager = SpotifyClientCredentials(client_id='b570433bb10441c68767a03129892ef4', client_secret='7067768fa1304aa2b331998a527898bc')
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# Function to get audio features of a track
def get_audio_features(track_id):
    try:
        # Get audio features of the track
        audio_features = sp.audio_features(track_id)
        if audio_features:
            return audio_features[0]
        else:
            return None
    except Exception as e:
        print('Something went wrong!', e)

# Function to get track information
def get_track_info(track_id):
    try:
        # Get track information
        track_info = sp.track(track_id)

        # Get artist information
        artist_id = track_info['artists'][0]['id']
        artist_info = sp.artist(artist_id)

        # Extract required fields
        artist_name = artist_info['name']
        artist_uri = artist_info['uri']
        track_name = track_info['name']
        album_uri = track_info['album']['uri']
        album_name = track_info['album']['name']
        image_uri = track_info['album']['images'][0]['url'] if track_info['album']['images'] else None

        artist_pop = artist_info['popularity']
        artist_genres = artist_info['genres']
        track_pop = track_info['popularity']

        # Construct the result dictionary
        track_features = {
            'artist_name': artist_name,
            'id': track_id,
            'track_name': track_name,
            'artist_pop': artist_pop,
            'genres': ' '.join([genre.replace(' ', '_') for genre in artist_genres]) if artist_genres else 'unknown',
            'track_pop': track_pop
        }

        # Get audio features
        audio_features = get_audio_features(track_id)

        # Add audio features to the dictionary
        if audio_features:
            track_features.update({
                'danceability': audio_features['danceability'],
                'energy': audio_features['energy'],
                'key': audio_features['key'],
                'loudness': audio_features['loudness'],
                'mode': audio_features['mode'],
                'speechiness': audio_features['speechiness'],
                'acousticness': audio_features['acousticness'],
                'instrumentalness': audio_features['instrumentalness'],
                'liveness': audio_features['liveness'],
                'valence': audio_features['valence'],
                'tempo': audio_features['tempo']
            })

        return track_features
    except Exception as e:
        print('Something went wrong!', e)

if __name__ == "__main__":
    # Example usage with 1 track ID
    track_id = '1o0nAjgZwMDK9TI4TTUSNn'
    result = get_track_info(track_id)
    print(result)