interface ITracksInfo {
    // trackId: string, // quan trọng
    artists: string[], // quan trọng
    // artistIds: string[],  // Thêm danh sách artist ID để tiện lợi cho việc lấy genre
    // albumName: string, // quan trọng
    trackName: string, // quan trọng
    // popularity: number,
    // duration_ms: number,
    // explicit: boolean,
    albumCover: string, // quan trọng
    danceability: string,
    energy: string,
    key: string,
    loudness: string,
    mode: string,
    speechiness: string,
    acousticness: string,
    instrumentalness: string,
    // liveness: number,
    // valence: number,
    // tempo: number,
    // timeSignature: number,
    // trackGenres: string[]

}

interface IMessage {
    message: string
}