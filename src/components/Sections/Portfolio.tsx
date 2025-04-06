"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RiSparkling2Fill } from 'react-icons/ri';
import { FaBitcoin } from 'react-icons/fa';
import { SiRipple, SiChainlink } from 'react-icons/si';

interface CoinData {
  symbol: string;
  buyPrice: number;
  amount: number;
  currentPrice: number;
  totalValue: number;
  profitPercentage: number;
}

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState<CoinData[]>([
    {
      symbol: 'XRP',
      buyPrice: 0.50458092,
      amount: 50.74,
      currentPrice: 0,
      totalValue: 0,
      profitPercentage: 0
    },
    {
      symbol: 'SHIB',
      buyPrice: 0.00000851,
      amount: 461668.00,
      currentPrice: 0,
      totalValue: 0,
      profitPercentage: 0
    },
    {
      symbol: 'CHZ',
      buyPrice: 0.02576,
      amount: 59.16,
      currentPrice: 0,
      totalValue: 0,
      profitPercentage: 0
    }
  ]);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price?symbols=["XRPUSDT","SHIBUSDT","CHZUSDT"]');
        const data = await response.json();
        
        setPortfolio(prev => prev.map(coin => {
          const priceData = data.find((p: any) => p.symbol === `${coin.symbol}USDT`);
          if (priceData) {
            const currentPrice = parseFloat(priceData.price);
            const totalValue = currentPrice * coin.amount;
            const profitPercentage = ((currentPrice - coin.buyPrice) / coin.buyPrice) * 100;
            
            return {
              ...coin,
              currentPrice,
              totalValue,
              profitPercentage
            };
          }
          return coin;
        }));
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  const getCoinIcon = (symbol: string) => {
    switch (symbol) {
      case 'XRP':
        return <SiRipple className="w-6 h-6 text-[#23292F] dark:text-gray-300" />;
      case 'SHIB':
        return <FaBitcoin className="w-6 h-6 text-[#F7931A]" />;
      case 'CHZ':
        return <SiChainlink className="w-6 h-6 text-[#2A5ADA]" />;
      default:
        return null;
    }
  };

  return (
    <section id="portfolio" className="py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative"
      >
        <span className="absolute inset-0 bg-gradient-to-b from-emerald-50/50 to-transparent dark:from-emerald-900/5 rounded-3xl blur-3xl -z-10"></span>
        
        <h2 className="section-title relative inline-block text-xl sm:text-2xl mb-8">
          <span className="absolute -inset-2 blur-2xl bg-gradient-to-r from-emerald-600/20 to-teal-500/20 animate-pulse rounded-lg"></span>
          <span className="relative">Kripto Portföyüm</span>
          <RiSparkling2Fill className="absolute -top-2 -right-4 w-3 h-3 text-emerald-500 animate-bounce" />
        </h2>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {portfolio.map((coin) => (
            <motion.div
              key={coin.symbol}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="flex items-center gap-3 mb-4">
                {getCoinIcon(coin.symbol)}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {coin.symbol}
                </h3>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Alış Fiyatı:</span>
                  <span className="font-medium">${coin.buyPrice.toFixed(8)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Miktar:</span>
                  <span className="font-medium">{coin.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Güncel Fiyat:</span>
                  <span className="font-medium">${coin.currentPrice.toFixed(8)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Toplam Değer:</span>
                  <span className="font-medium">${coin.totalValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Kar/Zarar:</span>
                  <span className={`font-medium ${
                    coin.profitPercentage >= 0 
                      ? 'text-green-600 dark:text-green-400' 
                      : 'text-red-600 dark:text-red-400'
                  }`}>
                    {coin.profitPercentage >= 0 ? '+' : ''}{coin.profitPercentage.toFixed(2)}%
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Portfolio; 
