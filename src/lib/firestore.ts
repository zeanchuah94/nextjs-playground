import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  DocumentData,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { db } from './firebase';
import { PortfolioItem, Profile, Experience, Education } from '@/types/portfolio';

// ポートフォリオアイテム関連の操作
export const portfolioService = {
  // 全てのポートフォリオアイテムを取得
  async getAll(): Promise<PortfolioItem[]> {
    try {
      const q = query(
        collection(db, 'portfolio'),
        orderBy('featured', 'desc'),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as PortfolioItem[];
    } catch (error) {
      console.error('Error fetching portfolio items:', error);
      throw error;
    }
  },

  // 注目作品を取得
  async getFeatured(): Promise<PortfolioItem[]> {
    try {
      const q = query(
        collection(db, 'portfolio'),
        where('featured', '==', true),
        orderBy('createdAt', 'desc'),
        limit(6)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as PortfolioItem[];
    } catch (error) {
      console.error('Error fetching featured portfolio items:', error);
      throw error;
    }
  },

  // カテゴリ別に取得
  async getByCategory(category: string): Promise<PortfolioItem[]> {
    try {
      const q = query(
        collection(db, 'portfolio'),
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as PortfolioItem[];
    } catch (error) {
      console.error('Error fetching portfolio items by category:', error);
      throw error;
    }
  },

  // 単一アイテムを取得
  async getById(id: string): Promise<PortfolioItem | null> {
    try {
      const docRef = doc(db, 'portfolio', id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data(),
          createdAt: docSnap.data().createdAt?.toDate() || new Date(),
          updatedAt: docSnap.data().updatedAt?.toDate() || new Date(),
        } as PortfolioItem;
      }
      return null;
    } catch (error) {
      console.error('Error fetching portfolio item:', error);
      throw error;
    }
  },

  // アイテムを追加
  async create(item: Omit<PortfolioItem, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      const now = new Date();
      const docRef = await addDoc(collection(db, 'portfolio'), {
        ...item,
        createdAt: now,
        updatedAt: now,
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating portfolio item:', error);
      throw error;
    }
  },

  // アイテムを更新
  async update(id: string, updates: Partial<Omit<PortfolioItem, 'id' | 'createdAt'>>): Promise<void> {
    try {
      const docRef = doc(db, 'portfolio', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date(),
      });
    } catch (error) {
      console.error('Error updating portfolio item:', error);
      throw error;
    }
  },

  // アイテムを削除
  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, 'portfolio', id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
      throw error;
    }
  },
};

// プロフィール関連の操作
export const profileService = {
  // プロフィールを取得
  async get(): Promise<Profile | null> {
    try {
      const q = query(collection(db, 'profile'), limit(1));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        } as Profile;
      }
      return null;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },

  // プロフィールを更新または作成
  async upsert(profile: Omit<Profile, 'id' | 'createdAt' | 'updatedAt'>): Promise<void> {
    try {
      const existingProfile = await this.get();
      const now = new Date();

      if (existingProfile) {
        // 更新
        const docRef = doc(db, 'profile', existingProfile.id);
        await updateDoc(docRef, {
          ...profile,
          updatedAt: now,
        });
      } else {
        // 新規作成
        await addDoc(collection(db, 'profile'), {
          ...profile,
          createdAt: now,
          updatedAt: now,
        });
      }
    } catch (error) {
      console.error('Error upserting profile:', error);
      throw error;
    }
  },
};

// 経験・学歴関連の操作
export const experienceService = {
  // 経験を取得
  async getExperiences(): Promise<Experience[]> {
    try {
      const q = query(
        collection(db, 'experiences'),
        orderBy('startDate', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        startDate: doc.data().startDate?.toDate() || new Date(),
        endDate: doc.data().endDate?.toDate() || null,
      })) as Experience[];
    } catch (error) {
      console.error('Error fetching experiences:', error);
      throw error;
    }
  },

  // 学歴を取得
  async getEducation(): Promise<Education[]> {
    try {
      const q = query(
        collection(db, 'education'),
        orderBy('startDate', 'desc')
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        startDate: doc.data().startDate?.toDate() || new Date(),
        endDate: doc.data().endDate?.toDate() || null,
      })) as Education[];
    } catch (error) {
      console.error('Error fetching education:', error);
      throw error;
    }
  },
};

// 汎用的なFirestore操作ユーティリティ
export const firestoreUtils = {
  // ドキュメントの存在確認
  async documentExists(collectionName: string, docId: string): Promise<boolean> {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);
      return docSnap.exists();
    } catch (error) {
      console.error('Error checking document existence:', error);
      return false;
    }
  },

  // コレクションのドキュメント数を取得
  async getCollectionSize(collectionName: string): Promise<number> {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      return querySnapshot.size;
    } catch (error) {
      console.error('Error getting collection size:', error);
      return 0;
    }
  },

  // バッチでドキュメントを処理
  async batchProcess<T>(
    documents: QueryDocumentSnapshot<DocumentData>[],
    processor: (doc: QueryDocumentSnapshot<DocumentData>) => T
  ): Promise<T[]> {
    return documents.map(processor);
  },
};

// データベースの初期化とシード
export const seedService = {
  // サンプルデータを作成
  async createSampleData(): Promise<void> {
    try {
      // サンプルプロフィール
      const sampleProfile: Omit<Profile, 'id' | 'createdAt' | 'updatedAt'> = {
        name: '山田太郎',
        title: 'フルスタック開発者',
        bio: 'Web開発、モバイルアプリ開発、ゲーム開発に従事しています。新しい技術を学ぶことが大好きです。',
        skills: [
          { id: '1', name: 'React', category: 'frontend', level: 5 },
          { id: '2', name: 'Node.js', category: 'backend', level: 4 },
          { id: '3', name: 'Unity', category: 'other', level: 3 },
        ],
        experience: [],
        education: [],
        socialLinks: [
          { platform: 'github', url: 'https://github.com/username' },
          { platform: 'linkedin', url: 'https://linkedin.com/in/username' },
        ],
      };

      await profileService.upsert(sampleProfile);

      // サンプルポートフォリオアイテム
      const samplePortfolioItems: Omit<PortfolioItem, 'id' | 'createdAt' | 'updatedAt'>[] = [
        {
          title: 'Webアプリケーション',
          description: 'React + Next.jsで開発したモダンなWebアプリケーション',
          type: 'web',
          category: 'Web Development',
          technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
          featured: true,
          tags: ['フロントエンド', 'レスポンシブ'],
          demoUrl: 'https://example.com',
          githubUrl: 'https://github.com/username/project',
        },
        {
          title: 'モバイルアプリ',
          description: 'React Nativeで開発したクロスプラットフォームアプリ',
          type: 'mobile',
          category: 'Mobile Development',
          technologies: ['React Native', 'TypeScript', 'Expo'],
          featured: true,
          tags: ['モバイル', 'iOS', 'Android'],
          githubUrl: 'https://github.com/username/mobile-app',
        },
        {
          title: 'Unity 3Dゲーム',
          description: 'Unity で開発した3Dアクションゲーム',
          type: 'game',
          category: 'Game Development',
          technologies: ['Unity', 'C#', 'Blender'],
          featured: false,
          tags: ['3D', 'アクション', 'PC'],
          gameConfig: {
            engine: 'unity',
            width: 800,
            height: 600,
            buildUrl: '/games/unity-game',
            buildType: 'webgl',
          },
        },
      ];

      for (const item of samplePortfolioItems) {
        await portfolioService.create(item);
      }

      console.log('Sample data created successfully');
    } catch (error) {
      console.error('Error creating sample data:', error);
      throw error;
    }
  },
};
