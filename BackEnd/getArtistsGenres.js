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

export default getArtistsGenres;