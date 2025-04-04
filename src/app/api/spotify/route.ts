import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played`;
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token!,
    }),
  });

  return response.json();
};

const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  // Önce şu an çalan şarkıyı kontrol et
  const nowPlaying = await fetch(NOW_PLAYING_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (nowPlaying.status === 204 || nowPlaying.status > 400) {
    // Şu an çalan şarkı yoksa son çalınanı getir
    const recentlyPlayed = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (recentlyPlayed.status === 204 || recentlyPlayed.status > 400) {
      return null;
    }

    const recent = await recentlyPlayed.json();
    const recentTrack = recent.items[0].track;

    return {
      isPlaying: false,
      title: recentTrack.name,
      artist: recentTrack.artists.map((_artist: any) => _artist.name).join(', '),
      albumImageUrl: recentTrack.album.images[0].url,
      songUrl: recentTrack.external_urls.spotify,
    };
  }

  const song = await nowPlaying.json();
  
  return {
    isPlaying: true,
    title: song.item.name,
    artist: song.item.artists.map((_artist: any) => _artist.name).join(', '),
    albumImageUrl: song.item.album.images[0].url,
    songUrl: song.item.external_urls.spotify,
  };
};

export async function GET() {
  try {
    const response = await getNowPlaying();
    
    if (!response) {
      return NextResponse.json({
        isPlaying: false,
        title: 'Hiçbir şey çalmıyor',
        artist: 'Spotify',
        albumImageUrl: null,
        songUrl: null,
      });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    return NextResponse.json({
      isPlaying: false,
      title: 'Hiçbir şey çalmıyor',
      artist: 'Spotify',
      albumImageUrl: null,
      songUrl: null,
    });
  }
} 