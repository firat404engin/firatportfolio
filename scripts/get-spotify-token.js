const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({ path: '.env.local' });

const app = express();
const port = 8888;
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = 'http://localhost:8888/callback';

app.get('/login', (req, res) => {
  const scope = 'user-read-recently-played user-read-currently-playing';
  const state = 'some-state-of-my-choice';
  
  const auth_url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${encodeURIComponent(redirect_uri)}&scope=${encodeURIComponent(scope)}&state=${state}`;
  console.log('Yönlendirme URL:', auth_url);
  res.redirect(auth_url);
});

app.get('/callback', async (req, res) => {
  const code = req.query.code;
  console.log('Alınan kod:', code);

  try {
    const response = await axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri
      }).toString()
    });

    console.log('Token yanıtı:', response.data);
    res.send(`
      <h1>Başarılı!</h1>
      <p>Refresh Token: ${response.data.refresh_token}</p>
      <p>Bu token'ı .env.local dosyanıza SPOTIFY_REFRESH_TOKEN olarak ekleyin.</p>
    `);
  } catch (error) {
    console.error('Hata:', error.response?.data || error.message);
    res.send(`Hata oluştu: ${error.response?.data?.error_description || error.message}`);
  }
});

app.listen(port, () => {
  console.log(`
Server ${port} portunda çalışıyor.
1. Tarayıcınızda http://localhost:8888/login adresini açın
2. Spotify hesabınıza giriş yapın
3. İzinleri onaylayın
4. Refresh token'ı sayfada göreceksiniz
`);
}); 