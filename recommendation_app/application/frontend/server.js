const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');
const bodyParser = require('body-parser');
const axios = require('axios'); // Import thư viện axios
const app = express();
const port = 5500;

app.use(cors()); // Sử dụng CORS middleware
app.use(bodyParser.json());
const SpotifyWebApi = require('spotify-web-api-node'); 

// Xử lý yêu cầu POST đến '/input'
app.post('/input', async (req, res) => {
    const keyword = req.body.message;
    console.log('Received message:', keyword);
    
    try {
      const results = [];
      let count = 0; // Đếm số lượng kết quả đã tìm thấy
  
      const stream = fs.createReadStream('./data1/allsong_data.csv')
      .pipe(csv())
      .on('data', (row) => {
          // Kiểm tra nếu track_name hoặc artist_name chứa từ khóa tìm kiếm
          if (row.track_name.includes(keyword) ) { //|| row.artist_name.includes(keyword)
              // Kiểm tra nếu chưa đạt tới giới hạn 20 kết quả
              if (count < 30) {
                  results.push({
                      trackId: row.id,
                      albumCover: row.image_uri,
                      trackName: row.track_name,
                      artists: row.artist_name,
                      danceability: row.danceability,
                      energy: row.energy,
                      key: row.key,
                      loudness: row.loudness,
                      mode: row.mode,
                      speechiness: row.speechiness,
                      acousticness: row.acousticness,
                      instrumentalness: row.instrumentalness,
                      liveness: row.liveness,
                      valence: row.valence,
                      tempo: row.tempo,
                      trackGenres: row.genres,
                  });
                  count++; // Tăng số lượng kết quả đã tìm thấy
              } else {
                  // Đã đạt tới giới hạn 20 kết quả, dừng việc tìm kiếm
                  stream.destroy(); // Đóng luồng đọc
                  res.json(results);
              }
          }
      })
      .on('end', () => {
          console.log('Search results:', results);
          // Gửi kết quả tìm kiếm về client
          if (count < 30) {
            res.json(results);
        }
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post('/recommend', async (req, res) => {
    const { track_id } = req.body;
    console.log('Received song ID:', track_id);
    
    try {
        // Gửi yêu cầu đến endpoint recommend của máy chủ khác
        const recommendResponse = await axios.post("http://127.0.0.1:5000/recommend", {
            track_id: track_id,
            number_of_recs: 30 // Số lượng bài hát được đề xuất
        });
        // Lấy dữ liệu từ kết quả trả về
        const recommendedSongs = recommendResponse.data;
        console.log('Recommended songs:', recommendedSongs);

        // Trả về dữ liệu cho client
        res.json(recommendedSongs.songs);

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Lắng nghe các kết nối trên cổng 5500
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});