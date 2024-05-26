const getTracksByArtist = async (accessToken, artistId) => {
    const url = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=VN`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        return response.data.tracks;
    } catch (error) {
        console.error('Error getting artist top tracks:', error);
        throw error;
    }
};

export default getTracksByArtist;