import React from 'react'
import Song from './Song'
import { twMerge } from 'tailwind-merge';
interface ITracksProps {
    className?: string;
    tracks: ITracksInfo[];
    fetchTracksReturn: (newData: ITracksInfo[]) => void
}
const SongsList: React.FC<ITracksProps> = ({
    className,
    tracks,
    fetchTracksReturn,
}) => {

    // return (
    //     <div className={twMerge('w-full overflow-x-hidden overflow-y-auto first-child: border-t border-solid border-gray-300', className)}>
    //         {tracks && tracks.map((item, index) => (
    //             <Song
    //                 key={index}  // Sử dụng chỉ số index làm key
    //                 track={item}
    //                 fetchTracksReturn={fetchTracksReturn}
    //             />
    //         ))}
    //     </div>
    // Ensure tracks is an array
    const validTracks = Array.isArray(tracks) ? tracks : [];

    return (
        <div className={twMerge('w-full overflow-x-hidden overflow-y-auto first-child:border-t border-solid border-gray-300', className)}>
            {validTracks.length > 0 ? (
                validTracks.map((item, index) => (
                    <Song
                        key={index}  // Sử dụng chỉ số index làm key
                        track={item}
                        fetchTracksReturn={fetchTracksReturn}
                    />
                ))
            ) : (
                <p>No tracks available</p>
            )}
        </div>
    )
}

export default SongsList;