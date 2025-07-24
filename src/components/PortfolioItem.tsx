'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Play, ExternalLink, Github } from 'lucide-react';
import { PortfolioItem } from '@/types/portfolio';
import UnityGame from './UnityGame';

interface PortfolioItemComponentProps {
  item: PortfolioItem;
  onEdit?: (item: PortfolioItem) => void;
  isAdmin?: boolean;
}

export default function PortfolioItemComponent({ 
  item, 
  onEdit, 
  isAdmin = false 
}: PortfolioItemComponentProps) {
  const [isGameLoaded, setIsGameLoaded] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const renderContent = () => {
    switch (item.type) {
      case 'image':
        return (
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={item.url || item.thumbnail || '/placeholder.jpg'}
              alt={item.title}
              width={800}
              height={600}
              className="w-full h-auto transition-transform duration-300 hover:scale-105"
              onLoad={() => setIsImageLoading(false)}
              onError={() => setIsImageLoading(false)}
            />
            {isImageLoading && (
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
            )}
          </div>
        );
      
      case 'video':
        return (
          <div className="relative">
            <video
              controls
              className="w-full rounded-lg"
              poster={item.thumbnail}
              preload="metadata"
            >
              <source src={item.url} type="video/mp4" />
              <p>お使いのブラウザは動画の再生に対応していません。</p>
            </video>
          </div>
        );
      
      case 'game':
        return (
          <div className="relative bg-gray-900 rounded-lg overflow-hidden">
            {!isGameLoaded && (
              <div 
                className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer group"
                onClick={() => setIsGameLoaded(true)}
              >
                {item.thumbnail && (
                  <Image
                    src={item.thumbnail}
                    alt={`${item.title} ゲーム画面`}
                    width={item.gameConfig?.width || 800}
                    height={item.gameConfig?.height || 600}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <p className="text-lg font-semibold">ゲームを開始</p>
                    <p className="text-sm opacity-75 mt-2">
                      エンジン: {item.gameConfig?.engine || 'Unknown'}
                    </p>
                  </div>
                </div>
              </div>
            )}
            {isGameLoaded && item.gameConfig && (
              <UnityGame
                buildUrl={item.gameConfig.buildUrl}
                width={item.gameConfig.width}
                height={item.gameConfig.height}
                engine={item.gameConfig.engine}
              />
            )}
          </div>
        );
      
      case 'web':
        return (
          <div className="relative">
            {item.thumbnail && (
              <Image
                src={item.thumbnail}
                alt={`${item.title} スクリーンショット`}
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
              />
            )}
            <div className="absolute top-4 right-4 flex gap-2">
              {item.demoUrl && (
                <a
                  href={item.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  title="デモを見る"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
              {item.githubUrl && (
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-900 transition-colors"
                  title="GitHubで見る"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
            <p className="text-gray-500">プレビュー不可</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
              {item.title}
            </h3>
            {item.featured && (
              <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full mb-2">
                注目作品
              </span>
            )}
          </div>
          {isAdmin && onEdit && (
            <button
              onClick={() => onEdit(item)}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              編集
            </button>
          )}
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {item.description}
        </p>
        
        {renderContent()}
        
        <div className="mt-4">
          <div className="flex flex-wrap gap-2 mb-3">
            {item.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
          
          {item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>カテゴリ: {item.category}</span>
          <span>{new Date(item.createdAt).toLocaleDateString('ja-JP')}</span>
        </div>
      </div>
    </div>
  );
}
