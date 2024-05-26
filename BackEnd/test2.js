import axios from "axios";

const clientId = 'a3ece4e4c800463dac201df53de53a9e';
const clientSecret = 'b19ce96a00884d8ba7d994a978bb8cfa';

// Function to get access token
async function getAccessToken() {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
                grant_type: 'client_credentials'
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: {
                username: clientId,
                password: clientSecret
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Error getting access token:', error);
        throw error;
    }
}

// Hàm lấy thông tin audio features của track từ Spotify
const getTrackFeatures = async (trackId, accessToken) => {
    const trackFeaturesUrl = `https://api.spotify.com/v1/audio-features/${trackId}`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    try {
        const response = await axios.get(trackFeaturesUrl, { headers });
        console.log('getTrackFeatures: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error getting track features:', error);
    }
};

// Hàm lấy thông tin thể loại của nghệ sĩ từ Spotify
const getTrackGenres = async (artistId, accessToken) => {
    const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    try {
        const response = await axios.get(artistUrl, { headers });
        return response.data.genres;
    } catch (error) {
        console.error('Error getting artist genres:', error);
    }
};

// Hàm map thông tin track vào đối tượng mong muốn
const mapTrackInfo = async (trackData) => {
    const accessToken = await getAccessToken();

    const trackId = trackData.id;
    const artists = trackData.artists.map(artist => artist.name).join(', ');
    const albumName = trackData.album.name;
    const trackName = trackData.name;
    const popularity = trackData.popularity;
    const duration_ms = trackData.duration_ms;
    const explicit = trackData.explicit;

    const trackFeatures = await getTrackFeatures(trackId, accessToken);
    console.log('trackFeature: ', trackFeatures);
    const danceability = trackFeatures.danceability;
    const energy = trackFeatures.energy;
    const key = trackFeatures.key;
    const loudness = trackFeatures.loudness;
    const mode = trackFeatures.mode;
    const speechiness = trackFeatures.speechiness;
    const acousticness = trackFeatures.acousticness;
    const instrumentalness = trackFeatures.instrumentalness;
    const liveness = trackFeatures.liveness;
    const valence = trackFeatures.valence;
    const tempo = trackFeatures.tempo;
    const timeSignature = trackFeatures.time_signature;

    const artistId = trackData.artists[0].id;
    const trackGenre = await getTrackGenres(artistId, accessToken);

    const trackInfo = {
        trackId,
        artists,
        albumName,
        trackName,
        popularity,
        duration_ms,
        explicit,
        danceability,
        energy,
        key,
        loudness,
        mode,
        speechiness,
        acousticness,
        instrumentalness,
        liveness,
        valence,
        tempo,
        timeSignature,
        trackGenre
    };

    return trackInfo;
};

// Ví dụ sử dụng:
const trackData = {
    "album": {
        "name": "Sky Tour"
    },
    "artists": [
        {
            "name": "Sơn Tùng M-TP",
            "id": "4vV8TpXzQKlpWrh211J93Y"
        }
    ],
    "id": "2up3OPMp9Tb4dAKM2erWXQ",
    "name": "Có chắc yêu là đây",
    "popularity": 89,
    "duration_ms": 205946,
    "explicit": false
};

mapTrackInfo(trackData).then(trackInfo => console.log(trackInfo));