"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBitcoin, FaEthereum } from 'react-icons/fa';
import { SiRipple, SiDogecoin } from 'react-icons/si';
import { BiDollar, BiEuro } from 'react-icons/bi';

interface PriceData {
  symbol: string;
  price: string;
  change: string;
}

const CryptoTicker = () => {
  const [prices, setPrices] = useState<PriceData[]>([
    { symbol: 'BTC/USD', price: '0', change: '0' },
    { symbol: 'ETH/USD', price: '0', change: '0' },
    { symbol: 'XRP/USD', price: '0', change: '0' },
    { symbol: 'DOGE/USD', price: '0', change: '0' },
    { symbol: 'EUR/USD', price: '0', change: '0' },
    { symbol: 'USD/TRY', price: '0', change: '0' },
  ]);

  const getIcon = (symbol: string) => {
    switch (symbol) {
      case 'BTC/USD':
        return <FaBitcoin className="w-4 h-4 text-[#F7931A]" />;
      case 'ETH/USD':
        return <FaEthereum className="w-4 h-4 text-[#627EEA]" />;
      case 'XRP/USD':
        return <SiRipple className="w-4 h-4 text-[#23292F] dark:text-gray-300" />;
      case 'DOGE/USD':
        return <SiDogecoin className="w-4 h-4 text-[#C2A633]" />;
      case 'EUR/USD':
        return <BiEuro className="w-4 h-4 text-[#0F47AF] dark:text-[#4169E1]" />;
      case 'USD/TRY':
        return <BiDollar className="w-4 h-4 text-[#85bb65]" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/24hr?symbols=["BTCUSDT","ETHUSDT","XRPUSDT","DOGEUSDT"]');
        const data = await response.json();
        
        const newPrices = [...prices];
        data.forEach((item: any) => {
          const index = prices.findIndex(p => p.symbol === item.symbol.replace('USDT', '/USD'));
          if (index !== -1) {
            newPrices[index] = {
              symbol: item.symbol.replace('USDT', '/USD'),
              price: parseFloat(item.lastPrice).toFixed(2),
              change: parseFloat(item.priceChangePercent).toFixed(2)
            };
          }
        });

        const forexResponse = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const forexData = await forexResponse.json();
        
        newPrices[4] = {
          symbol: 'EUR/USD',
          price: forexData.rates.EUR.toFixed(4),
          change: '0'
        };
        newPrices[5] = {
          symbol: 'USD/TRY',
          price: forexData.rates.TRY.toFixed(4),
          change: '0'
        };

        setPrices(newPrices);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
    return () => clearInterval(interval);
  }, []);

  const renderPriceItem = (item: PriceData, index: number) => (
    <motion.div
      key={`${item.symbol}-${index}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="flex items-center space-x-2 bg-white dark:bg-white/10 rounded-lg p-2 min-w-[140px] shadow-sm"
    >
      {getIcon(item.symbol)}
      <div>
        <div className="text-xs font-medium text-gray-600 dark:text-gray-300">{item.symbol}</div>
        <div className="text-sm font-bold text-gray-900 dark:text-white">${item.price}</div>
        {item.change !== '0' && (
          <div className={`text-[10px] ${parseFloat(item.change) >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
            {parseFloat(item.change) >= 0 ? '+' : ''}{item.change}%
          </div>
        )}
      </div>
    </motion.div>
  );

  return (
    <div className="w-full overflow-hidden bg-gray-100 dark:bg-white/5 backdrop-blur-sm rounded-lg p-1">
      <div className="flex items-center space-x-2 animate-fast-scroll">
        {/* İlk set */}
        {prices.map((item, index) => renderPriceItem(item, index))}
        {/* Kopya set - sürekli akış için */}
        {prices.map((item, index) => renderPriceItem(item, index + prices.length))}
      </div>
    </div>
  );
};

export default CryptoTicker; 