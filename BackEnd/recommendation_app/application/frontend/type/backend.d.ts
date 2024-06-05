interface ITracksInfo {
    albumCover: string,
    trackId: string,
    trackName: string, // quan trọng
    artists: string[],
    danceability: string,
    energy: string,
    key: string,
    loudness: string,
    mode: string,
    speechiness: string,
    acousticness: string,
    instrumentalness: string,
    liveness: number,
    valence: number,
    tempo: number,
    trackGenres: string[]

}

interface IMessage {
    message: string
}