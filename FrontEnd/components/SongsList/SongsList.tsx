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
    // let trackTest: ITracksInfo = {
    //     trackId: 'dqwdqwdqwsd',
    //     artists: ['Sơn tùng M-TP'],
    //     artistIds: ['eqweqwdexwq'],  // Thêm danh sách artist ID để tiện lợi cho việc lấy genre
    //     albumName: 'Chúng ta không thuộc về nhau',
    //     trackName: 'Chúng ta không thuộc về nhau',
    //     popularity: 90,
    //     duration_ms: 230233,
    //     explicit: true,
    //     albumCover: 'https://i.scdn.co/image/ab67616d0000b2731e239b69aacaf275c9106948',
    //     danceability: 0.5,
    //     energy: 0.5,
    //     key: 0.5,
    //     loudness: 0.5,
    //     mode: 0.5,
    //     speechiness: 0.5,
    //     acousticness: 0.5,
    //     instrumentalness: 0.5,
    //     liveness: 0.5,
    //     valence: 0.5,
    //     tempo: 0.5,
    //     timeSignature: 0.5,
    //     trackGenres: ['indie viet',
    //         'v-pop',
    //         'vietnamese melodic rap',
    //         'indie viet',
    //         'rock viet',
    //         'v-pop',
    //         'vietnamese singer-songwriter'
    //     ]
    // }
    return (
        <div className={twMerge('w-full overflow-x-hidden overflow-y-auto first-child: border-t border-solid border-gray-300', className)}>
            {tracks && tracks.map((item, index) => (
                <Song
                    key={index}  // Sử dụng chỉ số index làm key
                    track={item}
                    fetchTracksReturn={fetchTracksReturn}
                />
            ))}
            {/* <Song track={trackTest} fetchTracksReturn={fetchTracksReturn} /> */}
            {/* <Song track={trackTest} fetchTracksReturn={fetchTracksReturn} /> */}
        </div>
    )
}

export default SongsList