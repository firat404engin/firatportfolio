"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { setSnakeActive } from '@/store/easterEggSlice';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };
const INITIAL_FOOD = { x: 15, y: 15 };
const GAME_SPEED = 150;

const SnakeGame = () => {
  const dispatch = useDispatch();
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState(INITIAL_FOOD);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('snakeHighScore') || '0');
    }
    return 0;
  });

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    generateFood();
    setGameOver(false);
    setScore(0);
  };

  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction.y !== 1) setDirection({ x: 0, y: -1 });
        break;
      case 'ArrowDown':
        if (direction.y !== -1) setDirection({ x: 0, y: 1 });
        break;
      case 'ArrowLeft':
        if (direction.x !== 1) setDirection({ x: -1, y: 0 });
        break;
      case 'ArrowRight':
        if (direction.x !== -1) setDirection({ x: 1, y: 0 });
        break;
      case ' ':
        if (gameOver) resetGame();
        break;
      case 'Escape':
        dispatch(setSnakeActive(false));
        break;
    }
  }, [direction, gameOver, dispatch]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  useEffect(() => {
    if (gameOver) return;

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const head = {
          x: prevSnake[0].x + direction.x,
          y: prevSnake[0].y + direction.y,
        };

        // Çarpışma kontrolü
        if (
          head.x < 0 ||
          head.x >= GRID_SIZE ||
          head.y < 0 ||
          head.y >= GRID_SIZE ||
          prevSnake.some((segment) => segment.x === head.x && segment.y === head.y)
        ) {
          setGameOver(true);
          if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('snakeHighScore', score.toString());
          }
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Yem yeme kontrolü
        if (head.x === food.x && head.y === food.y) {
          setScore((prev) => prev + 10);
          generateFood();
          return newSnake;
        }

        return newSnake.slice(0, -1);
      });
    }, GAME_SPEED);

    return () => clearInterval(gameLoop);
  }, [direction, food, gameOver, generateFood, score, highScore]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
    >
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 flex justify-between p-4 text-white">
          <div>Skor: {score}</div>
          <div>En Yüksek: {highScore}</div>
        </div>
        <div
          className="grid bg-gray-900 p-4 rounded-lg"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, ${CELL_SIZE}px)`,
            gap: '1px',
            width: `${GRID_SIZE * CELL_SIZE + (GRID_SIZE - 1) * 1 + 32}px`,
            height: `${GRID_SIZE * CELL_SIZE + (GRID_SIZE - 1) * 1 + 32}px`,
          }}
        >
          {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
            const x = index % GRID_SIZE;
            const y = Math.floor(index / GRID_SIZE);
            const isSnake = snake.some((segment) => segment.x === x && segment.y === y);
            const isFood = food.x === x && food.y === y;

            return (
              <div
                key={index}
                style={{
                  width: `${CELL_SIZE}px`,
                  height: `${CELL_SIZE}px`,
                }}
                className={`${
                  isSnake ? 'bg-green-500' : isFood ? 'bg-red-500' : 'bg-gray-800'
                }`}
              />
            );
          })}
        </div>
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white">
            <h2 className="text-2xl font-bold mb-4">Oyun Bitti!</h2>
            <p className="mb-4">Skor: {score}</p>
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition-colors"
            >
              Tekrar Oyna
            </button>
            <button
              onClick={() => dispatch(setSnakeActive(false))}
              className="mt-2 px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition-colors"
            >
              Kapat
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default SnakeGame; 