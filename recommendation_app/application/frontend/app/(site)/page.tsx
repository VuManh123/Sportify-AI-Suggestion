import Header from "@/components/Header/Header";
import SongsRow from "@/components/SongsRow/SongsRow";
import axios from 'axios';
import { useEffect, useState } from "react";
// const qs = require('qs');

// Thông tin xác thực từ Spotify
const clientId = 'a3ece4e4c800463dac201df53de53a9e';
const clientSecret = 'b19ce96a00884d8ba7d994a978bb8cfa';

// Lấy access token từ Spotify
async function getAccessToken() {
  try {
    const response = await axios.post('https://accounts.spotify.com/api/token', null, {
      params: {
        grant_type: 'client_credentials'
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      auth: {
        username: clientId,
        password: clientSecret
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

const getTopTracks = async (accessToken: any) => {
  const playlistId = '37i9dQZF1DX0F4i7Q9pshJ'; // ID của playlist "Top 50 Vietnam"
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        limit: 33
      }
    });

    return response.data.items.map((item: { track: any; }) => item.track);
  } catch (error) {
    console.error('Error getting top tracks:', error);
    throw error;
  }
};

// Lấy thông tin chi tiết và audio features của track
const getTrackDetails = async (accessToken: any, trackIds: any[]) => {
  const trackDetailsUrl = `https://api.spotify.com/v1/tracks?ids=${trackIds.join(',')}`;
  const audioFeaturesUrl = `https://api.spotify.com/v1/audio-features?ids=${trackIds.join(',')}`;

  try {
    const [trackDetailsResponse, audioFeaturesResponse] = await Promise.all([
      axios.get(trackDetailsUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }),
      axios.get(audioFeaturesUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
    ]);

    const trackDetails = trackDetailsResponse.data.tracks;
    const audioFeatures = audioFeaturesResponse.data.audio_features;

    return trackDetails.map((track: { id: any; artists: any[]; album: { name: any; images: { url: any; }[]; }; name: any; popularity: any; duration_ms: any; explicit: any; }, index: string | number) => ({
      trackId: track.id,
      artists: track.artists.map((artist: { name: any; }) => artist.name),
      artistIds: track.artists.map((artist: { id: any; }) => artist.id),  // Thêm danh sách artist ID để tiện lợi cho việc lấy genre
      albumName: track.album.name,
      trackName: track.name,
      popularity: track.popularity,
      duration_ms: track.duration_ms,
      explicit: track.explicit,
      albumCover: track.album.images[0]?.url,
      danceability: typeof (audioFeatures[index]?.danceability),
      energy: audioFeatures[index]?.energy,
      key: audioFeatures[index]?.key,
      loudness: audioFeatures[index]?.loudness,
      mode: audioFeatures[index]?.mode,
      speechiness: audioFeatures[index]?.speechiness,
      acousticness: audioFeatures[index]?.acousticness,
      instrumentalness: audioFeatures[index]?.instrumentalness,
      liveness: audioFeatures[index]?.liveness,
      valence: audioFeatures[index]?.valence,
      tempo: audioFeatures[index]?.tempo,
      timeSignature: audioFeatures[index]?.time_signature,
      trackGenres: []  // Sẽ cập nhật ở bước tiếp theo
    }));
  } catch (error) {
    console.error('Error getting track details:', error);
    throw error;
  }
};

// Lấy thể loại của nghệ sĩ
const getArtistsGenres = async (accessToken: any, artistIds: any[]) => {
  const artistsUrl = `https://api.spotify.com/v1/artists?ids=${artistIds.join(',')}`;

  try {
    const response = await axios.get(artistsUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });

    return response.data.artists.reduce((acc: { [x: string]: any; }, artist: { id: string | number; genres: any; }) => {
      acc[artist.id] = artist.genres;
      return acc;
    }, {});
  } catch (error) {
    console.error('Error getting artist genres:', error);
    throw error;
  }
};

// Main function để lấy tất cả thông tin
const fetchTopTracksInfo = async () => {
  try {
    const accessToken = await getAccessToken();
    const tracks = await getTopTracks(accessToken);

    const trackIds = tracks.map((track: { id: any; }) => track.id);
    const artistIds = [...new Set(tracks.flatMap((track: { artists: any[]; }) => track.artists.map((artist: { id: any; }) => artist.id)))];

    const trackDetails = await getTrackDetails(accessToken, trackIds);
    const artistGenres = await getArtistsGenres(accessToken, artistIds);

    // Gắn thể loại vào các track
    trackDetails.forEach((track: { trackGenres: any; artistIds: any[]; }) => {
      track.trackGenres = track.artistIds.flatMap((artistId: string | number) => artistGenres[artistId] || []);
    });

    console.log(trackDetails);
    return trackDetails;
  } catch (error) {
    console.error('Error fetching top tracks info:', error);
  }
};

const data = await fetchTopTracksInfo()
// const [data, setData] = useState()
// useEffect(() => {
//   setData(fetchTopTracksInfo());
// }, [])
export default function Home() {

  return (
    <div className="
      bg-neutral-900
      rounded-lg
      h-full
      w-full
      overflow-hidden
      overflow-y-auto  
      ">
      <Header>
        <div className="mb-2">
          <h1 className="text-white text-3xl font-semibold">Hello my friend!</h1>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <SongsRow tracks={data} />
        <SongsRow tracks={data} />
        <SongsRow tracks={data} />
        <SongsRow tracks={data} />
        <SongsRow tracks={data} />
        <SongsRow tracks={data} />

      </div>
    </div>
  );
}
