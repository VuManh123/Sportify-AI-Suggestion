const searchSongs = (songs, keyword) => {
    const trimmedKeyword = keyword.trim().toLowerCase();
  
    const exactMatches = songs.filter((song) =>
      song.artist_name.toLowerCase() === trimmedKeyword ||
      song.track_name.toLowerCase() === trimmedKeyword
    );
  
    const partialMatches = songs.filter((song) =>
      (song.artist_name.toLowerCase().includes(trimmedKeyword) ||
       song.track_name.toLowerCase().includes(trimmedKeyword)) &&
      !exactMatches.includes(song)
    );
    return [...exactMatches, ...partialMatches];
  };
  
  const searchByWords = (songs, keywords) => {
    const trimmedKeywords = keywords.map(keyword => keyword.trim().toLowerCase());
  
    const exactMatches = trimmedKeywords.map(keyword => ({
      keyword,
      matches: songs.filter(song =>
        song.artist_name.toLowerCase() === keyword ||
        song.track_name.toLowerCase() === keyword
      )
    }));
  
    const partialMatches = trimmedKeywords.map(keyword => ({
      keyword,
      matches: songs.filter(song =>
        (song.artist_name.toLowerCase().includes(keyword) ||
         song.track_name.toLowerCase().includes(keyword)) &&
        !exactMatches.some(matchObj => matchObj.matches.includes(song))
      )
    }));
  
    return [...exactMatches, ...partialMatches];
  };
  
  export { searchSongs, searchByWords };
  