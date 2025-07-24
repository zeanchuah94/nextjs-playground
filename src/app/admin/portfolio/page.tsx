'use client';
import { useState, useEffect } from 'react';
import { collection, addDoc, updateDoc, doc, deleteDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '@/lib/firebase';
import { PortfolioItem, GameConfig } from '@/types/portfolio';

export default function AdminPortfolio() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'image' as PortfolioItem['type'],
    category: '',
    technologies: [] as string[],
    tags: [] as string[],
    featured: false,
    demoUrl: '',
    githubUrl: '',
    gameConfig: null as GameConfig | null,
  });
  
  const [file, setFile] = useState<File | null>(null);
  const [techInput, setTechInput] = useState('');
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    fetchPortfolioItems();
  }, []);

  const fetchPortfolioItems = async () => {
    try {
      const q = query(collection(db, 'portfolio'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const items = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as PortfolioItem[];
      setPortfolioItems(items);
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      alert('ポートフォリオの取得に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const fileName = `${Date.now()}_${file.name}`;
    const storageRef = ref(storage, `${folder}/${fileName}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let fileUrl = '';
      let thumbnailUrl = '';

      if (file) {
        if (formData.type === 'game') {
          // ゲームファイルの場合は games フォルダにアップロード
          fileUrl = await uploadFile(file, 'games');
        } else {
          // その他のファイルは portfolio フォルダにアップロード
          fileUrl = await uploadFile(file, 'portfolio');
          
          // 画像の場合はサムネイルとしても使用
          if (formData.type === 'image') {
            thumbnailUrl = fileUrl;
          }
        }
      }

      const portfolioData = {
        ...formData,
        url: fileUrl || formData.demoUrl,
        thumbnail: thumbnailUrl,
        createdAt: editingItem ? editingItem.createdAt : new Date(),
        updatedAt: new Date(),
      };

      if (editingItem) {
        // 更新
        await updateDoc(doc(db, 'portfolio', editingItem.id), portfolioData);
        alert('ポートフォリオアイテムが更新されました');
      } else {
        // 新規作成
        await addDoc(collection(db, 'portfolio'), portfolioData);
        alert('ポートフォリオアイテムが追加されました');
      }

      // フォームリセット
      resetForm();
      fetchPortfolioItems();
    } catch (error) {
      console.error('Error saving portfolio item:', error);
      alert('保存に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      type: item.type,
      category: item.category,
      technologies: item.technologies,
      tags: item.tags,
      featured: item.featured,
      demoUrl: item.demoUrl || '',
      githubUrl: item.githubUrl || '',
      gameConfig: item.gameConfig || null,
    });
  };

  const handleDelete = async (item: PortfolioItem) => {
    if (!confirm(`「${item.title}」を削除しますか？`)) return;

    try {
      // Firestoreから削除
      await deleteDoc(doc(db, 'portfolio', item.id));
      
      // ストレージからファイル削除（必要に応じて）
      if (item.url && item.url.includes('firebase')) {
        try {
          const storageRef = ref(storage, item.url);
          await deleteObject(storageRef);
        } catch (storageError) {
          console.warn('Storage file deletion failed:', storageError);
        }
      }

      alert('ポートフォリオアイテムが削除されました');
      fetchPortfolioItems();
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      alert('削除に失敗しました');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'image',
      category: '',
      technologies: [],
      tags: [],
      featured: false,
      demoUrl: '',
      githubUrl: '',
      gameConfig: null,
    });
    setFile(null);
    setEditingItem(null);
    setTechInput('');
    setTagInput('');
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({
        ...formData,
        technologies: [...formData.technologies, techInput.trim()]
      });
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter(t => t !== tech)
    });
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(t => t !== tag)
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">
        {editingItem ? 'ポートフォリオ編集' : 'ポートフォリオ管理'}
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* フォーム */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">
            {editingItem ? 'アイテム編集' : '新規アイテム追加'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">タイトル</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">説明</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full p-3 border rounded-lg h-32 dark:bg-gray-700 dark:border-gray-600"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">タイプ</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value as PortfolioItem['type']})}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  <option value="image">画像</option>
                  <option value="video">動画</option>
                  <option value="game">ゲーム</option>
                  <option value="web">Webアプリ</option>
                  <option value="mobile">モバイルアプリ</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">カテゴリ</label>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="例: Web Development"
                  required
                />
              </div>
            </div>

            {/* ファイルアップロード */}
            <div>
              <label className="block text-sm font-medium mb-2">ファイル</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                accept={
                  formData.type === 'image' ? 'image/*' :
                  formData.type === 'video' ? 'video/*' : '*'
                }
              />
            </div>

            {/* URL入力 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">デモURL</label>
                <input
                  type="url"
                  value={formData.demoUrl}
                  onChange={(e) => setFormData({...formData, demoUrl: e.target.value})}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="https://demo.example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({...formData, githubUrl: e.target.value})}
                  className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  placeholder="https://github.com/user/repo"
                />
              </div>
            </div>

            {/* 技術スタック */}
            <div>
              <label className="block text-sm font-medium mb-2">技術スタック</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="技術を入力"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                />
                <button
                  type="button"
                  onClick={addTechnology}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  追加
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm flex items-center gap-1"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTechnology(tech)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* タグ */}
            <div>
              <label className="block text-sm font-medium mb-2">タグ</label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  className="flex-1 p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  placeholder="タグを入力"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  追加
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm flex items-center gap-1"
                  >
                    #{tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* 注目作品チェックボックス */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                className="mr-2"
              />
              <label htmlFor="featured" className="text-sm font-medium">
                注目作品として表示
              </label>
            </div>

            {/* ボタン */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? '保存中...' : editingItem ? '更新' : '追加'}
              </button>
              
              {editingItem && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  キャンセル
                </button>
              )}
            </div>
          </form>
        </div>

        {/* 既存アイテム一覧 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-6">既存アイテム ({portfolioItems.length})</h2>
          
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {item.category} • {item.type}
                      {item.featured && ' • 注目作品'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      編集
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
