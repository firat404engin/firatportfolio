import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const getAccessToken = async () => {
  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + Buffer.from(client_id + ':' + client_secret).toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refresh_token!,
      }),
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Token error:', errorData);
      throw new Error('Token alınamadı');
    }

    return response.json();
  } catch (error) {
    console.error('Token fetch error:', error);
    throw error;
  }
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const { access_token } = await getAccessToken();
    
    const response = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Spotify API error:', errorData);
      throw new Error('Spotify API yanıt vermedi');
    }

    const data = await response.json();

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Pragma': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Spotify API Hatası:', error);
    return NextResponse.json(
      { error: 'Spotify verisi alınamadı' },
      { status: 500 }
    );
  }
} 