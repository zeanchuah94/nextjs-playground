'use client';
import { useEffect, useRef, useState } from 'react';

interface UnityGameProps {
  buildUrl: string;
  width?: number;
  height?: number;
  engine: 'unity' | 'unreal' | 'godot' | 'other';
}

export default function UnityGame({ 
  buildUrl, 
  width = 800, 
  height = 600, 
  engine 
}: UnityGameProps) {
  const gameContainer = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadGame = async () => {
      if (!gameContainer.current) return;

      try {
        setIsLoading(true);
        setError(null);

        switch (engine) {
          case 'unity':
            await loadUnityGame();
            break;
          case 'unreal':
            await loadUnrealGame();
            break;
          default:
            await loadGenericGame();
        }
      } catch (err) {
        setError(`ゲームの読み込みに失敗しました: ${err}`);
        console.error('Game loading error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadGame();
  }, [buildUrl, engine]);

  const loadUnityGame = async () => {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !gameContainer.current) {
        reject('Window or container not available');
        return;
      }

      // Unity WebGL ローダーの動的読み込み
      const script = document.createElement('script');
      script.src = `${buildUrl}/Build/UnityLoader.js`;
      script.onload = () => {
        try {
          // @ts-ignore - Unity WebGL API
          if (window.UnityLoader) {
            // @ts-ignore
            window.UnityLoader.instantiate(
              gameContainer.current, 
              `${buildUrl}/Build/build.json`,
              {
                onProgress: (gameInstance: any, progress: number) => {
                  // プログレス表示の実装可能
                  console.log(`Loading progress: ${progress * 100}%`);
                }
              }
            );
            resolve(void 0);
          } else {
            reject('Unity WebGL loader not found');
          }
        } catch (err) {
          reject(err);
        }
      };
      script.onerror = () => reject('Failed to load Unity WebGL loader');
      document.head.appendChild(script);
    });
  };

  const loadUnrealGame = async () => {
    return new Promise((resolve, reject) => {
      if (!gameContainer.current) {
        reject('Container not available');
        return;
      }

      // Unreal Engine HTML5の場合は通常iframeまたは直接HTML
      const iframe = document.createElement('iframe');
      iframe.src = `${buildUrl}/index.html`;
      iframe.width = width.toString();
      iframe.height = height.toString();
      iframe.frameBorder = '0';
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      
      iframe.onload = () => resolve(void 0);
      iframe.onerror = () => reject('Failed to load Unreal game');
      
      gameContainer.current.appendChild(iframe);
    });
  };

  const loadGenericGame = async () => {
    return new Promise((resolve, reject) => {
      if (!gameContainer.current) {
        reject('Container not available');
        return;
      }

      // 汎用的なゲーム読み込み（iframe使用）
      const iframe = document.createElement('iframe');
      iframe.src = buildUrl;
      iframe.width = width.toString();
      iframe.height = height.toString();
      iframe.frameBorder = '0';
      iframe.style.border = 'none';
      iframe.style.width = '100%';
      iframe.style.height = '100%';
      iframe.allowFullscreen = true;
      
      iframe.onload = () => resolve(void 0);
      iframe.onerror = () => reject('Failed to load game');
      
      gameContainer.current.appendChild(iframe);
    });
  };

  if (error) {
    return (
      <div 
        style={{ width, height }}
        className="flex items-center justify-center bg-red-50 border border-red-200 rounded-lg"
      >
        <div className="text-center text-red-600">
          <p className="font-semibold">エラー</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={gameContainer}
        style={{ width, height }}
        className="mx-auto border rounded-lg bg-black overflow-hidden"
      />
      
      {isLoading && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 rounded-lg"
          style={{ width, height }}
        >
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
            <p className="text-lg">ゲームを読み込み中...</p>
            <p className="text-sm opacity-75 mt-1">
              エンジン: {engine.toUpperCase()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
