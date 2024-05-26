const getTopTracks = async (accessToken) => {
    const playlistId = '37i9dQZF1DX0F4i7Q9pshJ'; // ID của playlist "Top 50 Vietnam"
    const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            },
            params: {
                limit: 33 // hình như max là 33 r, e đặt limit cao nó lỗi
            }
        });

        return response.data.items.map(item => item.track);
    } catch (error) {
        console.error('Error getting top tracks:', error);
        throw error;
    }
};

export default getTopTracks;