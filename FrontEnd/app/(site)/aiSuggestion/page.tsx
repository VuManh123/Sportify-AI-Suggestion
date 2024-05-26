'use client'
import Header from "@/components/Header/Header";
import AiBox from "@/components/CustomComponent/AiBox";
import SongsList from "@/components/SongsList/SongsList";
import BoxChat from "@/components/BoxChat/BoxChat";
import { useEffect, useState } from "react";
export default function AiSuggestion() {
    // let data = [{}];
    let [tracks, setTracks] = useState<ITracksInfo[]>([]);
    let [tracksReturn, setTracksReturn] = useState<ITracksInfo[]>([]);

    const fetchData = (tracks: ITracksInfo[]) => {
        setTracks(tracks);
    }

    const fetchTracksReturn = (tracks: ITracksInfo[]) => {
        setTracksReturn(tracks);
    }

    return (
        <div className="flex h-full flex-col">
            <Header>
                <div className="mb-2">
                    <h1 className="text-white text-3xl font-semibold rounded-lg">AI Supporter</h1>
                </div>
            </Header>
            <div className="flex h-full mt-7">
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