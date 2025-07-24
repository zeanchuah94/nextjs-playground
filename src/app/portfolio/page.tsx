'use client';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { PortfolioItem, PortfolioFilter } from '@/types/portfolio';
import PortfolioItemComponent from '@/components/PortfolioItem';

export default function PortfolioPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<PortfolioFilter>({});
  const [searchTerm, setSearchTerm] = useState('');

  // カテゴリとタイプの一覧を取得
  const [categories, setCategories] = useState<string[]>([]);
  const [types, setTypes] = useState<PortfolioItem['type'][]>([]);

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [portfolioItems, filter, searchTerm]);

  const fetchPortfolioItems = async () => {
    try {
      const q = query(
        collection(db, 'portfolio'),
        orderBy('featured', 'desc'),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as PortfolioItem[];
      
      setPortfolioItems(items);
      
      // カテゴリとタイプの一覧を生成
      const uniqueCategories = [...new Set(items.map(item => item.category))];
      const uniqueTypes = [...new Set(items.map(item => item.type))];
      setCategories(uniqueCategories);
      setTypes(uniqueTypes);
      
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...portfolioItems];

    // カテゴリフィルター
    if (filter.category && filter.category !== 'all') {
      filtered = filtered.filter(item => item.category === filter.category);
    }

    // タイプフィルター
    if (filter.type && filter.type !== 'all') {
      filtered = filtered.filter(item => item.type === filter.type);
    }

    // 注目作品フィルター
    if (filter.featured) {
      filtered = filtered.filter(item => item.featured);
    }

    // 技術フィルター
    if (filter.technology) {
      filtered = filtered.filter(item => 
        item.technologies.some(tech => 
          tech.toLowerCase().includes(filter.technology!.toLowerCase())
        )
      );
    }

    // 検索フィルター
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchLower) ||
        item.description.toLowerCase().includes(searchLower) ||
        item.technologies.some(tech => tech.toLowerCase().includes(searchLower)) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    setFilteredItems(filtered);
  };

  const clearFilters = () => {
    setFilter({});
    setSearchTerm('');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">ポートフォリオを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            ポートフォリオ
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            私が手がけたプロジェクトやゲーム、アプリケーションをご覧いただけます。
          </p>
        </div>

        {/* フィルターセクション */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* 検索 */}
            <div>
              <label className="block text-sm font-medium mb-2">検索</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="タイトル、説明、技術で検索..."
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>

            {/* カテゴリフィルター */}
            <div>
              <label className="block text-sm font-medium mb-2">カテゴリ</label>
              <select
                value={filter.category || 'all'}
                onChange={(e) => setFilter({...filter, category: e.target.value === 'all' ? undefined : e.target.value})}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="all">すべて</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* タイプフィルター */}
            <div>
              <label className="block text-sm font-medium mb-2">タイプ</label>
              <select
                value={filter.type || 'all'}
                onChange={(e) => setFilter({...filter, type: e.target.value === 'all' ? undefined : e.target.value as PortfolioItem['type']})}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="all">すべて</option>
                <option value="image">画像</option>
                <option value="video">動画</option>
                <option value="game">ゲーム</option>
                <option value="web">Webアプリ</option>
                <option value="mobile">モバイルアプリ</option>
              </select>
            </div>

            {/* 技術フィルター */}
            <div>
              <label className="block text-sm font-medium mb-2">技術</label>
              <input
                type="text"
                value={filter.technology || ''}
                onChange={(e) => setFilter({...filter, technology: e.target.value || undefined})}
                placeholder="React, Unity, etc."
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
          </div>

          {/* フィルターオプション */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filter.featured || false}
                  onChange={(e) => setFilter({...filter, featured: e.target.checked || undefined})}
                  className="mr-2"
                />
                注目作品のみ
              </label>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {filteredItems.length} / {portfolioItems.length} 件
              </span>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
              >
                フィルターをクリア
              </button>
            </div>
          </div>
        </div>

        {/* 注目作品セクション */}
        {!filter.category && !filter.type && !searchTerm && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              注目作品
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems
                .filter(item => item.featured)
                .slice(0, 3)
                .map(item => (
                  <PortfolioItemComponent key={item.id} item={item} />
                ))}
            </div>
          </div>
        )}

        {/* メインポートフォリオグリッド */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {filter.category || filter.type || searchTerm ? 'フィルター結果' : 'すべての作品'}
          </h2>
          
          {filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6-.306M15 6.306V6a3 3 0 00-3-3H8a3 3 0 00-3 3v.306" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                該当する作品が見つかりません
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                別のフィルター条件をお試しください。
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <PortfolioItemComponent key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* 統計情報 */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            ポートフォリオ統計
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {portfolioItems.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">総作品数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {portfolioItems.filter(item => item.featured).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">注目作品</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {categories.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">カテゴリ数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                {[...new Set(portfolioItems.flatMap(item => item.technologies))].length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">使用技術数</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
