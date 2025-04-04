"use client";

import { useEffect, useState } from 'react';
import { FaSpotify, FaPlay } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';

interface Track {
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  playedAt: string;
}

export default function NowPlaying() {
  const [lastPlayed, setLastPlayed] = useState<Track | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLastPlayed = async () => {
      try {
        const response = await fetch('/api/spotify', {
          cache: 'no-store',
          next: { revalidate: 0 }
        });

        if (!response.ok) {
          throw new Error('Veri alınamadı');
        }

        const data = await response.json();
        
        if (data && data.title) {
          setLastPlayed({
            title: data.title,
            artist: data.artist,
            album: data.album || '',
            albumImageUrl: data.albumImageUrl,
            songUrl: data.songUrl,
            playedAt: new Date().toISOString()
          });
        } else {
          setError('Son çalınan şarkı bulunamadı');
        }
      } catch (err) {
        setError('Son çalınan şarkı bilgisi alınamadı');
        console.error('Hata:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLastPlayed();
    // Her 30 saniyede bir güncelle
    const interval = setInterval(fetchLastPlayed, 30000);
    return () => clearInterval(interval);
  }, []);

  const getTimeAgo = (timestamp: string) => {
    const playedDate = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - playedDate.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Az önce';
    if (diffInMinutes < 60) return `${diffInMinutes} dakika önce`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} saat önce`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} gün önce`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        {error}
      </div>
    );
  }

  if (!lastPlayed) {
    return (
      <div className="text-center p-4">
        Son çalınan şarkı bilgisi bulunamadı
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
      <div className="relative w-16 h-16">
        <Image
          src={lastPlayed.albumImageUrl}
          alt={lastPlayed.album}
          fill
          className="rounded"
        />
      </div>
      <div className="flex-1 min-w-0">
        <Link
          href={lastPlayed.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg font-semibold text-gray-900 hover:text-blue-600 truncate block"
        >
          {lastPlayed.title}
        </Link>
        <p className="text-sm text-gray-600 truncate">
          {lastPlayed.artist} • {lastPlayed.album}
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {getTimeAgo(lastPlayed.playedAt)}
        </p>
      </div>
    </div>
  );
} 