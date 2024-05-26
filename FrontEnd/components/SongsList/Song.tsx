'use client'
import React, { useState } from 'react'
import test from '@/public/test.png'
import Link from 'next/link'
import { twMerge } from 'tailwind-merge';
import axios from 'axios';
interface ISongProps {
    className?: string;
    track: ITracksInfo;
    fetchTracksReturn?: (newData: ITracksInfo[]) => void
}
const Song: React.FC<ISongProps> = ({
    className,
    track,
    fetchTracksReturn
}) => {
    const [data, setData] = useState({})

    const handleClickSong = (id: string) => {
        console.log('Song check id: ', id);
        setData(id);
        const url = `${URL}/api/v1/track/${data}`;
        axios.get(url)
            .then(function (response) {
                console.log('Success:', response.data);
                // Xử lý dữ liệu trả về ở đây
                { fetchTracksReturn && fetchTracksReturn(response.data) }
            })
            .catch(function (error) {
                console.error('Error:', error);
            });
    }
    return (
        <Link href={'#hahsong'}>
            <div
                className={twMerge('w-full flex  p-3 border-b border-solid border-gray-300 align-middle', className)}
                onClick={() => handleClickSong(track.trackId)}
            >
                <img src={track.albumCover} alt="" className='w-12' />
                <div className='flex flex-col ml-2 '>
                    <span className='text-base font-semibold w-52 truncate'>{track.trackName}</span>
                    <span className='text-sm text-neutral-400'>{track.artists.join(', ')}</span>
                </div>
            </div>
        </Link >
    )
}

export default Song