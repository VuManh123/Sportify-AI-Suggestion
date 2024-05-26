import axios from 'axios';

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

// Function to get top 50 tracks
async function getTopTracks(accessToken) {
    try {
        const response = await axios.get('https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                limit: 1
            }
        });
        return response.data.items;
    } catch (error) {
        console.error('Error getting top tracks:', error);
        throw error;
    }
}

// Lấy top track category
async function getTracksInCategory(accessToken, categoryName) {
    try {
        const response = await axios.get('https://api.spotify.com/v1/browse/categories/' + encodeURIComponent(categoryName) + '/playlists', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                limit: 5 // Change the limit as per your requirement
            }
        });
        return response.data.playlists.items;
    } catch (error) {
        console.error('Error getting playlists by category:', error);
        throw error;
    }
}

// Lấy top track nghệ sĩ
async function getArtistByName(accessToken, artistName) {
    try {
        const response = await axios.get('https://api.spotify.com/v1/search', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                q: artistName,
                type: 'artist',
                limit: 1
            }
        });
        return response.data.artists.items[0];
    } catch (error) {
        console.error('Error searching for artist:', error);
        throw error;
    }
}

// async function getTopTracksByArtist(accessToken, artistId) {
//     try {
//         const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`
//             },
//             params: {
//                 country: 'VN' // Specify the country code if needed
//             }
//         });
//         return response.data.tracks;
//     } catch (error) {
//         console.error('Error getting top tracks by artist:', error);
//         throw error;
//     }
// }

async function getTopTracksByArtist(accessToken, artistId) {
    try {
        const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                country: 'VN' // Specify the country code if needed
            }
        });
        const tracks = response.data.tracks.map(track => ({
            name: track.name,
            album: track.album.name,
            artist: track.artists.map(artist => artist.name).join(', '),
            imageUrl: track.album.images[0].url,
            popularity: track.popularity,
            releaseDate: track.album.release_date
        }));
        return tracks;
    } catch (error) {
        console.error('Error getting top tracks by artist:', error);
        throw error;
    }
}

const getTrackGenre = async (accessToken, trackName, artistName) => {

    const searchUrl = 'https://api.spotify.com/v1/search';
    const searchParams = {
        q: `track:${trackName} artist:${artistName}`,
        type: 'track',
        limit: 1
    };

    const headers = {
        'Authorization': `Bearer ${accessToken}`
    };

    try {
        const searchResponse = await axios.get(searchUrl, { headers, params: searchParams });
        const track = searchResponse.data.tracks.items[0];

        if (!track) {
            console.log('Track not found');
            return;
        }

        const artistId = track.artists[0].id;
        const artistUrl = `https://api.spotify.com/v1/artists/${artistId}`;

        const artistResponse = await axios.get(artistUrl, { headers });
        const genres = artistResponse.data.genres;

        console.log(`Genres for the track "${trackName}" by ${artistName}:`, genres[0]);
    } catch (error) {
        console.error('Error getting track genre:', error);
    }
};

// Main function
async function main() {
    try {
        const accessToken = await getAccessToken();

        // const topTracks = await getTopTracks(accessToken);
        // console.log('Top 1 tracks:', topTracks);

        // getTrackGenre(accessToken, 'Có chắc yêu là đây', 'Sơn Tùng M-TP');

        // const playlists = await getPlaylistsByCategory(accessToken, 'chill'); // Change 'chill' to the category you want
        // console.log('Playlists in the "Thư giãn" category:', playlists);

        const artist = await getArtistByName(accessToken, 'Sơn Tùng M-TP');
        if (artist) {
            const topTracks = await getTopTracksByArtist(accessToken, artist.id);
            console.log('Top tracks by Sơn Tùng M-TP:', topTracks);
        } else {
            console.log('Artist not found.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Run main function
main();