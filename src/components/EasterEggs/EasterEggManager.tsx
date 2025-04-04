"use client";

import { useEffect } from 'react';
import { useKonamiCode } from '@/hooks/useKonamiCode';
import MatrixRain from './MatrixRain';
import SnakeGame from './SnakeGame';
import DemoEditor from '../DemoArea/DemoEditor';
import BlogArea from '../Blog/BlogArea';
import GitHubProjects from '../Projects/GitHubProjects';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setMatrixActive, setSnakeActive, setDemoActive, setBlogActive, setProjectsActive } from '@/store/easterEggSlice';
import toast from 'react-hot-toast';

const EasterEggManager = () => {
  const dispatch = useDispatch();
  const { matrixActive, snakeActive, demoActive, blogActive, projectsActive } = useSelector((state: RootState) => state.easterEgg);
  const konamiCode = useKonamiCode();

  useEffect(() => {
    if (konamiCode) {
      dispatch(setMatrixActive(true));
      toast.success('Matrix modu aktif! 🎮');
    }
  }, [konamiCode, dispatch]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey) {
        if (e.key === 's') {
          dispatch(setSnakeActive(true));
          toast.success('Snake oyunu başlatıldı! 🐍');
        } else if (e.key === 'm') {
          dispatch(setMatrixActive(!matrixActive));
          toast.success(matrixActive ? 'Matrix modu kapatıldı!' : 'Matrix modu aktif!');
        }
      } else if (e.key === 'Escape') {
        if (matrixActive) dispatch(setMatrixActive(false));
        if (snakeActive) dispatch(setSnakeActive(false));
        if (demoActive) dispatch(setDemoActive(false));
        if (blogActive) dispatch(setBlogActive(false));
        if (projectsActive) dispatch(setProjectsActive(false));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [dispatch, matrixActive, snakeActive, demoActive, blogActive, projectsActive]);

  return (
    <>
      {matrixActive && <MatrixRain />}
      {snakeActive && <SnakeGame />}
      {demoActive && <DemoEditor />}
      {blogActive && <BlogArea />}
      {projectsActive && <GitHubProjects />}
      <div className="hidden">
        Konami Kodu: ↑ ↑ ↓ ↓ ← → ← → B A
        Snake: Alt + Shift + S
        Matrix: Alt + Shift + M
        Kapat: ESC
      </div>
    </>
  );
};

export default EasterEggManager; 