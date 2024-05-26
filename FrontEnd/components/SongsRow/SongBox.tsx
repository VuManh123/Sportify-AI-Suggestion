'use client'
import React from 'react';
import test from '@/public/test.png';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
interface ISongProps {
    className?: string;
    track: ITracksInfo
}
const SongBox: React.FC<ISongProps> = ({
    className,
    track,
}) => {
    return (
        <Link href={'#hahae'} className={twMerge(`mx-2 cursor-pointer first:ml-0 last:mr-0`, className)}>
            <div className='flex flex-col w-64 min-w-64 h-85 bg-slate-700 p-3 rounded-lg'>
                <img src={track.albumCover} className='mx-auto rounded-lg' alt="" />
                <span className='text-lg font-bold mt-3 whitespace-nowrap truncate'>{track.trackName}</span>
                <span className='text-sm font-normal whitespace-nowrap truncate'>{track.artists.join(', ')}</span>
            </div>
        </Link>
    )
}

export default SongBox