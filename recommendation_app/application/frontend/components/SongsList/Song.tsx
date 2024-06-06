'use client'
import React, { useState } from 'react'
import test from '@/public/test.png'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
const URL = ''
interface ISongProps {
    className?: string;
    track: ITracksInfo;
    fetchTracksReturn: (newData: ITracksInfo[]) => void
}
const Song: React.FC<ISongProps> = ({
    className,
    track,
    fetchTracksReturn
}) => {
    const [data, setData] = useState({})
    const [showDetail, setShowDetail] = useState(false);

    const handleMouseEnter = () => {
        setShowDetail(true);
    };

    const handleMouseLeave = () => {
        setShowDetail(false);
    };

    const handleClickSong = (id: string) => {
        console.log('Song check id: ', id);
        // setData(id);
        // Gửi ID bài hát đến /recommend
        axios.post('http://localhost:5500/recommend', { track_id: id })
            .then(function (response) {
                console.log('Success:', response.data);
                // Xử lý dữ liệu trả về ở đây
                fetchTracksReturn(response.data);
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    }
    return (
        <Link href={'#hahsong'}>
            <div
                className={twMerge('w-full flex  p-3 border-b border-solid border-gray-300 align-middle', className)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClickSong(track.trackId)}
            >
                <img src={track.albumCover} alt="" className='w-12' />
                <div className='flex flex-col ml-2 '>
                    <span className='text-base font-semibold w-52 truncate'>{track.trackName}</span>
                    <span className='text-sm text-neutral-400'>{track.artists}</span>
                </div>
            </div>
            {showDetail &&
                <div className='w-full flex flex-col p-3 border-b border-solid border-gray-300 align-middle'>
                    <span>danceability: {track.danceability}</span>
                    <span>energy: {track.energy}</span>
                    <span>key: {track.key}</span>
                    <span>loudness: {track.loudness}</span>
                    <span>mode: {track.mode}</span>
                    <span>speechiness: {track.speechiness}</span>
                    <span>acousticness: {track.acousticness}</span>
                    <span>instrumentalness: {track.instrumentalness}</span>
                    <span>liveness: {track.liveness}</span>
                    <span>valence: {track.valence}</span>
                    <span>tempo: {track.tempo}</span>
                    <span>trackGenres: {track.trackGenres}</span> 
                </div>
            }
        </Link >
    )
}

export default Song