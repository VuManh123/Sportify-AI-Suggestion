'use client'
import Header from "@/components/Header/Header";
import AiBox from "@/components/CustomComponent/AiBox";
import SongsList from "@/components/SongsList/SongsList";
import BoxChat from "@/components/BoxChat/BoxChat";
import { useEffect, useState } from "react";
export default function AiSuggestion() {
    // let data = [{}];
    // let [tracks, setTracks] = useState<ITracksInfo[]>([]);
    // let [tracksReturn, setTracksReturn] = useState<ITracksInfo[]>([]);

    let tracks = [
        {
            "trackName": "I Miss You",
            "artists": [
                "Selena"
            ],
            "albumCover": "https://i.scdn.co/image/ab67616d0000b2737d405a233dff5392665e5a61",
            "danceability": "0.676",
            "energy": "0.461",
            "key": "1",
            "loudness": "-6.746",
            "mode": "0",
            "speechiness": "0.143",
            "acousticness": "0.0322",
            "instrumentalness": "1.01e-06"
        },
        {
            "trackName": "When you went away",
            "artists": [
                "Jack Orquell"
            ],
            "albumCover": "https://i.scdn.co/image/ab67616d0000b27368acbddf50a87728633e8932",
            "danceability": "0.782",
            "energy": "0.684",
            "key": "1",
            "loudness": "-5.774",
            "mode": "1",
            "speechiness": "0.0398",
            "acousticness": "0.021",
            "instrumentalness": "0.0"
        },
        {
            "trackName": "I Wanna Be Your Ghost (feat. Ghosts)",
            "artists": [
                "Harry Panel"
            ],
            "albumCover": "https://i.scdn.co/image/ab67616d0000b273095dac669d263325fa30770a",
            "danceability": "0.829",
            "energy": "0.751",
            "key": "11",
            "loudness": "-4.937",
            "mode": "0",
            "speechiness": "0.0645",
            "acousticness": "0.0142",
            "instrumentalness": "0.014"
        },
        {
            "trackName": "You",
            "artists": [
                "Justin Kerry"
            ],
            "albumCover": "https://i.scdn.co/image/ab67616d0000b27314443d5ee6cd6d03949f8da1",
            "danceability": "0.532",
            "energy": "0.928",
            "key": "9",
            "loudness": "-1.963",
            "mode": "0",
            "speechiness": "0.0397",
            "acousticness": "0.108",
            "instrumentalness": "0.0291"
        },
        {
            "trackName": "Your lover",
            "artists": [
                "Noman"
            ],
            "albumCover": "https://i.scdn.co/image/ab67616d0000b273f037c5fb9de6c78726cb8e2c",
            "danceability": "0.532",
            "energy": "0.928",
            "key": "9",
            "loudness": "-1.963",
            "mode": "0",
            "speechiness": "0.0397",
            "acousticness": "0.108",
            "instrumentalness": "0.0291"
        },
        {
            "trackName": "Do you want to marry my",
            "artists": [
                "Jonne Oba"
            ],
            "albumCover": "https://i.scdn.co/image/ab67616d0000b2731b8ae147aceb9fc130391287",
            "danceability": "0.673",
            "energy": "0.658",
            "key": "10",
            "loudness": "-8.864",
            "mode": "0",
            "speechiness": "0.0343",
            "acousticness": "0.176",
            "instrumentalness": "1.57e-05"
        }
    ]

    let tracksReturn = [
        {
            "trackName": "Comedy",
            "artists": [
                "Noris Nora"
            ],
            "albumCover": "https://i.scdn.co/image/ab67616d0000b273a2b285239af0777c0843acbf",
            "danceability": "0.676",
            "energy": "0.461",
            "key": "1",
            "loudness": "-6.746",
            "mode": "0",
            "speechiness": "0.143",
            "acousticness": "0.0322",
            "instrumentalness": "1.01e-06"
        },
        {
            "trackName": "SUN",
            "artists": [
                "Selena"
            ],
            "albumCover": "https://i.scdn.co/image/ab67616d0000b2730eddb908568880a2a5bc822a",
            "danceability": "0.782",
            "energy": "0.684",
            "key": "1",
            "loudness": "-5.774",
            "mode": "1",
            "speechiness": "0.0398",
            "acousticness": "0.021",
            "instrumentalness": "0.0"
        },
        {
            "trackName": "I Wanna Be Your Ghost (feat. Ghosts)",
            "artists": [
                "Marache Phillipe"
            ],
            "albumCover": "https://i.scdn.co/image/ab67616d0000b273659cd4673230913b3918e0d5",
            "danceability": "0.829",
            "energy": "0.751",
            "key": "11",
            "loudness": "-4.937",
            "mode": "0",
            "speechiness": "0.0645",
            "acousticness": "0.0142",
            "instrumentalness": "0.014"
        },
        {
            "trackName": "No sad more",
            "artists": [
                "Noman"
            ],
            "albumCover": "https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62",
            "danceability": "0.532",
            "energy": "0.928",
            "key": "9",
            "loudness": "-1.963",
            "mode": "0",
            "speechiness": "0.0397",
            "acousticness": "0.108",
            "instrumentalness": "0.0291"
        },
        {
            "trackName": "Futari waraa",
            "artists": [
                "Yu Takahashi"
            ],
            "albumCover": "https://i.scdn.co/image/ab67616d0000b273a400211178f6d590d875f2da",
            "danceability": "0.532",
            "energy": "0.928",
            "key": "9",
            "loudness": "-1.963",
            "mode": "0",
            "speechiness": "0.0397",
            "acousticness": "0.108",
            "instrumentalness": "0.0291"
        },
        {
            "trackName": "Hello",
            "artists": [
                "Suzu Mastune   "
            ],
            "albumCover": "https://i.scdn.co/image/ab67616d0000b2735b447e0566aadb805ebc5721",
            "danceability": "0.673",
            "energy": "0.658",
            "key": "10",
            "loudness": "-8.864",
            "mode": "0",
            "speechiness": "0.0343",
            "acousticness": "0.176",
            "instrumentalness": "1.57e-05"
        }
    ]

    const fetchData = (tracks: ITracksInfo[]) => {
        // setTracks(tracks);
    }

    const fetchTracksReturn = (tracks: ITracksInfo[]) => {
        // setTracksReturn(tracks);
    }

    return (
        <div className="flex h-full flex-col">
            <Header>
                <div className="mb-2">
                    <h1 className="text-white text-3xl font-semibold rounded-lg">AI Supporter</h1>
                </div>
            </Header>
            <div className="flex h-3/4 flex-1 mt-7">
                <AiBox className="mr-2 w-3/4 flex">
                    <div className="flex flex-col gap-y-4 px-4 py-4 h-full w-2/3">
                        <BoxChat fetchData={fetchData} />
                    </div>
                    <div className="flex flex-col w-1/3 gap-y-4 pr-4 py-4">
                        <h2 className="text-white font-bold text-lg">Searching results</h2>
                        <SongsList tracks={tracks} fetchTracksReturn={fetchTracksReturn} />
                    </div>
                </AiBox>
                <AiBox className="mr-2 w-1/4">
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        <h2 className="text-white font-bold text-lg">Suggestion by AI</h2>
                        <SongsList tracks={tracksReturn} fetchTracksReturn={fetchTracksReturn} />
                    </div>
                </AiBox>
            </div>
        </div>
    );
}