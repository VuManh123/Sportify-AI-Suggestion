import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

def search_tracks(keyword):
    client_id = "5356afb958c84e71a2c37c43e2a2cbf2"
    client_secret = "83e531491e9c458ba658ac30c4c56bc0"

    # Sử dụng thông tin client secret và ID
    client_credentials_manager = SpotifyClientCredentials(client_id=client_id, client_secret=client_secret)
    sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

    # Tìm kiếm bài hát dựa trên từ khóa
    results = sp.search(q=keyword, type='track', limit=50)
    
    # Lấy thông tin các bài hát tìm được
    tracks = results['tracks']['items']
    search_results = []
    
    for track in tracks:
        track_info = {
            'id': track['id'],
            'name': track['name'],
            'artists': ', '.join([artist['name'] for artist in track['artists']]),
            'url': track['external_urls']['spotify']
        }
        search_results.append(track_info)
    
    return search_results

# Hàm ví dụ để tìm kiếm và in ra kết quả
def main():
    keyword = input("Nhập tên bài hát hoặc từ khóa: ")
    results = search_tracks(keyword)
    
    if results:
        for idx, track in enumerate(results, start=1):
            print(f"{idx}. {track['name']} by {track['artists']} - {track['url']} - ID: {track['id']}")
    else:
        print("Không tìm thấy kết quả nào.")

if __name__ == '__main__':
    main()
