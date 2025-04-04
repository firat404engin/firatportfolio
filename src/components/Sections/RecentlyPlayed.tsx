"use client";

import { useState, useEffect } from 'react';
import { FaSpotify, FaPlay } from 'react-icons/fa';
import Image from 'next/image';

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        const response = await fetch('/api/spotify/recently-played');
        const data = await response.json();
        setRecentlyPlayed(data.items?.[0] || null); // Sadece en son şarkıyı al
      } catch (error) {
        console.error('Error fetching recently played:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentlyPlayed();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  if (!recentlyPlayed) {
    return (
      <div className="text-center py-4 text-gray-500">
        Son dinlenen şarkı bulunamadı
      </div>
    );
  }

  const track = recentlyPlayed.track;
  const playedAt = new Date(recentlyPlayed.played_at);
  const timeAgo = new Intl.RelativeTimeFormat('tr').format(
    Math.round((playedAt.getTime() - Date.now()) / (1000 * 60)),
    'minute'
  );

  return (
    <a
      href={track.external_urls.spotify}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={track.album.images[0].url}
            alt={track.album.name}
            fill
            className="object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <FaPlay className="w-6 h-6 text-white" />
          </div>
        </div>
        
        <div className="min-w-0">
          <h3 className="text-base font-semibold text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors truncate">
            {track.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {track.artists.map((artist: any) => artist.name).join(', ')}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1.5 mt-1">
            <FaSpotify className="text-[#1DB954] w-3.5 h-3.5" />
            {timeAgo}
          </p>
        </div>
      </div>
    </a>
  );
};

export default RecentlyPlayed; 