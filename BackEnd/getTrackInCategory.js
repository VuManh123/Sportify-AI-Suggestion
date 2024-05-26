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

export default getTracksInCategory;