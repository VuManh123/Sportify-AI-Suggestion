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
            artistIds: track.artists.map(artist => artist.id),  // Thêm danh sách artist ID để tiện lợi cho việc lấy genre
            albumName: track.album.name,
            trackName: track.name,
            popularity: track.popularity,
            duration_ms: track.duration_ms,
            explicit: track.explicit,

            danceability: audioFeatures[index]?.danceability,
            energy: audioFeatures[index]?.energy,
            key: audioFeatures[index]?.key,
            loudness: audioFeatures[index]?.loudness,
            mode: audioFeatures[index]?.mode,
            speechiness: audioFeatures[index]?.speechiness,
            acousticness: audioFeatures[index]?.acousticness,
            instrumentalness: audioFeatures[index]?.instrumentalness,
            liveness: audioFeatures[index]?.liveness,
            valence: audioFeatures[index]?.valence,
            tempo: audioFeatures[index]?.tempo,
            timeSignature: audioFeatures[index]?.time_signature,
            trackGenres: []  // Sẽ cập nhật ở bước tiếp theo
        }));
    } catch (error) {
        console.error('Error getting track details:', error);
        throw error;
    }
};

export default getTrackDetails;