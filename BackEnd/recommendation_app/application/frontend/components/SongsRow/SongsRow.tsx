'use client'
import React from 'react'
import SongBox from './SongBox'
import Link from 'next/link'

interface ITracksProps {
  tracks: ITracksInfo[]
}
const SongsRow = (props: ITracksProps) => {
  const { tracks } = props;
  return (
    <div className='w-full h-85 my-3 py-3'>
      <div className="flex justify-between items-center">
        <h1 className="text-white text-2xl font-semibold">
          Category Name
        </h1>
        <Link href={'#haha'} className='underline font-medium hover:font-semibold'>Xem tất cả</Link>
      </div>
      <div className='mt-3 flex overflow-hidden hover:overflow-x-scroll'>
        {tracks && tracks.map((item, index) => (
          <SongBox key={index} track={item} />
        ))}
      </div>
    </div>
)
}

export default SongsRow