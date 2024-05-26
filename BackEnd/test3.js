import axios from 'axios';
// const qs = require('qs');

// Thông tin xác thực từ Spotify
const clientId = 'a3ece4e4c800463dac201df53de53a9e';
const clientSecret = 'b19ce96a00884d8ba7d994a978bb8cfa';

// Lấy access token từ Spotify
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

// Lấy danh sách các track từ playlist
const getTopTracks = async (accessToken) => {
    const playlistId = '37i9dQZEVXbK4fwx2r07XW'; // ID của playlist "Top 50 Vietnam"
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                limit: 50
            }
        });

        return response.data.items.map(item => item.track);
    } catch (error) {
        console.error('Error getting top tracks:', error);
        throw error;
    }
};

// Lấy thông tin chi tiết và audio features của track
const getTrackDetails = async (accessToken, trackIds) => {
    const trackDetailsUrl = `https://api.spotify.com/v1/tracks?ids=${trackIds.join(',')}`;
    const audioFeaturesUrl = `https://api.spotify.com/v1/audio-features?ids=${trackIds.join(',')}`;

    try {
        const [trackDetailsResponse, audioFeaturesResponse] = await Promise.all([
            axios.get(trackDetailsUrl, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            }),
            axios.get(audioFeaturesUrl, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            })
        ]);

        const trackDetails = trackDetailsResponse.data.tracks;
        const audioFeatures = audioFeaturesResponse.data.audio_features;

        return trackDetails.map((track, index) => ({
            trackId: track.id,
            artists: track.artists.map(artist => artist.name),
            albumName: track.album.name,
            trackName: track.name,
            popularity: track.popularity,
            duration_ms: track.duration_ms,
            explicit: track.explicit,
            danceability: audioFeatures[index].danceability,
            energy: audioFeatures[index].energy,
            key: audioFeatures[index].key,
            loudness: audioFeatures[index].loudness,
            mode: audioFeatures[index].mode,
            speechiness: audioFeatures[index].speechiness,
            acousticness: audioFeatures[index].acousticness,
            instrumentalness: audioFeatures[index].instrumentalness,
            liveness: audioFeatures[index].liveness,
            valence: audioFeatures[index].valence,
            tempo: audioFeatures[index].tempo,
            timeSignature: audioFeatures[index].time_signature,
            trackGenre: []  // Sẽ cập nhật ở bước tiếp theo
        }));
    } catch (error) {
        console.error('Error getting track details:', error);
        throw error;
    }
};

// Lấy thể loại của nghệ sĩ
const getArtistsGenres = async (accessToken, artistIds) => {
    const artistsUrl = `https://api.spotify.com/v1/artists?ids=${artistIds.join(',')}`;

    try {
        const response = await axios.get(artistsUrl, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response.data.artists.reduce((acc, artist) => {
            acc[artist.id] = artist.genres;
            return acc;
        }, {});
    } catch (error) {
        console.error('Error getting artist genres:', error);
        throw error;
    }
};

// Main function để lấy tất cả thông tin
const fetchTopTracksInfo = async () => {
    try {
        const accessToken = await getAccessToken();
        const tracks = await getTopTracks(accessToken);

        const trackIds = tracks.map(track => track.id);
        const artistIds = [...new Set(tracks.flatMap(track => track.artists.map(artist => artist.id)))];

        const trackDetails = await getTrackDetails(accessToken, trackIds);
        const artistGenres = await getArtistsGenres(accessToken, artistIds);

        // Gắn thể loại vào các track
        trackDetails.forEach(track => {
            track.trackGenre = track.artists.flatMap(artist => artistGenres[artist.id] || []);
        });

        console.log(trackDetails);
    } catch (error) {
        console.error('Error fetching top tracks info:', error);
    }
};

fetchTopTracksInfo();