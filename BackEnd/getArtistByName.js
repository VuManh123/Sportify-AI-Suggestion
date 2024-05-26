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

export default getArtistByName;