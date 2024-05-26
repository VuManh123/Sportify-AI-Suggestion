interface ITracksInfo {
    trackId: string,
    artists: string[],
    artistIds: string[],  // Thêm danh sách artist ID để tiện lợi cho việc lấy genre
    albumName: string,
    trackName: string,
    popularity: number,
    duration_ms: number,
    explicit: boolean,
    albumCover: string,
    danceability: number,
    energy: number,
    key: number,
    loudness: number,
    mode: number,
    speechiness: number,
    acousticness: number,
    instrumentalness: number,
    liveness: number,
    valence: number,
    tempo: number,
    timeSignature: number,
    trackGenres: string[]

}

interface IMessage {
    message: string
}