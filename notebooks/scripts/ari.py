import requests
import base64

# Spotify API credentials
client_id = '56e9f2ff6a1d4b2ea62996d0bedabac9'
client_secret = 'a19936b48c774d57acfe65e8a6715779'

# Function to get an access token from Spotify
def get_access_token():
    auth_url = 'https://accounts.spotify.com/api/token'
    auth_data = {'grant_type': 'client_credentials'}
    auth_headers = {
        'Authorization': 'Basic ' + base64.b64encode(f'{client_id}:{client_secret}'.encode()).decode(),
        'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    response = requests.post(auth_url, data=auth_data, headers=auth_headers)
    response_data = response.json()
    
    return response_data['access_token']

# Function to get track and artist features for multiple track IDs
def ari_to_features(track_ids):
    try:
        access_token = get_access_token()
        features_list = []
        headers = {'Authorization': f'Bearer {access_token}'}

        for ari in track_ids:
            # Track information
            track_response = requests.get(f'https://api.spotify.com/v1/tracks/{ari}', headers=headers)
            track_info = track_response.json()

            # Artist information
            artist_id = track_info['artists'][0]['id']
            artist_response = requests.get(f'https://api.spotify.com/v1/artists/{artist_id}', headers=headers)
            artist_info = artist_response.json()

            # Extract required fields
            artist_name = track_info['artists'][0]['name']
            artist_uri = track_info['artists'][0]['uri']
            track_name = track_info['name']
            album_uri = track_info['album']['uri']
            album_name = track_info['album']['name']
            image_uri = track_info['album']['images'][0]['url'] if track_info['album']['images'] else None

            artist_pop = artist_info['popularity']
            artist_genres = artist_info['genres']
            track_pop = track_info['popularity']

            # Construct the result dictionary
            features = {
                'id': ari,
                'artist_pop': artist_pop,
                'artist_name': artist_name,
                'artist_uri': artist_uri,
                'track_name': track_name,
                'album_uri': album_uri,
                'album_name': album_name,
                'image_uri': image_uri,
                'track_pop': track_pop,
                'genres': ' '.join([genre.replace(' ', '_') for genre in artist_genres]) if artist_genres else 'unknown'
            }

            # Push features of current track to the list
            features_list.append(features)

        return features_list
    except Exception as e:
        print('Something went wrong!', e)

if __name__ == "__main__":
    # Example usage with multiple track IDs
    track_ids = ['1o0nAjgZwMDK9TI4TTUSNn']  # Add more track IDs as needed
    result = ari_to_features(track_ids)
    print(result)

